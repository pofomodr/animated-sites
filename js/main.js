/**
 * ANIMATED SITES - Main JavaScript
 * High-quality animated website by pofomodr
 * 
 * Features:
 * - Particle background animations
 * - Floating elements
 * - Smooth scroll
 * - Custom cursor
 * - Scroll-triggered animations
 * - Interactive hover effects
 * - Mobile menu
 * - Form handling
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initParticleCanvas();
    initFloatingElements();
    initNavigation();
    initCustomCursor();
    initScrollAnimations();
    initCounterAnimation();
    initMobileMenu();
    initForm();
    initSmoothScroll();
    
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
});

// ============================================
// PARTICLE CANVAS ANIMATION
// ============================================

let particleCanvas, particleCtx;
let particles = [];
let mouseX = 0, mouseY = 0;
let canvasWidth = 0, canvasHeight = 0;

function initParticleCanvas() {
    particleCanvas = document.getElementById('particleCanvas');
    if (!particleCanvas) return;
    
    particleCtx = particleCanvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    
    // Create initial particles
    createParticles(80);
    
    // Add event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation loop
    animateParticles();
}

function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    particleCanvas.width = canvasWidth;
    particleCanvas.height = canvasHeight;
}

function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    // Create new particles on mouse move (throttled)
    if (Math.random() < 0.05) {
        createParticle(mouseX, mouseY);
    }
}

function createParticles(count) {
    for (let i = 0; i < count; i++) {
        createParticle(
            Math.random() * canvasWidth,
            Math.random() * canvasHeight
        );
    }
}

function createParticle(x, y) {
    const size = Math.random() * 3 + 1;
    const color = getRandomColor();
    const speed = Math.random() * 0.5 + 0.1;
    const direction = Math.random() * Math.PI * 2;
    const opacity = Math.random() * 0.6 + 0.2;
    const isGlitter = Math.random() < 0.1;
    
    particles.push({
        x,
        y,
        size,
        color,
        speed,
        direction,
        opacity,
        isGlitter,
        baseX: x,
        baseY: y,
        distance: Math.random() * 100 + 50,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: (Math.random() - 0.5) * 0.01
    });
    
    // Limit particles
    if (particles.length > 150) {
        particles.shift();
    }
}

function getRandomColor() {
    const colors = [
        '#6366f1', // Primary
        '#ec4899', // Secondary
        '#06b6d4', // Accent
        '#818cf8', // Primary light
        '#f472b6', // Secondary light
        '#22d3ee'  // Accent light
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animateParticles() {
    particleCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    const time = Date.now() * 0.001;
    
    particles.forEach((particle, index) => {
        // Update position with floating motion
        particle.oscillation += particle.oscillationSpeed;
        const offsetX = Math.cos(particle.oscillation) * particle.distance * 0.3;
        const offsetY = Math.sin(particle.oscillation) * particle.distance * 0.3;
        
        // Mouse influence
        const mouseDistance = Math.sqrt(
            Math.pow(mouseX - particle.x, 2) + 
            Math.pow(mouseY - particle.y, 2)
        );
        const mouseInfluence = Math.max(0, 100 - mouseDistance / 10);
        
        particle.x += (Math.cos(particle.direction) * particle.speed + 
                      (mouseX - particle.x) * 0.0001 * mouseInfluence);
        particle.y += (Math.sin(particle.direction) * particle.speed + 
                      (mouseY - particle.y) * 0.0001 * mouseInfluence);
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvasWidth) {
            particle.direction = Math.PI - particle.direction;
        }
        if (particle.y < 0 || particle.y > canvasHeight) {
            particle.direction = -particle.direction;
        }
        
        // Draw particle
        particleCtx.beginPath();
        particleCtx.arc(
            particle.x + offsetX,
            particle.y + offsetY,
            particle.size * (particle.isGlitter ? 1.5 : 1),
            0,
            Math.PI * 2
        );
        
        if (particle.isGlitter) {
            // Glitter effect
            particleCtx.shadowColor = particle.color;
            particleCtx.shadowBlur = 10;
            particleCtx.fillStyle = particle.color;
        } else {
            // Normal particle
            particleCtx.shadowBlur = 0;
            particleCtx.fillStyle = particle.color;
            particleCtx.globalAlpha = particle.opacity * 0.6;
        }
        
        particleCtx.fill();
        particleCtx.globalAlpha = 1;
        
        // Draw connecting lines to nearby particles
        for (let j = index + 1; j < particles.length; j++) {
            const other = particles[j];
            const distance = Math.sqrt(
                Math.pow(particle.x - other.x, 2) + 
                Math.pow(particle.y - other.y, 2)
            );
            
            if (distance < 100) {
                const alpha = 0.3 * (1 - distance / 100);
                particleCtx.beginPath();
                particleCtx.moveTo(particle.x + offsetX, particle.y + offsetY);
                particleCtx.lineTo(other.x + offsetX, other.y + offsetY);
                particleCtx.strokeStyle = particle.color;
                particleCtx.globalAlpha = alpha * particle.opacity;
                particleCtx.lineWidth = 0.5;
                particleCtx.stroke();
            }
        }
        
        particleCtx.globalAlpha = 1;
    });
    
    // Draw subtle background gradient
    const gradient = particleCtx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.03)');
    gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.02)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.03)');
    particleCtx.fillStyle = gradient;
    particleCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    requestAnimationFrame(animateParticles);
}

// ============================================
// FLOATING ELEMENTS
// ============================================

function initFloatingElements() {
    const container = document.getElementById('floatingElements');
    if (!container) return;
    
    // Create floating bubbles
    for (let i = 0; i < 15; i++) {
        createFloatingBubble(container);
    }
}

function createFloatingBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    
    // Random size
    const size = Math.random() * 80 + 20;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    
    // Random position
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    bubble.style.animationDelay = `${Math.random() * 15}s`;
    
    // Random animation duration
    bubble.style.animationDuration = `${10 + Math.random() * 10}s`;
    
    // Random opacity
    bubble.style.opacity = Math.random() * 0.4 + 0.2;
    
    container.appendChild(bubble);
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
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
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================

let cursor, cursorTrail;
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

function initCustomCursor() {
    cursor = document.getElementById('customCursor');
    cursorTrail = document.getElementById('cursorTrail');
    
    if (!cursor || !cursorTrail) return;
    
    // Hide cursor on mobile
    if (window.innerWidth < 768) {
        cursor.style.display = 'none';
        cursorTrail.style.display = 'none';
        return;
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    // Animate cursor
    function animateCursor() {
        // Cursor follows mouse with slight delay
        trailX += (cursorX - trailX) * 0.15;
        trailY += (cursorY - trailY) * 0.15;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        
        // Change cursor size on hover
        const hoverElements = document.querySelectorAll('a, button, .showcase-item, .feature-card, .btn');
        let isHovering = false;
        
        hoverElements.forEach(el => {
            if (el.matches(':hover')) {
                isHovering = true;
            }
        });
        
        if (isHovering) {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
            cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) scale(1.2)`;
        } else {
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
            cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px) scale(1)`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '0.5';
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.section-header, .showcase-item, .feature-card, .about-content, .about-visual, .contact-info, .contact-form');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('reveal', 'active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Also check on resize
    window.addEventListener('resize', revealOnScroll);
}

// ============================================
// COUNTER ANIMATION
// ============================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counter.textContent = '0';
        observer.observe(counter);
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// FORM HANDLING
// ============================================

function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="60">
                    <animate attributeName="stroke-dashoffset" dur="1s" values="60;0" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success state
        submitBtn.innerHTML = `
            <span>Message Sent!</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Add input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// PARALLAX EFFECT (Optional Enhancement)
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('.floating-orb, .geometric-shape');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.1;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// Initialize parallax
initParallax();

// ============================================
// MAGNETIC BUTTONS (Optional Enhancement)
// ============================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize magnetic buttons
initMagneticButtons();

// ============================================
// TILT EFFECT FOR CARDS (Optional Enhancement)
// ============================================

function initTiltEffect() {
    const cards = document.querySelectorAll('.showcase-item, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize tilt effect
initTiltEffect();

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log(`
%c🎨 ANIMATED SITES %cby pofomodr

%cHigh-quality animated website experiences

%cBuilt with passion and creativity ❤️
`, 
'font-size: 24px; font-weight: bold; color: #6366f1;',
'font-size: 16px; color: #818cf8;',
'font-size: 14px; color: #ec4899;',
'font-size: 12px; color: #06b6d4;'
);

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    // Add any post-load animations here
    document.body.classList.add('fully-loaded');
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled rejection:', e.reason);
});
