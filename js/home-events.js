// Homepage "Upcoming Events" — pulls the next few events live from the same
// Google Calendar used on the Events page, but keeps this page's existing
// event-card design (photo, date badge, category tag, blurb, Learn More).
(function() {
    const GOOGLE_CALENDAR_API_KEY = 'AIzaSyB0Ida_jhuGh3vfQlSnVOkCz7F3wSNa4Go';
    const GOOGLE_CALENDAR_ID = 'texasaggiesailing@gmail.com';

    // Rotated through for events pulled from the calendar, since Calendar
    // API events don't carry photos of their own.
    const DEFAULT_EVENT_IMAGES = [
        'assets/images/team-huddle.JPG',
        'assets/images/grilling-artsy.JPG',
        'assets/images/hands-artsy.JPG'
    ];

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }

    function parseLocalDate(dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function parseEventStart(event) {
        return event.start.dateTime ? new Date(event.start.dateTime) : parseLocalDate(event.start.date);
    }

    function formatEventTimeRange(event) {
        if (!event.start.dateTime) {
            return 'All Day';
        }
        const start = new Date(event.start.dateTime);
        const end = new Date(event.end.dateTime);
        const opts = { hour: 'numeric', minute: '2-digit' };
        return `${start.toLocaleTimeString('en-US', opts)} - ${end.toLocaleTimeString('en-US', opts)}`;
    }

    // Practices/tryouts default to the club's home venue when the calendar
    // entry has no location set; other events are left blank rather than
    // guessed, since we don't actually know where an away event is held.
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

    function getEventCategory(event) {
        const title = (event.summary || '').toLowerCase();
        if (title.includes('practice')) {
            return 'Training';
        }
        if (title.includes('regatta') || title.includes('champs') || title.includes('nationals')) {
            return 'Racing';
        }
        if (title.includes('try out') || title.includes('tryout') || title.includes('social') || title.includes('meeting')) {
            return 'Social';
        }
        return '';
    }

    function summarizeDescription(html, maxLen = 110) {
        if (!html) {
            return '';
        }
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = (div.textContent || '').replace(/\s+/g, ' ').trim();
        return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
    }

    function buildEventCard(event, index) {
        const start = parseEventStart(event);
        const day = start.getDate();
        const month = start.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const category = getEventCategory(event);
        const location = getEventLocation(event);
        const description = summarizeDescription(event.description) || 'Join us for this Aggie Sailing event!';
        const image = DEFAULT_EVENT_IMAGES[index % DEFAULT_EVENT_IMAGES.length];

        return `
            <div class="event-card">
                <div class="event-image">
                    <img src="${image}" alt="${escapeHtml(event.summary || 'Sailing club event')}">
                    <div class="event-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    ${category ? `<div class="event-category">${escapeHtml(category)}</div>` : ''}
                </div>
                <div class="event-content">
                    <h3>${escapeHtml(event.summary || 'Untitled Event')}</h3>
                    <p class="event-time"><i class="fas fa-clock"></i> ${formatEventTimeRange(event)}</p>
                    ${location ? `<p class="event-location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(location)}</p>` : ''}
                    <p>${escapeHtml(description)}</p>
                    <a href="events.html" class="btn btn-outline">Learn More</a>
                </div>
            </div>
        `;
    }

    // main.js's image fade-in only wires up <img> elements present at
    // DOMContentLoaded, so images injected later via fetch() never get the
    // 'loaded' class and stay stuck at the global `img { opacity: 0 }` rule.
    function activateInjectedImages(container) {
        container.querySelectorAll('img').forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => img.classList.add('loaded'));
                img.addEventListener('error', () => img.classList.add('loaded'));
            }
        });
    }

    async function loadHomeUpcomingEvents() {
        const container = document.getElementById('home-upcoming-events');
        if (!container) {
            return;
        }

        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events` +
            `?key=${encodeURIComponent(GOOGLE_CALENDAR_API_KEY)}` +
            `&timeMin=${encodeURIComponent(new Date().toISOString())}` +
            `&singleEvents=true&orderBy=startTime&maxResults=3`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Calendar API responded with ${response.status}`);
            }
            const data = await response.json();
            const events = data.items || [];

            container.innerHTML = events.length
                ? events.map(buildEventCard).join('')
                : '<p class="no-events-message">No upcoming events scheduled yet — check back soon!</p>';
            activateInjectedImages(container);
        } catch (error) {
            console.error('Failed to load upcoming events:', error);
            container.innerHTML = '<p class="no-events-message">Unable to load upcoming events right now.</p>';
        }
    }

    document.addEventListener('DOMContentLoaded', loadHomeUpcomingEvents);
})();
