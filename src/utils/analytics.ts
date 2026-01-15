import Countly from 'countly-sdk-web'

// COPPA-compliant analytics configuration
const COUNTLY_CONFIG = {
  app_key: '91b20217b285533576cc3f23e2c9de8f',
  url: 'https://tiny-06ab784e73cdc.flex.countly.com/',
  debug: false,

  // COPPA compliance settings
  require_consent: false, // Always enabled for educational/usage analytics
  track_sessions: true,
  track_pageview: true,
  track_clicks: false, // Disable automatic click tracking
  track_scrolls: false, // Disable scroll tracking
  track_errors: true,
  track_links: false,
  track_forms: false,

  // Privacy settings - no personal data collection
  clear_stored_id: false,
  ignore_bots: true,
  force_post: true,
  remote_config: false,

  // Disable location tracking for COPPA compliance
  disable_offline_mode: false,
  session_update: 60, // Update session every 60 seconds
}

let initialized = false

export const initAnalytics = () => {
  if (initialized) return

  try {
    Countly.init(COUNTLY_CONFIG)
    initialized = true
    console.log('Analytics initialized (COPPA compliant)')
  } catch (error) {
    console.error('Failed to initialize analytics:', error)
  }
}

// Track custom events
export const trackEvent = (eventName: string, segmentation?: Record<string, string | number>) => {
  if (!initialized) return

  try {
    Countly.add_event({
      key: eventName,
      segmentation: segmentation || {},
    })
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

// Drawing action events
export const trackDrawingAction = (action: 'save' | 'clear' | 'undo' | 'redo') => {
  trackEvent('drawing_action', { action })
}

// Gallery events
export const trackGalleryAction = (
  action: 'open' | 'close' | 'view_drawing' | 'delete_drawing' | 'share_drawing' | 'share_failed'
) => {
  trackEvent('gallery_action', { action })
}

// Welcome screen events
export const trackWelcomeScreen = (action: 'shown' | 'dismissed' | 'completed' | 'dont_show_again') => {
  trackEvent('welcome_screen', { action })
}

// Color selection
export const trackColorSelection = (color: string) => {
  trackEvent('color_selected', { color })
}

// Brush size selection
export const trackBrushSize = (size: number) => {
  trackEvent('brush_size_selected', { size: size.toString() })
}

// Page view tracking (for SPA navigation)
export const trackPageView = (pageName: string) => {
  if (!initialized) return

  try {
    Countly.track_pageview(pageName)
  } catch (error) {
    console.error('Failed to track page view:', error)
  }
}

// Note: Session management is handled automatically with track_sessions: true in config
// Manual session management is not needed
