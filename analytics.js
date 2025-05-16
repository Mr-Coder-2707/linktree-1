// Simple analytics tracking for the Link Hub
document.addEventListener('DOMContentLoaded', function() {
    // Track link clicks
    document.querySelectorAll('a[data-utm]').forEach(link => {
        link.addEventListener('click', function(e) {
            const linkType = this.getAttribute('data-utm');
            
            // Log click event (in a real app, you would send this to your analytics service)
            console.log(`Link click tracked: ${linkType}`);
            
            // Store locally for demo purposes
            const clicks = JSON.parse(localStorage.getItem('link-clicks') || '{}');
            clicks[linkType] = (clicks[linkType] || 0) + 1;
            localStorage.setItem('link-clicks', JSON.stringify(clicks));
            
            // Update click count display if it exists
            const counter = document.querySelector(`[data-count="${linkType}"]`);
            if (counter) {
                counter.textContent = clicks[linkType];
            }
            
            // Create click counters if they don't exist (first time)
            if (!document.querySelector('.click-stats') && 
                Object.keys(clicks).length > 0) {
                createClickStatsUI(clicks);
            }
        });
    });
    
    // Create stats UI from stored click data
    const storedClicks = JSON.parse(localStorage.getItem('link-clicks') || '{}');
    if (Object.keys(storedClicks).length > 0) {
        createClickStatsUI(storedClicks);
    }
    
    // Function to create stats UI
    function createClickStatsUI(clickData) {
        // Only create if it doesn't already exist
        if (document.querySelector('.click-stats')) {
            updateClickStats(clickData);
            return;
        }
        
        const statsContainer = document.createElement('div');
        statsContainer.className = 'click-stats';
        
        let statsHTML = `
            <div class="stats-header">
                <h3>Link Analytics</h3>
                <button type="button" class="toggle-stats"><i class="fas fa-chart-bar"></i></button>
            </div>
            <div class="stats-body">
                <h4>Click Counts</h4>
                <ul class="stats-list">
        `;
        
        for (const [link, count] of Object.entries(clickData)) {
            statsHTML += `
                <li>
                    <span class="link-name">${link}</span>
                    <span class="click-count" data-count="${link}">${count}</span>
                </li>
            `;
        }
        
        statsHTML += `
                </ul>
                <button type="button" class="reset-stats">Reset Stats</button>
            </div>
        `;
        
        statsContainer.innerHTML = statsHTML;
        
        // Add to the page
        document.body.appendChild(statsContainer);
        
        // Toggle stats visibility
        const toggleBtn = statsContainer.querySelector('.toggle-stats');
        toggleBtn.addEventListener('click', function() {
            statsContainer.classList.toggle('expanded');
        });
        
        // Reset stats
        const resetBtn = statsContainer.querySelector('.reset-stats');
        resetBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all click statistics?')) {
                localStorage.removeItem('link-clicks');
                statsContainer.remove();
            }
        });
    }
    
    // Update existing stats UI
    function updateClickStats(clickData) {
        const statsList = document.querySelector('.stats-list');
        if (!statsList) return;
        
        for (const [link, count] of Object.entries(clickData)) {
            let countElem = document.querySelector(`[data-count="${link}"]`);
            
            if (countElem) {
                countElem.textContent = count;
            } else {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="link-name">${link}</span>
                    <span class="click-count" data-count="${link}">${count}</span>
                `;
                statsList.appendChild(li);
            }
        }
    }
});
