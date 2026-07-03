// Donations page functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const donationPopup = document.getElementById('donation-popup');
    const donateBtn = document.getElementById('donate-btn');
    const closePopupBtn = document.getElementById('close-donation-popup');
    const cancelBtn = document.getElementById('cancel-donation');
    const proceedBtn = document.getElementById('proceed-donation');
    
    // Texas A&M Foundation donation URL
    const donationUrl = 'https://www.txamfoundation.com/give.aspx?c_id=-2&acct=Sailing%20Team%20(959400-99999)';
    
    // Initialize the page
    function init() {
        setupEventListeners();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Donate button
        donateBtn.addEventListener('click', openDonationPopup);
        
        // Close popup buttons
        closePopupBtn.addEventListener('click', closeDonationPopup);
        cancelBtn.addEventListener('click', closeDonationPopup);
        
        // Proceed to donation
        proceedBtn.addEventListener('click', proceedToDonation);
        
        // Close popup when clicking outside
        donationPopup.addEventListener('click', function(e) {
            if (e.target === donationPopup) {
                closeDonationPopup();
            }
        });
        
        // Close popup on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && donationPopup.style.display === 'flex') {
                closeDonationPopup();
            }
        });
    }
    
    // Open donation popup
    function openDonationPopup() {
        donationPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on proceed button for accessibility
        setTimeout(() => {
            proceedBtn.focus();
        }, 100);
    }
    
    // Close donation popup
    function closeDonationPopup() {
        donationPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Proceed to Texas A&M Foundation donation page
    function proceedToDonation() {
        // Open in new tab
        window.open(donationUrl, '_blank');
        
        // Close popup
        closeDonationPopup();
        
        // Show a brief confirmation message
        showConfirmationMessage();
    }
    
    // Show confirmation message
    function showConfirmationMessage() {
        const message = document.createElement('div');
        message.className = 'confirmation-message';
        message.innerHTML = `
            <div class="confirmation-content">
                <i class="fas fa-external-link-alt"></i>
                <span>Redirecting to Texas A&M Foundation...</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }
    
    // Initialize the page
    init();
});

// Add CSS for donation popup
const style = document.createElement('style');
style.textContent = `
    .donation-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
        max-width: 1000px;
        margin: 0 auto;
        padding: 2rem 0;
    }

    .donation-info h3 {
        color: var(--primary-maroon);
        margin-bottom: 1rem;
        font-size: 1.8rem;
    }

    .donation-info p {
        color: var(--gray);
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .donation-benefits {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .benefit-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: var(--light-gray);
        border-radius: 8px;
        transition: var(--transition);
    }

    .benefit-item:hover {
        background: var(--primary-maroon);
        color: var(--white);
    }

    .benefit-item i {
        font-size: 1.2rem;
        color: var(--primary-maroon);
        transition: var(--transition);
    }

    .benefit-item:hover i {
        color: var(--white);
    }

    .donation-action {
        text-align: center;
        padding: 2rem;
        background: var(--light-gray);
        border-radius: 12px;
    }

    .donation-action .btn-large {
        font-size: 1.2rem;
        padding: 1rem 2rem;
        margin-bottom: 1rem;
    }

    .donation-note {
        color: var(--gray);
        font-size: 0.9rem;
        margin: 0;
    }

    .donation-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .donation-popup-content {
        background: var(--white);
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid var(--light-gray);
        background: var(--primary-maroon);
        color: var(--white);
    }

    .popup-header h3 {
        margin: 0;
        color: var(--white);
    }

    .popup-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--white);
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
    }

    .popup-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .popup-body {
        padding: 2rem;
        text-align: center;
    }

    .popup-icon {
        font-size: 3rem;
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .popup-body h4 {
        color: var(--primary-maroon);
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }

    .popup-body p {
        color: var(--gray);
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .popup-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .popup-actions .btn {
        min-width: 140px;
    }

    .confirmation-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-maroon);
        color: var(--white);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        animation: slideIn 0.3s ease-out;
    }

    .confirmation-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .confirmation-content i {
        font-size: 1.1rem;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        .donation-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .donation-benefits {
            grid-template-columns: 1fr;
        }

        .popup-actions {
            flex-direction: column;
        }

        .popup-actions .btn {
            width: 100%;
        }

        .confirmation-message {
            top: 10px;
            right: 10px;
            left: 10px;
        }
    }
`;
document.head.appendChild(style);


