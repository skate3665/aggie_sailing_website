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

    .this-week-section {
        background: var(--white);
        padding: 70px 0 40px;
    }

    .this-week-section h2 {
        color: var(--primary-maroon);
    }

    .week-layout {
        display: grid;
        grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr);
        gap: 2rem;
        align-items: start;
    }

    .week-layout .calendar-wrapper {
        max-width: none;
        width: 100%;
        position: sticky;
        top: 90px;
    }

    @media (max-width: 992px) {
        .week-layout {
            grid-template-columns: minmax(0, 1fr);
        }

        .week-layout .calendar-wrapper {
            position: static;
        }
    }

    .events-loading,
    .no-events-message {
        color: var(--gray);
        font-size: 0.9rem;
        text-align: center;
        padding: 1rem 0;
    }

    .week-strip {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }

    @keyframes weekCardFadeIn {
        from {
            opacity: 0;
            transform: translateY(14px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .week-day-card {
            animation: none !important;
            opacity: 1 !important;
        }
    }

    .week-day-card {
        background: var(--white);
        border: 1px solid var(--primary-maroon);
        border-radius: 10px;
        overflow: hidden;
        transition: var(--transition);
        opacity: 0;
        animation: weekCardFadeIn 0.5s ease forwards;
    }

    .week-day-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    }

    .week-day-card--weekend {
        background: var(--light-gray);
    }

    .week-day-card--today {
        border-width: 2px;
        background: rgba(80, 0, 0, 0.04);
    }

    .week-day-card-header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.45rem 0.75rem;
        border-bottom: 1px solid var(--primary-maroon);
    }

    .week-day-card-name {
        font-family: var(--font-heading);
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--primary-maroon);
    }

    .week-day-card-date {
        font-size: 0.7rem;
        color: var(--gray);
    }

    .week-day-card-body {
        padding: 0.15rem 0.75rem;
    }

    .week-event-chip {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        column-gap: 0.75rem;
        row-gap: 0.1rem;
        padding: 0.4rem 0.35rem;
        margin: 0 -0.35rem;
        border-radius: 6px;
        cursor: pointer;
        transition: var(--transition-fast);
    }

    .week-event-chip + .week-event-chip {
        border-top: 1px solid var(--light-gray);
    }

    .week-event-chip:hover,
    .week-event-chip:focus {
        background: rgba(80, 0, 0, 0.05);
        transform: translateX(3px);
        outline: none;
    }

    /* Each group wraps as a unit — the groups get real minimum widths
       (not 0) so the browser actually wraps secondary onto its own line
       once both can't fit, rather than shrinking both to fit on one line
       until location gets squeezed down to nothing. Within secondary,
       location is fixed-width (always fully visible) and description is
       the flexible element that absorbs the truncation. */
    .week-event-primary {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        flex: 2 1 170px;
        min-width: 170px;
    }

    .week-event-secondary {
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        flex: 1 1 150px;
        min-width: 150px;
        justify-content: flex-end;
    }

    .week-event-time {
        flex: 0 0 auto;
        font-size: 0.65rem;
        font-weight: 700;
        color: var(--primary-maroon);
        white-space: nowrap;
    }

    .week-event-title {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--dark-gray);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .week-event-description {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 0.7rem;
        color: var(--gray);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .week-event-location {
        flex: 0 0 auto;
        font-size: 0.65rem;
        color: var(--gray);
        white-space: nowrap;
    }

    .week-event-location i {
        color: var(--primary-maroon);
        margin-right: 0.3rem;
    }

    @media (max-width: 500px) {
        .week-event-secondary {
            justify-content: flex-start;
        }
    }

    .week-event-tooltip {
        position: fixed;
        z-index: 9999;
        max-width: 300px;
        background: var(--white);
        border-radius: 14px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        padding: 1.1rem 1.25rem;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transform: translateY(4px);
        transition: opacity 0.15s ease, transform 0.15s ease;
    }

    .week-event-tooltip.is-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .week-tooltip-title {
        font-family: var(--font-heading);
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--primary-maroon);
        margin-bottom: 0.5rem;
    }

    .week-tooltip-meta {
        font-size: 0.85rem;
        color: var(--gray);
        margin-bottom: 0.35rem;
    }

    .week-tooltip-meta i {
        color: var(--primary-maroon);
        margin-right: 0.4rem;
        width: 1rem;
        text-align: center;
    }

    .week-tooltip-description {
        margin-top: 0.6rem;
        padding-top: 0.6rem;
        border-top: 1px solid var(--light-gray);
        font-size: 0.85rem;
        color: var(--dark-gray);
        line-height: 1.5;
        max-height: 200px;
        overflow-y: auto;
    }

    .event-detail-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, visibility 0.2s ease;
    }

    .event-detail-overlay.is-open {
        opacity: 1;
        visibility: visible;
    }

    .event-detail-panel {
        background: var(--white);
        border-radius: 16px;
        max-width: 540px;
        width: 100%;
        max-height: 85vh;
        overflow-y: auto;
        padding: 2rem;
        position: relative;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
        transform: translateY(12px);
        transition: transform 0.2s ease;
    }

    .event-detail-overlay.is-open .event-detail-panel {
        transform: translateY(0);
    }

    .event-detail-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.6rem;
        line-height: 1;
        color: var(--gray);
        cursor: pointer;
        width: 2.25rem;
        height: 2.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition-fast);
    }

    .event-detail-close:hover,
    .event-detail-close:focus {
        background: var(--light-gray);
        color: var(--primary-maroon);
        outline: none;
    }

    .event-detail-title {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-maroon);
        margin-bottom: 1rem;
        padding-right: 2rem;
    }

    .event-detail-meta {
        font-size: 0.95rem;
        color: var(--gray);
        margin-bottom: 0.5rem;
    }

    .event-detail-meta i {
        color: var(--primary-maroon);
        margin-right: 0.5rem;
        width: 1.2rem;
        text-align: center;
    }

    .event-detail-description {
        margin-top: 1.25rem;
        padding-top: 1.25rem;
        border-top: 1px solid var(--light-gray);
        font-size: 0.95rem;
        color: var(--dark-gray);
        line-height: 1.6;
    }

    .event-detail-hint {
        margin-top: 1.5rem;
        font-size: 0.75rem;
        color: var(--gray);
        text-align: center;
    }

    @media (max-width: 768px) {
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

// ---------------------------------------------------------------------
// Google Calendar integration — pulls live events for the Events page.
//
// Setup: create a Google Cloud API key restricted (HTTP referrers) to
// this site's domain, with the Calendar API enabled, and paste it below.
// The target calendar must be public (Settings > Access permissions >
// "Make available to public") for the API key to read it.
// ---------------------------------------------------------------------
const GOOGLE_CALENDAR_API_KEY = 'AIzaSyB0Ida_jhuGh3vfQlSnVOkCz7F3wSNa4Go';
const GOOGLE_CALENDAR_ID = 'texasaggiesailing@gmail.com';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}

// Calendar API gives all-day events as 'YYYY-MM-DD' with no time zone;
// parsing that directly with `new Date()` reads it as UTC midnight and
// can display as the previous day in US time zones, so build the local
// date by hand instead.
function parseLocalDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function parseEventStart(event) {
    return event.start.dateTime ? new Date(event.start.dateTime) : parseLocalDate(event.start.date);
}

function dateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatEventTimeRange(event) {
    if (!event.start.dateTime) {
        return 'All Day';
    }
    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);
    const opts = { hour: 'numeric', minute: '2-digit' };
    return `${start.toLocaleTimeString('en-US', opts)} – ${end.toLocaleTimeString('en-US', opts)}`;
}

// None of the club's calendar events have the Location field filled in
// (verified against the live calendar), so practices/tryouts default to the
// club's home venue. Away events (regattas at other schools) are left blank
// rather than guessed, since we don't actually know where they're held.
function getEventLocation(event) {
    if (event.location) {
        return event.location;
    }
    const title = (event.summary || '').toLowerCase();
    if (title.includes('practice') || title.includes('try out') || title.includes('tryout')) {
        return 'Lake Bryan';
    }
    return '';
}

// Calendar descriptions come back as real HTML (Google's rich-text editor
// stores <br>, <a>, <u>, etc.), so escaping them to plain text would print
// literal tags. Render them, but strip everything except a small
// safe-formatting allowlist so a compromised calendar entry can't inject
// scripts or arbitrary markup.
const ALLOWED_DESCRIPTION_TAGS = new Set(['A', 'B', 'I', 'U', 'STRONG', 'EM', 'BR', 'P']);

function sanitizeDescriptionHtml(html) {
    const template = document.createElement('template');
    template.innerHTML = html || '';

    const clean = (node) => {
        Array.from(node.childNodes).forEach(child => {
            if (child.nodeType !== Node.ELEMENT_NODE) {
                return;
            }
            if (!ALLOWED_DESCRIPTION_TAGS.has(child.tagName)) {
                child.replaceWith(document.createTextNode(child.textContent));
                return;
            }
            const href = child.tagName === 'A' ? child.getAttribute('href') : null;
            Array.from(child.attributes).forEach(attr => child.removeAttribute(attr.name));
            if (child.tagName === 'A' && href && /^https?:\/\//i.test(href)) {
                child.setAttribute('href', href);
                child.setAttribute('rel', 'noopener noreferrer');
                child.setAttribute('target', '_blank');
            }
            clean(child);
        });
    };
    clean(template.content);
    return template.innerHTML;
}

// Populated fresh on every load; chips reference an event by id and the
// hover tooltip looks it up here rather than re-parsing the DOM.
let eventsById = {};

// Short plain-text preview of a calendar description for the row itself;
// the full (sanitized, HTML-formatted) version still shows in the hover
// tooltip. Parsing into a detached, never-appended element is safe — HTML
// parsed this way never executes embedded scripts — and reading
// .textContent strips all markup down to plain text.
function summarizeDescription(html, maxLen = 100) {
    if (!html) {
        return '';
    }
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = (div.textContent || '').replace(/\s+/g, ' ').trim();
    return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
}

function buildEventChip(event) {
    const location = getEventLocation(event);
    const summary = summarizeDescription(event.description);
    return `
        <div class="week-event-chip" data-event-id="${escapeHtml(event.id)}" tabindex="0">
            <div class="week-event-primary">
                <span class="week-event-time">${formatEventTimeRange(event)}</span>
                <span class="week-event-title">${escapeHtml(event.summary || 'Untitled Event')}</span>
            </div>
            <div class="week-event-secondary">
                ${summary ? `<span class="week-event-description">${escapeHtml(summary)}</span>` : ''}
                ${location ? `<span class="week-event-location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(location)}</span>` : ''}
            </div>
        </div>
    `;
}

function buildDayColumn(day, dayIndex) {
    const sortedEvents = day.events.slice().sort((a, b) => {
        const aAllDay = !a.start.dateTime;
        const bAllDay = !b.start.dateTime;
        if (aAllDay !== bAllDay) {
            return aAllDay ? -1 : 1;
        }
        return aAllDay ? 0 : new Date(a.start.dateTime) - new Date(b.start.dateTime);
    });

    const eventsHtml = sortedEvents.map(buildEventChip).join('');

    const isWeekend = day.dayName === 'Sunday' || day.dayName === 'Saturday';
    const cardClasses = ['week-day-card'];
    if (day.isToday) {
        cardClasses.push('week-day-card--today');
    } else if (isWeekend) {
        cardClasses.push('week-day-card--weekend');
    }

    return `
        <div class="${cardClasses.join(' ')}" style="animation-delay: ${dayIndex * 70}ms">
            <div class="week-day-card-header">
                <span class="week-day-card-name">${day.dayName}</span>
                <span class="week-day-card-date">${MONTH_NAMES[day.month]} ${day.dayNum}</span>
            </div>
            <div class="week-day-card-body">${eventsHtml}</div>
        </div>
    `;
}

// Single reused tooltip element, positioned via getBoundingClientRect on
// hover/focus rather than pure CSS, so it can't get clipped by the
// horizontally-scrolling .week-strip container and can flip above the chip
// when there's no room below.
let tooltipEl = null;

function getTooltipEl() {
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'week-event-tooltip';
        document.body.appendChild(tooltipEl);
    }
    return tooltipEl;
}

function showEventTooltip(chip, event) {
    const tooltip = getTooltipEl();
    const location = getEventLocation(event);

    tooltip.innerHTML = `
        <div class="week-tooltip-title">${escapeHtml(event.summary || 'Untitled Event')}</div>
        <div class="week-tooltip-meta"><i class="fas fa-clock"></i> ${formatEventTimeRange(event)}</div>
        ${location ? `<div class="week-tooltip-meta"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(location)}</div>` : ''}
        ${event.description ? `<div class="week-tooltip-description">${sanitizeDescriptionHtml(event.description)}</div>` : ''}
    `;
    const chipRect = chip.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = chipRect.left;
    if (left + tooltipRect.width > window.innerWidth - 12) {
        left = window.innerWidth - tooltipRect.width - 12;
    }
    left = Math.max(12, left);

    let top = chipRect.bottom + 8;
    if (top + tooltipRect.height > window.innerHeight - 12) {
        top = chipRect.top - tooltipRect.height - 8;
    }
    top = Math.max(12, top);

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.classList.add('is-visible');
}

function hideEventTooltip() {
    if (tooltipEl) {
        tooltipEl.classList.remove('is-visible');
    }
}

function attachTooltipHandlers(container) {
    container.addEventListener('mouseover', (e) => {
        const chip = e.target.closest('.week-event-chip');
        if (chip) {
            const event = eventsById[chip.dataset.eventId];
            if (event) {
                showEventTooltip(chip, event);
            }
        }
    });
    container.addEventListener('mouseout', (e) => {
        if (e.target.closest('.week-event-chip') && !e.relatedTarget?.closest('.week-event-chip')) {
            hideEventTooltip();
        }
    });
    container.addEventListener('focusin', (e) => {
        const chip = e.target.closest('.week-event-chip');
        if (chip) {
            const event = eventsById[chip.dataset.eventId];
            if (event) {
                showEventTooltip(chip, event);
            }
        }
    });
    container.addEventListener('focusout', hideEventTooltip);

    // Double-click (or Enter, for keyboard users) opens the full detail pane —
    // the hover tooltip is quick-glance only and vanishes on mouseout.
    container.addEventListener('dblclick', (e) => {
        const chip = e.target.closest('.week-event-chip');
        if (chip) {
            const event = eventsById[chip.dataset.eventId];
            if (event) {
                showEventDetail(event);
            }
        }
    });
    container.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') {
            return;
        }
        const chip = e.target.closest('.week-event-chip');
        if (chip) {
            const event = eventsById[chip.dataset.eventId];
            if (event) {
                showEventDetail(event);
            }
        }
    });
}

// Single reused overlay for the full-description detail pane, opened via
// double-click (or Enter on a focused chip). Unlike the hover tooltip, this
// stays open until the user dismisses it via the close button, Escape, or
// clicking the backdrop.
let detailOverlayEl = null;

function getDetailOverlayEl() {
    if (!detailOverlayEl) {
        detailOverlayEl = document.createElement('div');
        detailOverlayEl.className = 'event-detail-overlay';
        detailOverlayEl.innerHTML = `
            <div class="event-detail-panel" role="dialog" aria-modal="true">
                <button type="button" class="event-detail-close" aria-label="Close">&times;</button>
                <div class="event-detail-body"></div>
            </div>
        `;
        document.body.appendChild(detailOverlayEl);

        detailOverlayEl.querySelector('.event-detail-close').addEventListener('click', hideEventDetail);
        detailOverlayEl.addEventListener('click', (e) => {
            if (e.target === detailOverlayEl) {
                hideEventDetail();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideEventDetail();
            }
        });
    }
    return detailOverlayEl;
}

function showEventDetail(event) {
    hideEventTooltip();
    const overlay = getDetailOverlayEl();
    const location = getEventLocation(event);

    overlay.querySelector('.event-detail-body').innerHTML = `
        <div class="event-detail-title">${escapeHtml(event.summary || 'Untitled Event')}</div>
        <div class="event-detail-meta"><i class="fas fa-clock"></i> ${formatEventTimeRange(event)}</div>
        ${location ? `<div class="event-detail-meta"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(location)}</div>` : ''}
        ${event.description
            ? `<div class="event-detail-description">${sanitizeDescriptionHtml(event.description)}</div>`
            : '<div class="event-detail-description">No additional details provided.</div>'}
        <div class="event-detail-hint">Press Esc or click × to close</div>
    `;
    overlay.classList.add('is-open');
    overlay.querySelector('.event-detail-close').focus();
    document.body.style.overflow = 'hidden';
}

function hideEventDetail() {
    if (!detailOverlayEl) {
        return;
    }
    detailOverlayEl.classList.remove('is-open');
    document.body.style.overflow = '';
}

async function loadWeekView() {
    const container = document.getElementById('week-view');
    if (!container) {
        return;
    }

    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 7);
    const lastDayOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6);
    const todayKey = dateKey(now);

    const headingEl = document.getElementById('week-range-heading');
    if (headingEl) {
        const startLabel = `${MONTH_NAMES[startOfWeek.getMonth()]} ${startOfWeek.getDate()}`;
        const endLabel = `${MONTH_NAMES[lastDayOfWeek.getMonth()]} ${lastDayOfWeek.getDate()}`;
        headingEl.textContent = `This Week (${startLabel} - ${endLabel} ${lastDayOfWeek.getFullYear()})`;
    }

    const days = [];
    const bucketsByKey = {};
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
        const key = dateKey(d);
        const day = { key, dayName: DAY_NAMES[i], dayNum: d.getDate(), month: d.getMonth(), isToday: key === todayKey, events: [] };
        days.push(day);
        bucketsByKey[key] = day.events;
    }

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events` +
        `?key=${encodeURIComponent(GOOGLE_CALENDAR_API_KEY)}` +
        `&timeMin=${encodeURIComponent(startOfWeek.toISOString())}` +
        `&timeMax=${encodeURIComponent(endOfWeek.toISOString())}` +
        `&singleEvents=true&orderBy=startTime&maxResults=50`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Calendar API responded with ${response.status}`);
        }
        const data = await response.json();
        const allEvents = data.items || [];
        eventsById = {};

        allEvents.forEach(event => {
            eventsById[event.id] = event;

            if (event.start.dateTime) {
                const key = dateKey(parseEventStart(event));
                if (bucketsByKey[key]) {
                    bucketsByKey[key].push(event);
                }
                return;
            }
            // All-day events can span multiple days (e.g. a weekend regatta);
            // Calendar API's end.date is exclusive, so the last real day is one before it.
            const start = parseLocalDate(event.start.date);
            const lastDay = parseLocalDate(event.end.date);
            lastDay.setDate(lastDay.getDate() - 1);
            for (const cursor = new Date(start); cursor <= lastDay; cursor.setDate(cursor.getDate() + 1)) {
                const key = dateKey(cursor);
                if (bucketsByKey[key]) {
                    bucketsByKey[key].push(event);
                }
            }
        });

        const daysWithEvents = days.filter(day => day.events.length > 0);

        container.innerHTML = daysWithEvents.length
            ? daysWithEvents.map(buildDayColumn).join('')
            : '<p class="no-events-message">Nothing scheduled this week</p>';
        attachTooltipHandlers(container);
    } catch (error) {
        console.error('Failed to load this week\'s events:', error);
        container.innerHTML = '<p class="no-events-message">Unable to load this week\'s events right now — see the full calendar below.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadWeekView);
