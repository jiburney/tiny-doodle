import './BrushSizePicker.css'

type BrushSizePickerProps = {
  currentSize: number
  onSizeChange: (size: number) => void
}

// `value` is a stroke width in canvas units, not CSS pixels: the canvas is a
// fixed 1024px square shown at roughly 366px on a phone, so these are the
// old CSS-pixel widths scaled up ~2.8x to look the same thickness.
// `height` is the preview line in the picker and stays in CSS pixels.
const BRUSH_SIZES = [
  { name: 'Fine', value: 6, height: 2 },
  { name: 'Small', value: 14, height: 5 },
  { name: 'Medium', value: 28, height: 10 },
  { name: 'Large', value: 56, height: 20 },
]

function BrushSizePicker({ currentSize, onSizeChange }: BrushSizePickerProps) {
  return (
    <div className="brush-size-picker">
      <div className="brush-size-options">
        {BRUSH_SIZES.map((size) => (
          <button
            key={size.value}
            className={`brush-size-button ${currentSize === size.value ? 'selected' : ''}`}
            onClick={() => onSizeChange(size.value)}
            aria-label={`Select ${size.name} brush size`}
          >
            <div
              className="brush-preview-line"
              style={{
                height: `${size.height}px`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default BrushSizePicker
