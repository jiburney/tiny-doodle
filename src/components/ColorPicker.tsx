import './ColorPicker.css'

type ColorPickerProps = {
  currentColor: string
  onColorChange: (color: string) => void
}

const COLORS = [
  { name: 'Red', value: '#FF6B6B' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow', value: '#FFD93D' },
  { name: 'Green', value: '#6BCF7F' },
  { name: 'Blue', value: '#4D96FF' },
  { name: 'Purple', value: '#B084CC' },
  { name: 'Pink', value: '#FF69B4' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Black', value: '#2C2C2C' },
  { name: 'White', value: '#FFFFFF' },
]

function ColorPicker({ currentColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="color-picker">
      <div className="color-grid">
        {COLORS.map((color) => (
          <button
            key={color.value}
            className={`color-swatch ${currentColor === color.value ? 'selected' : ''}`}
            style={{ backgroundColor: color.value }}
            onClick={() => onColorChange(color.value)}
            aria-label={`Select ${color.name} color`}
            title={color.name}
          >
            {currentColor === color.value && (
              <span className="check-mark">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
