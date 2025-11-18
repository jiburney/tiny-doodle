// Google Analytics 4 helper functions

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js',
      eventName: string,
      params?: Record<string, any>
    ) => void
  }
}

/**
 * Track when a drawing is saved
 */
export const trackDrawingSaved = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'drawing_saved', {
      event_category: 'engagement',
      event_label: 'User saved a drawing'
    })
  }
}

/**
 * Track when a drawing is shared
 */
export const trackDrawingShared = (method: 'native_share' | 'download') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'drawing_shared', {
      event_category: 'engagement',
      event_label: 'User shared a drawing',
      share_method: method
    })
  }
}

/**
 * Track when a drawing is deleted
 */
export const trackDrawingDeleted = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'drawing_deleted', {
      event_category: 'engagement',
      event_label: 'User deleted a drawing'
    })
  }
}

/**
 * Track when the gallery is opened
 */
export const trackGalleryOpened = (drawingCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'gallery_opened', {
      event_category: 'navigation',
      event_label: 'User opened gallery',
      drawing_count: drawingCount
    })
  }
}

/**
 * Track when user undoes an action
 */
export const trackUndo = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'drawing_undo', {
      event_category: 'canvas_action',
      event_label: 'User undid an action'
    })
  }
}

/**
 * Track when user redoes an action
 */
export const trackRedo = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'drawing_redo', {
      event_category: 'canvas_action',
      event_label: 'User redid an action'
    })
  }
}

/**
 * Track when user clears the canvas
 */
export const trackCanvasCleared = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'canvas_cleared', {
      event_category: 'canvas_action',
      event_label: 'User cleared the canvas'
    })
  }
}
