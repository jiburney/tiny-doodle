import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['tiny-doodle-logo-icon.png', 'privacy.html', 'support.html'],
      manifest: {
        name: 'Tiny Doodle - Draw & Create',
        short_name: 'Tiny Doodle',
        description: 'A simple and fun doodling app for children',
        theme_color: '#4D96FF',
        background_color: '#4D96FF',
        display: 'standalone',
        orientation: 'any',
        icons: [
          {
            src: 'tiny-doodle-logo-icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'tiny-doodle-logo-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'tiny-doodle-logo-icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'tiny-doodle-logo-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true,
    host: true,
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost.pem')
    },
    allowedHosts: ['fanged-emogene-gullably.ngrok-free.dev']
  }
})  // <-- This closing brace was missing