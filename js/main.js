// Main JavaScript for Aggie Sailing Club Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Hero video handling with GIF
    const heroVideo = document.getElementById('hero-video');
    const heroFallback = document.querySelector('.hero-fallback-image');
    
    // Load GIF video
    if (heroVideo) {
        console.log('Loading GIF video');
        
        // Create and insert the GIF
        heroVideo.innerHTML = `
            <img 
                src="assets/videos/newgif.gif"
                alt="Sailing video"
                style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;"
                onload="console.log('GIF loaded successfully')"
                onerror="console.warn('Failed to load GIF, showing fallback'); if(heroFallback) heroFallback.style.opacity = '1';"
            >
        `;
        
        // Hide fallback image since GIF is loaded
        if (heroFallback) {
            heroFallback.style.opacity = '0';
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced image loading with lazy loading support
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading placeholder
        if (img.loading === 'lazy') {
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
            `;
            
            if (img.parentElement) {
                img.parentElement.style.position = 'relative';
                img.parentElement.insertBefore(placeholder, img);
            }
            
            // Remove placeholder when image loads
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                if (placeholder.parentElement) {
                    placeholder.remove();
                }
            });
            
            // Handle image load errors
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                this.style.display = 'none';
                if (placeholder.parentElement) {
                    placeholder.remove();
                }
            });
        } else {
            // For non-lazy images
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        }
    });

    // Enhanced Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add staggered animation for grid items
                if (entry.target.parentElement && entry.target.parentElement.classList.contains('grid')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                    entry.target.style.animationDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation with enhanced selectors
    const animateElements = document.querySelectorAll(`
        .event-card, .article-card, .gallery-item, .welcome-content,
        .benefit-card, .tier-card, .team-member, .value-card,
        .timeline-item, .mission-stats .stat, .faq-item
    `);
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Add staggered animation for grid layouts
    const gridContainers = document.querySelectorAll('.events-grid, .articles-grid, .benefits-grid, .team-grid, .values-grid');
    gridContainers.forEach(container => {
        container.classList.add('grid');
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Gallery lightbox functionality (basic)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${img.src}" alt="${img.alt}">
                        <button class="lightbox-close">&times;</button>
                    </div>
                `;
                
                // Add lightbox styles
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                const lightboxContent = lightbox.querySelector('.lightbox-content');
                lightboxContent.style.cssText = `
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                `;
                
                const lightboxImg = lightbox.querySelector('img');
                lightboxImg.style.cssText = `
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                `;
                
                const closeBtn = lightbox.querySelector('.lightbox-close');
                closeBtn.style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                `;
                
                document.body.appendChild(lightbox);
                
                // Animate in
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
                
                // Close functionality
                const closeLightbox = () => {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                };
                
                closeBtn.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
                
                // Close on escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeLightbox();
                    }
                });
            }
        });
    });

    // Form validation (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Enhanced parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            const heroContent = hero.querySelector('.hero-content');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${rate}px) translateZ(0)`;
            }
        }, 16)); // 60fps
    }

    // Mouse parallax effect for hero
    if (hero) {
        hero.addEventListener('mousemove', throttle(function(e) {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const x = (clientX - innerWidth / 2) * 0.01;
            const y = (clientY - innerHeight / 2) * 0.01;
            
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateX(${x}px) translateY(${y}px)`;
            }
        }, 16));
    }

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
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

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Smooth reveal animations for sections
    const revealSections = document.querySelectorAll('.welcome, .featured-events, .latest-articles, .gallery-preview');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15
    });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });

    // Add revealed class when section comes into view
    document.addEventListener('scroll', function() {
        revealSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Number counting animation for stats
    function animateNumber(element, target, duration = 1500) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on the target
            let displayValue;
            if (target.toString().includes('+')) {
                displayValue = Math.floor(current) + '+';
            } else {
                displayValue = Math.floor(current);
            }
            
            element.textContent = displayValue;
        }, 16);
    }

    // Initialize number counting animation when stats come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const originalText = element.getAttribute('data-original') || element.textContent;
                
                // Store original text if not already stored
                if (!element.getAttribute('data-original')) {
                    element.setAttribute('data-original', originalText);
                }
                
                // Extract the numeric value
                let target;
                if (originalText.includes('+')) {
                    target = parseInt(originalText.replace('+', ''));
                } else {
                    target = parseInt(originalText);
                }
                
                // Only animate if we haven't already
                if (!element.classList.contains('counted')) {
                    element.classList.add('counted');
                    element.textContent = '0';
                    animateNumber(element, target, 1200); // Quick 1.2 second animation
                }
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation 100px before element comes into view
    });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Initialize tooltips (if any)
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            tooltipElement.style.cssText = `
                position: absolute;
                background: var(--primary-maroon);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            tooltipElement.style.left = rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';
            tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 8 + 'px';
            
            this.addEventListener('mouseleave', function() {
                if (tooltipElement.parentNode) {
                    tooltipElement.parentNode.removeChild(tooltipElement);
                }
            });
        });
    });
});

// Utility functions
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

// Throttle function for scroll events
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

// Export functions for potential use in other scripts
window.AggieSailing = {
    debounce,
    throttle
};

// Add CSS for newsletter and support section
const newsletterSupportStyle = document.createElement('style');
newsletterSupportStyle.textContent = `
    .newsletter-support-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .newsletter-card,
    .support-card,
    .forms-card {
        background: var(--white);
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: var(--transition);
    }

    .newsletter-card:hover,
    .support-card:hover,
    .forms-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .newsletter-icon,
    .support-icon,
    .forms-icon {
        font-size: 3rem;
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .newsletter-card h3,
    .support-card h3,
    .forms-card h3 {
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .newsletter-card p,
    .support-card p,
    .forms-card p {
        color: var(--gray);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .newsletter-card .btn,
    .support-card .btn,
    .forms-card .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 12px 24px;
        font-weight: 500;
        text-decoration: none;
        border-radius: 8px;
        transition: var(--transition);
    }

    .newsletter-card .btn i,
    .support-card .btn i,
    .forms-card .btn i {
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        .newsletter-support-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .newsletter-card,
        .support-card,
        .forms-card {
            padding: 1.5rem;
        }
    }
`;
document.head.appendChild(newsletterSupportStyle);

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
