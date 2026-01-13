import { useState } from 'react'
import './WelcomeScreen.css'

type WelcomeScreenProps = {
  onClose: () => void
}

function WelcomeScreen({ onClose }: WelcomeScreenProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const handleGetStarted = () => {
    if (dontShowAgain) {
      localStorage.setItem('tiny-doodle-hide-welcome', 'true')
    }
    onClose()
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-dialog">
        <div className="welcome-header">
          <img
            src="/tiny-doodle-logo-full.png"
            alt="Tiny Doodle"
            className="welcome-logo"
            width="858"
            height="756"
          />
        </div>

        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to Tiny Doodle!</h1>
          <p className="welcome-description">
            A simple, fun drawing app for quick sketches and creative doodles.
            Perfect for all ages!
          </p>

          <div className="tutorial-section">
            <h2>Quick Tutorial</h2>

            <div className="tutorial-item">
              <div className="tutorial-icon color-icon">
                <div className="color-sample" style={{ backgroundColor: '#FF6B6B' }}></div>
              </div>
              <div className="tutorial-text">
                <strong>Choose Colors:</strong> Tap the color palette to select from a variety of vibrant colors for your drawings
              </div>
            </div>

            <div className="tutorial-item">
              <div className="tutorial-icon brush-icon">
                <div className="brush-sample"></div>
              </div>
              <div className="tutorial-text">
                <strong>Brush Sizes:</strong> Select from different brush weights to create thin lines or bold strokes
              </div>
            </div>

            <div className="tutorial-item">
              <div className="tutorial-icon">↶</div>
              <div className="tutorial-text">
                <strong>Undo/Redo:</strong> Made a mistake? Use the Undo and Redo buttons to step backward or forward
              </div>
            </div>

            <div className="tutorial-item">
              <div className="tutorial-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="tutorial-text">
                <strong>Save:</strong> Save your masterpieces to the gallery to view them later
              </div>
            </div>

            <div className="tutorial-item">
              <div className="tutorial-icon">↗</div>
              <div className="tutorial-text">
                <strong>Share:</strong> Share your drawings with friends or download them to your device
              </div>
            </div>

            <div className="tutorial-item">
              <div className="tutorial-icon">✕</div>
              <div className="tutorial-text">
                <strong>Clear Canvas:</strong> Start fresh with a clean canvas (don't worry, we'll ask for confirmation!)
              </div>
            </div>
          </div>

          <div className="welcome-checkbox">
            <label>
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
              <span>Do Not Show This Screen Next Time</span>
            </label>
          </div>

          <button className="welcome-cta-button" onClick={handleGetStarted}>
            Get Started!
          </button>

          <div className="welcome-footer">
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <span className="footer-separator">•</span>
            <a href="/support.html" target="_blank" rel="noopener noreferrer">Support & Help</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen
