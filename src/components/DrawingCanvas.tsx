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
  }

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
      />

      {/* Top-right corner: Undo/Redo */}
      <div className="floating-controls-top">
        <button
          className="canvas-button undo-button"
          onClick={handleUndo}
          disabled={historyStep <= 0}
          aria-label="Undo"
        >
          ↶
        </button>
        <button
          className="canvas-button redo-button"
          onClick={handleRedo}
          disabled={historyStep >= history.length - 1}
          aria-label="Redo"
        >
          ↷
        </button>
      </div>

      {/* Bottom-right corner: Clear/Save */}
      <div className="floating-controls-bottom">
        <button
          className="canvas-button clear-button"
          onClick={handleClear}
          aria-label="Clear canvas"
        >
          ✕
        </button>
        <button
          className="canvas-button save-button"
          onClick={handleSave}
          aria-label="Save drawing"
        >
          💾
        </button>
      </div>
    </div>
  )
}

export default DrawingCanvas
