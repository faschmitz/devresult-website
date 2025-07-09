// Global variables
let particles = [];
let mouseX = 0;
let mouseY = 0;

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');
const contactForm = document.getElementById('contactForm');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoading();
    initializeParticles();
    initializeCursor();
    initializeNavigation();
    initializeScrollAnimations();
    initializeForm();
    initializeCounters();
    initializeScrollToTop();
    initializeScrollSpy();
    initializeHologramLogo();
    initializeNeuralNetwork();
    initializeAdvancedEffects();
});

// Loading Screen
function initializeLoading() {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Particle System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    animateParticles();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #0891b2;
        border-radius: 50%;
        opacity: 0.6;
        pointer-events: none;
        box-shadow: 0 0 4px rgba(8, 145, 178, 0.8);
    `;
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const vx = (Math.random() - 0.5) * 0.5;
    const vy = (Math.random() - 0.5) * 0.5;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    particles.push({
        element: particle,
        x: x,
        y: y,
        vx: vx,
        vy: vy
    });
    
    document.getElementById('particles').appendChild(particle);
}

function animateParticles() {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.vy *= -1;
        }
        
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
        
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            particle.x -= dx * 0.01;
            particle.y -= dy * 0.01;
        }
    });
    
    requestAnimationFrame(animateParticles);
}

// Custom Cursor
function initializeCursor() {
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    function updateCursor() {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        trailX += (cursorX - trailX) * 0.1;
        trailY += (cursorY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .client-logo');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#ff6b35';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#0891b2';
        });
    });
}

// Navigation
function initializeNavigation() {
    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Scroll Animations (AOS alternative)
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// Form handling
function initializeForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Mensagem Enviada!';
            submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll spy for navigation
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Glitch effect enhancement
function enhanceGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch 2s infinite';
            }, 10);
        }, 3000 + Math.random() * 2000);
    });
}

// Initialize glitch effect
enhanceGlitchEffect();

// Resize handler
window.addEventListener('resize', () => {
    // Reinitialize particles on resize
    particles.forEach(particle => {
        particle.element.remove();
    });
    particles = [];
    initializeParticles();
});

// Service cards hover effect
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Tech stack animation
document.addEventListener('DOMContentLoaded', () => {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `pulse 2s infinite ${index * 0.2}s`;
        }, index * 200);
    });
});

// Hologram Logo Effects
function initializeHologramLogo() {
    const logoContainer = document.querySelector('.logo-hologram');
    const heroLogo = document.querySelector('.hero-logo');
    
    if (!logoContainer || !heroLogo) return;
    
    // Interactive hover effects
    logoContainer.addEventListener('mouseenter', () => {
        heroLogo.style.animation = 'logoGlow 0.5s ease-in-out infinite alternate, logoFloat 2s ease-in-out infinite';
        logoContainer.style.transform = 'scale(1.1)';
    });
    
    logoContainer.addEventListener('mouseleave', () => {
        heroLogo.style.animation = 'logoGlow 2s ease-in-out infinite alternate, logoFloat 3s ease-in-out infinite';
        logoContainer.style.transform = 'scale(1)';
    });
    
    // Click effect
    logoContainer.addEventListener('click', () => {
        createHologramExplosion(logoContainer);
    });
    
    // Periodic glitch effect
    setInterval(() => {
        if (Math.random() < 0.3) {
            applyGlitchEffect(heroLogo);
        }
    }, 5000);
}

// Neural Network Animation
function initializeNeuralNetwork() {
    const neuralNodes = document.querySelectorAll('.neural-node');
    const connections = document.querySelectorAll('.neural-connection');
    
    // Add click interaction to neural nodes
    neuralNodes.forEach((node, index) => {
        node.addEventListener('click', () => {
            triggerNeuralActivation(node, index);
        });
    });
    
    // Dynamic connection flow
    connections.forEach((connection, index) => {
        connection.addEventListener('animationiteration', () => {
            const randomDelay = Math.random() * 2;
            connection.style.animationDelay = randomDelay + 's';
        });
    });
}

// Advanced Visual Effects
function initializeAdvancedEffects() {
    // Matrix rain effect
    createMatrixRain();
    
    // Floating data elements
    createFloatingData();
    
    // Holographic UI elements
    createHolographicUI();
    
    // Advanced cursor trails
    enhanceCursorTrails();
    
    // Logo background integration
    createLogoBackgroundEffects();
}

// Hologram explosion effect
function createHologramExplosion(container) {
    const explosion = document.createElement('div');
    explosion.className = 'hologram-explosion';
    container.appendChild(explosion);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #0891b2;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            animation: explode 1s ease-out forwards;
            animation-delay: ${i * 0.02}s;
        `;
        
        const angle = (i / 20) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        
        particle.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
        
        explosion.appendChild(particle);
    }
    
    setTimeout(() => {
        container.removeChild(explosion);
    }, 1000);
}

// Glitch effect for logo
function applyGlitchEffect(element) {
    const originalFilter = element.style.filter;
    element.style.filter = 'hue-rotate(90deg) saturate(2) brightness(1.2)';
    element.style.animation = 'none';
    
    setTimeout(() => {
        element.style.filter = originalFilter;
        element.style.animation = 'logoGlow 2s ease-in-out infinite alternate, logoFloat 3s ease-in-out infinite';
    }, 200);
}

// Neural activation effect
function triggerNeuralActivation(node, index) {
    node.style.transform = 'scale(1.5)';
    node.style.boxShadow = '0 0 40px rgba(0, 212, 255, 1)';
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'neural-ripple';
    ripple.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        border: 2px solid rgba(0, 212, 255, 0.6);
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: rippleOut 1s ease-out forwards;
        pointer-events: none;
    `;
    
    node.appendChild(ripple);
    
    setTimeout(() => {
        node.style.transform = 'scale(1)';
        node.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1000);
}

// Matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(matrixContainer);
    
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            width: 2px;
            height: 100%;
            background: linear-gradient(transparent, #0891b2, transparent);
            animation: matrixFall ${3 + Math.random() * 2}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        matrixContainer.appendChild(column);
    }
}

// Floating data elements
function createFloatingData() {
    const dataElements = ['01', '11', '00', '10', 'AI', 'ML', 'DL', 'NN'];
    
    setInterval(() => {
        if (Math.random() < 0.3) {
            const dataElement = document.createElement('div');
            dataElement.textContent = dataElements[Math.floor(Math.random() * dataElements.length)];
            dataElement.className = 'floating-data';
            dataElement.style.cssText = `
                position: fixed;
                color: rgba(0, 212, 255, 0.6);
                font-family: 'Orbitron', monospace;
                font-size: 12px;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}%;
                top: 100%;
                animation: floatUp 8s linear forwards;
            `;
            
            document.body.appendChild(dataElement);
            
            setTimeout(() => {
                if (dataElement.parentNode) {
                    dataElement.parentNode.removeChild(dataElement);
                }
            }, 8000);
        }
    }, 2000);
}

// Holographic UI elements
function createHolographicUI() {
    const uiContainer = document.createElement('div');
    uiContainer.className = 'holographic-ui';
    uiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
    `;
    
    // Create corner elements
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    corners.forEach(corner => {
        const element = document.createElement('div');
        element.className = `ui-corner ${corner}`;
        element.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border: 2px solid rgba(0, 212, 255, 0.5);
            ${corner.includes('top') ? 'top: 20px;' : 'bottom: 20px;'}
            ${corner.includes('left') ? 'left: 20px;' : 'right: 20px;'}
            ${corner.includes('top') && corner.includes('left') ? 'border-right: none; border-bottom: none;' : ''}
            ${corner.includes('top') && corner.includes('right') ? 'border-left: none; border-bottom: none;' : ''}
            ${corner.includes('bottom') && corner.includes('left') ? 'border-right: none; border-top: none;' : ''}
            ${corner.includes('bottom') && corner.includes('right') ? 'border-left: none; border-top: none;' : ''}
            animation: uiPulse 3s ease-in-out infinite;
        `;
        
        uiContainer.appendChild(element);
    });
    
    document.body.appendChild(uiContainer);
}

// Enhanced cursor trails
function enhanceCursorTrails() {
    const trails = [];
    const maxTrails = 10;
    
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail-enhanced';
        trail.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: rgba(0, 212, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: trailFade 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        trails.push(trail);
        
        if (trails.length > maxTrails) {
            const oldTrail = trails.shift();
            if (oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    });
}

// Logo background integration effects
function createLogoBackgroundEffects() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create ambient light around logo area
    const ambientLight = document.createElement('div');
    ambientLight.className = 'logo-ambient-light';
    ambientLight.style.cssText = `
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 600px;
        height: 200px;
        background: radial-gradient(ellipse, rgba(8, 145, 178, 0.1) 0%, rgba(30, 58, 138, 0.05) 50%, transparent 100%);
        z-index: 0;
        animation: ambientPulse 4s ease-in-out infinite;
        pointer-events: none;
    `;
    
    heroSection.appendChild(ambientLight);
    
    // Create floating logo reflections
    setInterval(() => {
        if (Math.random() < 0.2) {
            createLogoReflection();
        }
    }, 3000);
}

// Create floating logo reflections
function createLogoReflection() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const reflection = document.createElement('div');
    reflection.className = 'logo-reflection';
    reflection.style.cssText = `
        position: absolute;
        top: ${Math.random() * 80 + 10}%;
        left: ${Math.random() * 80 + 10}%;
        width: 100px;
        height: 30px;
        background: linear-gradient(45deg, transparent, rgba(8, 145, 178, 0.1), transparent);
        border-radius: 5px;
        animation: floatingReflection 8s ease-out forwards;
        pointer-events: none;
        z-index: 0;
    `;
    
    heroSection.appendChild(reflection);
    
    setTimeout(() => {
        if (reflection.parentNode) {
            reflection.parentNode.removeChild(reflection);
        }
    }, 8000);
}

// Add CSS for additional animations
const additionalStyles = `
    .nav-link.active {
        color: var(--primary-color) !important;
        text-shadow: var(--neon-glow);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 6px 20px rgba(0, 212, 255, 0.5);
    }
    
    @keyframes explode {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1); opacity: 0; }
    }
    
    @keyframes rippleOut {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
    
    @keyframes matrixFall {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes floatUp {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-100vh); opacity: 0; }
    }
    
    @keyframes uiPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    
    @keyframes trailFade {
        0% { opacity: 0.8; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    
    @keyframes ambientPulse {
        0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
        50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
    }
    
    @keyframes floatingReflection {
        0% { opacity: 0; transform: translateY(20px) scale(0.8); }
        20% { opacity: 1; transform: translateY(0) scale(1); }
        80% { opacity: 1; transform: translateY(-10px) scale(1); }
        100% { opacity: 0; transform: translateY(-30px) scale(0.8); }
    }
    
    .logo-hologram {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .neural-node {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .neural-node:hover {
        transform: scale(1.1);
        box-shadow: 0 0 25px rgba(8, 145, 178, 0.8);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Console welcome message
console.log(`
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    █                                                                        █
    █                    DevResult IT Solutions                              █
    █                                                                        █
    █                 Transformando dados em resultados                     █
    █                                                                        █
    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    
    🚀 Site desenvolvido com tecnologias modernas
    💫 Animações futurísticas ativadas
    🎯 Otimizado para performance
    
    Interessado em nossos serviços? Entre em contato!
    📧 contato@devresult.com.br
`);