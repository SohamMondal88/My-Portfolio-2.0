// ============================================
// ENHANCED PORTFOLIO JAVASCRIPT
// Smooth animations, interactions, and effects
// ============================================

// ===== GLOBAL VARIABLES =====
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;
let isScrolling = false;

// ===== DOM ELEMENTS =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const loadingScreen = document.getElementById('loadingScreen');
const heroCard = document.getElementById('heroCard');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 1500);

    // Initialize all features
    initCustomCursor();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initHero3DCard();
    initCounters();
    initSkillProgress();
    handleResponsiveChanges();
    initSmoothScrolling();
});

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    if (!cursor || !cursorFollower || window.innerWidth <= 1024) {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Main cursor
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;
        cursorX += distX * 0.2;
        cursorY += distY * 0.2;
        
        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }

        // Follower cursor
        const followerDistX = mouseX - followerX;
        const followerDistY = mouseY - followerY;
        followerX += followerDistX * 0.1;
        followerY += followerDistY * 0.1;
        
        if (cursorFollower) {
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
        }

        requestAnimationFrame(animateCursor);
    }
    
    if (cursor && cursorFollower) {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
        animateCursor();
    }

    // Cursor interactions
    const hoverElements = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .contact-card, .nav-link, .tech-pill');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = '#8b5cf6';
            }
            if (cursorFollower) {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.background = '#8b5cf6';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#14b8a6';
            }
            if (cursorFollower) {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.background = '#14b8a6';
            }
        });
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(() => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, 10));

    // Mobile menu functionality
    if (navToggle && mobileMenu && mobileMenuClose) {
        // Toggle mobile menu
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close mobile menu
        mobileMenuClose.addEventListener('click', () => {
            closeMobileMenu();
        });

        // Close mobile menu on link click
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    closeMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

// ===== MOBILE MENU FUNCTIONS =====
function toggleMobileMenu() {
    if (!navToggle || !mobileMenu) return;
    
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        // Animate in menu links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.05}s`;
            link.classList.add('animate-in');
        });
    } else {
        document.body.style.overflow = 'auto';
        // Reset animation
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.classList.remove('animate-in');
        });
    }
}

function closeMobileMenu() {
    if (!navToggle || !mobileMenu) return;
    
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset animation
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.classList.remove('animate-in');
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                // Calculate target position
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Scroll to top button
    if (scrollToTopBtn) {
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, 10));

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add specific animations based on class
                if (entry.target.classList.contains('achievement-content')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .achievement-content, .skill-card, .project-card, .stat-card, .contact-card');
    animateElements.forEach(el => {
        // Set initial state
        if (el.classList.contains('achievement-content')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });

    // Parallax effect on scroll (disabled on mobile for performance)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax background orbs
            const orbs = document.querySelectorAll('.gradient-orb');
            orbs.forEach((orb, index) => {
                const speed = 0.05 + (index * 0.02);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Parallax floating shapes
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.03 + (index * 0.015);
                const rotate = scrolled * 0.05;
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${rotate}deg)`;
            });
        }, 16)); // ~60fps
    }
}

// ===== SCROLL TO TOP FUNCTION =====
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// ===== ANIMATIONS =====
function initAnimations() {
    // Stagger animation for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Magnetic button effect (only on desktop)
    if (window.innerWidth > 1024) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.skill-card, .project-card, .contact-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// ===== HERO 3D CARD =====
function initHero3DCard() {
    if (!heroCard) return;

    // Only enable 3D effect on desktop
    if (window.innerWidth > 768) {
        heroCard.addEventListener('mousemove', handle3DCard);
        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) translateZ(0)';
        });
    }

    // Add touch effect for mobile
    if (window.innerWidth <= 768) {
        let touchStartX = 0;
        let touchStartY = 0;

        heroCard.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            heroCard.style.transition = 'transform 0.3s ease';
            heroCard.style.transform = 'scale(0.98)';
        });

        heroCard.addEventListener('touchend', () => {
            heroCard.style.transform = 'scale(1)';
        });

        heroCard.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
    }
}

function handle3DCard(e) {
    if (window.innerWidth > 768 && heroCard) {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20; // Reduced sensitivity
        const rotateY = (centerX - x) / 20; // Reduced sensitivity
        
        heroCard.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
        heroCard.style.transition = 'transform 0.1s linear';
    }
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const hasPercent = counter.textContent.includes('%');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = hasPercent ? 
                            `${Math.ceil(current)}%` : 
                            Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = hasPercent ? 
                            `${target}%` : 
                            target.toLocaleString();
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        // Set initial value to 0
        if (counter.textContent.includes('%')) {
            counter.textContent = '0%';
        } else {
            counter.textContent = '0';
        }
        observer.observe(counter);
    });
}

// ===== SKILL PROGRESS BARS =====
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = parseInt(progressBar.getAttribute('data-progress') || '0');
                
                // Animate the progress bar
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    progressBar.style.width = `${progress}%`;
                }, 300);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => observer.observe(bar));
}

// ===== RESPONSIVE HANDLER =====
function handleResponsiveChanges() {
    const width = window.innerWidth;
    
    // Handle 3D card effects
    if (heroCard) {
        if (width <= 768) {
            heroCard.style.transform = '';
            heroCard.removeEventListener('mousemove', handle3DCard);
            heroCard.removeEventListener('mouseleave', () => {});
        } else {
            // Remove existing listeners to avoid duplicates
            heroCard.removeEventListener('mousemove', handle3DCard);
            heroCard.removeEventListener('mouseleave', () => {});
            
            // Add new listeners
            heroCard.addEventListener('mousemove', handle3DCard);
            heroCard.addEventListener('mouseleave', () => {
                heroCard.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) translateZ(0)';
            });
        }
    }
    
    // Auto-close mobile menu on desktop resize
    if (width > 1024) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    // Handle animations based on device
    if (width <= 768) {
        // Disable some animations on mobile for better performance
        document.querySelectorAll('.gradient-orb, .shape').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
        
        // Add touch device class
        document.body.classList.add('touch-device');
    } else {
        // Re-enable animations on desktop
        document.querySelectorAll('.gradient-orb, .shape').forEach(el => {
            el.style.animationPlayState = 'running';
        });
        
        // Remove touch device class
        document.body.classList.remove('touch-device');
    }
    
    // Re-initialize cursor on resize
    initCustomCursor();
}

// ===== TOUCH DEVICE DETECTION =====
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// Initialize touch device handling
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback for interactive elements
    const hoverElements = document.querySelectorAll('.skill-card, .project-card, .contact-card, .btn');
    hoverElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        el.addEventListener('touchend', function() {
            const self = this;
            setTimeout(() => {
                self.classList.remove('touch-active');
            }, 300);
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle function for scroll/resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for resize events
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Call responsive handler on resize with debounce
window.addEventListener('resize', debounce(handleResponsiveChanges, 250));

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not active
        document.querySelectorAll('.gradient-orb, .shape').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is active
        document.querySelectorAll('.gradient-orb, .shape').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // TAB key navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('tab-navigation');
    }
    
    // Remove tab navigation class when mouse is used
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('tab-navigation');
    }, { once: true });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.message);
    // You could add error reporting here
});

// ===== CONSOLE SIGNATURE =====
console.log(
    '%c👋 Hello, Developer! ',
    'background: linear-gradient(135deg, #14b8a6, #8b5cf6); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
);
console.log(
    '%c🔧 Portfolio built with modern JavaScript',
    'color: #14b8a6; font-size: 14px; font-weight: 500;'
);
console.log(
    '%c📧 Feel free to reach out: 02062006sm@gmail.com',
    'color: #8b5cf6; font-size: 14px; font-weight: 500;'
);

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
// Make functions available globally if needed
window.Portfolio = {
    scrollToTop: window.scrollToTop,
    toggleMobileMenu,
    closeMobileMenu,
    handleResponsiveChanges,
    initCounters,
    initSkillProgress
};

// ===== INITIAL SETUP COMPLETE =====
console.log('Portfolio script initialized successfully!');
