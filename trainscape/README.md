# Trainscape - The Speed of Nostalgia

> **An artistic journey through speed and landscapes. Experience the nostalgic feeling of train travel around the world.**

![Trainscape Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Browser](https://img.shields.io/badge/Browser-Modern-orange)

## 🎨 Overview

**Trainscape** is an immersive, interactive web experience that combines:
- **Dark, artistic aesthetic** with warm amber and cool blue accents
- **Train speed visualization** with animated landscapes passing by
- **Nostalgic atmosphere** evoking the golden age of rail travel
- **Cutting-edge browser capabilities** for maximum interactivity

This is not just a website—it's a **digital journey** that responds to your every interaction.

---

## 🚀 Features

### 🎭 Visual Experience
- **Parallax Scrolling**: Multiple layers create depth as you scroll
- **Animated Train**: A stylized locomotive that moves across the screen
- **Dynamic Smoke Effects**: Realistic smoke animation from the train
- **Floating Particles**: Subtle particles that drift across the viewport
- **Landscape Silhouettes**: Artistic representations of passing scenery
- **Custom Cursor**: Magnetic cursor with glowing trail effect

### 🔊 Audio Experience (Web Audio API)
- **Ambient Train Sounds**: Continuous engine hum and track noise
- **Dynamic Audio**: Sound intensity changes with speed
- **Train Passing Effect**: Special sound when you press SPACE
- **Click Sounds**: Feedback for interactions
- **Spatial Audio Ready**: Architecture supports 3D audio positioning

### 🖱️ Input Interactions
- **Mouse/Touch**: Unified pointer events for all input types
- **Scroll Animations**: Elements reveal as you scroll
- **Hover Effects**: Smooth animations on all interactive elements
- **Click/Tap Feedback**: Visual and audio responses

### 📱 Device Sensors
- **Device Orientation**: Tilt your device to affect the parallax
- **Device Motion**: Shake or move your device for haptic feedback
- **Vibration API**: Feel the train's motion (on supported devices)
- **Touch Ripples**: Visual feedback on touch screens

### 🎮 Advanced Controls
- **Keyboard Shortcuts**: Control the experience with your keyboard
- **Gamepad Support**: Experimental support for game controllers
- **Speed Control**: Adjust train speed with keyboard or device motion

### ⚡ Performance
- **60 FPS Animations**: Smooth, optimized performance
- **Request Animation Frame**: Efficient animation loop
- **Reduced Motion Support**: Respects user preferences
- **Lazy Loading**: Assets load as needed

---

## 📁 Project Structure

```
trainscape/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles and animations
├── js/
│   └── main.js             # All JavaScript functionality
├── assets/
│   ├── sounds/             # Audio files (to be added)
│   │   ├── train-ambient.mp3
│   │   ├── train-passing.mp3
│   │   ├── station-announcement.mp3
│   │   └── click.wav
│   └── images/             # Background images (to be added)
└── README.md               # This file
```

---

## 🎯 Browser Capabilities Used

### ✅ Core APIs
| API | Purpose | Status |
|-----|---------|--------|
| **Web Audio API** | Dynamic sound generation and control | ✅ Implemented |
| **Device Orientation API** | Detect device tilt and rotation | ✅ Implemented |
| **Device Motion API** | Detect acceleration and movement | ✅ Implemented |
| **Vibration API** | Haptic feedback | ✅ Implemented |
| **Pointer Events** | Unified mouse/touch/pen input | ✅ Implemented |
| **Touch Events** | Touch screen interactions | ✅ Implemented |
| **Intersection Observer** | Scroll-triggered animations | ✅ Implemented |
| **Request Animation Frame** | Smooth animations | ✅ Implemented |
| **Gamepad API** | Game controller support | ✅ Implemented |
| **Keyboard API** | Keyboard shortcuts | ✅ Implemented |
| **Scroll Events** | Parallax and scroll animations | ✅ Implemented |

### 🔄 Experimental APIs (Detected)
| API | Purpose | Status |
|-----|---------|--------|
| **Scroll-Driven Animations** | CSS/JS scroll-linked animations | 🔄 Ready for future |
| **WebXR Device API** | VR/AR support | 🔄 Detected |
| **Web Haptics API** | Advanced haptic feedback | 🔄 Detected |
| **Ambient Light Sensor** | Adjust to lighting conditions | 🔄 Detected |

---

## 🎮 User Interactions

### 🖱️ Mouse & Trackpad
- **Move**: Custom cursor follows with trail
- **Hover**: Elements highlight and scale
- **Click**: Audio feedback and animations
- **Scroll**: Parallax layers move at different speeds

### 📱 Touch
- **Tap**: Click sound and haptic feedback
- **Swipe**: Scroll through the experience
- **Hold**: Extended interactions

### ⌨️ Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `M` | Toggle sound on/off |
| `N` | Toggle motion effects |
| `↑` | Increase train speed |
| `↓` | Decrease train speed |
| `SPACE` | Play train passing sound |
| `ESC` | Close mobile menu |

### 🎮 Gamepad (Experimental)
- **A Button**: Click sound
- **B Button**: Haptic feedback
- **X Button**: Toggle sound
- **Y Button**: Toggle motion
- **D-Pad**: Navigate
- **Left Stick**: Control train speed

### 📱 Device Motion
- **Tilt**: Affects parallax position
- **Shake**: Triggers haptic feedback
- **Rotate**: Changes visual perspective

---

## 🚂 The Journey

### Sections

1. **Hero (Home)**
   - Animated train and landscapes
   - Speed display
   - Call-to-action buttons

2. **Journey**
   - Timeline of a train journey
   - Interactive timeline items
   - Progress indicator

3. **Destinations**
   - Four iconic train routes
   - Interactive cards with hover effects
   - Speed and distance information

4. **Experience**
   - Immersive features
   - Sound wave visualization
   - Motion circle animation
   - Haptic pulse indicator

5. **Memories**
   - Historical timeline
   - Key moments in rail history
   - Interactive memory items

6. **Footer**
   - Current speed
   - Distance traveled
   - Time elapsed

---

## 🎨 Design Philosophy

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Deep Black | `#050508` | Primary background |
| Warm Amber | `#c48244` | Primary accent |
| Cool Blue | `#4a6b8a` | Secondary accent |
| Metallic | `#7a7a8a` | Train and tracks |
| Soft Gold | `#b8a082` | Highlights |

### Typography
- **Playfair Display**: Elegant serif for headings
- **Inter**: Clean sans-serif for body text
- **JetBrains Mono**: Technical information

### Aesthetic
- **Dark Mode**: Reduces eye strain, enhances immersion
- **Glow Effects**: Subtle lighting on interactive elements
- **Gradient Transitions**: Smooth color changes
- **Minimalist**: Focus on content and experience

---

## 🛠️ Setup & Installation

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pofomodr/animated-sites.git
   cd animated-sites/trainscape
   ```

2. **Install dependencies (none required!)**
   - This project uses pure HTML, CSS, and JavaScript
   - No npm, no build step, no dependencies

3. **Add audio files (optional):**
   - Place MP3/WAV files in `assets/sounds/`
   - Update the audio source paths in `index.html`

4. **Add background images (optional):**
   - Place images in `assets/images/`
   - Update the CSS background-image URLs

5. **Run locally:**
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   
   # PHP
   php -S localhost:8000
   
   # Or simply open index.html in your browser
   ```

6. **View in browser:**
   - Open `http://localhost:8000`
   - Or open `index.html` directly

### Production Deployment

Upload to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Import the project
- **GitHub Pages**: Push to a branch
- **Cloudflare Pages**: Connect your repo
- **Firebase Hosting**: `firebase deploy`
- **Surge**: `surge`

---

## 🎛️ Customization

### Change Color Scheme

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #c48244;        /* Warm amber */
    --secondary: #4a6b8a;      /* Cool blue */
    --accent: #b8a082;         /* Soft gold */
    --bg-dark: #050508;        /* Deep black */
    /* ... */
}
```

### Modify Train Speed

Edit the JavaScript in `main.js`:

```javascript
// In the Trainscape object
maxSpeed: 320,  // Maximum speed in km/h
currentSpeed: 0,
```

### Add New Destinations

Add a new card to the destinations grid in `index.html`:

```html
<div class="destination-card" data-destination="new-route">
    <div class="card-image" data-bg="new-route"></div>
    <div class="card-overlay"></div>
    <div class="card-content">
        <span class="card-continent">Continent</span>
        <h3 class="card-title">Route Name</h3>
        <p class="card-description">Description here</p>
        <div class="card-stats">
            <span class="stat"><strong>SPEED</strong> km/h</span>
            <span class="stat"><strong>DISTANCE</strong> km</span>
        </div>
    </div>
</div>
```

### Add Audio Files

1. Add MP3/WAV files to `assets/sounds/`
2. Update the audio elements in `index.html`:

```html
<audio id="trainAmbient" loop>
    <source src="assets/sounds/your-ambient-sound.mp3" type="audio/mpeg">
</audio>
```

### Adjust Parallax Speed

Modify the `data-speed` attribute on parallax layers:

```html
<div class="parallax-layer layer-1" data-speed="0.1"></div>
<!-- Higher values = faster movement -->
```

---

## 📊 Browser Support

### ✅ Fully Supported
- Chrome (recommended)
- Firefox
- Safari (with some limitations)
- Edge
- Opera

### ⚠️ Partial Support
- Safari: Vibration API not available
- Older browsers: Some APIs may not work

### 📱 Mobile Support
- iOS Safari: Device orientation requires user permission
- Android Chrome: Full support
- Mobile browsers: Touch and vibration supported

---

## ♿ Accessibility

### Features
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Keyboard Navigation**: Full keyboard support
- **Semantic HTML**: Proper structure and ARIA labels
- **Focus States**: Visible focus indicators
- **Color Contrast**: Meets WCAG standards

### Testing
- Keyboard-only navigation
- Screen reader compatibility
- Reduced motion preferences
- High contrast modes

---

## 🔧 Troubleshooting

### Audio Not Playing
- **Issue**: Browser requires user interaction before playing audio
- **Solution**: Click anywhere on the page to enable audio

### Device Motion Not Working (iOS)
- **Issue**: iOS requires explicit permission
- **Solution**: Click on the page to trigger permission request

### Vibration Not Working
- **Issue**: Not supported on all devices
- **Solution**: Only works on mobile devices with vibration hardware

### Performance Issues
- **Issue**: Too many particles or animations
- **Solution**: Reduce particle count or disable motion effects

---

## 📈 Performance Tips

1. **Reduce Particle Count**: Edit `initParticles()` in `main.js`
2. **Disable Motion Effects**: Click the motion toggle button
3. **Use Efficient Animations**: CSS transforms > layout changes
4. **Lazy Load Assets**: Load images and audio as needed
5. **Debounce Scroll Events**: Already implemented in the code

---

## 🎓 Learning Resources

### Web Audio API
- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Audio API Tutorial](https://webaudioapi.com/)

### Device Sensors
- [Device Orientation API](https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_API)
- [Device Motion API](https://developer.mozilla.org/en-US/docs/Web/API/Device_motion_API)

### Vibration API
- [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)

### Gamepad API
- [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)

### Pointer Events
- [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)

---

## 🙌 Credits

- **Design & Development**: pofomodr
- **Inspiration**: The golden age of rail travel
- **Technologies**: Vanilla HTML, CSS, JavaScript
- **Audio**: Web Audio API (synthesized sounds)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💬 Feedback & Support

For questions, bug reports, or feature requests:
- Open an issue on GitHub
- Contact: [Your email]

---

## 🎉 Enjoy the Journey!

> "The train is a small world moving through a larger world. 
> It's a place where time slows down, where every moment is savored, 
> where the journey itself becomes the destination."

**All aboard!** 🚂✨
