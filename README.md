# Tiny Doodle

A simple and fun doodling app designed for children, optimized for touch devices like phones and tablets. Perfect for keeping little ones entertained while learning to be creative!

## Features

### Core Drawing Features
- **Touch-Friendly Canvas**: Large, responsive drawing area optimized for little fingers
- **Color Picker**: 10 vibrant colors to choose from with large, easy-to-tap color swatches
- **Brush Sizes**: Three brush sizes (Small, Medium, Large) perfect for different drawing styles
- **Undo/Redo**: Up to 10 levels of undo/redo to fix mistakes
- **Clear Canvas**: Start fresh with a simple tap
- **Save Drawings**: Save masterpieces to the gallery

### Gallery
- **View All Drawings**: Browse through all saved creations
- **Organized by Date**: Drawings are sorted by creation date
- **Delete Option**: Remove old drawings to free up space
- **Full-Screen View**: Tap any thumbnail to see the full drawing

### Child-Friendly Design
- **Large Touch Targets**: All buttons are 60x60px minimum for easy tapping
- **Bright, Cheerful Colors**: Vibrant interface that appeals to children
- **Simple Navigation**: Easy-to-understand interface with minimal text
- **Instant Feedback**: Visual feedback on every interaction
- **No Complex Menus**: Streamlined experience for young users

### Progressive Web App (PWA)
- **Install to Home Screen**: Add to iPhone/iPad home screen for app-like experience
- **Works Offline**: Once installed, works without internet connection
- **No App Store Required**: Install directly from browser

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Development Setup

1. **Clone the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Installing on iPhone/iPad

### Option 1: Add to Home Screen (Recommended)

1. Open the app URL in Safari on your iPhone/iPad
2. Tap the Share button (square with arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Give it a name (e.g., "Tiny Doodle") and tap "Add"
5. The app icon will appear on your home screen like a regular app!

### Option 2: Use in Safari

Simply open the app URL in Safari and use it directly. For best experience, use full-screen mode.

## Parental Controls - Guided Access (iOS)

To prevent children from exiting the app and accessing other parts of the device, use iOS's built-in **Guided Access** feature:

### Setting Up Guided Access

1. **Enable Guided Access**
   - Go to **Settings > Accessibility > Guided Access**
   - Toggle "Guided Access" to ON
   - Tap "Passcode Settings" and set a passcode (this is how YOU will exit)
   - Optional: Enable Face ID/Touch ID for easier exit

2. **Starting Guided Access**
   - Open Tiny Doodle app
   - Triple-click the Side button (or Home button on older devices)
   - The Guided Access screen appears
   - Optional: Circle any areas of the screen you want to disable (like the Gallery button)
   - Tap "Start" in the top right corner

3. **Exiting Guided Access**
   - Triple-click the Side button (or Home button)
   - Enter your passcode or use Face ID/Touch ID
   - Tap "End" in the top left corner

### Tips for Parents
- Test Guided Access yourself before giving the device to children
- The hardware buttons are disabled during Guided Access, so children can't accidentally exit
- You can set time limits in Guided Access settings
- Make sure the passcode is something only you know!

## Using the App

### Drawing
1. **Choose a Color**: Tap any color swatch in the color picker
2. **Select Brush Size**: Choose Small, Medium, or Large
3. **Draw**: Touch and drag on the white canvas
4. **Undo/Redo**: Use the buttons if you make a mistake
5. **Clear**: Tap "Clear" to start over (will ask for confirmation)
6. **Save**: Tap "Save" to add your drawing to the gallery

### Gallery
1. Tap the "Gallery" button in the top right
2. Browse your saved drawings
3. Tap any drawing to view it full-screen
4. Delete unwanted drawings with the trash button
5. Tap "Draw" to go back to creating

## Technical Details

### Built With
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **vite-plugin-pwa** - Progressive Web App support
- **HTML5 Canvas** - Drawing functionality

### Browser Compatibility
- ✅ iOS Safari 14+
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+

### Storage
- Drawings are stored in browser's localStorage
- Each drawing is saved as a PNG data URL
- Storage limit: ~5-10MB (approximately 50-100 drawings depending on complexity)
- Data persists until the browser cache is cleared

### Performance Optimizations
- Touch events optimized for smooth drawing
- Canvas size matches display size for best performance
- Efficient undo/redo with limited history (10 steps)
- Lazy loading of gallery thumbnails

## Future Enhancements

### Planned Features
- **Sharing**: Share drawings via Messages, Email, or AirDrop
- **Stickers & Stamps**: Pre-made shapes and fun stickers
- **Animation Effects**: Glitter, sparkle, and other fun effects
- **Sound Effects**: Playful sounds when drawing
- **Multiple Profiles**: Different children can have their own galleries
- **Export Options**: Save as PNG, PDF, or print
- **Themes**: Different color schemes and backgrounds
- **Apple Watch App**: Draw directly on Apple Watch (native Swift version)

### Native App Development
Once the concept is validated with friends' kids, consider building:
- **Native iOS App (SwiftUI)**: Better performance and Apple Watch support
- **Android App (Kotlin)**: Expand to Android devices and Wear OS

## Development Roadmap

### Phase 1: MVP (Current) ✅
- [x] Basic drawing canvas
- [x] Color picker (10 colors)
- [x] Brush size selector (3 sizes)
- [x] Undo/Redo
- [x] Clear canvas
- [x] Save to gallery
- [x] Gallery view
- [x] PWA support
- [x] Child-friendly UI
- [x] Touch optimization

### Phase 2: Enhanced Features
- [ ] Share functionality (native share sheet)
- [ ] Stickers and stamps library
- [ ] Background colors/patterns
- [ ] Eraser tool
- [ ] Fill bucket tool
- [ ] Celebration animations

### Phase 3: Engagement Features
- [ ] Achievement system
- [ ] Daily drawing challenges
- [ ] Drawing prompts
- [ ] Virtual helper character
- [ ] Sound effects
- [ ] More brush effects (crayon, watercolor, etc.)

### Phase 4: Native iOS/watchOS
- [ ] Swift/SwiftUI iOS app
- [ ] Apple Watch companion app
- [ ] Better performance
- [ ] Native iOS integration
- [ ] iCloud sync

### Phase 5: Android
- [ ] React Native or native Android app
- [ ] Wear OS support
- [ ] Cross-platform sync

## Testing with Children

### Beta Testing Checklist
- [ ] Test with multiple age groups (3-5, 6-8, 9-12)
- [ ] Observe ease of use without instructions
- [ ] Test Guided Access on different devices
- [ ] Validate touch target sizes
- [ ] Check battery usage during extended sessions
- [ ] Test storage limits with many drawings
- [ ] Gather parent feedback
- [ ] Monitor for crashes or bugs

### Feedback Questions for Parents
1. How long did your child stay engaged?
2. Were the controls easy to understand?
3. Did they need help or figure it out themselves?
4. What features did they use most?
5. What features were confusing or unused?
6. What would make it more fun/useful?
7. Would you recommend this to other parents?

## Privacy & Safety

### COPPA Compliance
- ✅ No account creation required
- ✅ No data collection or analytics
- ✅ No advertising
- ✅ All data stored locally on device
- ✅ No internet connection required (after install)
- ✅ No third-party services
- ✅ No social features (in current version)

### Future Privacy Considerations
When adding sharing features:
- Implement parental gate before sharing
- Clear privacy policy
- Parental consent for contacts access
- Age verification
- No cloud storage without parent approval

## Troubleshooting

### App won't load
- Clear browser cache
- Try a different browser (Safari recommended for iOS)
- Check that JavaScript is enabled

### Drawings not saving
- Check available storage space
- Try clearing old drawings from gallery
- Clear browser cache (warning: will delete all drawings)

### Touch/drawing not working
- Ensure you're using a supported browser
- Try reloading the page
- Check if another app is interfering (close other apps)

### Can't exit Guided Access
- Triple-click Side button (or Home button)
- Enter your Guided Access passcode
- Contact Apple Support if you forgot the passcode

## Contributing

This is a personal/educational project, but suggestions are welcome!

### Ideas for Improvement
- Open an issue with feature suggestions
- Share your testing results with kids
- Suggest UI/UX improvements

## License

MIT License - Free to use and modify for personal projects

## Credits

Created by James Burney as an educational project inspired by watching children interact with Apple Watch.

## Contact & Support

For questions or feedback about this project, please open an issue on the GitHub repository.

---

**Have fun drawing! 🎨✨**
