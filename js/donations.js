// Donations page functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const donationModal = document.getElementById('donation-modal');
    const successModal = document.getElementById('success-modal');
    const closeDonationModal = document.getElementById('close-donation-modal');
    const closeSuccessModal = document.getElementById('close-success-modal');
    const donationForm = document.getElementById('donation-form');
    const customAmountInput = document.getElementById('custom-amount');
    const customDonateBtn = document.getElementById('custom-donate-btn');
    const donateButtons = document.querySelectorAll('.donate-btn');
    
    // Modal elements
    const modalAmount = document.getElementById('modal-amount');
    const modalFee = document.getElementById('modal-fee');
    const modalTotal = document.getElementById('modal-total');
    const donationId = document.getElementById('donation-id');
    
    // Form elements
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const billingZip = document.getElementById('billing-zip');
    
    let currentDonationAmount = 0;
    const processingFeeRate = 0.029; // 2.9% processing fee
    const processingFeeFixed = 0.30; // $0.30 fixed fee
    
    // Initialize the page
    function init() {
        setupEventListeners();
        setupFormValidation();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Donation tier buttons
        donateButtons.forEach(button => {
            button.addEventListener('click', function() {
                const amount = parseInt(this.getAttribute('data-amount'));
                openDonationModal(amount);
            });
        });
        
        // Custom donation button
        customDonateBtn.addEventListener('click', function() {
            const amount = parseInt(customAmountInput.value);
            if (amount && amount > 0) {
                openDonationModal(amount);
            } else {
                showError('Please enter a valid amount.');
            }
        });
        
        // Modal close buttons
        closeDonationModal.addEventListener('click', closeDonationModalHandler);
        closeSuccessModal.addEventListener('click', closeSuccessModalHandler);
        
        // Close modals when clicking outside
        donationModal.addEventListener('click', function(e) {
            if (e.target === donationModal) {
                closeDonationModalHandler();
            }
        });
        
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModalHandler();
            }
        });
        
        // Form submission
        donationForm.addEventListener('submit', handleDonationSubmission);
        
        // Real-time amount updates for custom donation
        customAmountInput.addEventListener('input', function() {
            const amount = parseInt(this.value);
            if (amount && amount > 0) {
                customDonateBtn.textContent = `Donate $${amount}`;
            } else {
                customDonateBtn.textContent = 'Make Donation';
            }
        });
        
        // Card number formatting
        cardNumber.addEventListener('input', formatCardNumber);
        
        // Expiry date formatting
        expiryDate.addEventListener('input', formatExpiryDate);
        
        // CVV validation
        cvv.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 4);
        });
        
        // ZIP code validation
        billingZip.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 5);
        });
    }
    
    // Setup form validation
    function setupFormValidation() {
        const requiredFields = donationForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    clearFieldError(this);
                }
            });
        });
    }
    
    // Open donation modal
    function openDonationModal(amount) {
        currentDonationAmount = amount;
        updateModalSummary(amount);
        donationModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on first form field
        setTimeout(() => {
            document.getElementById('donor-name').focus();
        }, 100);
    }
    
    // Close donation modal
    function closeDonationModalHandler() {
        donationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetForm();
    }
    
    // Close success modal
    function closeSuccessModalHandler() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Update modal summary
    function updateModalSummary(amount) {
        const fee = (amount * processingFeeRate) + processingFeeFixed;
        const total = amount + fee;
        
        modalAmount.textContent = `$${amount.toFixed(2)}`;
        modalFee.textContent = `$${fee.toFixed(2)}`;
        modalTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Handle donation form submission
    function handleDonationSubmission(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        const submitBtn = donationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            // Generate donation ID
            const id = generateDonationId();
            donationId.textContent = id;
            
            // Close donation modal and show success
            closeDonationModalHandler();
            successModal.style.display = 'flex';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log donation details (in real implementation, this would be sent to server)
            logDonation({
                id: id,
                amount: currentDonationAmount,
                donor: {
                    name: document.getElementById('donor-name').value,
                    email: document.getElementById('donor-email').value,
                    phone: document.getElementById('donor-phone').value,
                    message: document.getElementById('donor-message').value,
                    anonymous: document.getElementById('anonymous-donation').checked,
                    newsletter: document.getElementById('newsletter-signup').checked
                },
                timestamp: new Date().toISOString()
            });
            
        }, 2000);
    }
    
    // Validate form
    function validateForm() {
        const requiredFields = donationForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate card number
        if (!validateCardNumber(cardNumber.value)) {
            showFieldError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        }
        
        // Validate expiry date
        if (!validateExpiryDate(expiryDate.value)) {
            showFieldError(expiryDate, 'Please enter a valid expiry date');
            isValid = false;
        }
        
        // Validate CVV
        if (!validateCVV(cvv.value)) {
            showFieldError(cvv, 'Please enter a valid CVV');
            isValid = false;
        }
        
        // Validate ZIP code
        if (!validateZIP(billingZip.value)) {
            showFieldError(billingZip, 'Please enter a valid ZIP code');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        if (field.type === 'tel' && value && !isValidPhone(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
        
        clearFieldError(field);
        return true;
    }
    
    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    // Clear field error
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Validation helpers
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }
    
    function validateCardNumber(number) {
        // Remove spaces and check if it's a valid card number (basic Luhn algorithm)
        const cleanNumber = number.replace(/\s/g, '');
        if (cleanNumber.length < 13 || cleanNumber.length > 19) {
            return false;
        }
        
        // Simple validation - in real implementation, use proper card validation
        return /^\d+$/.test(cleanNumber);
    }
    
    function validateExpiryDate(date) {
        const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!regex.test(date)) {
            return false;
        }
        
        const [month, year] = date.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        const expYear = parseInt(year);
        const expMonth = parseInt(month);
        
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            return false;
        }
        
        return true;
    }
    
    function validateCVV(cvv) {
        return cvv.length >= 3 && cvv.length <= 4 && /^\d+$/.test(cvv);
    }
    
    function validateZIP(zip) {
        return zip.length === 5 && /^\d+$/.test(zip);
    }
    
    // Format card number with spaces
    function formatCardNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value.slice(0, 19); // Max 19 characters including spaces
    }
    
    // Format expiry date
    function formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value.slice(0, 5);
    }
    
    // Generate donation ID
    function generateDonationId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `DON-${timestamp}-${random}`.toUpperCase();
    }
    
    // Log donation (in real implementation, this would send data to server)
    function logDonation(donationData) {
        console.log('Donation processed:', donationData);
        
        // In a real implementation, you would:
        // 1. Send donation data to your server
        // 2. Process payment through a payment gateway (Stripe, PayPal, etc.)
        // 3. Send confirmation email to donor
        // 4. Update donor database
        // 5. Send notification to club administrators
    }
    
    // Reset form
    function resetForm() {
        donationForm.reset();
        currentDonationAmount = 0;
        
        // Clear any error states
        const errorFields = donationForm.querySelectorAll('.error');
        errorFields.forEach(field => {
            clearFieldError(field);
        });
        
        // Reset custom amount button
        customDonateBtn.textContent = 'Make Donation';
    }
    
    // Show error message
    function showError(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-toast';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }
    
    // Initialize the page
    init();
});

