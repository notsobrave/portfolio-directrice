/**
 * PORTFOLIO DIRECTRICE D'ÉTABLISSEMENT
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initSmoothScroll();
    initMobileMenu();
    initFormEffects();
    initParallax();
});

/**
 * Loader
 */
function initLoader() {
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1800);
    });
    
    // Fallback in case load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1800);
    }
}

/**
 * Navbar
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    elements.forEach(el => observer.observe(el));
}

/**
 * Animated Counters
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    return num.toLocaleString('fr-FR');
}

/**
 * Skill Bars Animation
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width + '%';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;
    
    // Inject mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 900px) {
            .nav-links {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 2.5rem;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.mobile-open {
                display: flex;
                opacity: 1;
                visibility: visible;
            }
            
            .nav-links a {
                font-size: 1.5rem;
                font-family: var(--font-heading);
            }
            
            .menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(4px, 4px);
            }
            
            .menu-toggle.active span:nth-child(2) {
                transform: rotate(-45deg) translate(0px, 0px);
            }
        }
    `;
    document.head.appendChild(mobileStyles);
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        });
    });
}

/**
 * Form Effects
 */
function initFormEffects() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;
        
        btn.innerHTML = '<span>Message envoyé ✓</span>';
        btn.style.background = 'var(--color-accent)';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });
}

/**
 * Parallax Effects
 */
function initParallax() {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.02 + (index * 0.01);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Mouse parallax for hero
    const hero = document.querySelector('.hero');
    const visualFrame = document.querySelector('.visual-frame');
    
    if (hero && visualFrame) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height, left, top } = hero.getBoundingClientRect();
            
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            
            visualFrame.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            visualFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    }
}

/**
 * Magnetic Effect on Buttons
 */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

/**
 * Text Reveal Animation
 */
function revealText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${i * 0.03}s`;
        span.classList.add('char-reveal');
        element.appendChild(span);
    });
}

// Add char reveal animation
const charRevealStyles = document.createElement('style');
charRevealStyles.textContent = `
    .char-reveal {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        animation: charReveal 0.5s ease forwards;
    }
    
    @keyframes charReveal {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(charRevealStyles);

// Console signature
console.log('%c✦ Marie Lefèvre', 'font-size: 20px; font-family: Georgia; color: #1a365d; font-weight: bold;');
console.log('%cDirectrice d\'Établissement', 'font-size: 12px; color: #c9a227;');
