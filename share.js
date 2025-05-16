// Share functionality for Link Hub
document.addEventListener('DOMContentLoaded', function() {
    // Create share button
    const footer = document.querySelector('footer');
    const shareButton = document.createElement('button');
    shareButton.type = 'button';
    shareButton.id = 'share-button';
    shareButton.className = 'btn small-button';
    shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Share';
    
    // Append to customize section
    const customizeSection = document.querySelector('.customize-section');
    customizeSection.appendChild(shareButton);
    
    // Create share modal
    const shareModal = document.createElement('div');
    shareModal.className = 'share-modal';
    shareModal.innerHTML = `
        <div class="share-modal-content">
            <h3>Share My Profile</h3>
            <div class="share-options">
                <a href="#" class="share-option" id="share-facebook">
                    <i class="fab fa-facebook"></i>
                    <span>Facebook</span>
                </a>
                <a href="#" class="share-option" id="share-twitter">
                    <i class="fab fa-twitter"></i>
                    <span>Twitter</span>
                </a>
                <a href="#" class="share-option" id="share-whatsapp">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </a>
                <a href="#" class="share-option" id="share-linkedin">
                    <i class="fab fa-linkedin"></i>
                    <span>LinkedIn</span>
                </a>
            </div>
            <div class="share-link-container">
                <input type="text" id="share-link" value="${window.location.href}" readonly>
                <button type="button" id="copy-link"><i class="fas fa-copy"></i></button>
            </div>
            <p id="copy-message" class="small-text">Click to copy link</p>
            <button type="button" class="close-share">&times;</button>
        </div>
    `;
    
    document.body.appendChild(shareModal);
    
    // Share button click
    shareButton.addEventListener('click', function() {
        shareModal.classList.add('active');
    });
    
    // Close share modal
    const closeShare = document.querySelector('.close-share');
    closeShare.addEventListener('click', function() {
        shareModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    shareModal.addEventListener('click', function(e) {
        if (e.target === shareModal) {
            shareModal.classList.remove('active');
        }
    });
    
    // Copy link functionality
    const copyLink = document.getElementById('copy-link');
    const shareLinkInput = document.getElementById('share-link');
    const copyMessage = document.getElementById('copy-message');
    
    copyLink.addEventListener('click', function() {
        shareLinkInput.select();
        document.execCommand('copy');
        
        copyMessage.textContent = 'Link copied!';
        setTimeout(function() {
            copyMessage.textContent = 'Click to copy link';
        }, 2000);
    });
    
    // Social sharing links
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(document.title);
    
    document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
    document.getElementById('share-whatsapp').href = `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`;
    document.getElementById('share-linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
    
    // Open in new window
    const shareOptions = document.querySelectorAll('.share-option');
    shareOptions.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href, 'share-window', 'width=600,height=400');
        });
    });
    
    // Web Share API (for mobile)
    if (navigator.share) {
        const nativeShareBtn = document.createElement('button');
        nativeShareBtn.type = 'button';
        nativeShareBtn.className = 'btn share-native-btn';
        nativeShareBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Share on Device';
        
        document.querySelector('.share-options').after(nativeShareBtn);
        
        nativeShareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
    }
});
