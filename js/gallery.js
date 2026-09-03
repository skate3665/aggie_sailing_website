// Gallery page functionality
//
// Photos are pulled live from a public Google Drive folder via the Drive
// API, rather than from locally uploaded images (see js/hero-slideshow.js
// and the Events page's Calendar integration for the same setup pattern:
// a Google Cloud API key with the Drive API enabled, restricted to this
// site's domain, and the folder shared as "Anyone with the link can view").
//
// Rather than a grid of ~250 thumbnails (slow to load all at once), this
// shows one photo at a time with prev/next controls, so only the current
// image is ever downloaded.
document.addEventListener('DOMContentLoaded', function() {
    const GOOGLE_DRIVE_API_KEY = 'AIzaSyB0Ida_jhuGh3vfQlSnVOkCz7F3wSNa4Go';
    const ALUMNI_FOLDER_ID = '1TKXBzpkLo-GDek7N7Il5XUnDZIa2Q1hz';

    // Drive filenames follow a "YYYY-MM-DD - Event Name (n).ext" convention
    // for the alumni archive; pull a readable title out of that where
    // possible (used only for the image's alt text), falling back
    // gracefully for files that don't match.
    function titleFromFilename(name) {
        const base = name.replace(/\.[^.]+$/, '');
        const parts = base.split(' - ');
        let title = parts.length > 1 ? parts.slice(1).join(' - ') : base;
        title = title.replace(/\s*\(\d+\)\s*$/, '').trim();
        return title || 'Aggie Sailing';
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }

    // Uses the official Drive API content-download endpoint rather than a
    // file's 'thumbnailLink'. thumbnailLink points at Google's internal
    // lh3.googleusercontent.com thumbnail CDN, which silently blocks/rate
    // -limits requests that carry a Referer header — exactly what a real
    // browser sends for an embedded <img>, so it looked fine in isolated
    // testing (no referer) but failed for real visitors. This endpoint is
    // under googleapis.com, covered by the same API-key + referrer
    // allowlist already working for the Calendar integration.
    function driveContentUrl(fileId) {
        return `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}` +
            `?alt=media&key=${encodeURIComponent(GOOGLE_DRIVE_API_KEY)}`;
    }

    async function fetchDriveFolderImages(folderId) {
        const query = `'${folderId}' in parents and trashed = false`;
        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}` +
            `&key=${encodeURIComponent(GOOGLE_DRIVE_API_KEY)}` +
            `&fields=${encodeURIComponent('files(id,name)')}` +
            `&orderBy=name&pageSize=1000`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Drive API responded with ${response.status}`);
        }
        const data = await response.json();
        return (data.files || []).map(file => ({
            // Only this URL is ever requested by the browser (set as an
            // <img> src on navigation) — the full folder listing here is
            // lightweight JSON, not image downloads.
            src: driveContentUrl(file.id),
            title: titleFromFilename(file.name)
        }));
    }

    let images = [];
    let currentIndex = 0;

    function renderCurrentSlide() {
        const viewer = document.getElementById('galleryViewer');
        const image = images[currentIndex];
        if (!viewer || !image) {
            return;
        }

        viewer.innerHTML = `
            <div class="viewer-frame">
                <button type="button" class="viewer-nav viewer-prev" aria-label="Previous photo">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <img src="${image.src}" alt="${escapeHtml(image.title)}" class="viewer-image">
                <button type="button" class="viewer-nav viewer-next" aria-label="Next photo">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;

        // main.js's image fade-in only wires up <img> elements present at
        // DOMContentLoaded, so this dynamically-inserted image never gets
        // the 'loaded' class and stays stuck at the global `img { opacity: 0 }`
        // rule unless handled here too.
        const img = viewer.querySelector('.viewer-image');
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', () => img.classList.add('loaded'));
        }

        viewer.querySelector('.viewer-prev').addEventListener('click', showPrevious);
        viewer.querySelector('.viewer-next').addEventListener('click', showNext);
    }

    function showPrevious() {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        renderCurrentSlide();
    }

    function showNext() {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        renderCurrentSlide();
    }

    document.addEventListener('keydown', (e) => {
        if (!images.length) {
            return;
        }
        if (e.key === 'ArrowLeft') {
            showPrevious();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });

    async function loadGallery() {
        const viewer = document.getElementById('galleryViewer');
        viewer.innerHTML = '<p class="events-loading">Loading photos&hellip;</p>';

        try {
            images = await fetchDriveFolderImages(ALUMNI_FOLDER_ID);
            if (!images.length) {
                viewer.innerHTML = '<p class="no-events-message">No photos found in the shared album.</p>';
                return;
            }
            currentIndex = 0;
            renderCurrentSlide();
        } catch (error) {
            console.error('Failed to load gallery from Google Drive:', error);
            viewer.innerHTML = '<p class="no-events-message">Unable to load photos right now. Please try again later.</p>';
        }
    }

    loadGallery();

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

// Add CSS for the gallery viewer and upload section
const style = document.createElement('style');
style.textContent = `
    .gallery-section {
        padding: var(--section-padding);
        background: var(--white);
    }

    .gallery-viewer {
        max-width: 900px;
        margin: 0 auto;
    }

    .viewer-frame {
        position: relative;
        background: #000;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 300px;
    }

    .viewer-image {
        width: 100%;
        max-height: 70vh;
        object-fit: contain;
        display: block;
    }

    .viewer-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.85);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition);
        color: var(--primary-maroon);
        font-size: 1.1rem;
        z-index: 2;
    }

    .viewer-nav:hover {
        background: var(--white);
        transform: translateY(-50%) scale(1.1);
    }

    .viewer-prev {
        left: 1rem;
    }

    .viewer-next {
        right: 1rem;
    }

    .upload-section {
        padding: var(--section-padding);
        background: var(--light-gray);
    }

    .upload-content {
        text-align: center;
    }

    .upload-content h2 {
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .upload-content p {
        color: var(--gray);
        font-size: 1.1rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .upload-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }

    .upload-option {
        background: var(--white);
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: var(--transition);
    }

    .upload-option:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .upload-option i {
        font-size: 3rem;
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .upload-option h3 {
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .upload-option p {
        color: var(--gray);
        margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
        .upload-options {
            grid-template-columns: 1fr;
        }

        .viewer-nav {
            width: 40px;
            height: 40px;
        }

        .viewer-image {
            max-height: 50vh;
        }
    }
`;
document.head.appendChild(style);
