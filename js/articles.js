// Articles page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Helper function to safely remove modals
    function removeModal(modal) {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }
    // Article category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    const articleCards = document.querySelectorAll('.article-card');

    // Only add event listeners if category cards exist
    if (categoryCards.length > 0) {
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
    }

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
                <button class="btn btn-primary" onclick="removeModal(this.closest('.newsletter-success-modal'))">Close</button>
            </div>
        `;

        document.body.appendChild(successModal);
    }

    // Article card hover effects
    if (articleCards.length > 0) {
        articleCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Read more functionality
    const readMoreLinks = document.querySelectorAll('.read-more');
    if (readMoreLinks.length > 0) {
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
                 } else if (articleTitle.includes('Reading Weather Patterns')) {
                     showWeatherPatternsArticle();
                 } else if (articleTitle.includes('Advanced Sailing Techniques')) {
                     showAdvancedTechniquesArticle();
                 } else if (articleTitle.includes('Essential Safety Equipment')) {
                     showSafetyEquipmentArticle();
                 } else {
                     // In a real application, this would navigate to the full article
                     showArticlePreview(articleTitle);
                 }
            });
        });
    }

         // Global function for C420 maintenance article
     window.showC420MaintenanceArticle = function() {
         const articleModal = document.createElement('div');
         articleModal.className = 'article-preview-modal';
         articleModal.innerHTML = `
             <div class="article-preview-content">
                 <div class="article-preview-header">
                     <h3 style="color: var(--primary-maroon);">C420 Maintenance Basics</h3>
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
             removeModal(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 removeModal(articleModal);
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
                     <h3 style="color: var(--primary-maroon);">Fundamental Rules of Collegiate Racing</h3>
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
             removeModal(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 removeModal(articleModal);
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
                     <h3 style="color: var(--primary-maroon);">Racing Strategy Fundamentals</h3>
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
             removeModal(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 removeModal(articleModal);
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
                     <h3 style="color: var(--primary-maroon);">Starting Strong in Shifty Air</h3>
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
             removeModal(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 removeModal(articleModal);
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
                     <h3 style="color: var(--primary-maroon);">Different Conditions, Different Sailing</h3>
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
             removeModal(articleModal);
         });

         articleModal.addEventListener('click', (e) => {
             if (e.target === articleModal) {
                 removeModal(articleModal);
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
                    <h3 style="color: var(--primary-maroon);">Collegiate Racing: Mastering Lake Sailing</h3>
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
            removeModal(articleModal);
        });

        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                removeModal(articleModal);
            }
        });
    };

     // Global function for weather patterns article
     window.showWeatherPatternsArticle = function() {
        const articleModal = document.createElement('div');
        articleModal.className = 'article-preview-modal';
        articleModal.innerHTML = `
            <div class="article-preview-content">
                <div class="article-preview-header">
                    <h3 style="color: var(--primary-maroon);">Reading Wind Patterns: Lessons for Collegiate C420 Sailors</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="article-preview-body">
                    <div class="article-meta">
                        <span class="article-date">August 10, 2025</span>
                        <span class="article-category">Safety</span>
                    </div>
                    
                    <p><strong>As a coach working with sailors who aspire to the Olympic level, I've learned that the single greatest separator in competitive doublehanded dinghy sailing is not boat handling, athleticism, or even tactics—it's the ability to read the wind.</strong> At the collegiate level, where most regattas are sailed in C420s, success comes down to anticipation. You don't just react to what's in front of you—you position your boat to meet the wind that's about to arrive.</p>
                    
                    <h4>Start with the Big Picture</h4>
                    <p>When you first arrive at the venue, resist the urge to rig immediately. Spend five minutes looking at the racecourse and surroundings. Ask yourself: Where is the wind coming from relative to the land and water features? Are there trees, buildings, or cliffs that might cause shifts or puffs? Is there cloud cover, sunshine, or thermal activity that could change the breeze throughout the day?</p>
                    
                    <p>Good sailors observe the water. Great sailors connect what they see on the water with what they see in the sky and on the shore.</p>
                    
                    <h4>Spotting Puffs and Lulls</h4>
                    <p>In the C420, puffs mean speed—and speed means options. Train your eye to pick out darker patches on the water. That's where wind is compressing the surface. Conversely, lighter, glassier areas signal lulls.</p>
                    
                    <p>A common mistake for collegiate sailors is to assume every puff is the same. Instead, look for consistency. Is the breeze marching down in a steady pattern, or are the puffs oscillating back and forth?</p>
                    
                    <p><strong>As a rule:</strong> Sail toward pressure when possible. A boat in more wind will almost always beat a boat in less wind, even on the "wrong" shift. Anticipate the angle—not all puffs come straight downwind. Watch how earlier puffs hit other boats before they reach you.</p>
                    
                    <h4>Understanding Shifts</h4>
                    <p>Wind rarely blows straight for long. At the college level, the two most common patterns are oscillating shifts and persistent shifts:</p>
                    
                    <p><strong>Oscillating:</strong> The wind swings back and forth around an average direction. Your job is to "play the shifts"—sail on the lifted tack and tack when you get headed.</p>
                    
                    <p><strong>Persistent:</strong> The wind slowly but steadily shifts in one direction, often due to a weather system moving through or a thermal building. Here, getting to the correct side early is critical.</p>
                    
                    <p>Olympic-level sailors excel at recognizing which pattern is developing. As a collegiate sailor, ask yourself: Is the shift I just got part of a trend, or is it going to come back?</p>
                    
                    <h4>Team Communication</h4>
                    <p>In the C420, both skipper and crew are responsible for wind awareness. I coach crews to keep their eyes up the course, scanning constantly for pressure and shifts, while the skipper manages the boat.</p>
                    
                    <p>Communication should be clear and constant: "Puff in three, coming from the right," or "Shift left after this lull." The sooner you process the information, the less rushed your tactical decisions will feel.</p>
                    
                    <h4>Building a Routine</h4>
                    <p>Reading the wind isn't luck—it's a skill. At practice and regattas, I encourage sailors to:</p>
                    
                    <ul>
                        <li>Call puffs early during warm-ups to test your accuracy.</li>
                        <li>Track oscillations with a compass or visual landmarks to feel the rhythm.</li>
                        <li>Review between races what you saw and how it played out.</li>
                    </ul>
                    
                    <p>Over time, you'll notice patterns repeat themselves, and you'll begin to trust your instincts.</p>
                    
                    <h4>Final Thoughts</h4>
                    <p>The sailors who win consistently in college sailing are not necessarily the fastest in straight-line boat speed. They are the ones who know what the wind is going to do before their competitors. If you want to take your sailing to the next level, dedicate yourself to learning the language of the wind. It's the one teammate you can't control—but if you can read it better than the rest of the fleet, it will work for you instead of against you.</p>
                    
                    <div class="article-preview-actions">
                        <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                        <button class="btn btn-outline" onclick="shareArticle('Reading Wind Patterns: Lessons for Collegiate C420 Sailors')">Share Article</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(articleModal);

        // Close modal functionality
        const closeBtn = articleModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            removeModal(articleModal);
        });

        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                removeModal(articleModal);
            }
        });
    };

    // Global function for Advanced Sailing Techniques article
    window.showAdvancedTechniquesArticle = function() {
        const articleModal = document.createElement('div');
        articleModal.className = 'article-preview-modal';
        articleModal.innerHTML = `
            <div class="article-preview-content">
                <div class="article-preview-header">
                    <h3 style="color: var(--primary-maroon);">Advanced Sailing Techniques</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="article-preview-body">
                    <div class="article-meta">
                        <span class="article-date">August 10, 2025</span>
                        <span class="article-category">Techniques</span>
                    </div>
                    
                    <p><strong>Mastering advanced sailing techniques is the key to becoming a competitive sailor.</strong> While basic sailing skills get you on the water, advanced techniques separate the weekend sailors from the racers. These skills require practice, patience, and a deep understanding of how your boat responds to different conditions.</p>
                    
                    <h4>1. Perfecting Your Tacking</h4>
                    <p><strong>Timing is Everything:</strong> The key to a smooth tack is coordinating your movements with the boat's momentum. Begin your turn just before the wind hits your face, and complete the tack before the boat loses too much speed.</p>
                    
                    <p><strong>Body Position:</strong> Keep your weight centered and low during the tack. Move smoothly across the boat, maintaining balance throughout the maneuver.</p>
                    
                    <p><strong>Sheet Management:</strong> Release the jib sheet just before the bow crosses the wind, then quickly trim the new sheet as the sail fills on the new tack.</p>
                    
                    <h4>2. Mastering the Jibe</h4>
                    <p><strong>Controlled Speed:</strong> Jibing requires more control than tacking. Reduce speed slightly before the jibe to maintain control, especially in stronger winds.</p>
                    
                    <p><strong>Boom Control:</strong> Use the mainsheet to control the boom's movement during the jibe. A controlled boom prevents accidental jibes and reduces the risk of injury.</p>
                    
                    <p><strong>Weight Distribution:</strong> Shift your weight to the new windward side as the boom comes across, helping to keep the boat flat and stable.</p>
                    
                    <h4>3. Sail Trim Optimization</h4>
                    <p><strong>Upwind Sailing:</strong> Keep the sails flat and tight when sailing upwind. The jib should be trimmed so the telltales flow evenly, and the main should be sheeted in enough to prevent excessive heeling.</p>
                    
                    <p><strong>Downwind Sailing:</strong> Ease the sails to catch more wind when sailing downwind. The main can be let out further, and the jib can be flown on the opposite side (wing-on-wing) for maximum speed.</p>
                    
                    <p><strong>Reaching:</strong> Find the sweet spot between upwind and downwind trim. The sails should be eased but not so much that they luff.</p>
                    
                    <h4>4. Advanced Boat Handling</h4>
                    <p><strong>Roll Tacking:</strong> Use your body weight to help the boat turn more quickly during tacks. As you begin the tack, roll your weight to windward, then quickly move to the new windward side as the boat comes through the wind.</p>
                    
                    <p><strong>Hiking Technique:</strong> Extend your legs and keep your back straight when hiking. This position maximizes your leverage and keeps you comfortable for longer periods.</p>
                    
                    <p><strong>Weight Placement:</strong> Position your weight to keep the boat flat and level. In light air, move forward to reduce wetted surface area. In heavy air, move aft to help the bow rise over waves.</p>
                    
                    <h4>5. Racing Techniques</h4>
                    <p><strong>Starting Line Strategy:</strong> Position yourself for a clear start with room to accelerate. Avoid being trapped at the line or forced into a bad position by other boats.</p>
                    
                    <p><strong>Mark Roundings:</strong> Plan your approach to marks well in advance. Consider the wind direction, current, and other boats when deciding on your rounding strategy.</p>
                    
                    <p><strong>Laylines:</strong> Learn to judge laylines accurately. Sailing too far past the layline wastes time, while tacking too early can leave you short of the mark.</p>
                    
                    <p>Remember, these techniques take time to master. Practice each one individually before combining them in racing situations. The best sailors are those who can execute these maneuvers consistently under pressure.</p>
                    
                    <div class="article-preview-actions">
                        <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                        <button class="btn btn-outline" onclick="shareArticle('Advanced Sailing Techniques')">Share Article</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(articleModal);

        // Close modal functionality
        const closeBtn = articleModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            removeModal(articleModal);
        });

        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                removeModal(articleModal);
            }
        });
    };

    // Global function for Essential Safety Equipment article
    window.showSafetyEquipmentArticle = function() {
        const articleModal = document.createElement('div');
        articleModal.className = 'article-preview-modal';
        articleModal.innerHTML = `
            <div class="article-preview-content">
                <div class="article-preview-header">
                    <h3 style="color: var(--primary-maroon);">Essential Safety Equipment</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="article-preview-body">
                    <div class="article-meta">
                        <span class="article-date">November 10, 2024</span>
                        <span class="article-category">Safety</span>
                    </div>
                    
                    <p><strong>Safety should always be your top priority when sailing.</strong> Having the right safety equipment on board can mean the difference between a minor inconvenience and a serious emergency. This guide covers the essential safety equipment every sailor should have, whether you're racing or cruising.</p>
                    
                    <h4>1. Personal Flotation Devices (PFDs)</h4>
                    <p><strong>Type I PFDs:</strong> These are the most buoyant and are designed for offshore use. They're bulky but provide the most protection in rough conditions.</p>
                    
                    <p><strong>Type III PFDs:</strong> These are the most common for recreational sailing and racing. They're comfortable to wear and allow for good mobility while providing adequate buoyancy.</p>
                    
                    <p><strong>Inflatable PFDs:</strong> These are compact and comfortable but require regular maintenance and inspection. They're popular among experienced sailors.</p>
                    
                    <p><strong>Important:</strong> Always wear your PFD when on the water, especially in cold water or when sailing alone.</p>
                    
                    <h4>2. Communication Equipment</h4>
                    <p><strong>VHF Radio:</strong> Essential for communicating with other boats, marinas, and emergency services. Make sure you know how to use it and have the proper licenses if required.</p>
                    
                    <p><strong>Cell Phone:</strong> Keep your phone in a waterproof case and ensure it's fully charged before heading out. Consider bringing a portable charger.</p>
                    
                    <p><strong>Emergency Beacon:</strong> For offshore sailing, consider carrying an EPIRB (Emergency Position Indicating Radio Beacon) or PLB (Personal Locator Beacon).</p>
                    
                    <h4>3. Navigation and Signaling</h4>
                    <p><strong>Compass:</strong> A reliable compass is essential for navigation, especially when electronic devices fail.</p>
                    
                    <p><strong>Flares:</strong> Carry both handheld and aerial flares for emergency signaling. Check expiration dates regularly.</p>
                    
                    <p><strong>Whistle:</strong> A simple but effective way to signal for help. Attach it to your PFD.</p>
                    
                    <p><strong>Mirror:</strong> A signaling mirror can be used to attract attention during daylight hours.</p>
                    
                    <h4>4. First Aid and Emergency</h4>
                    <p><strong>First Aid Kit:</strong> Stock it with bandages, antiseptic, pain relievers, and any personal medications. Include a first aid manual.</p>
                    
                    <p><strong>Emergency Blanket:</strong> Lightweight and compact, these can help prevent hypothermia in emergency situations.</p>
                    
                    <p><strong>Knife:</strong> A sharp, accessible knife can be crucial for cutting lines or freeing yourself from entanglements.</p>
                    
                    <p><strong>Flashlight:</strong> Waterproof flashlight with extra batteries for emergency lighting.</p>
                    
                    <h4>5. Weather and Safety Monitoring</h4>
                    <p><strong>Weather Radio:</strong> Stay informed about changing weather conditions.</p>
                    
                    <p><strong>Barometer:</strong> Monitor atmospheric pressure changes that can indicate approaching storms.</p>
                    
                    <p><strong>Anemometer:</strong> Measure wind speed to make informed decisions about when to reef or seek shelter.</p>
                    
                    <h4>6. Maintenance and Inspection</h4>
                    <p><strong>Regular Checks:</strong> Inspect all safety equipment regularly, especially before long trips or races.</p>
                    
                    <p><strong>Expiration Dates:</strong> Keep track of expiration dates for flares, fire extinguishers, and other time-sensitive equipment.</p>
                    
                    <p><strong>Proper Storage:</strong> Store equipment in accessible locations and protect it from moisture and damage.</p>
                    
                    <p>Remember, having safety equipment is only part of the equation. Knowing how to use it properly and maintaining it regularly is equally important. Take the time to practice with your equipment and ensure everyone on board knows where it's located and how to use it.</p>
                    
                    <div class="article-preview-actions">
                        <button class="btn btn-primary" onclick="this.closest('.article-preview-modal').remove()">Close Article</button>
                        <button class="btn btn-outline" onclick="shareArticle('Essential Safety Equipment')">Share Article</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(articleModal);

        // Close modal functionality
        const closeBtn = articleModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            removeModal(articleModal);
        });

        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                removeModal(articleModal);
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
                    <h3 style="color: var(--primary-maroon);">${title}</h3>
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
            removeModal(previewModal);
        });

        previewModal.addEventListener('click', (e) => {
            if (e.target === previewModal) {
                removeModal(previewModal);
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


