// Main JavaScript functionality for the Link Hub

document.addEventListener('DOMContentLoaded', function() {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
        }, 500);
    });
    
    // Set copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Check for user's preferred theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Check for previously saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    }
    
    // Contact popup functionality
    const contactBtn = document.getElementById('contact-btn');
    const contactPopup = document.getElementById('contact-popup');
    const closePopup = document.getElementById('close-popup');
    
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        contactPopup.style.display = 'flex';
    });
    
    closePopup.addEventListener('click', function() {
        contactPopup.style.display = 'none';
    });
    
    // Close popup when clicking outside
    contactPopup.addEventListener('click', function(e) {
        if (e.target === contactPopup) {
            contactPopup.style.display = 'none';
        }
    });      // Language toggle functionality with dropdown
    const languageSwitch = document.getElementById('language-switch');
    const languageItems = document.querySelectorAll('.dropdown-item[data-lang]');
    
    // Check for previously saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.documentElement.lang = savedLanguage;
    
    // Set initial state
    updateLanguageDisplay(savedLanguage);
    
    // Apply saved language on page load
    applyTranslations(savedLanguage);
    
    // Add click event listeners to dropdown items
    languageItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = this.getAttribute('data-lang');
            
            // Update language display
            updateLanguageDisplay(newLang);
            
            // Save preference
            localStorage.setItem('language', newLang);
            
            // Apply translations
            applyTranslations(newLang);
        });
    });    // Function to update language display
    function updateLanguageDisplay(lang) {
        // Update language indicator
        const langDisplay = lang === 'en' ? 'EN' : lang === 'ar' ? 'AR' : 'FR';
        document.querySelector('.lang-display').textContent = langDisplay;
        
        // Set RTL direction for Arabic
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Here you would normally send this to a server
                alert('Thank you for subscribing! You\'ll receive updates soon.');
                emailInput.value = '';
            }
        });
    }
      // Customize panel (handled in customizer.js)
    // Remove the alert since we now have a proper customizer panel
    
    // YouTube embed placeholder
    const placeholderEmbed = document.querySelector('.placeholder-embed');
    if (placeholderEmbed) {
        placeholderEmbed.addEventListener('click', function() {
            const videoContainer = this.parentElement;
            // Replace with an actual YouTube embed
            videoContainer.innerHTML = `
                <iframe class="responsive-iframe" 
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1" 
                    title="YouTube video" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        });
    }
      // UTM tracking has been removed
    // Lazy load images for performance
    const lazyImages = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }

    // Scroll reveal functionality
    const sections = document.querySelectorAll('section, header, footer');
    
    // Add reveal class to all sections
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Check if sections are in viewport
    function checkSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('active');
            }
        });
    }
    
    // Run check on initial load
    checkSections();
    
    // Run check on scroll
    window.addEventListener('scroll', checkSections);
});

// Function to apply translations
function applyTranslations(lang) {
    if (!translations || !translations[lang]) {
        console.error('Translation not found for language:', lang);
        return;
    }
    
    // Get all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Special handling for placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Special handling for tooltips
    document.querySelectorAll('[data-i18n-tooltip]').forEach(element => {
        const key = element.getAttribute('data-i18n-tooltip');
        if (translations[lang][key]) {
            element.title = translations[lang][key];
        }
    });
}

// Accessibility enhancement - enable keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const contactPopup = document.getElementById('contact-popup');
        if (contactPopup && contactPopup.style.display === 'flex') {
            contactPopup.style.display = 'none';
        }
    }
});