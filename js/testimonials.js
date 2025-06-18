// Testimonials slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    let activeIndex = 0;
    let interval;
    
    // Initialize dots click handlers
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            activateTestimonial(index);
            resetInterval();
        });
    });
    
    // Function to activate a specific testimonial
    function activateTestimonial(index) {
        // Remove active class from all testimonials and dots
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        // Add active class to selected testimonial and dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update active index
        activeIndex = index;
    }
    
    // Function to move to next testimonial
    function nextTestimonial() {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        activateTestimonial(nextIndex);
    }
    
    // Start automatic rotation
    function startInterval() {
        interval = setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
    }
    
    // Reset interval after manual interaction
    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }
    
    // Start the automatic rotation
    startInterval();
    
    // Pause rotation when hovering over testimonials
    const testimonialsContainer = document.querySelector('.testimonials-container');
    testimonialsContainer.addEventListener('mouseenter', function() {
        clearInterval(interval);
    });
    
    testimonialsContainer.addEventListener('mouseleave', function() {
        startInterval();
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialsContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    testimonialsContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        // Detect swipe direction
        if (touchEndX < touchStartX - 50) {
            // Swipe left, show next
            let nextIndex = activeIndex + 1;
            if (nextIndex >= testimonials.length) {
                nextIndex = 0;
            }
            activateTestimonial(nextIndex);
            resetInterval();
        }
        
        if (touchEndX > touchStartX + 50) {
            // Swipe right, show previous
            let prevIndex = activeIndex - 1;
            if (prevIndex < 0) {
                prevIndex = testimonials.length - 1;
            }
            activateTestimonial(prevIndex);
            resetInterval();
        }
    }
});
