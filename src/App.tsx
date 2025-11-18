import { useState, useEffect } from 'react'
import DrawingCanvas from './components/DrawingCanvas'
import ColorPicker from './components/ColorPicker'
import BrushSizePicker from './components/BrushSizePicker'
import Gallery from './components/Gallery'
import { trackDrawingSaved, trackGalleryOpened } from './utils/analytics'
import './App.css'

export type Drawing = {
  id: string
  dataUrl: string
  timestamp: number
}

function App() {
  const [currentColor, setCurrentColor] = useState('#FF6B6B')
  const [brushSize, setBrushSize] = useState(2)
  const [showGallery, setShowGallery] = useState(false)
  const [drawings, setDrawings] = useState<Drawing[]>([])
  const [currentCanvas, setCurrentCanvas] = useState<string | null>(null)

  // Load drawings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tiny-doodle-drawings')
    if (saved) {
      try {
        setDrawings(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load drawings:', e)
      }
    }
  }, [])

  const handleSaveDrawing = (dataUrl: string) => {
    const newDrawing: Drawing = {
      id: Date.now().toString(),
      dataUrl,
      timestamp: Date.now()
    }
    const updatedDrawings = [newDrawing, ...drawings]
    setDrawings(updatedDrawings)

    // Save to localStorage
    localStorage.setItem('tiny-doodle-drawings', JSON.stringify(updatedDrawings))

    // Track the save event
    trackDrawingSaved()
  }

  const handleDeleteDrawing = (id: string) => {
    const updatedDrawings = drawings.filter(d => d.id !== id)
    setDrawings(updatedDrawings)
    localStorage.setItem('tiny-doodle-drawings', JSON.stringify(updatedDrawings))
  }

  if (showGallery) {
    return (
      <Gallery
        drawings={drawings}
        onClose={() => setShowGallery(false)}
        onDelete={handleDeleteDrawing}
      />
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <img
          src="/tiny-doodle-logo-full.png"
          alt="Tiny Doodle"
          className="app-logo"
        />
        <button
          className="gallery-button"
          onClick={() => {
            trackGalleryOpened(drawings.length)
            setShowGallery(true)
          }}
          aria-label="Open gallery"
        >
          📁 ({drawings.length})
        </button>
      </header>

      <div className="top-controls">
        <ColorPicker
          currentColor={currentColor}
          onColorChange={setCurrentColor}
        />
        <BrushSizePicker
          currentSize={brushSize}
          onSizeChange={setBrushSize}
        />
      </div>

      <DrawingCanvas
        color={currentColor}
        brushSize={brushSize}
        onSave={handleSaveDrawing}
        initialCanvas={currentCanvas}
        onCanvasChange={setCurrentCanvas}
      />
    </div>
  )
}

export default App
