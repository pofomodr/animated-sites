/**
 * OCEAN WAVES - Animated Landscapes & Skies
 * Advanced Browser Interaction System
 * 
 * Features:
 * - Web Audio API for immersive ocean sounds
 * - Device Motion & Orientation for interactive waves
 * - Vibration API for haptic feedback
 * - Pointer Events for unified input handling
 * - Scroll-Driven Animations
 * - Parallax Effects
 * - Custom Cursor with Trail
 * - Touch Feedback
 * - Keyboard Navigation
 * - Gamepad Support (experimental)
 * 
 * Version: v1.0
 * Last Updated: Automatically with each commit
 */

// ============================================
// INITIALIZATION & STATE
// ============================================

const OceanWaves = {
    // State
    isSoundEnabled: true,
    isMotionEnabled: true,
    isAnimating: true,
    waveIntensity: 'Calm',
    timeOfDay: 'Day',
    distanceTraveled: 0,
    startTime: null,
    
    // DOM Elements
    elements: {},
    
    // Audio Context
    audioContext: null,
    audioNodes: {},
    
    // Animation
    animationId: null,
    lastTime: 0,
    
    // Device Sensors
    deviceOrientation: { alpha: 0, beta: 0, gamma: 0 },
    deviceMotion: { acceleration: {}, accelerationIncludingGravity: {}, rotationRate: {} },
    
    // Touch
    touches: {},
    
    // Wave Animation
    waveOffset: 0,
    waveSpeed: 0.5,
    
    // Initialize
    init() {
        this.cacheElements();
        this.bindEvents();
        this.initAudio();
        this.initSensors();
        this.initParallax();
        this.initParticles();
        this.initCustomCursor();
        this.initScrollAnimations();
        this.initTimeline();
        this.initCounters();
        this.initMobileMenu();
        this.initTouchFeedback();
        this.initGamepad();
        this.initKeyboard();
        this.initWaves();
        this.initSky();
        this.initLandscape();
        this.initCity();
        
        // Start animation loop
        this.startAnimationLoop();
        
        // Add loaded class
        document.body.classList.add('loaded');
        
        console.log('%c\uD83C\uDF0A OCEAN WAVES %cLoaded', 
            'font-size: 24px; font-weight: bold; color: #00b4d8;',
            'font-size: 16px; color: #48cae4;');
        console.log('%cAdvanced Browser Interactions: Active', 
            'font-size: 12px; color: #0096c7;');
    },
    
    // ============================================
    // ELEMENT CACHING
    // ============================================
    cacheElements() {
        this.elements = {
            // Navigation
            nav: document.getElementById('mainNav'),
            mobileMenuBtn: document.getElementById('mobileMenuBtn'),
            mobileMenu: document.getElementById('mobileMenu'),
            
            // Controls
            soundToggle: document.getElementById('soundToggle'),
            motionToggle: document.getElementById('motionToggle'),
            
            // Hero
            hero: document.getElementById('home'),
            heroBadge: document.getElementById('heroBadge'),
            badgeText: document.getElementById('badgeText'),
            heroDescription: document.getElementById('heroDescription'),
            
            // Animation Container
            animationContainer: document.getElementById('animationContainer'),
            
            // Layers
            skyLayer: document.getElementById('skyLayer'),
            skyGradient: document.getElementById('skyGradient'),
            stars: document.getElementById('stars'),
            clouds: document.getElementById('clouds'),
            aurora: document.getElementById('aurora'),
            sunMoon: document.getElementById('sunMoon'),
            
            landscapeLayer: document.getElementById('landscapeLayer'),
            distantMountains: document.getElementById('distantMountains'),
            midMountains: document.getElementById('midMountains'),
            island: document.getElementById('island'),
            cliffs: document.getElementById('cliffs'),
            
            cityLayer: document.getElementById('cityLayer'),
            citySkyline: document.getElementById('citySkyline'),
            cityLights: document.getElementById('cityLights'),
            buildings: document.getElementById('buildings'),
            
            waveLayer1: document.getElementById('waveLayer1'),
            waveLayer2: document.getElementById('waveLayer2'),
            waveLayer3: document.getElementById('waveLayer3'),
            waveLayer4: document.getElementById('waveLayer4'),
            waterSurface: document.getElementById('waterSurface'),
            ripples: document.getElementById('ripples'),
            reflectionLayer: document.getElementById('reflectionLayer'),
            particles: document.getElementById('particles'),
            
            // Content
            mainContent: document.getElementById('mainContent'),
            
            // Stats
            waveIntensityDisplay: document.getElementById('waveIntensity'),
            footerWaveIntensity: document.getElementById('footerWaveIntensity'),
            footerTimeOfDay: document.getElementById('footerTimeOfDay'),
            footerDistance: document.getElementById('footerDistance'),
            
            // Debug
            orientationDebug: document.getElementById('orientationDebug'),
            orientationText: document.getElementById('orientationText'),
            
            // Touch
            touchFeedback: document.getElementById('touchFeedback'),
            
            // Cursor
            customCursor: document.getElementById('customCursor'),
            cursorTrail: document.getElementById('cursorTrail'),
            
            // Audio
            oceanAmbient: document.getElementById('oceanAmbient'),
            seagulls: document.getElementById('seagulls'),
            cityAmbient: document.getElementById('cityAmbient'),
            whooshSound: document.getElementById('whooshSound'),
            clickSound: document.getElementById('clickSound')
        };
    },
    
    // ============================================
    // EVENT BINDING
    // ============================================
    bindEvents() {
        // Navigation
        if (this.elements.nav) {
            const navLinks = this.elements.nav.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                        this.updateActiveNavLink(targetId);
                    }
                });
            });
        }
        
        // Scroll for nav highlighting
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Mobile menu
        if (this.elements.mobileMenuBtn) {
            this.elements.mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
        
        // Sound toggle
        if (this.elements.soundToggle) {
            this.elements.soundToggle.addEventListener('click', this.toggleSound.bind(this));
        }
        
        // Motion toggle
        if (this.elements.motionToggle) {
            this.elements.motionToggle.addEventListener('click', this.toggleMotion.bind(this));
        }
        
        // Visibility change
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Keyboard
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Pointer move for custom cursor
        document.addEventListener('pointermove', this.handlePointerMove.bind(this));
        
        // Touch start for feedback
        document.addEventListener('touchstart', this.handleTouchStart.bind(this));
        
        // Click for ripple effect
        document.addEventListener('click', this.handleClick.bind(this));
        
        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Animation frame
        this.lastTime = performance.now();
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    },
    
    // ============================================
    // AUDIO
    // ============================================
    initAudio() {
        try {
            // Create audio context on user interaction
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.initAudioNodes();
            }
        } catch (e) {
            console.warn('Web Audio API not supported:', e);
        }
        
        // Setup audio elements
        if (this.elements.oceanAmbient) {
            this.elements.oceanAmbient.volume = 0.3;
        }
        if (this.elements.seagulls) {
            this.elements.seagulls.volume = 0.2;
        }
        if (this.elements.cityAmbient) {
            this.elements.cityAmbient.volume = 0.2;
        }
        
        // Play ambient sounds if sound is enabled
        if (this.isSoundEnabled) {
            this.playAmbientSounds();
        }
    },
    
    initAudioNodes() {
        if (!this.audioContext) return;
        
        // Create oscillator for ocean sound
        const oceanOsc = this.audioContext.createOscillator();
        const oceanGain = this.audioContext.createGain();
        oceanOsc.type = 'sine';
        oceanOsc.frequency.setValueAtTime(150, this.audioContext.currentTime);
        oceanGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        oceanOsc.connect(oceanGain);
        oceanGain.connect(this.audioContext.destination);
        oceanOsc.start();
        
        this.audioNodes.ocean = { osc: oceanOsc, gain: oceanGain };
    },
    
    playAmbientSounds() {
        if (!this.isSoundEnabled) return;
        
        if (this.elements.oceanAmbient) {
            this.elements.oceanAmbient.play().catch(e => console.warn('Audio play failed:', e));
        }
        if (this.elements.seagulls) {
            this.elements.seagulls.play().catch(e => console.warn('Audio play failed:', e));
        }
    },
    
    pauseAmbientSounds() {
        if (this.elements.oceanAmbient) {
            this.elements.oceanAmbient.pause();
        }
        if (this.elements.seagulls) {
            this.elements.seagulls.pause();
        }
        if (this.elements.cityAmbient) {
            this.elements.cityAmbient.pause();
        }
    },
    
    toggleSound() {
        this.isSoundEnabled = !this.isSoundEnabled;
        
        if (this.isSoundEnabled) {
            this.playAmbientSounds();
            this.elements.soundToggle.classList.remove('sound-off');
        } else {
            this.pauseAmbientSounds();
            this.elements.soundToggle.classList.add('sound-off');
        }
        
        this.playClickSound();
        this.vibrate(30);
    },
    
    playClickSound() {
        if (!this.isSoundEnabled || !this.elements.clickSound) return;
        this.elements.clickSound.currentTime = 0;
        this.elements.clickSound.play().catch(e => console.warn('Audio play failed:', e));
    },
    
    playWhooshSound() {
        if (!this.isSoundEnabled || !this.elements.whooshSound) return;
        this.elements.whooshSound.currentTime = 0;
        this.elements.whooshSound.play().catch(e => console.warn('Audio play failed:', e));
    },
    
    // ============================================
    // SENSORS
    // ============================================
    initSensors() {
        // Device Orientation
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
        }
        
        // Device Motion
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', this.handleDeviceMotion.bind(this));
        }
        
        // Check if motion is available
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ requires permission
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        this.isMotionEnabled = true;
                    }
                })
                .catch(console.warn);
        }
    },
    
    handleDeviceOrientation(event) {
        if (!this.isMotionEnabled) return;
        
        this.deviceOrientation = {
            alpha: event.alpha || 0,
            beta: event.beta || 0,
            gamma: event.gamma || 0
        };
        
        // Use device orientation to affect wave intensity
        const intensity = Math.abs(this.deviceOrientation.gamma) / 45;
        this.setWaveIntensity(intensity);
        
        // Update debug info
        if (this.elements.orientationText) {
            this.elements.orientationText.textContent = 
                `\uD83C\uDF0A Orientation: ${Math.round(this.deviceOrientation.alpha)}, ${Math.round(this.deviceOrientation.beta)}, ${Math.round(this.deviceOrientation.gamma)}`;
        }
    },
    
    handleDeviceMotion(event) {
        if (!this.isMotionEnabled) return;
        
        this.deviceMotion = {
            acceleration: event.acceleration || {},
            accelerationIncludingGravity: event.accelerationIncludingGravity || {},
            rotationRate: event.rotationRate || {}
        };
        
        // Use motion to create ripple effects
        const accel = this.deviceMotion.accelerationIncludingGravity;
        if (accel.x || accel.y || accel.z) {
            const magnitude = Math.sqrt(accel.x * accel.x + accel.y * accel.y + accel.z * accel.z);
            if (magnitude > 2) {
                this.createRipple(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
            }
        }
    },
    
    // ============================================
    // WAVES
    // ============================================
    initWaves() {
        this.waveOffset = 0;
        this.waveSpeed = 0.5;
        
        // Create initial ripples
        this.createRipples(5);
    },
    
    setWaveIntensity(intensity) {
        // Map intensity (0-1) to wave speed
        this.waveSpeed = 0.5 + intensity * 2;
        
        // Update wave layers
        const layers = [
            this.elements.waveLayer1,
            this.elements.waveLayer2,
            this.elements.waveLayer3,
            this.elements.waveLayer4
        ];
        
        layers.forEach((layer, index) => {
            if (layer) {
                const speed = this.waveSpeed * (0.8 + index * 0.1);
                layer.style.animationDuration = `${20 + speed * 10}s`;
            }
        });
        
        // Update intensity display
        const intensities = ['Calm', 'Gentle', 'Moderate', 'Strong', 'Stormy'];
        const level = Math.min(Math.floor(intensity * 5), 4);
        this.waveIntensity = intensities[level];
        
        if (this.elements.waveIntensityDisplay) {
            this.elements.waveIntensityDisplay.textContent = this.waveIntensity;
        }
        if (this.elements.footerWaveIntensity) {
            this.elements.footerWaveIntensity.textContent = this.waveIntensity;
        }
    },
    
    createRipple(x, y) {
        if (!this.elements.ripples) return;
        
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(0, 180, 216, 0.5)';
        
        this.elements.ripples.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    },
    
    createRipples(count) {
        for (let i = 0; i < count; i++) {
            this.createRipple(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.4
            );
        }
    },
    
    // ============================================
    // SKY
    // ============================================
    initSky() {
        // Animate sky gradient
        this.animateSky();
        
        // Animate sun/moon
        this.animateSunMoon();
        
        // Animate stars
        this.animateStars();
        
        // Animate aurora
        this.animateAurora();
        
        // Update time of day display
        this.updateTimeOfDay();
    },
    
    animateSky() {
        if (!this.elements.skyGradient) return;
        
        let hue = 200; // Start with blue
        
        setInterval(() => {
            hue = (hue + 0.1) % 360;
            const color1 = `hsl(${hue}, 70%, 40%)`;
            const color2 = `hsl(${hue + 30}, 70%, 50%)`;
            const color3 = `hsl(${hue + 60}, 70%, 30%)`;
            const color4 = `hsl(${hue + 90}, 70%, 20%)`;
            
            this.elements.skyGradient.style.background = 
                `linear-gradient(180deg, ${color1} 0%, ${color2} 30%, ${color3} 70%, ${color4} 100%)`;
            
            this.updateTimeOfDay();
        }, 100);
    },
    
    animateSunMoon() {
        if (!this.elements.sunMoon) return;
        
        let position = 0;
        let isDay = true;
        
        setInterval(() => {
            position = (position + 0.1) % 100;
            this.elements.sunMoon.style.right = `${position}%`;
            
            // Toggle between sun and moon
            if (position > 40 && position < 60 && isDay) {
                isDay = false;
                this.elements.sunMoon.style.background = 
                    'radial-gradient(circle, #e8e8f0 0%, #a8a8b8 100%)';
                this.elements.sunMoon.style.boxShadow = '0 0 60px rgba(200, 200, 220, 0.5)';
            } else if ((position < 40 || position > 60) && !isDay) {
                isDay = true;
                this.elements.sunMoon.style.background = 
                    'radial-gradient(circle, #ffe4b5 0%, #ff8c42 100%)';
                this.elements.sunMoon.style.boxShadow = '0 0 60px rgba(255, 140, 66, 0.5)';
            }
            
            this.updateTimeOfDay();
        }, 50);
    },
    
    animateStars() {
        if (!this.elements.stars) return;
        
        setInterval(() => {
            const twinkle = Math.random() > 0.7 ? 0.3 : 1;
            this.elements.stars.style.opacity = twinkle;
        }, 1000);
    },
    
    animateAurora() {
        if (!this.elements.aurora) return;
        
        let opacity = 0;
        let direction = 0.01;
        
        setInterval(() => {
            opacity += direction;
            if (opacity > 0.6) direction = -0.01;
            if (opacity < 0.2) direction = 0.01;
            this.elements.aurora.style.opacity = opacity;
        }, 100);
    },
    
    updateTimeOfDay() {
        if (!this.elements.sunMoon) return;
        
        const right = parseFloat(this.elements.sunMoon.style.right) || 50;
        
        if (right > 70 || right < 30) {
            this.timeOfDay = 'Night';
        } else if (right > 45) {
            this.timeOfDay = 'Dusk';
        } else if (right > 15) {
            this.timeOfDay = 'Day';
        } else {
            this.timeOfDay = 'Dawn';
        }
        
        if (this.elements.footerTimeOfDay) {
            this.elements.footerTimeOfDay.textContent = this.timeOfDay;
        }
    },
    
    // ============================================
    // LANDSCAPE
    // ============================================
    initLandscape() {
        // Animate mountains
        this.animateMountains();
        
        // Animate island
        this.animateIsland();
    },
    
    animateMountains() {
        if (!this.elements.distantMountains || !this.elements.midMountains) return;
        
        let offset = 0;
        
        setInterval(() => {
            offset = (offset + 0.05) % 100;
            this.elements.distantMountains.style.backgroundPositionX = `${offset}px`;
            this.elements.midMountains.style.backgroundPositionX = `${-offset * 0.5}px`;
        }, 50);
    },
    
    animateIsland() {
        if (!this.elements.island) return;
        
        let position = 0;
        let direction = 0.1;
        
        setInterval(() => {
            position += direction;
            if (position > 5) direction = -0.1;
            if (position < -5) direction = 0.1;
            this.elements.island.style.transform = `translateY(${position}px)`;
        }, 100);
    },
    
    // ============================================
    // CITY
    // ============================================
    initCity() {
        // Animate city lights
        this.animateCityLights();
        
        // Animate buildings
        this.animateBuildings();
    },
    
    animateCityLights() {
        if (!this.elements.cityLights) return;
        
        setInterval(() => {
            const opacity = 0.5 + Math.random() * 0.5;
            this.elements.cityLights.style.opacity = opacity;
        }, 2000);
    },
    
    animateBuildings() {
        if (!this.elements.buildings) return;
        
        // Create building elements dynamically
        for (let i = 0; i < 10; i++) {
            const building = document.createElement('div');
            building.className = 'building';
            building.style.width = `${10 + Math.random() * 20}px`;
            building.style.height = `${50 + Math.random() * 100}px`;
            building.style.background = `hsl(${200 + Math.random() * 30}, 30%, ${40 + Math.random() * 20}%)`;
            building.style.marginRight = `${5 + Math.random() * 10}px`;
            building.style.animationDelay = `${Math.random() * 2}s`;
            building.style.animationDuration = `${2 + Math.random() * 3}s`;
            this.elements.buildings.appendChild(building);
        }
        
        // Animate buildings
        const buildings = this.elements.buildings.querySelectorAll('.building');
        buildings.forEach((b, i) => {
            b.style.animation = `buildingPulse 3s ease-in-out infinite`;
        });
    },
    
    // ============================================
    // PARALLAX
    // ============================================
    initParallax() {
        if (!this.elements.animationContainer) return;
        
        const layers = this.elements.animationContainer.querySelectorAll('.layer');
        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0;
            layer.dataset.speed = speed;
        });
        
        // Initial parallax update
        this.updateParallax();
    },
    
    updateParallax() {
        if (!this.elements.animationContainer) return;
        
        const scrollY = window.scrollY;
        const layers = this.elements.animationContainer.querySelectorAll('.layer');
        
        layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0;
            const yPos = -(scrollY * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    },
    
    // ============================================
    // PARTICLES
    // ============================================
    initParticles() {
        if (!this.elements.particles) return;
        
        this.createParticles(30);
    },
    
    createParticles(count) {
        for (let i = 0; i < count; i++) {
            this.createParticle();
        }
    },
    
    createParticle() {
        if (!this.elements.particles) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${2 + Math.random() * 6}px`;
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(168, 216, 234, ${0.3 + Math.random() * 0.7})`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${5 + Math.random() * 10}s`;
        
        this.elements.particles.appendChild(particle);
        
        // Randomly recreate particles
        setTimeout(() => {
            particle.remove();
            this.createParticle();
        }, 10000 + Math.random() * 20000);
    },
    
    // ============================================
    // CUSTOM CURSOR
    // ============================================
    initCustomCursor() {
        if (!this.elements.customCursor || !this.elements.cursorTrail) return;
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Update cursor position
        this.handlePointerMove({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
    },
    
    handlePointerMove(e) {
        if (!this.elements.customCursor || !this.elements.cursorTrail) return;
        
        const x = e.clientX;
        const y = e.clientY;
        
        // Update cursor position
        this.elements.customCursor.style.left = `${x}px`;
        this.elements.customCursor.style.top = `${y}px`;
        
        // Update trail position with delay
        setTimeout(() => {
            this.elements.cursorTrail.style.left = `${x}px`;
            this.elements.cursorTrail.style.top = `${y}px`;
        }, 50);
        
        // Scale cursor based on device orientation
        if (this.deviceOrientation.gamma) {
            const scale = 1 + Math.abs(this.deviceOrientation.gamma) / 90;
            this.elements.customCursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
    },
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    initScrollAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    },
    
    handleScroll() {
        this.updateParallax();
        this.updateActiveNavLink();
        
        // Update distance traveled
        this.distanceTraveled = window.scrollY / 100;
        if (this.elements.footerDistance) {
            this.elements.footerDistance.textContent = `${Math.round(this.distanceTraveled)} km`;
        }
        
        // Add/remove scrolled class to nav
        if (window.scrollY > 100) {
            this.elements.nav.classList.add('scrolled');
        } else {
            this.elements.nav.classList.remove('scrolled');
        }
    },
    
    updateActiveNavLink(sectionId = null) {
        const navLinks = this.elements.nav?.querySelectorAll('.nav-link');
        if (!navLinks) return;
        
        if (sectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        // Determine active section from scroll position
        const sections = document.querySelectorAll('section');
        let currentSection = null;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            this.updateActiveNavLink(currentSection.id);
        }
    },
    
    // ============================================
    // TIMELINE
    // ============================================
    initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    },
    
    // ============================================
    // COUNTERS
    // ============================================
    initCounters() {
        // Animate counters on scroll
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    },
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target) || 0;
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeOutCubic(progress);
            const value = Math.round(easeProgress * target);
            
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    },
    
    // ============================================
    // MOBILE MENU
    // ============================================
    toggleMobileMenu() {
        this.elements.mobileMenu?.classList.toggle('active');
        this.elements.mobileMenuBtn?.classList.toggle('active');
        this.playClickSound();
        this.vibrate(20);
    },
    
    // ============================================
    // TOUCH FEEDBACK
    // ============================================
    initTouchFeedback() {
        // Already handled in click/touch events
    },
    
    handleTouchStart(e) {
        this.createRipple(e.touches[0].clientX, e.touches[0].clientY);
        this.vibrate(10);
    },
    
    handleClick(e) {
        this.createRipple(e.clientX, e.clientY);
        this.playClickSound();
        this.vibrate(15);
    },
    
    // ============================================
    // GAMEPAD
    // ============================================
    initGamepad() {
        if (!navigator.getGamepads) return;
        
        const checkGamepad = () => {
            const gamepads = navigator.getGamepads();
            for (const gamepad of gamepads) {
                if (gamepad) {
                    this.handleGamepad(gamepad);
                    break;
                }
            }
            requestAnimationFrame(checkGamepad);
        };
        
        checkGamepad();
    },
    
    handleGamepad(gamepad) {
        // Use gamepad axes to control wave intensity
        const intensity = Math.abs(gamepad.axes[0]) + Math.abs(gamepad.axes[1]);
        this.setWaveIntensity(intensity / 2);
        
        // Button presses
        for (let i = 0; i < gamepad.buttons.length; i++) {
            if (gamepad.buttons[i].pressed) {
                this.createRipples(3);
                this.playWhooshSound();
                this.vibrate(50);
            }
        }
    },
    
    // ============================================
    // KEYBOARD
    // ============================================
    initKeyboard() {
        // Already handled in keydown event
    },
    
    handleKeyDown(e) {
        // Space to trigger wave
        if (e.code === 'Space') {
            e.preventDefault();
            this.createRipples(5);
            this.playWhooshSound();
            this.vibrate(30);
        }
        
        // Arrow keys to adjust wave intensity
        if (e.code === 'ArrowUp') {
            this.setWaveIntensity(Math.min(this.waveOffset + 0.2, 1));
        } else if (e.code === 'ArrowDown') {
            this.setWaveIntensity(Math.max(this.waveOffset - 0.2, 0));
        }
        
        // S to toggle sound
        if (e.code === 'KeyS') {
            this.toggleSound();
        }
        
        // M to toggle motion
        if (e.code === 'KeyM') {
            this.toggleMotion();
        }
    },
    
    // ============================================
    // MOTION TOGGLE
    // ============================================
    toggleMotion() {
        this.isMotionEnabled = !this.isMotionEnabled;
        
        if (this.isMotionEnabled) {
            this.elements.motionToggle?.classList.remove('motion-off');
        } else {
            this.elements.motionToggle?.classList.add('motion-off');
        }
        
        this.playClickSound();
        this.vibrate(30);
    },
    
    // ============================================
    // VISIBILITY
    // ============================================
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            this.pauseAmbientSounds();
        } else {
            // Resume animations when tab becomes visible
            if (this.isSoundEnabled) {
                this.playAmbientSounds();
            }
        }
    },
    
    // ============================================
    // VIBRATION
    // ============================================
    vibrate(duration) {
        if ('vibrate' in navigator && this.isMotionEnabled) {
            navigator.vibrate(duration);
        }
    },
    
    // ============================================
    // ANIMATION LOOP
    // ============================================
    startAnimationLoop() {
        this.lastTime = performance.now();
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    },
    
    animate(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Update wave offset
        this.waveOffset += deltaTime * this.waveSpeed * 0.001;
        if (this.waveOffset > 1) this.waveOffset = 0;
        
        // Continue animation loop
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    },
    
    // ============================================
    // RESIZE
    // ============================================
    handleResize() {
        // Recalculate positions if needed
    }
};

// ============================================
// CSS ANIMATIONS
// ============================================

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes buildingPulse {
        0%, 100% { opacity: 0.7; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-5px); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .timeline-item.visible .time-marker {
        animation: markerPulse 2s ease-in-out infinite;
    }
    
    @keyframes markerPulse {
        0%, 100% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.5); }
    }
    
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    OceanWaves.init();
});

// Export for debugging
window.OceanWaves = OceanWaves;
