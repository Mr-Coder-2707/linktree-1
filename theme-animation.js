// Advanced theme toggle animation script
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.getElementById('theme-switch');
    const themeSun = document.querySelector('.fa-sun');
    const themeMoon = document.querySelector('.fa-moon');
    
    // Add click animation
    themeSwitch.addEventListener('click', function() {
        // Add rotation animation
        this.classList.add('rotate-animation');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('rotate-animation');
        }, 500);
        
        // Scale effect for sun/moon icons
        if (document.body.classList.contains('dark-mode')) {
            themeMoon.style.transform = 'scale(1.5)';
            themeSun.style.transform = 'scale(0)';
            setTimeout(() => {
                themeMoon.style.transform = 'scale(1)';
                themeSun.style.transform = 'scale(1)';
            }, 300);
        } else {
            themeSun.style.transform = 'scale(1.5)';
            themeMoon.style.transform = 'scale(0)';
            setTimeout(() => {
                themeSun.style.transform = 'scale(1)';
                themeMoon.style.transform = 'scale(1)';
            }, 300);
        }
    });
    
    // Change page meta theme-color when theme changes
    function updateMetaThemeColor() {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        if (document.body.classList.contains('dark-mode')) {
            metaThemeColor.content = '#2C3E50'; // Dark theme color
        } else {
            metaThemeColor.content = '#E8F5E9'; // Light theme color
        }
    }
    
    // Update meta theme color on init and when theme changes
    updateMetaThemeColor();
    themeSwitch.addEventListener('click', updateMetaThemeColor);
    
    // Apply smooth transitions to all elements when theme changes
    function prepareTransition() {
        document.body.classList.add('prepare-transition');
        setTimeout(() => {
            document.body.classList.remove('prepare-transition');
        }, 300);
    }
    
    themeSwitch.addEventListener('click', prepareTransition);
});
