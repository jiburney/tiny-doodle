import './BrushSizePicker.css'

type BrushSizePickerProps = {
  currentSize: number
  onSizeChange: (size: number) => void
}

const BRUSH_SIZES = [
  { name: 'Fine', value: 2, height: 2 },
  { name: 'Small', value: 5, height: 5 },
  { name: 'Medium', value: 10, height: 10 },
  { name: 'Large', value: 20, height: 20 },
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
