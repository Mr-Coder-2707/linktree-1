// Color Scheme Customizer
document.addEventListener('DOMContentLoaded', function() {
    const customizeButton = document.getElementById('customize-button');
    const root = document.documentElement;
    
    // Predefined color schemes
    const colorSchemes = [
        {
            name: 'Blue (Default)',
            primaryColor: '#4A89DC',
            secondaryColor: '#5D9CEC',
            accentColor: '#48CFAD'
        },
        {
            name: 'Purple Dream',
            primaryColor: '#9B59B6',
            secondaryColor: '#8E44AD',
            accentColor: '#2ECC71'
        },
        {
            name: 'Sunset Orange',
            primaryColor: '#E67E22',
            secondaryColor: '#D35400',
            accentColor: '#3498DB'
        },
        {
            name: 'Minty Fresh',
            primaryColor: '#1ABC9C',
            secondaryColor: '#16A085',
            accentColor: '#E74C3C'
        },
        {
            name: 'Ruby Red',
            primaryColor: '#E74C3C',
            secondaryColor: '#C0392B',
            accentColor: '#3498DB'
        }
    ];
    
    // Create customizer panel
    function createCustomizerPanel() {
        // Create panel container
        const panel = document.createElement('div');
        panel.className = 'customizer-panel';
        panel.innerHTML = `
            <div class="customizer-header">
                <h3>Customize Colors</h3>
                <button type="button" class="close-customizer">&times;</button>
            </div>
            <div class="customizer-body">
                <h4>Color Schemes</h4>
                <div class="color-schemes"></div>
                <h4>Custom Colors</h4>                <div class="custom-colors">
                    <div class="color-picker" data-color-value="${colorSchemes[0].primaryColor}">
                        <label>Primary Color</label>
                        <input type="color" id="primary-color" value="${colorSchemes[0].primaryColor}">
                    </div>
                    <div class="color-picker" data-color-value="${colorSchemes[0].secondaryColor}">
                        <label>Secondary Color</label>
                        <input type="color" id="secondary-color" value="${colorSchemes[0].secondaryColor}">
                    </div>
                    <div class="color-picker" data-color-value="${colorSchemes[0].accentColor}">
                        <label>Accent Color</label>
                        <input type="color" id="accent-color" value="${colorSchemes[0].accentColor}">
                    </div>
                </div>
                <button type="button" class="apply-colors">Apply Custom Colors</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Add color scheme buttons
        const schemesContainer = panel.querySelector('.color-schemes');
        
        colorSchemes.forEach(scheme => {
            const schemeBtn = document.createElement('button');
            schemeBtn.type = 'button';
            schemeBtn.className = 'scheme-btn';
            schemeBtn.innerHTML = `
                <span class="scheme-color" style="background-color: ${scheme.primaryColor}"></span>
                <span class="scheme-color" style="background-color: ${scheme.secondaryColor}"></span>
                <span class="scheme-color" style="background-color: ${scheme.accentColor}"></span>
                <span class="scheme-name">${scheme.name}</span>
            `;
            schemeBtn.addEventListener('click', () => {
                applyColorScheme(scheme);
            });
            schemesContainer.appendChild(schemeBtn);
        });
        
        // Add event listeners to update color value text
        const colorInputs = panel.querySelectorAll('input[type="color"]');
        colorInputs.forEach(input => {
            const colorPicker = input.closest('.color-picker');
            
            // Initial value
            colorPicker.setAttribute('data-color-value', input.value.toUpperCase());
            
            // Update on change
            input.addEventListener('input', function() {
                colorPicker.setAttribute('data-color-value', this.value.toUpperCase());
            });
        });
        
        // Close customizer
        const closeBtn = panel.querySelector('.close-customizer');
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('active');
        });
          // Apply custom colors
        const applyBtn = panel.querySelector('.apply-colors');
        applyBtn.addEventListener('click', () => {
            // Get color picker elements within the panel, not by document.getElementById
            const primaryColor = panel.querySelector('#primary-color').value;
            const secondaryColor = panel.querySelector('#secondary-color').value;
            const accentColor = panel.querySelector('#accent-color').value;
            
            console.log("Applying custom colors:", primaryColor, secondaryColor, accentColor);
            
            applyColorScheme({
                primaryColor,
                secondaryColor,
                accentColor
            });
            
            // Show visual feedback
            applyBtn.textContent = "Colors Applied!";
            setTimeout(() => {
                applyBtn.textContent = "Apply Custom Colors";
            }, 2000);
        });
        
        return panel;
    }
      // Apply color scheme
    function applyColorScheme(scheme) {
        // Apply the colors to the document root
        root.style.setProperty('--primary-color', scheme.primaryColor);
        root.style.setProperty('--secondary-color', scheme.secondaryColor);
        root.style.setProperty('--accent-color', scheme.accentColor);
        
        // Update color pickers if they exist
        const primaryPicker = panel.querySelector('#primary-color');
        const secondaryPicker = panel.querySelector('#secondary-color');
        const accentPicker = panel.querySelector('#accent-color');
        
        if (primaryPicker) primaryPicker.value = scheme.primaryColor;
        if (secondaryPicker) secondaryPicker.value = scheme.secondaryColor;
        if (accentPicker) accentPicker.value = scheme.accentColor;
        
        // Save to localStorage
        localStorage.setItem('color-scheme', JSON.stringify({
            primaryColor: scheme.primaryColor,
            secondaryColor: scheme.secondaryColor,
            accentColor: scheme.accentColor
        }));
        
        // Apply colors to elements that might need immediate update
        updateDynamicElements(scheme);
    }
    
    // Update any dynamic elements that need immediate color change
    function updateDynamicElements(scheme) {
        // Update elements that might need immediate refresh
        const buttons = document.querySelectorAll('.primary-button, .contact-button, .subscribe-btn');
        buttons.forEach(button => {
            button.style.backgroundColor = scheme.primaryColor;
        });
        
        // Update social icons hover color
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.backgroundColor = scheme.primaryColor;
            });
            icon.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    }
      // Initialize
    const panel = createCustomizerPanel();
    
    // Make panel accessible globally in this scope
    window.customizePanel = panel;
    
    // Toggle panel visibility when customize button is clicked
    customizeButton.addEventListener('click', function() {
        panel.classList.toggle('active');
    });
    
    // Click outside to close
    document.addEventListener('click', function(event) {
        if (panel.classList.contains('active') && 
            !panel.contains(event.target) && 
            event.target !== customizeButton && 
            !customizeButton.contains(event.target)) {
            panel.classList.remove('active');
        }
    });
    
    // Load saved color scheme if exists
    const savedScheme = localStorage.getItem('color-scheme');
    if (savedScheme) {
        try {
            const colorData = JSON.parse(savedScheme);
            applyColorScheme(colorData);
            console.log("Loaded saved color scheme:", colorData);
        } catch (error) {
            console.error("Error loading saved color scheme:", error);
            localStorage.removeItem('color-scheme');
        }
    }
    
    // Add keypress handler to close panel with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            panel.classList.remove('active');
        }
    });
});
