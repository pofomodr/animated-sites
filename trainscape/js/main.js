/**
 * TRAINSCAPE - The Speed of Nostalgia
 * Advanced Browser Interaction System
 * 
 * Features:
 * - Web Audio API for immersive train sounds
 * - Device Motion & Orientation for interactive effects
 * - Vibration API for haptic feedback
 * - Pointer Events for unified input handling
 * - Scroll-Driven Animations
 * - Parallax Effects
 * - Custom Cursor with Trail
 * - Touch Feedback
 * - Keyboard Navigation
 * - Gamepad Support (experimental)
 */

// ============================================
// INITIALIZATION & STATE
// ============================================

const Trainscape = {
    // State
    isSoundEnabled: true,
    isMotionEnabled: true,
    isAnimating: true,
    currentSpeed: 0,
    maxSpeed: 320,
    distanceTraveled: 0,
    journeyTime: 0,
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
        this.initPassingTrain();
        
        // Start animation loop
        this.startAnimationLoop();
        
        // Add loaded class
        document.body.classList.add('loaded');
        
        console.log('%c🚂 TRAINSCAPE %cLoaded', 
            'font-size: 24px; font-weight: bold; color: #c48244;',
            'font-size: 16px; color: #7a7a8a;');
        console.log('%cAdvanced Browser Interactions: Active', 
            'font-size: 12px; color: #4a6b8a;');
    },
    
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
            
            // Train
            trackContainer: document.getElementById('trackContainer'),
            track: document.getElementById('track'),
            train: document.getElementById('train'),
            trainSmoke: document.getElementById('trainSmoke'),
            
            // Parallax
            parallaxContainer: document.getElementById('parallaxContainer'),
            particles: document.getElementById('particles'),
            
            // Content
            mainContent: document.getElementById('mainContent'),
            journeyTimeline: document.getElementById('journeyTimeline'),
            timelineProgress: document.getElementById('timelineProgress'),
            
            // Stats
            speedDisplay: document.getElementById('speedDisplay'),
            footerSpeed: document.getElementById('footerSpeed'),
            footerDistance: document.getElementById('footerDistance'),
            footerTime: document.getElementById('footerTime'),
            
            // Experience
            experienceVisual: document.getElementById('experienceVisual'),
            soundWave: document.getElementById('soundWave'),
            motionCircle: document.getElementById('motionCircle'),
            hapticPulse: document.getElementById('hapticPulse'),
            
            // Debug
            orientationDebug: document.getElementById('orientationDebug'),
            orientationText: document.getElementById('orientationText'),
            
            // Touch
            touchFeedback: document.getElementById('touchFeedback'),
            
            // Cursor
            customCursor: document.getElementById('customCursor'),
            cursorTrail: document.getElementById('cursorTrail'),
            
            // Perspective Train
            perspectiveTrainContainer: document.getElementById('perspectiveTrainContainer'),
            perspectiveTrain: document.getElementById('perspectiveTrain'),
            whooshSound: document.getElementById('whooshSound')
        };
    },
    
    bindEvents() {
        // Navigation
        this.elements.nav && this.elements.nav.addEventListener('click', this.handleNavClick.bind(this));
        
        // Controls
        this.elements.soundToggle && this.elements.soundToggle.addEventListener('click', this.toggleSound.bind(this));
        this.elements.motionToggle && this.elements.motionToggle.addEventListener('click', this.toggleMotion.bind(this));
        
        // Scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Visibility
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
        
        // Mouse
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Click
        document.addEventListener('click', this.handleClick.bind(this));
        
        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('click', () => this.activateTimelineItem(item));
        });
        
        // Destination cards
        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            card.addEventListener('click', () => this.handleDestinationClick(card));
        });
        
        // Memory items
        const memoryItems = document.querySelectorAll('.memory-item');
        memoryItems.forEach(item => {
            item.addEventListener('click', () => this.activateMemoryItem(item));
        });
    }
};

// ============================================
// AUDIO SYSTEM (Web Audio API)
// ============================================

Trainscape.initAudio = function() {
    // Create audio context on user interaction (required by most browsers)
    const createAudioContext = () => {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initAudioNodes();
            this.playAmbientSound();
        }
    };
    
    // Try to create context immediately (some browsers allow it)
    try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.initAudioNodes();
    } catch (e) {
        // Will create on first user interaction
        console.log('AudioContext creation deferred to user interaction');
    }
    
    // Ensure context is created on first click
    document.addEventListener('click', createAudioContext, { once: true });
    
    // Keyboard interaction also creates context
    document.addEventListener('keydown', createAudioContext, { once: true });
};

Trainscape.initAudioNodes = function() {
    if (!this.audioContext) return;
    
    // Create oscillator for train ambient sound
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, this.audioContext.currentTime);
    filter.Q.setValueAtTime(1, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    
    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Add modulation for more realistic sound
    const modulator = this.audioContext.createOscillator();
    const modGain = this.audioContext.createGain();
    
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(2, this.audioContext.currentTime);
    modGain.gain.setValueAtTime(5, this.audioContext.currentTime);
    
    modulator.connect(modGain);
    modGain.connect(oscillator.frequency);
    
    // Start oscillators
    oscillator.start();
    modulator.start();
    
    this.audioNodes = {
        oscillator,
        gainNode,
        filter,
        modulator,
        modGain
    };
};

Trainscape.playAmbientSound = function() {
    if (!this.audioContext || !this.audioNodes.gainNode || !this.isSoundEnabled) return;
    
    // Fade in ambient sound
    const now = this.audioContext.currentTime;
    this.audioNodes.gainNode.gain.cancelScheduledValues(now);
    this.audioNodes.gainNode.gain.setValueAtTime(0.05, now);
};

Trainscape.stopAmbientSound = function() {
    if (!this.audioContext || !this.audioNodes.gainNode) return;
    
    const now = this.audioContext.currentTime;
    this.audioNodes.gainNode.gain.cancelScheduledValues(now);
    this.audioNodes.gainNode.gain.setValueAtTime(0, now);
};

Trainscape.playTrainPassing = function() {
    if (!this.audioContext || !this.isSoundEnabled) return;
    
    // Create noise for train passing
    const bufferSize = this.audioContext.sampleRate * 0.1;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    noise.buffer = buffer;
    noise.loop = false;
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
    
    gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioContext.destination);
    
    noise.start();
};

Trainscape.playClickSound = function() {
    if (!this.audioContext || !this.isSoundEnabled) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    
    gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.05);
    
    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.05);
};

Trainscape.toggleSound = function() {
    this.isSoundEnabled = !this.isSoundEnabled;
    this.elements.soundToggle.classList.toggle('active', this.isSoundEnabled);
    
    if (this.isSoundEnabled) {
        this.playAmbientSound();
    } else {
        this.stopAmbientSound();
    }
    
    // Haptic feedback for toggle
    this.vibrate(20);
};

// ============================================
// SENSORS (Device Orientation & Motion)
// ============================================

Trainscape.initSensors = function() {
    // Device Orientation
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
            this.deviceOrientation = {
                alpha: event.alpha || 0,
                beta: event.beta || 0,
                gamma: event.gamma || 0
            };
            this.updateOrientationEffects();
        });
    }
    
    // Device Motion
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', (event) => {
            this.deviceMotion = {
                acceleration: event.acceleration || {},
                accelerationIncludingGravity: event.accelerationIncludingGravity || {},
                rotationRate: event.rotationRate || {}
            };
            this.updateMotionEffects();
        });
    }
    
    // Check for permission (iOS)
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // Handle iOS permission request
        this.elements.hero && this.elements.hero.addEventListener('click', () => {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', this.handleOrientation);
                    }
                })
                .catch(console.error);
        }, { once: true });
    }
};

Trainscape.updateOrientationEffects = function() {
    if (!this.isMotionEnabled || !this.elements.parallaxContainer) return;
    
    const { alpha, beta, gamma } = this.deviceOrientation;
    
    // Apply subtle parallax shift based on device tilt
    const xShift = gamma / 45 * 10;
    const yShift = beta / 45 * 10;
    
    this.elements.parallaxContainer.style.transform = 
        `translate(${xShift}px, ${yShift}px)`;
    
    // Update debug text
    if (this.elements.orientationText) {
        this.elements.orientationText.textContent = 
            `📱 ${alpha.toFixed(1)}° ${beta.toFixed(1)}° ${gamma.toFixed(1)}°`;
    }
    
    // Affect train speed based on tilt
    this.currentSpeed = Math.max(0, Math.min(this.maxSpeed, 
        this.currentSpeed + (Math.abs(gamma) / 10)));
};

Trainscape.updateMotionEffects = function() {
    if (!this.isMotionEnabled) return;
    
    const { accelerationIncludingGravity } = this.deviceMotion;
    
    // Shake effect based on acceleration
    if (accelerationIncludingGravity.x || accelerationIncludingGravity.y) {
        const shakeIntensity = Math.sqrt(
            Math.pow(accelerationIncludingGravity.x || 0, 2) +
            Math.pow(accelerationIncludingGravity.y || 0, 2)
        );
        
        // Vibrate on significant motion
        if (shakeIntensity > 5) {
            this.vibrate(30);
        }
    }
};

// ============================================
// VIBRATION API (Haptic Feedback)
// ============================================

Trainscape.vibrate = function(duration = 20) {
    if (!this.isMotionEnabled || !navigator.vibrate) return;
    
    try {
        navigator.vibrate(duration);
    } catch (e) {
        console.log('Vibration not supported or permission denied');
    }
};

Trainscape.toggleMotion = function() {
    this.isMotionEnabled = !this.isMotionEnabled;
    this.elements.motionToggle.classList.toggle('active', this.isMotionEnabled);
    
    // Haptic feedback
    this.vibrate(30);
};

// ============================================
// PARALLAX EFFECTS
// ============================================

Trainscape.initParallax = function() {
    this.parallaxLayers = document.querySelectorAll('.parallax-layer');
    this.handleScroll();
};

Trainscape.handleScroll = function() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update parallax layers
    this.parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed) || 0.1;
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
    
    // Update train position based on scroll
    if (this.elements.train) {
        const trainSpeed = scrollY * 0.5;
        this.elements.train.style.transform = `translateX(${trainSpeed}px)`;
        
        // Update current speed
        this.currentSpeed = Math.min(this.maxSpeed, scrollY * 0.3);
        this.updateSpeedDisplay();
    }
    
    // Update timeline progress
    this.updateTimelineProgress();
    
    // Update navigation
    this.updateNavOnScroll();
    
    // Add scrolled class to nav
    if (scrollY > 50) {
        this.elements.nav.classList.add('scrolled');
    } else {
        this.elements.nav.classList.remove('scrolled');
    }
    
    // Trigger scroll animations
    this.triggerScrollAnimations();
};

Trainscape.updateSpeedDisplay = function() {
    if (this.elements.speedDisplay) {
        this.elements.speedDisplay.textContent = `${Math.round(this.currentSpeed)} km/h`;
    }
    if (this.elements.footerSpeed) {
        this.elements.footerSpeed.textContent = `${Math.round(this.currentSpeed)} km/h`;
    }
};

// ============================================
// PARTICLES SYSTEM
// ============================================

Trainscape.initParticles = function() {
    if (!this.elements.particles) return;
    
    for (let i = 0; i < 50; i++) {
        this.createParticle();
    }
};

Trainscape.createParticle = function() {
    if (!this.elements.particles) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation
    particle.style.animationDuration = `${10 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    // Random color
    const colors = ['#c48244', '#4a6b8a', '#b8a082', '#7a7a8a'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    this.elements.particles.appendChild(particle);
};

// ============================================
// CUSTOM CURSOR
// ============================================

Trainscape.initCustomCursor = function() {
    if (!this.elements.customCursor || !this.elements.cursorTrail) return;
    
    // Hide on mobile
    if (window.innerWidth < 768) {
        this.elements.customCursor.style.display = 'none';
        this.elements.cursorTrail.style.display = 'none';
        return;
    }
    
    this.cursorX = 0;
    this.cursorY = 0;
    this.trailX = 0;
    this.trailY = 0;
    
    this.animateCursor();
};

Trainscape.handleMouseMove = function(event) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
};

Trainscape.handleMouseLeave = function() {
    this.cursorX = -1000;
    this.cursorY = -1000;
};

Trainscape.animateCursor = function() {
    if (!this.elements.customCursor || !this.elements.cursorTrail) {
        this.animationId = null;
        return;
    }
    
    // Trail follows with delay
    this.trailX += (this.cursorX - this.trailX) * 0.15;
    this.trailY += (this.cursorY - this.trailY) * 0.15;
    
    // Update cursor position
    this.elements.customCursor.style.transform = 
        `translate(${this.cursorX}px, ${this.cursorY}px)`;
    this.elements.cursorTrail.style.transform = 
        `translate(${this.trailX}px, ${this.trailY}px)`;
    
    // Check for hover on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .destination-card, .timeline-item, .memory-item');
    let isHovering = false;
    
    hoverElements.forEach(el => {
        if (el.matches(':hover')) {
            isHovering = true;
        }
    });
    
    if (isHovering) {
        this.elements.customCursor.style.transform = 
            `translate(${this.cursorX}px, ${this.cursorY}px) scale(1.5)`;
        this.elements.cursorTrail.style.transform = 
            `translate(${this.trailX}px, ${this.trailY}px) scale(1.2)`;
    } else {
        this.elements.customCursor.style.transform = 
            `translate(${this.cursorX}px, ${this.cursorY}px) scale(1)`;
        this.elements.cursorTrail.style.transform = 
            `translate(${this.trailX}px, ${this.trailY}px) scale(1)`;
    }
    
    this.animationId = requestAnimationFrame(this.animateCursor.bind(this));
};

// ============================================
// SCROLL ANIMATIONS
// ============================================

Trainscape.initScrollAnimations = function() {
    this.revealElements = document.querySelectorAll(
        '.section-header, .destination-card, .timeline-item, .memory-item, .feature-item'
    );
    
    this.triggerScrollAnimations();
};

Trainscape.triggerScrollAnimations = function() {
    const windowHeight = window.innerHeight;
    const scrollY = window.pageYOffset;
    const triggerPoint = windowHeight * 0.85;
    
    this.revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top + scrollY;
        
        if (elementTop < triggerPoint) {
            el.classList.add('reveal', 'active');
        }
    });
};

// ============================================
// TIMELINE
// ============================================

Trainscape.initTimeline = function() {
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.updateTimelineProgress();
};

Trainscape.updateTimelineProgress = function() {
    if (!this.elements.journeyTimeline || !this.elements.timelineProgress) return;
    
    const journeyRect = this.elements.journeyTimeline.getBoundingClientRect();
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Calculate progress based on scroll position relative to journey section
    const journeyTop = journeyRect.top + scrollY;
    const journeyHeight = journeyRect.height;
    const scrollInJourney = scrollY - journeyTop + windowHeight;
    
    const progress = Math.max(0, Math.min(100, 
        (scrollInJourney / (journeyHeight + windowHeight)) * 100
    ));
    
    this.elements.timelineProgress.style.width = `${progress}%`;
    
    // Activate timeline items based on progress
    const itemCount = this.timelineItems.length;
    const activeIndex = Math.floor(progress / (100 / itemCount));
    
    this.timelineItems.forEach((item, index) => {
        if (index <= activeIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};

Trainscape.activateTimelineItem = function(item) {
    // Remove active from all
    this.timelineItems.forEach(i => i.classList.remove('active'));
    
    // Add active to clicked
    item.classList.add('active');
    
    // Play sound
    this.playClickSound();
    
    // Haptic feedback
    this.vibrate(15);
    
    // Scroll to item
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// ============================================
// COUNTERS
// ============================================

Trainscape.initCounters = function() {
    // Start journey timer
    this.startTime = Date.now();
    this.updateCounters();
    
    // Update every second
    setInterval(this.updateCounters.bind(this), 1000);
};

Trainscape.updateCounters = function() {
    if (this.startTime) {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        this.journeyTime = elapsed;
        
        // Update distance based on speed
        this.distanceTraveled += this.currentSpeed * 0.01;
        
        // Update displays
        if (this.elements.footerTime) {
            const hours = Math.floor(elapsed / 3600);
            const minutes = Math.floor((elapsed % 3600) / 60);
            const seconds = elapsed % 60;
            this.elements.footerTime.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (this.elements.footerDistance) {
            this.elements.footerDistance.textContent = `${Math.round(this.distanceTraveled)} km`;
        }
    }
};

// ============================================
// MOBILE MENU
// ============================================

Trainscape.initMobileMenu = function() {
    if (!this.elements.mobileMenuBtn || !this.elements.mobileMenu) return;
    
    this.elements.mobileMenuBtn.addEventListener('click', () => {
        this.elements.mobileMenuBtn.classList.toggle('active');
        this.elements.mobileMenu.classList.toggle('active');
        document.body.style.overflow = this.elements.mobileMenu.classList.contains('active') 
            ? 'hidden' 
            : '';
    });
    
    // Close on link click
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            this.elements.mobileMenuBtn.classList.remove('active');
            this.elements.mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
};

Trainscape.handleNavClick = function(event) {
    // Close mobile menu if open
    if (this.elements.mobileMenu.classList.contains('active')) {
        this.elements.mobileMenuBtn.classList.remove('active');
        this.elements.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
};

Trainscape.updateNavOnScroll = function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// ============================================
// TOUCH FEEDBACK
// ============================================

Trainscape.initTouchFeedback = function() {
    if (!this.elements.touchFeedback) return;
    
    // Touch start
    document.addEventListener('touchstart', (event) => {
        event.preventDefault();
        this.handleTouchStart(event);
    });
    
    // Touch move
    document.addEventListener('touchmove', (event) => {
        this.handleTouchMove(event);
    });
    
    // Touch end
    document.addEventListener('touchend', (event) => {
        this.handleTouchEnd(event);
    });
};

Trainscape.handleTouchStart = function(event) {
    const touch = event.touches[0];
    this.createTouchRipple(touch.clientX, touch.clientY);
    
    // Haptic feedback
    this.vibrate(10);
};

Trainscape.handleTouchMove = function(event) {
    // Prevent default for horizontal swipe
    if (Math.abs(event.touches[0].clientX - event.touches[0].pageX) > 10) {
        event.preventDefault();
    }
};

Trainscape.handleTouchEnd = function(event) {
    // Play click sound if it was a tap
    const touch = event.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && (element.tagName === 'BUTTON' || 
                    element.closest('button') || 
                    element.closest('a') ||
                    element.closest('.destination-card') ||
                    element.closest('.timeline-item') ||
                    element.closest('.memory-item'))) {
        this.playClickSound();
        this.vibrate(20);
    }
};

Trainscape.createTouchRipple = function(x, y) {
    if (!this.elements.touchFeedback) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.elements.touchFeedback.appendChild(ripple);
    
    // Remove after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
};

// ============================================
// DESTINATION CLICK
// ============================================

Trainscape.handleDestinationClick = function(card) {
    const destination = card.dataset.destination;
    
    // Play sound
    this.playClickSound();
    
    // Haptic feedback
    this.vibrate(25);
    
    // Add active class
    document.querySelectorAll('.destination-card').forEach(c => {
        c.classList.remove('active');
    });
    card.classList.add('active');
    
    // Trigger animation
    card.style.transform = 'translateY(-15px) scale(1.05)';
    setTimeout(() => {
        card.style.transform = '';
    }, 300);
    
    // Show info
    this.showDestinationInfo(destination);
};

Trainscape.showDestinationInfo = function(destination) {
    // Could show a modal or update a panel
    console.log(`Selected destination: ${destination}`);
    
    // Update hero description
    const descriptions = {
        tokyo: 'Experience the speed of Japan\'s bullet trains through cherry blossoms and neon-lit cities.',
        alps: 'Journey through the heart of the Swiss Alps with panoramic views of snow-capped peaks.',
        rockies: 'Travel through Canada\'s wild and majestic Rockies, where nature is at its most grand.',
        transsiberian: 'Embark on the world\'s longest railway journey, crossing continents and time zones.'
    };
    
    if (this.elements.heroDescription && descriptions[destination]) {
        this.elements.heroDescription.textContent = descriptions[destination];
    }
};

// ============================================
// MEMORY ITEMS
// ============================================

Trainscape.activateMemoryItem = function(item) {
    // Remove active from all
    document.querySelectorAll('.memory-item').forEach(i => {
        i.classList.remove('active');
    });
    
    // Add active to clicked
    item.classList.add('active');
    
    // Play sound
    this.playClickSound();
    
    // Haptic feedback
    this.vibrate(15);
    
    // Scroll to item
    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// ============================================
// GAMEPAD SUPPORT
// ============================================

Trainscape.initGamepad = function() {
    if (!navigator.getGamepads) return;
    
    // Check for gamepad connection
    const checkGamepads = () => {
        const gamepads = navigator.getGamepads();
        for (const gamepad of gamepads) {
            if (gamepad) {
                this.setupGamepad(gamepad);
                break;
            }
        }
    };
    
    // Check on button press
    window.addEventListener('gamepadconnected', (event) => {
        this.setupGamepad(event.gamepad);
    });
    
    // Initial check
    checkGamepads();
};

Trainscape.setupGamepad = function(gamepad) {
    console.log('Gamepad connected:', gamepad.id);
    
    // Start polling gamepad state
    const pollGamepad = () => {
        const gamepads = navigator.getGamepads();
        const gp = gamepads[gamepad.index];
        
        if (gp) {
            // Check buttons
            for (let i = 0; i < gp.buttons.length; i++) {
                if (gp.buttons[i].pressed) {
                    this.handleGamepadButton(i);
                }
            }
            
            // Check axes
            if (gp.axes[0] !== 0 || gp.axes[1] !== 0) {
                this.handleGamepadAxis(gp.axes[0], gp.axes[1]);
            }
        }
        
        this.gamepadAnimationId = requestAnimationFrame(pollGamepad);
    };
    
    pollGamepad();
};

Trainscape.handleGamepadButton = function(buttonIndex) {
    // Map buttons to actions
    const buttonActions = {
        0: () => this.playClickSound(), // A button
        1: () => this.vibrate(50), // B button
        2: () => this.toggleSound(), // X button
        3: () => this.toggleMotion(), // Y button
        12: () => this.handleGamepadDpad(0, -1), // D-pad up
        13: () => this.handleGamepadDpad(0, 1), // D-pad down
        14: () => this.handleGamepadDpad(-1, 0), // D-pad left
        15: () => this.handleGamepadDpad(1, 0) // D-pad right
    };
    
    if (buttonActions[buttonIndex]) {
        buttonActions[buttonIndex]();
    }
};

Trainscape.handleGamepadAxis = function(x, y) {
    // Adjust train speed based on left stick
    this.currentSpeed = Math.max(0, Math.min(this.maxSpeed, 
        this.currentSpeed + (y * 2)));
    this.updateSpeedDisplay();
    
    // Vibrate based on right trigger
    // (Would need to check axes[3] for right trigger)
};

Trainscape.handleGamepadDpad = function(x, y) {
    // Navigate through sections
    // This is a simplified implementation
};

// ============================================
// KEYBOARD NAVIGATION
// ============================================

Trainscape.initKeyboard = function() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
};

Trainscape.handleKeyDown = function(event) {
    // Ignore if typing in an input
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch (event.key) {
        case 'm':
        case 'M':
            this.toggleSound();
            break;
        case 'n':
        case 'N':
            this.toggleMotion();
            break;
        case 'ArrowUp':
            this.currentSpeed = Math.min(this.maxSpeed, this.currentSpeed + 10);
            this.updateSpeedDisplay();
            this.vibrate(10);
            break;
        case 'ArrowDown':
            this.currentSpeed = Math.max(0, this.currentSpeed - 10);
            this.updateSpeedDisplay();
            this.vibrate(10);
            break;
        case ' ':
            // Space bar - play train passing sound
            this.playTrainPassing();
            this.vibrate(30);
            break;
        case 'Escape':
            // Close mobile menu
            if (this.elements.mobileMenu.classList.contains('active')) {
                this.elements.mobileMenuBtn.classList.remove('active');
                this.elements.mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            break;
    }
};

// ============================================
// CLICK HANDLING
// ============================================

Trainscape.handleClick = function(event) {
    // Play click sound
    this.playClickSound();
    
    // Haptic feedback
    this.vibrate(10);
    
    // Check if it's a navigation link
    const link = event.target.closest('a[href^="#"]');
    if (link) {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// ============================================
// RESIZE HANDLING
// ============================================

Trainscape.handleResize = function() {
    // Reinitialize cursor on resize
    if (window.innerWidth < 768) {
        if (this.elements.customCursor) this.elements.customCursor.style.display = 'none';
        if (this.elements.cursorTrail) this.elements.cursorTrail.style.display = 'none';
    } else {
        if (this.elements.customCursor) this.elements.customCursor.style.display = 'block';
        if (this.elements.cursorTrail) this.elements.cursorTrail.style.display = 'block';
    }
};

// ============================================
// VISIBILITY CHANGE
// ============================================

Trainscape.handleVisibilityChange = function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    } else {
        // Resume animations
        this.isAnimating = true;
        this.animateCursor();
    }
};

// ============================================
// ANIMATION LOOP
// ============================================

Trainscape.startAnimationLoop = function() {
    this.lastTime = performance.now();
    this.animationId = requestAnimationFrame(this.animationLoop.bind(this));
};

Trainscape.animationLoop = function(currentTime) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Update train animation
    this.updateTrainAnimation(deltaTime);
    
    // Continue loop
    this.animationId = requestAnimationFrame(this.animationLoop.bind(this));
};

Trainscape.updateTrainAnimation = function(deltaTime) {
    if (!this.elements.train) return;
    
    // Move train based on speed
    const speedFactor = this.currentSpeed / this.maxSpeed;
    const movement = speedFactor * 0.1;
    
    // Get current transform
    const currentTransform = this.elements.train.style.transform || 'translateX(0)';
    const currentX = parseFloat(currentTransform.match(/translateX\(([^)]+)\)/)?.[1] || 0);
    
    // Update position
    let newX = currentX + movement;
    
    // Reset position when train goes off screen
    if (newX > window.innerWidth + 200) {
        newX = -200;
    }
    
    this.elements.train.style.transform = `translateX(${newX}px)`;
    
    // Animate smoke
    if (this.elements.trainSmoke && this.currentSpeed > 0) {
        this.elements.trainSmoke.style.animationDuration = `${0.5 + (1 - speedFactor) * 1.5}s`;
    }
};

// ============================================
// PASSING TRAIN ANIMATION (Whoosh Effect)
// ============================================

Trainscape.initPassingTrain = function() {
    // Set up perspective train animation
    this.passingTrainInterval = null;
    this.passingTrainTimeout = null;
    this.wagonCount = 8; // Number of wagons
    
    // Create wagons dynamically
    this.createWagons();
    
    // Start periodic passing trains
    this.startPassingTrains();
    
    // Trigger first train immediately (after a short delay to let page load)
    setTimeout(() => {
        this.triggerPassingTrain();
    }, 2000);
    
    // Also trigger on scroll
    window.addEventListener('scroll', this.triggerPassingTrain.bind(this));
    
    // Trigger on device motion
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', this.triggerPassingTrain.bind(this));
    }
};

Trainscape.createWagons = function() {
    if (!this.elements.perspectiveTrain) return;
    
    // Clear existing wagons (except engine and headlight)
    const existingWagons = this.elements.perspectiveTrain.querySelectorAll('.train-wagon');
    existingWagons.forEach(w => w.remove());
    
    // Create new wagons
    for (let i = 0; i < this.wagonCount; i++) {
        const wagon = document.createElement('div');
        wagon.className = 'train-wagon';
        wagon.style.opacity = '0';
        wagon.style.transition = 'opacity 0.1s ease';
        wagon.dataset.index = i;
        this.elements.perspectiveTrain.appendChild(wagon);
    }
};

Trainscape.startPassingTrains = function() {
    // Clear any existing interval
    if (this.passingTrainInterval) {
        clearInterval(this.passingTrainInterval);
    }
    
    // Trigger a passing train every 20-30 seconds
    this.passingTrainInterval = setInterval(() => {
        this.triggerPassingTrain();
    }, 20000 + Math.random() * 10000);
};

Trainscape.triggerPassingTrain = function() {
    // Don't trigger if already animating
    if (this.elements.perspectiveTrain && this.elements.perspectiveTrain.classList.contains('animate')) {
        return;
    }
    
    // Don't trigger if user is not looking at the page
    if (document.hidden) {
        return;
    }
    
    // Always trigger - we want the train to appear regularly
    this.animatePerspectiveTrain();
};

Trainscape.animatePerspectiveTrain = function() {
    if (!this.elements.perspectiveTrain) return;
    
    // Remove animate class to reset
    this.elements.perspectiveTrain.classList.remove('animate');
    
    // Force reflow to ensure class removal is applied
    void this.elements.perspectiveTrain.offsetWidth;
    
    // Reset all wagons
    const wagons = this.elements.perspectiveTrain.querySelectorAll('.train-wagon');
    wagons.forEach(wagon => {
        wagon.style.opacity = '0';
    });
    
    // Start animation by adding the class
    this.elements.perspectiveTrain.classList.add('animate');
    
    // Play whoosh sound
    this.playWhooshSound();
    
    // Vibrate on mobile
    this.vibrate(50);
    
    // Animate wagons sequentially as the train passes
    const animationDuration = 8000;
    const wagonDelay = animationDuration * 0.5 / this.wagonCount;
    
    wagons.forEach((wagon, index) => {
        setTimeout(() => {
            wagon.style.opacity = '1';
            setTimeout(() => {
                wagon.style.opacity = '0.7';
                setTimeout(() => {
                    wagon.style.opacity = '1';
                }, 100);
            }, 50);
        }, wagonDelay * index);
    });
    
    // Trigger again after animation completes
    if (this.passingTrainTimeout) {
        clearTimeout(this.passingTrainTimeout);
    }
    this.passingTrainTimeout = setTimeout(() => {
        this.triggerPassingTrain();
    }, animationDuration);
};

Trainscape.playWhooshSound = function() {
    if (!this.isSoundEnabled || !this.elements.whooshSound) return;
    
    // Create whoosh sound using Web Audio API
    if (this.audioContext) {
        const now = this.audioContext.currentTime;
        
        // Create noise buffer
        const bufferSize = this.audioContext.sampleRate * 0.5;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        noise.buffer = buffer;
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.5);
        
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        
        noise.start(now);
        noise.stop(now + 0.5);
    }
    
    // Also try HTML5 audio if available
    if (this.elements.whooshSound) {
        this.elements.whooshSound.currentTime = 0;
        this.elements.whooshSound.play().catch(() => {});
    }
};

// ============================================
// SMOOTH SCROLL
// ============================================

Trainscape.initSmoothScroll = function() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            const navHeight = this.elements.nav ? this.elements.nav.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
};

// ============================================
// INITIALIZE ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    Trainscape.init();
    
    // Initialize smooth scroll
    Trainscape.initSmoothScroll();
});

// ============================================
// EXPORT FOR DEBUGGING
// ============================================

window.Trainscape = Trainscape;

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log(`
%c🚂 TRAINSCAPE %cThe Speed of Nostalgia

%cBrowser Capabilities Detected:
%c✓ Web Audio API: ${!!window.AudioContext}
%c✓ Device Orientation: ${!!window.DeviceOrientationEvent}
%c✓ Device Motion: ${!!window.DeviceMotionEvent}
%c✓ Vibration API: ${!!navigator.vibrate}
%c✓ Gamepad API: ${!!navigator.getGamepads}
%c✓ Pointer Events: ${!!window.PointerEvent}
%c✓ Touch Events: ${!!window.TouchEvent}

%cInteract with the page to experience all features!
%cPress 'M' to toggle sound
%cPress 'N' to toggle motion effects
%cUse arrow keys to control speed
%cPress SPACE for train passing effect

%cBuilt with love and the modern web platform ❤️
`, 
'font-size: 24px; font-weight: bold; color: #c48244;',
'font-size: 16px; color: #b8a082;',
'font-size: 14px; color: #7a7a8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 14px; color: #7a7a8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #4a6b8a;',
'font-size: 12px; color: #b8a082;'
);
