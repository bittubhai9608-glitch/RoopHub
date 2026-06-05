// VideoHub - Enhanced JavaScript File
// Optimized for both mobile and desktop users with video filtering

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Initialize all components
    initMobileMenu();
    initMobileSearch();
    initSmoothScroll();
    initVideoCards();
    initSearch();
    initAnimations();
    initFilterButtons();
    initTouchGestures();
    initScrollIndicators();
    initHeaderSlideshow();
}

// ==========================================
// MOBILE MENU FUNCTIONALITY
// ==========================================
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navbar || !navLinks) return;

    // Create mobile menu toggle if it doesn't exist
    let toggle = document.querySelector('.mobile-menu-toggle');
    if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-label', 'Toggle navigation menu');
        navbar.insertBefore(toggle, navLinks);
    }

    // Toggle menu on click
    toggle.addEventListener('click', function() {
        const isActive = navLinks.classList.toggle('active');
        toggle.classList.toggle('active', isActive);
        toggle.innerHTML = isActive ? '✕' : '☰';
        
        // Update ARIA attributes
        toggle.setAttribute('aria-expanded', isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
            toggle.innerHTML = '☰';
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
            toggle.innerHTML = '☰';
            document.body.style.overflow = '';
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                toggle.classList.remove('active');
                toggle.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        }, 250);
    });
}

// ==========================================
// MOBILE SEARCH FUNCTIONALITY
// ==========================================
function initMobileSearch() {
    const searchBox = document.querySelector('.search-box');
    const navbar = document.querySelector('.navbar');
    
    if (!searchBox || !navbar) return;

    // Create mobile search toggle for small screens
    if (window.innerWidth <= 768) {
        const searchToggle = document.createElement('button');
        searchToggle.className = 'mobile-search-toggle';
        searchToggle.innerHTML = '🔍';
        searchToggle.setAttribute('aria-label', 'Toggle search');
        
        // Insert before search box
        navbar.insertBefore(searchToggle, searchBox);
        
        searchToggle.addEventListener('click', function() {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchBox.querySelector('input').focus();
            }
        });
    }
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Account for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// ==========================================
// VIDEO CARD INTERACTIONS
// ==========================================
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        // Click to open video player
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link inside
            if (e.target.closest('a')) return;
            
            const videoTitle = this.querySelector('h4').textContent;
            const videoCategory = this.querySelector('p').textContent;
            const duration = this.querySelector('.duration')?.textContent || '0:00';
            const isShort = this.classList.contains('portrait');
            
            showVideoPlayer(videoTitle, videoCategory, duration, isShort);
        });
        
        // Enhanced hover effects for desktop
        if (!isMobileDevice()) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Check if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// ==========================================
// VIDEO PLAYER MODAL
// ==========================================
function showVideoPlayer(title, category, duration, isShort) {
    // Remove existing modal if any
    const existingModal = document.getElementById('videoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'videoModal';
    modal.className = 'video-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', `Video player for ${title}`);
    
    // Determine aspect ratio based on video type
    const aspectRatio = isShort ? '9:16' : '16:9';
    const playerPadding = isShort ? '177.78%' : '56.25%';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modalTitle">${escapeHtml(title)}</h3>
                <button class="modal-close" aria-label="Close video player">&times;</button>
            </div>
            <div class="modal-body">
                <div class="video-player" style="padding-top: ${playerPadding}; max-width: ${isShort ? '400px' : '100%'}; margin: 0 auto;">
                    <div class="video-placeholder-large">
                        <span class="play-icon-large">▶</span>
                        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">${escapeHtml(title)}</p>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Category: ${escapeHtml(category)}</p>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Duration: ${duration} | Format: ${aspectRatio}</p>
                        <p class="video-note">Demo Mode - Integrate with actual video source</p>
                    </div>
                </div>
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 10px;">
                    <h4 style="margin-bottom: 0.5rem;">Video Information</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
                        This is a demonstration video player. In a production environment, this would display the actual video content 
                        with full playback controls, quality settings, and interactive features.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close button functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Focus trap for accessibility
    modal.focus();
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
    }, 300);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    // Debounce search input
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (this.value.trim().length >= 2) {
                performSearch(this.value.trim());
            } else if (this.value.trim().length === 0) {
                resetSearch();
            }
        }, 300);
    });
    
    // Search on button click
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query) {
                performSearch(query);
                this.blur();
            }
        }
    });
}

function performSearch(query) {
    if (!query) return;
    
    const searchResults = [];
    const videoCards = document.querySelectorAll('.video-card');
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Search in video cards
    videoCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const category = card.querySelector('p').textContent.toLowerCase();
        const duration = card.querySelector('.duration')?.textContent || '';
        
        if (title.includes(query.toLowerCase()) || 
            category.includes(query.toLowerCase()) ||
            duration.includes(query)) {
            searchResults.push(card);
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Search in category cards
    categoryCards.forEach(card => {
        const categoryName = card.querySelector('h3').textContent.toLowerCase();
        const categoryDesc = card.querySelector('p').textContent.toLowerCase();
        
        if (categoryName.includes(query.toLowerCase()) || 
            categoryDesc.includes(query.toLowerCase())) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show feedback
    const totalResults = searchResults.length;
    if (totalResults === 0) {
        showNotification(`No videos found for "${query}"`, 'warning');
    } else {
        showNotification(`Found ${totalResults} video${totalResults > 1 ? 's' : ''} matching "${query}"`, 'success');
    }
    
    // Auto-reset after 15 seconds
    setTimeout(resetSearch, 15000);
}

function resetSearch() {
    const allCards = document.querySelectorAll('.video-card, .category-card');
    allCards.forEach(card => {
        card.style.display = 'block';
    });
}

// ==========================================
// FILTER BUTTONS FUNCTIONALITY
// ==========================================
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.getAttribute('data-filter');
            filterVideos(filterType);
        });
    });
}

function filterVideos(filterType) {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const isShort = card.classList.contains('portrait');
        const isLong = card.classList.contains('landscape');
        
        switch(filterType) {
            case 'all':
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
                break;
            case 'long':
                card.style.display = isLong ? 'block' : 'none';
                if (isLong) {
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                }
                break;
            case 'short':
                card.style.display = isShort ? 'block' : 'none';
                if (isShort) {
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                }
                break;
            default:
                card.style.display = 'block';
        }
    });
    
    // Show notification
    const visibleCards = document.querySelectorAll('.video-card[style="display: block;"]');
    showNotification(`Showing ${filterType === 'all' ? 'all' : filterType} videos`, 'info');
}

// ==========================================
// ANIMATIONS
// ==========================================
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards
    document.querySelectorAll('.category-card, .video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate section titles
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-title');
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.section-title').forEach(title => {
        titleObserver.observe(title);
    });
}

// ==========================================
// TOUCH GESTURES FOR MOBILE
// ==========================================
function initTouchGestures() {
    if (!isMobileDevice()) return;
    
    const carousels = document.querySelectorAll('.video-carousel');
    
    carousels.forEach(carousel => {
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            isDown = true;
        }, { passive: true });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        }, { passive: true });
        
        carousel.addEventListener('touchend', () => {
            isDown = false;
        });
    });
    
    // Add swipe gestures for video cards
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        let touchStartTime = 0;
        
        card.addEventListener('touchstart', () => {
            touchStartTime = Date.now();
        }, { passive: true });
        
        card.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            
            // If it's a quick tap, trigger click
            if (touchDuration < 200) {
                card.click();
            }
        });
    });
}

// ==========================================
// SCROLL INDICATORS
// ==========================================
function initScrollIndicators() {
    const carousels = document.querySelectorAll('.video-carousel');
    
    carousels.forEach(carousel => {
        // Add scroll indicators
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = `
            <span class="scroll-arrow left">◀</span>
            <span class="scroll-arrow right">▶</span>
        `;
        
        carousel.parentElement.appendChild(indicator);
        
        // Style the indicator
        const style = document.createElement('style');
        style.textContent = `
            .scroll-indicator {
                display: flex;
                justify-content: space-between;
                padding: 0 5%;
                margin-top: -0.5rem;
                pointer-events: none;
            }
            .scroll-arrow {
                background: var(--primary-color);
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                pointer-events: auto;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .scroll-indicator:hover .scroll-arrow {
                opacity: 1;
            }
            @media (max-width: 768px) {
                .scroll-indicator {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add scroll functionality
        const leftArrow = indicator.querySelector('.left');
        const rightArrow = indicator.querySelector('.right');
        
        leftArrow.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        rightArrow.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
    });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Set color based on type
    const colors = {
        success: '#27ae60',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db'
    };
    
    const borderColor = colors[type] || colors.info;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease forwards;
        max-width: 350px;
        border-left: 4px solid ${borderColor};
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation styles if not already present
    if (!document.getElementById('notificationAnimationStyles')) {
        const styles = document.createElement('style');
        styles.id = 'notificationAnimationStyles';
        styles.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function formatViewCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// ==========================================
// CATEGORY FILTER FUNCTIONALITY
// ==========================================
function filterByCategory(category) {
    const allCards = document.querySelectorAll('.video-card');
    
    allCards.forEach(card => {
        const cardCategory = card.querySelector('p').textContent.toLowerCase();
        if (cardCategory.includes(category.toLowerCase()) || category === 'all') {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    showNotification(`Filtered by: ${category === 'all' ? 'All Categories' : category}`, 'info');
}

// ==========================================
// LAZY LOADING
// ==========================================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    const videoCard = placeholder.closest('.video-card');
                    
                    // Add loaded class for animation
                    placeholder.classList.add('loaded');
                    
                    // In production, you would load actual images here
                    // placeholder.src = placeholder.dataset.src;
                    
                    imageObserver.unobserve(placeholder);
                }
            });
        });
        
        document.querySelectorAll('.thumbnail-placeholder').forEach(placeholder => {
            imageObserver.observe(placeholder);
        });
    }
}

// ==========================================
// HEADER SLIDESHOW FUNCTIONALITY
// ==========================================
function initHeaderSlideshow() {
    const slideshows = document.querySelectorAll('.header-slideshow');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slideshow-slide');
        const dots = slideshow.querySelectorAll('.slideshow-dot');
        const prevBtn = slideshow.querySelector('.slideshow-arrow.prev');
        const nextBtn = slideshow.querySelector('.slideshow-arrow.next');
        const progressBars = slideshow.querySelectorAll('.slideshow-progress');
        
        if (slides.length === 0) return;
        
        let currentIndex = 0;
        let autoPlayInterval;
        let progressInterval;
        const autoPlayDelay = 4000; // 4 seconds between slides
        const progressIntervalDelay = 100; // Update progress bar every 100ms
        
        // Initialize first slide
        function initSlide() {
            slides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                }
            });
            
            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    if (index === 0) {
                        dot.classList.add('active');
                    }
                });
            }
            
            // Initialize progress bar
            if (progressBars.length > 0) {
                progressBars.forEach(bar => {
                    bar.style.width = '0%';
                });
            }
        }
        
        // Go to specific slide
        function goToSlide(index) {
            // Remove active class from current slide
            slides[currentIndex].classList.remove('active');
            if (dots.length > 0) {
                dots[currentIndex].classList.remove('active');
            }
            
            // Update current index
            currentIndex = index;
            if (currentIndex >= slides.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = slides.length - 1;
            
            // Add active class to new slide
            slides[currentIndex].classList.add('active');
            if (dots.length > 0) {
                dots[currentIndex].classList.add('active');
            }
            
            // Reset progress bar
            resetProgress();
        }
        
        // Next slide
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        // Previous slide
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        // Reset progress bar animation
        function resetProgress() {
            if (progressBars.length > 0) {
                progressBars.forEach(bar => {
                    bar.style.transition = 'none';
                    bar.style.width = '0%';
                    // Force reflow
                    bar.offsetHeight;
                    bar.style.transition = `width ${autoPlayDelay}ms linear`;
                    bar.style.width = '100%';
                });
            }
        }
        
        // Start autoplay
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
            resetProgress();
        }
        
        // Stop autoplay
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
            if (progressBars.length > 0) {
                progressBars.forEach(bar => {
                    bar.style.transition = 'none';
                    bar.style.width = '0%';
                });
            }
        }
        
        // Event Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });
        
        // Pause on hover (desktop)
        if (!isMobileDevice()) {
            slideshow.addEventListener('mouseenter', stopAutoPlay);
            slideshow.addEventListener('mouseleave', startAutoPlay);
        }
        
        // Pause on visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
        
        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        slideshow.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });
        
        slideshow.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }
        
        // Initialize
        initSlide();
        startAutoPlay();
    });
}

// ==========================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ==========================================
window.VideoHub = {
    showVideoPlayer,
    filterByCategory,
    filterVideos,
    showNotification,
    performSearch,
    resetSearch,
    isMobileDevice
};

console.log('🎬 VideoHub initialized successfully!');
console.log('📱 Mobile optimizations enabled:', isMobileDevice());
