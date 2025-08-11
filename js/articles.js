// Articles page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Article category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    const articleCards = document.querySelectorAll('.article-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all category cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');

            // Filter articles
            articleCards.forEach(articleCard => {
                if (selectedCategory === 'all' || articleCard.getAttribute('data-category') === selectedCategory) {
                    articleCard.style.display = 'block';
                    articleCard.style.opacity = '0';
                    articleCard.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        articleCard.style.opacity = '1';
                        articleCard.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    articleCard.style.display = 'none';
                }
            });
        });
    });

    // Newsletter signup functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (!email) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate newsletter subscription
            showNewsletterSuccess(email);
            
            // Reset form
            emailInput.value = '';
        });
    }

    function showNewsletterSuccess(email) {
        const successModal = document.createElement('div');
        successModal.className = 'newsletter-success-modal';
        successModal.innerHTML = `
            <div class="newsletter-success-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Successfully Subscribed!</h3>
                <p>Thank you for subscribing to our newsletter. You'll receive the latest sailing articles, events, and tips directly in your inbox.</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;

        document.body.appendChild(successModal);
    }

    // Article card hover effects
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Read more functionality
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const articleCard = this.closest('.article-card');
            const articleTitle = articleCard.querySelector('h3').textContent;
            
                         // Check if it's the lake sailing article
             if (articleTitle.includes('Lake Sailing') || articleTitle.includes('Mastering Lake Sailing')) {
                 showLakeSailingArticle();
             } else if (articleTitle.includes('Different Conditions')) {
                 showConditionsArticle();
             } else if (articleTitle.includes('Starting Strong')) {
                 showStartingArticle();
             } else if (articleTitle.includes('Racing Strategy Fundamentals')) {
                 showStrategyArticle();
             } else if (articleTitle.includes('C420 Maintenance Basics')) {
                 showC420MaintenanceArticle();
             } else if (articleTitle.includes('Fundamental Rules of Collegiate Racing')) {
                 showRacingRulesArticle();
             } else {
                 // In a real application, this would navigate to the full article
                 showArticlePreview(articleTitle);
             }
        });
    });

         // Global function for C420 maintenance article
     window.showC420MaintenanceArticle = function() {
         const articleModal = document.createElement('div');
         articleModal.className = 'article-preview-modal';
         articleModal.innerHTML = `
             <div class="article-preview-content">
                 <div class="article-preview-header">
                     <h3>C420 Maintenance Basics</h3>
                     <button class="modal-close">&times;</button>
                 </div>
                 <div class="article-preview-body">
                     <div class="article-meta">
                         <span class="article-date">August 2, 2025</span>
                         <span class="article-category">Maintenance</span>
                     </div>
                     
                     <p><strong>The Club 420 is a workhorse of college and junior sailing — durable, forgiving, and quick when well-maintained.</strong> But like any performance boat, it needs consistent care to stay competitive. Whether you sail in a school fleet or own your own boat, these maintenance fundamentals will keep your C420 running smoothly.</p>
                     
                     <h4>1. Hull Care</h4>
                     <p><strong>Rinse After Every Sail:</strong> Salt and grime degrade gelcoat and fittings over time. Use fresh water on the hull, deck, and cockpit after every practice or race.</p>
                     
                     <p><strong>Inspect for Damage:</strong> Check for cracks, soft spots, or deep scratches in the gelcoat, especially around the bow, transom, and daggerboard trunk. Even small dings can grow into structural issues.</p>
                     
                     <p><strong>Drain the Hull:</strong> Make sure inspection ports are watertight and that the hull drains fully between sails to prevent waterlogging.</p>
                     
                     <p><strong>Tip:</strong> A clean, polished hull is not just about looks — a smooth surface is faster through the water.</p>
                     
                     <h4>2. Rigging & Hardware</h4>
                     <p><strong>Standing Rigging:</strong> Check shrouds, forestay, and mast step for wear or corrosion. Replace frayed wires or bent turnbuckles immediately.</p>
                     
                     <p><strong>Running Rigging:</strong> Inspect halyards, sheets, and control lines for frays. Even minor chafe can cause a failure mid-race.</p>
                     
                     <p><strong>Blocks & Cleats:</strong> Rinse, spin, and check for smooth operation. Replace any that stick or slip under load.</p>
                     
                     <p><strong>Pro Move:</strong> Keep a small "rigging kit" with spare pins, shackles, and electrical tape for quick dockside fixes.</p>
                     
                     <h4>3. Sails</h4>
                     <p><strong>Dry Before Stowing:</strong> Rolling or folding wet sails encourages mildew and shortens their lifespan.</p>
                     
                     <p><strong>Check Stitching:</strong> Look for frayed seams, especially around the clew, tack, and batten pockets.</p>
                     
                     <p><strong>Control Stretch:</strong> Use vang, cunningham, and outhaul properly — overloading old sails just accelerates wear.</p>
                     
                     <h4>4. Daggerboard & Rudder</h4>
                     <p><strong>Smooth Edges:</strong> Sand out nicks and dings to maintain hydrodynamic efficiency.</p>
                     
                     <p><strong>Hardware Check:</strong> Make sure the rudder pintles and gudgeons are tight and free of corrosion.</p>
                     
                     <p><strong>Storage:</strong> Keep foils in padded bags when not in use to avoid accidental damage.</p>
                     
                     <h4>5. Trailer & Transport</h4>
                     <p><strong>Padding:</strong> Use adequate padding on cradles and supports to avoid hull deformation.</p>
                     
                     <p><strong>Tie-Downs:</strong> Avoid overtightening straps — secure the boat without crushing the hull.</p>
                     
                     <p><strong>Wheel Bearings:</strong> If your trailer gets dunked in saltwater, rinse bearings and check for rust regularly.</p>
                     
                     <div class="article-preview-actions">
                         <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                         <button class="btn btn-outline" onclick="shareArticle('C420 Maintenance Basics')">Share Article</button>
                     </div>
                 </div>
             </div>
         `;

         document.body.appendChild(articleModal);

         // Close modal functionality
         const closeBtn = articleModal.querySelector('.modal-close');
         closeBtn.addEventListener('click', () => {
             document.body.removeChild(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 document.body.removeChild(articleModal);
             }
         });
     };

     // Global function for racing rules article
     window.showRacingRulesArticle = function() {
         const articleModal = document.createElement('div');
         articleModal.className = 'article-preview-modal';
         articleModal.innerHTML = `
             <div class="article-preview-content">
                 <div class="article-preview-header">
                     <h3>Fundamental Rules of Collegiate Racing</h3>
                     <button class="modal-close">&times;</button>
                 </div>
                 <div class="article-preview-body">
                     <div class="article-meta">
                         <span class="article-date">July 30, 2025</span>
                         <span class="article-category">Racing</span>
                     </div>
                     
                     <p><strong>Collegiate sailing is fast-paced, tactical, and often crowded — which makes understanding the Racing Rules of Sailing (RRS) essential.</strong> While the full rulebook is extensive, most situations in college dinghy racing boil down to a handful of core principles. Master these, and you'll avoid most protests and penalties.</p>
                     
                     <h4>1. Starboard vs. Port (Rule 10)</h4>
                     <p>When boats are on opposite tacks, the boat on port tack must keep clear of the boat on starboard tack.</p>
                     
                     <p><strong>Example:</strong> If you're approaching the start on port and a starboard boat is coming in, you must either tack, duck their stern, or pass astern without interfering.</p>
                     
                     <p><strong>College Tip:</strong> Always call "Starboard!" early — not to intimidate, but to make sure there's no confusion.</p>
                     
                     <h4>2. Windward vs. Leeward (Rule 11)</h4>
                     <p>When boats are on the same tack and overlapped, the windward boat must keep clear of the leeward boat.</p>
                     
                     <p><strong>Example:</strong> If you're the windward boat on a reach, you can't luff down into the leeward boat unless you give them room and comply with other rules.</p>
                     
                     <p><strong>College Tip:</strong> As leeward boat, you can luff, but you must give the windward boat time and room to respond.</p>
                     
                     <h4>3. Room at Marks and Obstructions (Rule 18)</h4>
                     <p>When boats are overlapped approaching a mark, the inside boat is entitled to room to round, provided the overlap was established before the zone (three hull lengths).</p>
                     
                     <p><strong>Example:</strong> If you have an inside overlap as you reach the zone, the outside boat must give you room to round without hitting the mark or them.</p>
                     
                     <p><strong>College Tip:</strong> Don't dive into the inside late — if you create an overlap after the zone, you don't gain rights.</p>
                     
                     <h4>4. Avoiding Contact (Rule 14)</h4>
                     <p>Even if you have right of way, you must avoid contact if it's reasonably possible. Damage or injury can escalate penalties.</p>
                     
                     <p><strong>College Tip:</strong> Sometimes losing a boat length is better than losing a race to a protest committee.</p>
                     
                     <h4>5. Sportsmanship & Misconduct (Rule 69)</h4>
                     <p>Rule 69 covers gross misconduct — serious breaches of sportsmanship, safety, or fairness. This goes beyond tactical infractions and includes behavior that damages the sport's reputation.</p>
                     
                     <p><strong>Examples:</strong> Dangerous sailing, intentionally damaging equipment, or verbal abuse.</p>
                     
                     <p><strong>College Tip:</strong> Remember, collegiate sailing has a strong culture of respect. Your reputation travels faster than your results.</p>
                     
                     <h4>6. Starting & Over-Early (Rule 29)</h4>
                     <p>If you're over the line early at the start, you must return and restart properly. In college sailing, "I" flag or "Black" flag penalties can make early starts costly.</p>
                     
                     <p><strong>College Tip:</strong> Learn to judge line bias and time your approach — clean starts are faster than heroic recoveries.</p>
                     
                     <h4>Bottom Line</h4>
                     <p>You don't need to memorize the entire RRS to be competitive in college sailing, but you do need to know the core right-of-way, mark-room, and conduct rules cold. These principles keep you safe, keep you out of the protest room, and let you focus on what really matters — winning the race.</p>
                     
                     <div class="article-preview-actions">
                         <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                         <button class="btn btn-outline" onclick="shareArticle('Fundamental Rules of Collegiate Racing')">Share Article</button>
                     </div>
                 </div>
             </div>
         `;

         document.body.appendChild(articleModal);

         // Close modal functionality
         const closeBtn = articleModal.querySelector('.modal-close');
         closeBtn.addEventListener('click', () => {
             document.body.removeChild(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 document.body.removeChild(articleModal);
             }
         });
     };

     // Global function for strategy article
     window.showStrategyArticle = function() {
         const articleModal = document.createElement('div');
         articleModal.className = 'article-preview-modal';
         articleModal.innerHTML = `
             <div class="article-preview-content">
                 <div class="article-preview-header">
                     <h3>Racing Strategy Fundamentals</h3>
                     <button class="modal-close">&times;</button>
                 </div>
                 <div class="article-preview-body">
                     <div class="article-meta">
                         <span class="article-date">August 4, 2025</span>
                         <span class="article-category">Racing</span>
                     </div>
                     
                     <p><strong>Sailboat racing is a mix of athletic skill, technical knowledge, and situational awareness.</strong> The best sailors don't just react to the wind and competitors — they anticipate, position, and execute based on a plan. Mastering the fundamentals of starting, mark rounding, and tactical choices will give you the tools to consistently finish at the front.</p>
                     
                     <h4>1. Starting Techniques</h4>
                     <p>The start sets the tone for your race. A great start gives you clean air, control over your lane, and the freedom to sail your own race.</p>
                     
                     <p><strong>Line Analysis:</strong> Before the sequence begins, sight the line to see which end is favored. A line favored by 10–15 degrees can offer a huge advantage off the gun.</p>
                     
                     <p><strong>Positioning:</strong> In shifty or unpredictable conditions, starting near the middle of the line provides flexibility to tack toward better pressure or shifts. In steady conditions or with a strongly favored end, position yourself for a controlled push-off from that end.</p>
                     
                     <p><strong>Acceleration:</strong> Time your approach so you're at full speed right as the horn sounds. Too early, and you risk being over early; too late, and you'll be buried in dirty air.</p>
                     
                     <p><strong>Key Mindset:</strong> Starting is both an art and a fight for space. Be assertive, protect your lane, and commit to your plan in the final 30 seconds.</p>
                     
                     <h4>2. Mark Rounding</h4>
                     <p>Marks are high-traffic zones where races are often won or lost. Smooth, efficient roundings can gain you multiple boat lengths, while poor execution can trap you in bad lanes.</p>
                     
                     <p><strong>Approach Wide, Exit Tight:</strong> This classic rule lets you maintain speed and set up for a strong exit on the new leg.</p>
                     
                     <p><strong>Plan Early:</strong> On the approach, know your tactical priorities — are you setting up for a spinnaker hoist, defending inside overlap rights, or looking to tack right after the rounding?</p>
                     
                     <p><strong>Avoid Fouls:</strong> In crowded roundings, position for clear rights under the Racing Rules of Sailing to avoid costly penalties.</p>
                     
                     <p><strong>Pro Tip:</strong> A clean exit into clear air is often more important than gaining one boat length on the turn itself.</p>
                     
                     <h4>3. Tactical Decision-Making</h4>
                     <p>Tactics are the in-race choices that turn strategy into results. Even with a strong start and clean roundings, smart tactical calls are what keep you ahead.</p>
                     
                     <p><strong>Play the Long Game:</strong> In oscillating winds, sail toward the next predicted shift. In persistent shifts, commit to the favored side early.</p>
                     
                     <p><strong>Prioritize Clear Air:</strong> Even the perfect tactical idea won't work if you're stuck in another boat's wind shadow.</p>
                     
                     <p><strong>Risk vs. Reward:</strong> In fleet racing, taking a high-risk flyer to one side of the course might be worth it if you're behind, but risky if you're leading. Adjust your aggressiveness based on position in the race and series.</p>
                     
                     <h4>Final Thought</h4>
                     <p>A great sailor blends strategy with execution — starting strong, rounding clean, and making decisions that keep them in control of their race. By building these fundamentals into your sailing routine, you'll move from simply reacting to actively shaping the race in your favor.</p>
                     
                     <div class="article-preview-actions">
                         <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                         <button class="btn btn-outline" onclick="shareArticle('Racing Strategy Fundamentals')">Share Article</button>
                     </div>
                 </div>
             </div>
         `;

         document.body.appendChild(articleModal);

         // Close modal functionality
         const closeBtn = articleModal.querySelector('.modal-close');
         closeBtn.addEventListener('click', () => {
             document.body.removeChild(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 document.body.removeChild(articleModal);
             }
         });
     };

     // Global function for starting article
     window.showStartingArticle = function() {
         const articleModal = document.createElement('div');
         articleModal.className = 'article-preview-modal';
         articleModal.innerHTML = `
             <div class="article-preview-content">
                 <div class="article-preview-header">
                     <h3>Starting Strong in Shifty Air</h3>
                     <button class="modal-close">&times;</button>
                 </div>
                 <div class="article-preview-body">
                     <div class="article-meta">
                         <span class="article-date">August 6, 2025</span>
                         <span class="article-category">Racing</span>
                     </div>
                     
                     <p><strong>College sailing's short courses leave little room for recovery — a strong start is your first defense against getting buried.</strong></p>
                     
                     <h4>1. The Middle Advantage in Shifts</h4>
                     <p>In oscillating lake winds, the middle of the line is often safest. From here, you can punch into the first shift and use speed to stay in the front row. Only commit to an end if it's clearly more than 15 degrees favored.</p>
                     
                     <h4>2. Aggressive Lake Starts</h4>
                     <p>World-class sailors start with just as much aggression on lakes as in saltwater. That means accelerating into the line with speed and timing, even in unpredictable conditions. Getting locked out early is far more costly than a small positioning gamble.</p>
                     
                     <h4>3. Transition from Start to Strategy</h4>
                     <p>Once off the line, quickly assess: Are you sailing into more pressure or toward the next shift? In light air, head toward the better breeze. In heavy air, get on the longer tack and play shifts. Always keep your bow aimed toward the mark whenever possible.</p>
                     
                     <h4>Final Thought:</h4>
                     <p>Starting isn't just about being in front at the gun — it's about setting yourself up to play the first beat on your own terms. Master the start, and the rest of the race becomes a lot easier.</p>
                     
                     <div class="article-preview-actions">
                         <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                         <button class="btn btn-outline" onclick="shareArticle('Starting Strong in Shifty Air')">Share Article</button>
                     </div>
                 </div>
             </div>
         `;

         document.body.appendChild(articleModal);

         // Close modal functionality
         const closeBtn = articleModal.querySelector('.modal-close');
         closeBtn.addEventListener('click', () => {
             document.body.removeChild(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 document.body.removeChild(articleModal);
             }
         });
     };

     // Global function for conditions article
     window.showConditionsArticle = function() {
         const articleModal = document.createElement('div');
         articleModal.className = 'article-preview-modal';
         articleModal.innerHTML = `
             <div class="article-preview-content">
                 <div class="article-preview-header">
                     <h3>Different Conditions, Different Sailing</h3>
                     <button class="modal-close">&times;</button>
                 </div>
                 <div class="article-preview-body">
                     <div class="article-meta">
                         <span class="article-date">December 12, 2024</span>
                         <span class="article-category">Racing</span>
                     </div>
                     
                     <p><strong>Not all wind is created equal — and in college racing, adjusting your tactics to match conditions can make or break your scoreline.</strong></p>
                     
                     <h4>1. Light Air: Chase Pressure, Not Shifts</h4>
                     <p>In 5 knots of breeze, a small puff can boost boat speed by 30–40% and improve pointing. Shifts matter less here — prioritize sailing toward better pressure. This might mean taking a short-term header if it positions you for a big velocity gain.</p>
                     
                     <h4>2. Heavy Air: Play the Shifts</h4>
                     <p>When you're overpowered, more wind doesn't help much. A strong puff might even slow you down if you're struggling to depower. Instead, hunt for shifts that put you on a higher ladder rung, letting you sail a shorter course to the mark.</p>
                     
                     <h4>3. The "Longer Tack" Principle</h4>
                     <p>If you're uncertain where the next shift will come from, sail the tack that points you closer to the windward mark. Statistically, this gives you more opportunities to play the middle and react, rather than getting trapped early on a layline.</p>
                     
                     <h4>Takeaway:</h4>
                     <p>Wind velocity and direction don't matter equally in all conditions — know which to prioritize, and you'll consistently stay in the hunt.</p>
                     
                     <div class="article-preview-actions">
                         <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                         <button class="btn btn-outline" onclick="shareArticle('Different Conditions, Different Sailing')">Share Article</button>
                     </div>
                 </div>
             </div>
         `;

         document.body.appendChild(articleModal);

         // Close modal functionality
         const closeBtn = articleModal.querySelector('.modal-close');
         closeBtn.addEventListener('click', () => {
             document.body.removeChild(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 document.body.removeChild(articleModal);
             }
         });
     };

     // Global function for lake sailing article
     window.showLakeSailingArticle = function() {
        const articleModal = document.createElement('div');
        articleModal.className = 'article-preview-modal';
        articleModal.innerHTML = `
            <div class="article-preview-content">
                <div class="article-preview-header">
                    <h3>Collegiate Racing: Mastering Lake Sailing</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="article-preview-body">
                    <div class="article-meta">
                        <span class="article-date">December 15, 2024</span>
                        <span class="article-category">Racing</span>
                    </div>
                    
                    <p><strong>When your team hits the water for a college regatta on a lake, you're entering a playground of shifting winds, subtle geography, and strategic nuance.</strong> While saltwater sailors often focus on tides and ocean breezes, lake racing demands a sharp eye for land effects and puffs.</p>
                    
                    <h4>1. Read the Land to Windward</h4>
                    <p>The shoreline, tree lines, and even nearby buildings will bend, block, or accelerate wind. Look for "geographic sweet spots" — areas that consistently deliver stronger pressure or favorable shifts. Puffs fan out after hitting the water, so positioning yourself at the edges of these fans can keep you in the lift without overshooting.</p>
                    
                    <h4>2. Shoreline Strategy</h4>
                    <p>Wind tends to bend left along a northern hemisphere shoreline, meaning a shore on the left side of the course often pays with port tack lifts. But it's not just "hit the beach" — instead, use the near-shore band's acceleration zones and time your tacks to take advantage of lifted offshore headings.</p>
                    
                    <h4>3. Don't Chase Puffs — Meet Them</h4>
                    <p>The fastest way to the mark is still straight at it. Make only small deviations to intercept a puff you've spotted. Once you understand where puffs consistently touch down, you can position early and sail into them without losing distance.</p>
                    
                    <h4>Bottom Line:</h4>
                    <p>Lake sailing is unpredictable — and that's the fun. A smart college sailor balances patience with aggressive positioning, reading the land as closely as they read the sails.</p>
                    
                    <div class="article-preview-actions">
                        <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                        <button class="btn btn-outline" onclick="shareArticle('Collegiate Racing: Mastering Lake Sailing')">Share Article</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(articleModal);

        // Close modal functionality
        const closeBtn = articleModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(articleModal);
        });

        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                document.body.removeChild(articleModal);
            }
        });
    };

    // Share article functionality
    window.shareArticle = function(title) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'Check out this great sailing article from Aggie Sailing Club!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            const text = `Check out "${title}" from Aggie Sailing Club: ${url}`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Article link copied to clipboard!');
                });
            } else {
                prompt('Copy this link to share:', text);
            }
        }
    };

    function showArticlePreview(title) {
        const previewModal = document.createElement('div');
        previewModal.className = 'article-preview-modal';
        previewModal.innerHTML = `
            <div class="article-preview-content">
                <div class="article-preview-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="article-preview-body">
                    <p>This is a preview of the article "${title}". In a full implementation, this would display the complete article content with proper formatting, images, and navigation.</p>
                    <p>The article would include detailed information, tips, techniques, and insights related to sailing. Users would be able to read the full content, share the article, and leave comments.</p>
                    <div class="article-preview-actions">
                        <button class="btn btn-primary">Read Full Article</button>
                        <button class="btn btn-outline">Share Article</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(previewModal);

        // Close modal functionality
        const closeBtn = previewModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(previewModal);
        });

        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) {
                document.body.removeChild(previewModal);
            }
        });
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
});

// Add CSS for articles page
const style = document.createElement('style');
style.textContent = `
    .article-categories {
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

    .featured-article {
        padding: var(--section-padding);
        background: var(--white);
    }

    .featured-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }

    .featured-image img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .featured-text h2 {
        color: var(--primary-maroon);
        margin-bottom: 1rem;
    }

    .featured-text p {
        color: var(--gray);
        margin-bottom: 1.5rem;
    }

    .articles-section {
        padding: var(--section-padding);
        background: var(--light-gray);
    }

    .articles-section h2 {
        text-align: center;
        color: var(--primary-maroon);
        margin-bottom: 3rem;
    }

    .articles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
    }

    .article-card {
        background: var(--white);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: var(--transition);
    }

    .article-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .article-image {
        height: 200px;
        overflow: hidden;
    }

    .article-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
    }

    .article-card:hover .article-image img {
        transform: scale(1.05);
    }

    .article-content {
        padding: 1.5rem;
    }

    .article-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .article-date {
        color: var(--gray);
    }

    .article-category {
        background: var(--light-maroon);
        color: var(--primary-maroon);
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: 500;
    }

    .article-content h3 {
        color: var(--primary-maroon);
        margin-bottom: 0.5rem;
    }

    .read-more {
        color: var(--primary-maroon);
        text-decoration: none;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: var(--transition);
    }

    .read-more:hover {
        color: var(--secondary-maroon);
    }

    .newsletter-section {
        padding: var(--section-padding);
        background: linear-gradient(135deg, var(--primary-maroon), var(--secondary-maroon));
        color: var(--white);
        text-align: center;
    }

    .newsletter-content h2 {
        color: var(--white);
        margin-bottom: 1rem;
    }

    .newsletter-content p {
        color: var(--light-gray);
        font-size: 1.1rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .newsletter-form {
        max-width: 500px;
        margin: 0 auto;
    }

    .newsletter-form .form-group {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .newsletter-form input {
        flex: 1;
        min-width: 250px;
        padding: 12px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
    }

    .newsletter-form button {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        background: var(--white);
        color: var(--primary-maroon);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition);
    }

    .newsletter-form button:hover {
        background: var(--light-gray);
    }

    .newsletter-success-modal {
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

    .newsletter-success-content {
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

    .article-preview-modal {
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

    .article-preview-content {
        background: var(--white);
        border-radius: 12px;
        padding: 2rem;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }

    .article-preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--light-gray);
        padding-bottom: 1rem;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--gray);
    }

    .article-preview-body {
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .article-preview-body h4 {
        color: var(--primary-maroon);
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }

    .article-preview-body p {
        margin-bottom: 1rem;
        color: var(--gray);
    }

    .article-preview-body strong {
        color: var(--primary-maroon);
    }

    .article-preview-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        .featured-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }

        .articles-grid {
            grid-template-columns: 1fr;
        }

        .newsletter-form .form-group {
            flex-direction: column;
        }

        .newsletter-form input {
            min-width: auto;
        }

        .article-preview-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);
