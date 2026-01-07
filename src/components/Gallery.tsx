import { useState } from 'react'
import { Drawing } from '../App'
import './Gallery.css'

type GalleryProps = {
  drawings: Drawing[]
  onClose: () => void
  onDelete: (id: string) => void
}

function Gallery({ drawings, onClose, onDelete }: GalleryProps) {
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null)

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Delete this drawing? This cannot be undone!')
    if (confirmDelete) {
      onDelete(id)
      setSelectedDrawing(null)
    }
  }

  const handleShare = async (drawing: Drawing) => {
    try {
      // Convert data URL to blob
      const response = await fetch(drawing.dataUrl)
      const blob = await response.blob()

      // Create file from blob
      const fileName = `tiny-doodle-${new Date(drawing.timestamp).toISOString().split('T')[0]}.png`
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
      }
    } catch (error) {
      // User cancelled share or other error
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error)
        alert('Could not share the drawing. Please try again.')
      }
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  if (selectedDrawing) {
    return (
      <div className="gallery">
        <header className="gallery-header">
          <button
            className="back-button"
            onClick={() => setSelectedDrawing(null)}
            aria-label="Back to gallery"
          >
            ← Back
          </button>
          <h2 className="gallery-title">View Drawing</h2>
          <div style={{ width: '100px' }} /> {/* Spacer for centering */}
        </header>
        <div className="drawing-actions">
          <button
            className="share-button"
            onClick={() => handleShare(selectedDrawing)}
            aria-label="Share drawing"
          >
            ↗ Share
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(selectedDrawing.id)}
            aria-label="Delete drawing"
          >
            🗑️ Delete
          </button>
        </div>
        <div className="drawing-viewer">
          <img
            src={selectedDrawing.dataUrl}
            alt="Selected drawing"
            className="full-drawing"
          />
          <div className="drawing-info">
            <p>Created: {formatDate(selectedDrawing.timestamp)}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery">
      <header className="gallery-header">
        <button
          className="back-button"
          onClick={onClose}
          aria-label="Close gallery"
        >
          ← Draw
        </button>
        <img
          src="/tiny-doodle-logo-full.png"
          alt="Tiny Doodle"
          className="gallery-logo"
        />
        <div style={{ width: '100px' }} /> {/* Spacer for centering */}
      </header>

      <div className="gallery-content">
        {drawings.length === 0 ? (
          <div className="empty-gallery">
            <p className="empty-message">No drawings yet!</p>
            <p className="empty-hint">Create your first masterpiece! 🎨</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {drawings.map((drawing) => (
              <div
                key={drawing.id}
                className="gallery-item"
                onClick={() => setSelectedDrawing(drawing)}
              >
                <img
                  src={drawing.dataUrl}
                  alt={`Drawing from ${formatDate(drawing.timestamp)}`}
                  className="gallery-thumbnail"
                />
                <div className="gallery-item-date">
                  {new Date(drawing.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
