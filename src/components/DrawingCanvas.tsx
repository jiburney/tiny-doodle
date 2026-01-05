import { useRef, useEffect, useState } from 'react'
import './DrawingCanvas.css'

type Point = {
  x: number
  y: number
}

type DrawingCanvasProps = {
  color: string
  brushSize: number
  onSave: (dataUrl: string) => void
  initialCanvas: string | null
  onCanvasChange: (dataUrl: string) => void
}

function DrawingCanvas({ color, brushSize, onSave, initialCanvas, onCanvasChange }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyStep, setHistoryStep] = useState(-1)
  const [showTray, setShowTray] = useState(true)
  const trayTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // Set canvas size to match display size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Fill with white background
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Restore previous canvas if available
      if (initialCanvas) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          saveToHistory(ctx)
        }
        img.src = initialCanvas
      } else {
        // Save initial state
        saveToHistory(ctx)
      }
    }

    resizeCanvas()
    setContext(ctx)

    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const saveToHistory = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newHistory = history.slice(0, historyStep + 1)
    newHistory.push(imageData)

    // Limit history to 10 items to save memory
    if (newHistory.length > 10) {
      newHistory.shift()
      setHistory(newHistory)
      setHistoryStep(newHistory.length - 1)
    } else {
      setHistory(newHistory)
      setHistoryStep(newHistory.length - 1)
    }
  }

  const getPoint = (e: React.TouchEvent | React.MouseEvent): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      const touch = e.touches[0]
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
  }

  const resetTrayTimeout = () => {
    // Clear existing timeout
    if (trayTimeoutRef.current) {
      window.clearTimeout(trayTimeoutRef.current)
    }

    // Show tray
    setShowTray(true)

    // Set new timeout to hide after 3 seconds
    trayTimeoutRef.current = window.setTimeout(() => {
      setShowTray(false)
    }, 3000)
  }

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    if (!context) return

    setIsDrawing(true)
    const point = getPoint(e)

    context.beginPath()
    context.moveTo(point.x, point.y)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = color
    context.lineWidth = brushSize

    // Hide tray while drawing
    if (trayTimeoutRef.current) {
      window.clearTimeout(trayTimeoutRef.current)
    }
    setShowTray(false)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    if (!isDrawing || !context) return

    const point = getPoint(e)
    context.lineTo(point.x, point.y)
    context.stroke()
  }

  const stopDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault()
    if (!isDrawing || !context) return

    setIsDrawing(false)
    context.closePath()
    saveToHistory(context)

    // Save current canvas state
    const canvas = canvasRef.current
    if (canvas) {
      onCanvasChange(canvas.toDataURL('image/png'))
    }

    // Show tray after drawing stops
    resetTrayTimeout()
  }

  // Show tray on any interaction with canvas
  const handleCanvasInteraction = () => {
    if (!isDrawing) {
      resetTrayTimeout()
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (trayTimeoutRef.current) {
        window.clearTimeout(trayTimeoutRef.current)
      }
    }
  }, [])

  const handleClear = () => {
    if (!context || !canvasRef.current) return

    const confirmClear = window.confirm('Clear your drawing? This cannot be undone!')
    if (!confirmClear) return

    context.fillStyle = 'white'
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    saveToHistory(context)
    onCanvasChange(canvasRef.current.toDataURL('image/png'))
  }

  const handleUndo = () => {
    if (historyStep > 0 && context && canvasRef.current) {
      const newStep = historyStep - 1
      setHistoryStep(newStep)
      context.putImageData(history[newStep], 0, 0)
      onCanvasChange(canvasRef.current.toDataURL('image/png'))
    }
  }

  const handleRedo = () => {
    if (historyStep < history.length - 1 && context && canvasRef.current) {
      const newStep = historyStep + 1
      setHistoryStep(newStep)
      context.putImageData(history[newStep], 0, 0)
      onCanvasChange(canvasRef.current.toDataURL('image/png'))
    }
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL('image/png')
    onSave(dataUrl)

    // Show success feedback
    alert('Drawing saved to gallery! 🎉')
  }

  const handleShare = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return

        const fileName = `tiny-doodle-${new Date().toISOString().split('T')[0]}.png`
        const file = new File([blob], fileName, { type: 'image/png' })

        // Check if Web Share API is supported and can share files
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Tiny Doodle Drawing',
            text: 'Check out this drawing from Tiny Doodle!'
          })
        } else {
          // Fallback: download the file
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          alert('Drawing downloaded!')
        }
      }, 'image/png')
    } catch (error) {
      // User cancelled share or other error
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error)
        alert('Could not share the drawing. Please try again.')
      }
    }
  }

  return (
    <div className="drawing-canvas-container">
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onClick={handleCanvasInteraction}
      />

      {/* Floating Undo/Redo controls */}
      <div className="floating-undo-redo">
        <button
          className="floating-button undo-button"
          onClick={handleUndo}
          disabled={historyStep <= 0}
          aria-label="Undo"
        >
          <span className="button-icon">↶</span>
        </button>
        <button
          className="floating-button redo-button"
          onClick={handleRedo}
          disabled={historyStep >= history.length - 1}
          aria-label="Redo"
        >
          <span className="button-icon">↷</span>
        </button>
      </div>

      {/* Bottom action tray: Clear/Save/Share - auto-hides */}
      <div className={`action-tray ${showTray ? 'visible' : 'hidden'}`}
           onMouseEnter={() => {
             if (trayTimeoutRef.current) {
               window.clearTimeout(trayTimeoutRef.current)
             }
             setShowTray(true)
           }}
           onMouseLeave={resetTrayTimeout}
           onTouchStart={() => {
             if (!showTray) {
               resetTrayTimeout()
             }
           }}>
        <button
          className="tray-button clear-button"
          onClick={handleClear}
          aria-label="Clear canvas"
        >
          <span className="button-icon">✕</span>
          <span className="button-label">Clear</span>
        </button>
        <button
          className="tray-button save-button"
          onClick={handleSave}
          aria-label="Save drawing"
        >
          <svg
            className="button-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span className="button-label">Save</span>
        </button>
        <button
          className="tray-button share-button"
          onClick={handleShare}
          aria-label="Share drawing"
        >
          <span className="button-icon">↗</span>
          <span className="button-label">Share</span>
        </button>
      </div>
    </div>
  )
}

export default DrawingCanvas
