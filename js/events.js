// Events page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Event category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    const eventCards = document.querySelectorAll('.event-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all category cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            // Filter events
            eventCards.forEach(eventCard => {
                if (selectedCategory === 'all' || eventCard.getAttribute('data-category') === selectedCategory) {
                    eventCard.style.display = 'block';
                    eventCard.style.opacity = '0';
                    eventCard.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        eventCard.style.opacity = '1';
                        eventCard.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    eventCard.style.display = 'none';
                }
            });
        });
    });

    // Calendar functionality
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');

    // Event data (in a real application, this would come from a database)
    const events = [
        { date: '2024-12-15', title: 'Winter Series Race', category: 'racing' },
        { date: '2024-12-22', title: 'Holiday Social', category: 'social' },
        { date: '2025-01-05', title: 'Beginner Training', category: 'training' },
        { date: '2025-01-12', title: 'Advanced Racing Techniques', category: 'training' },
        { date: '2025-01-25', title: 'Monthly Club Meeting', category: 'social' },
        { date: '2025-03-20', title: 'Spring Regatta', category: 'regatta' }
    ];

    function renderCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // Clear existing calendar days
        const existingDays = calendarGrid.querySelectorAll('.calendar-day:not(.calendar-day-header)');
        existingDays.forEach(day => day.remove());

        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

        // Generate calendar days
        const endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dayNumber = currentDate.getDate();
            dayElement.textContent = dayNumber;

            // Check if this day has events
            const dateString = currentDate.toISOString().split('T')[0];
            const dayEvents = events.filter(event => event.date === dateString);

            if (dayEvents.length > 0) {
                dayElement.classList.add('has-events');
                dayElement.setAttribute('data-events', JSON.stringify(dayEvents));
                
                // Add event indicator
                const eventIndicator = document.createElement('div');
                eventIndicator.className = 'event-indicator';
                eventIndicator.textContent = dayEvents.length;
                dayElement.appendChild(eventIndicator);
            }

            // Highlight current day
            if (currentDate.toDateString() === new Date().toDateString()) {
                dayElement.classList.add('current-day');
            }

            // Highlight days from current month
            if (currentDate.getMonth() === currentMonth) {
                dayElement.classList.add('current-month');
            } else {
                dayElement.classList.add('other-month');
            }

            calendarGrid.appendChild(dayElement);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Add click event to calendar days
        const calendarDays = document.querySelectorAll('.calendar-day:not(.calendar-day-header)');
        calendarDays.forEach(day => {
            day.addEventListener('click', function() {
                if (this.classList.contains('has-events')) {
                    const events = JSON.parse(this.getAttribute('data-events'));
                    showEventModal(events);
                }
            });
        });
    }

    // Event modal functionality
    function showEventModal(events) {
        const modal = document.createElement('div');
        modal.className = 'event-modal';
        modal.innerHTML = `
            <div class="event-modal-content">
                <div class="event-modal-header">
                    <h3>Events on ${new Date(events[0].date).toLocaleDateString()}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="event-modal-body">
                    ${events.map(event => `
                        <div class="modal-event">
                            <h4>${event.title}</h4>
                            <p class="event-category">${event.category}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Calendar navigation
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Initialize calendar
    renderCalendar();

    // Registration form functionality
    const registrationForm = document.getElementById('quick-registration');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const eventSelect = formData.get('eventSelect');
            const name = formData.get('regName');
            const email = formData.get('regEmail');
            const phone = formData.get('regPhone');
            const experience = formData.get('regExperience');

            // Validate form
            if (!eventSelect || !name || !email) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate registration submission
            const registrationData = {
                event: eventSelect,
                name: name,
                email: email,
                phone: phone,
                experience: experience,
                timestamp: new Date().toISOString()
            };

            // Show success message
            showRegistrationSuccess(registrationData);
            
            // Reset form
            this.reset();
        });
    }

    function showRegistrationSuccess(data) {
        const successModal = document.createElement('div');
        successModal.className = 'success-modal';
        successModal.innerHTML = `
            <div class="success-modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Registration Successful!</h3>
                <p>Thank you for registering for ${data.event}. You will receive a confirmation email shortly with event details.</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;

        document.body.appendChild(successModal);
    }

    // FAQ functionality
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
});

// Add CSS for calendar and modals
const style = document.createElement('style');
style.textContent = `
    .calendar-wrapper {
        background: var(--white);
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        margin: 0 auto;
    }

    .calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .calendar-nav {
        background: var(--primary-maroon);
        color: var(--white);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: var(--transition);
    }

    .calendar-nav:hover {
        background: var(--secondary-maroon);
    }

    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        background: var(--light-gray);
        border-radius: 8px;
        overflow: hidden;
    }

    .calendar-day-header {
        background: var(--primary-maroon);
        color: var(--white);
        padding: 1rem;
        text-align: center;
        font-weight: 600;
    }

    .calendar-day {
        background: var(--white);
        padding: 1rem;
        text-align: center;
        cursor: pointer;
        transition: var(--transition);
        position: relative;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .calendar-day:hover {
        background: var(--light-maroon);
    }

    .calendar-day.current-day {
        background: var(--primary-maroon);
        color: var(--white);
    }

    .calendar-day.other-month {
        color: var(--gray);
        opacity: 0.5;
    }

    .calendar-day.has-events {
        font-weight: 600;
    }

    .event-indicator {
        position: absolute;
        top: 5px;
        right: 5px;
        background: var(--accent-maroon);
        color: var(--white);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .event-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .event-modal-content {
        background: var(--white);
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }

    .event-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--gray);
    }

    .modal-event {
        padding: 1rem;
        border-bottom: 1px solid var(--light-gray);
    }

    .modal-event:last-child {
        border-bottom: none;
    }

    .success-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .success-modal-content {
        background: var(--white);
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        max-width: 400px;
        width: 90%;
    }

    .success-icon {
        font-size: 4rem;
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .event-categories {
        padding: var(--section-padding);
        background: var(--light-gray);
    }

    .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .category-card {
        background: var(--white);
        padding: 1.5rem;
        border-radius: 12px;
        text-align: center;
        cursor: pointer;
        transition: var(--transition);
        border: 2px solid transparent;
    }

    .category-card:hover,
    .category-card.active {
        border-color: var(--primary-maroon);
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }

    .category-card i {
        font-size: 2rem;
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .category-card h3 {
        color: var(--primary-maroon);
        margin-bottom: 0;
    }

    .event-details {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
    }

    .event-type,
    .event-participants {
        background: var(--light-maroon);
        color: var(--primary-maroon);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .event-category {
        position: absolute;
        top: 15px;
        left: 15px;
        background: var(--primary-maroon);
        color: var(--white);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        .calendar-day {
            min-height: 60px;
            padding: 0.5rem;
            font-size: 0.9rem;
        }

        .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }

        .event-details {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
`;
document.head.appendChild(style);
