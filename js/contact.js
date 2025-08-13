// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(newsletterForm);
            const name = formData.get('newsletter-name');
            const email = formData.get('newsletter-email');
            const interest = formData.get('newsletter-interest');
            const consent = formData.get('newsletter-consent');
            
            // Basic validation
            if (!name || !email || !consent) {
                showNotification('Please fill in all required fields and agree to receive updates.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Submitting newsletter signup...', 'info');
            
            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter! You\'ll receive updates about events, sailing tips, and club news.', 'success');
                newsletterForm.reset();
            }, 1500);
        });
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('contact-name');
            const email = formData.get('contact-email');
            const subject = formData.get('contact-subject');
            const message = formData.get('contact-message');
            const consent = formData.get('contact-consent');
            
            // Basic validation
            if (!name || !email || !subject || !message || !consent) {
                showNotification('Please fill in all required fields and agree to the data processing.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (message.length < 10) {
                showNotification('Please provide a more detailed message (at least 10 characters).', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Sending your message...', 'info');
            
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you as soon as possible.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: var(--font-body);
        `;
        
        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        notification.style.color = 'white';
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        return icons[type] || icons.info;
    }
    
    // Form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (field.value) {
            field.parentElement.classList.add('focused');
        }
    });
    
    // Social media card hover effects
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact card animations
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Method card animations
    const methodCards = document.querySelectorAll('.method');
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states to buttons
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity()) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                this.disabled = true;
                
                // Reset button after form submission simulation
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Newsletter features animation
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.6s ease';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Contact methods animation
    const methods = document.querySelectorAll('.method');
    methods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            method.style.transition = 'all 0.6s ease';
            method.style.opacity = '1';
            method.style.transform = 'translateX(0)';
        }, 300 * index);
    });
    
    // Social cards animation
    const socialCardsAnimated = document.querySelectorAll('.social-card');
    socialCardsAnimated.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 * index);
    });
    
    // Mobile form optimization
    function optimizeFormsForMobile() {
        const isMobile = window.innerWidth <= 768;
        const mcEmbedSignup = document.getElementById('mc_embed_signup');
        
        if (mcEmbedSignup && isMobile) {
            // Add mobile class for simplified styling
            mcEmbedSignup.classList.add('mobile-simplified');
            
            // Create a simplified mobile version
            const mobileForm = createMobileNewsletterForm();
            const originalForm = mcEmbedSignup.cloneNode(true);
            
            // Replace with simplified version on mobile
            mcEmbedSignup.innerHTML = mobileForm;
            
            // Add toggle for full form
            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'Show Full Form';
            toggleButton.className = 'mobile-form-toggle';
            toggleButton.style.cssText = `
                background: var(--primary-maroon);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                font-size: 0.9rem;
                margin-top: 1rem;
                cursor: pointer;
            `;
            
            toggleButton.addEventListener('click', function() {
                if (mcEmbedSignup.innerHTML === mobileForm) {
                    mcEmbedSignup.innerHTML = originalForm.innerHTML;
                    toggleButton.textContent = 'Show Simple Form';
                } else {
                    mcEmbedSignup.innerHTML = mobileForm;
                    toggleButton.textContent = 'Show Full Form';
                }
                mcEmbedSignup.appendChild(toggleButton);
            });
            
            mcEmbedSignup.appendChild(toggleButton);
        }
    }
    
    function createMobileNewsletterForm() {
        return `
            <h2 style="color: maroon; text-align: center; margin-bottom: 1.5rem;">Subscribe to our newsletter</h2>
            <div class="indicates-required" style="text-align: center; font-size: 0.85rem; color: #666; margin-bottom: 1.5rem;">
                <span class="asterisk">*</span> indicates required
            </div>
            <div class="mc-field-group">
                <label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label>
                <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="" 
                       style="width: 100%; padding: 14px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px;">
            </div>
            <div class="mc-field-group">
                <label for="mce-FNAME">First Name</label>
                <input type="text" name="FNAME" class="text" id="mce-FNAME" value="" 
                       style="width: 100%; padding: 14px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px;">
            </div>
            <div class="mc-field-group">
                <label for="mce-LNAME">Last Name</label>
                <input type="text" name="LNAME" class="text" id="mce-LNAME" value="" 
                       style="width: 100%; padding: 14px 16px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 16px;">
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;">
                <input type="text" name="b_d377509d322333972642be1f9_0ad635d083" tabindex="-1" value="">
            </div>
            <div class="optionalParent">
                <div class="clear foot">
                    <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"
                           style="background: #500000; color: white; border: none; padding: 16px 28px; border-radius: 8px; font-size: 1.1rem; width: 100%; margin-top: 1rem; cursor: pointer;">
                </div>
            </div>
        `;
    }
    
    // Initialize mobile optimization
    optimizeFormsForMobile();
    
    // Re-optimize on window resize
    window.addEventListener('resize', function() {
        setTimeout(optimizeFormsForMobile, 100);
    });
    
    // Enhanced form validation and UX
    const emailInput = document.getElementById('mce-EMAIL');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else {
                this.style.borderColor = '#e2e8f0';
                this.style.boxShadow = 'none';
            }
        });
        
        emailInput.addEventListener('focus', function() {
            this.style.borderColor = '#500000';
            this.style.boxShadow = '0 0 0 3px rgba(80, 0, 0, 0.1)';
        });
    }
    
    // Form submission feedback
    const form = document.getElementById('mc-embedded-subscribe-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const submitButton = document.getElementById('mc-embedded-subscribe');
            if (submitButton) {
                submitButton.value = 'Subscribing...';
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
            }
        });
    }
    
    console.log('Contact page JavaScript loaded successfully!');
});
