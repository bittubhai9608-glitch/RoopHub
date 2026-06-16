/* ============================================
   NeuroSerge - AI Affiliate Marketplace
   Interactive JavaScript
   ============================================ */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavbar();
    initHeroSlider();
    initSmoothScroll();
    initSearchFunctionality();
    initProductInteractions();
    initScrollAnimations();
    initOfferBox();
    initDiscountButtons(); // Initialize discount buttons
    initMobileMenu();
});

/* ============================================
   NAVBAR FUNCTIONALITY
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');

    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();

        // Show/hide scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            navButtons.classList.toggle('active');

            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navButtons.classList.remove('active');

                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   HERO SLIDER FUNCTIONALITY
   ============================================ */
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Touch Swipe variables
let touchStartX = 0;
let touchEndX = 0;

function initHeroSlider() {
    // Auto-advance slider
    startAutoSlide();

    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    // Initialize touch events for mobile swipe
    initHeroTouchSwipe();
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

function goToSlide(index) {
    const slideshow = document.querySelector('.hero-slideshow');
    // Remove active class from current slide and dot
    dots[currentSlide].classList.remove('active');

    // Update current slide
    currentSlide = index;

    // Slide the container and update dot
    slideshow.style.transform = `translateX(-${index * 100}%)`;
    dots[currentSlide].classList.add('active');

    // Reset auto-slide timer
    stopAutoSlide();
    startAutoSlide();
}

function initHeroTouchSwipe() {
    const container = document.querySelector('.hero-slideshow-container');
    if (!container) return;

    // जब यूजर स्क्रीन को छूता है
    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    // जब यूजर उंगली हटाता है
    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleHeroSwipe();
    }, { passive: true });
}

function handleHeroSwipe() {
    const swipeThreshold = 50; // कम से कम इतनी दूरी तक स्वाइप होना चाहिए
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide(); // उंगली बाएँ खिसकाई (Left Swipe) -> अगला स्लाइड
        } else {
            prevSlide(); // उंगली दाएँ खिसकाई (Right Swipe) -> पिछला स्लाइड
        }
    }
}

/* ============================================
   SMOOTH SCROLL FUNCTIONALITY
   ============================================ */
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* ============================================
   SEARCH FUNCTIONALITY
   ============================================ */
function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    const debouncedPerformSearch = debounce(() => performSearch(false), 300); // Debounced for live search, no scroll

    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', () => performSearch(true)); // Explicit click, so scroll
    }

    // Enter key press
    if (searchInput) {
        // Remove keypress listener for Enter, as input event handles live search
        // searchInput.addEventListener('keypress', function(e) {
        //     if (e.key === 'Enter') {
        //         performSearch();
        //     }
        // });
        searchInput.addEventListener('input', debouncedPerformSearch); // Live search on input change

        // Add focus effect
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.borderColor = 'var(--primary-color)';
            this.parentElement.style.boxShadow = 'var(--shadow-glow)';
        });

        searchInput.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                this.parentElement.style.boxShadow = 'var(--shadow-md)';
            }
        });
    }

    // Suggestion tag clicks
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = this.textContent;
                performSearch(true); // Suggestion click, so scroll
            }
        });
    });
}

function performSearch(shouldScroll = false) {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();

    // Filter products immediately
    filterProducts(query);

    if (!query && !shouldScroll) return; // If query is empty and not explicitly scrolling, exit

    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = productsSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

            // Show notification only if scrolling to indicate search action
            showNotification(`Searching for "${query}"...`);
        } else if (query) {
            // If no products section to scroll to, but there's a query, show notification
            showNotification(`Searching for "${query}"...`);
        }
    }


function filterProducts(query) {
    const productCards = document.querySelectorAll('.product-card');

    if (!query) {
        productCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }

    let foundResults = false;

    productCards.forEach(card => {
        const titleElement = card.querySelector('.product-title');
        const benefitElement = card.querySelector('.product-benefit');

        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        const benefit = benefitElement ? benefitElement.textContent.toLowerCase() : '';

        if (title.includes(query) || benefit.includes(query)) {
            card.style.display = 'block';
            // Reset animation to re-trigger if already visible
            card.style.animation = 'none';
            void card.offsetWidth; // Trigger reflow
            card.style.animation = 'scaleIn 0.5s ease forwards';
            foundResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (!foundResults && query) {
        // Optionally, show a message to the user that no products were found
        // console.log('No products found matching: ' + query);
    }
}

/* ============================================
   PRODUCT INTERACTIONS
   ============================================ */
function initProductInteractions() {
    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            showQuickView(productName);
        });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleWishlist(this);
        });
    });

    // Category item clicks
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Video play buttons
    document.querySelectorAll('.play-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.closest('.video-category').querySelector('.video-label').textContent;
            playVideo(category);
        });
    });
}

// Function to generate a random discount percentage
function generateRandomDiscount() {
    const discounts = [20, 30, 40, 50, 60]; // Possible discount percentages
    const randomIndex = Math.floor(Math.random() * discounts.length);
    return discounts[randomIndex];
}

// Function to initialize discount buttons
function initDiscountButtons() {
    document.querySelectorAll('.btn-discount').forEach(button => {
        const discount = generateRandomDiscount();
        const discountSpan = button.querySelector('.discount-percentage');
        if (discountSpan) {
            discountSpan.textContent = `${discount}% OFF`;
        } else {
            button.textContent = `Get Discount ${discount}% OFF`; // Fallback if span not found
        }

        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            showNotification(`Congratulations! You got ${discount}% OFF on "${productName}"!`);
            this.textContent = 'Discount Applied!';
            this.disabled = true; // Disable button after click
            this.style.background = 'var(--secondary-color)'; // Change color to indicate applied
        });
    });
}

function showQuickView(productName) {
    // Create and show a quick view modal
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <h3>${productName}</h3>
            <p>Quick view content for ${productName} would appear here.</p>
            <div class="modal-actions">
                <button class="btn-buy">Add to Cart</button>
                <button class="btn-learn">View Details</button>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
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
        backdrop-filter: blur(10px);
    `;

    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: linear-gradient(135deg, #1a1a3e 0%, #0a0a1a 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        position: relative;
        color: white;
        animation: scaleIn 0.3s ease;
    `;

    content.querySelector('h3').style.cssText = `
        font-size: 1.5rem;
        margin-bottom: 16px;
    `;

    content.querySelector('p').style.cssText = `
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 24px;
    `;

    content.querySelector('.modal-actions').style.cssText = `
        display: flex;
        gap: 12px;
    `;

    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function toggleWishlist(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.color = '#f5576c';
        showNotification('Added to wishlist!');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.color = '';
        showNotification('Removed from wishlist');
    }
}

function showProductDetails(productName) {
    showNotification(`Viewing details for "${productName}"`);
}

function playVideo(category) {
    showNotification(`Playing ${category} video...`);
}

function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        z-index: 10001;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeInUp 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                entry.target.style.opacity = '1';

                // Add staggered animation for product cards
                if (entry.target.classList.contains('product-card')) {
                    const grid = entry.target.closest('.products-grid');
                    const cards = grid.querySelectorAll('.product-card');
                    cards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.product-card, .category-item, .video-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Observe sections
    document.querySelectorAll('.product-section, .video-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

/* ============================================
   OFFER BOX FUNCTIONALITY
   ============================================ */
function initOfferBox() {
    // Show offer box after delay
    setTimeout(() => {
        const offerBox = document.getElementById('offerBox');
        if (offerBox) {
            offerBox.style.display = 'block';
        }
    }, 3000);

    // Offer button click
    const offerBtn = document.querySelector('.offer-btn');
    if (offerBtn) {
        offerBtn.addEventListener('click', function() {
            showNotification('Discount code applied: WELCOME30');
            closeOffer();
        });
    }
}

function closeOffer() {
    const offerBox = document.getElementById('offerBox');
    if (offerBox) {
        offerBox.style.animation = 'fadeInUp 0.3s ease reverse';
        setTimeout(() => {
            offerBox.style.display = 'none';
        }, 300);
    }
}

/* ============================================
   MOBILE MENU FUNCTIONALITY
   ============================================ */
function initMobileMenu() {
    // Touch events for better mobile experience
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 100;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger some action
            } else {
                // Swipe down - could trigger some action
            }
        }
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.floating-card');

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;

        if (hero && window.innerWidth > 992) {
            floatingCards.forEach((card, index) => {
                const speed = (index + 1) * 0.1;
                card.style.transform = `translateY(${rate * speed}px)`;
            });
        }
    }, 16));
}

// Particle effect (optional enhancement)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }

    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing!');
                this.reset();
            }
        });
    }
});

// Initialize parallax and particles
window.addEventListener('load', function() {
    initParallax();
    createParticles();
    initLazyLoading();
});

/* ============================================
   CONSOLE WELCOME MESSAGE
   ============================================ */
console.log('%c🧠 NeuroSerge - AI Affiliate Marketplace', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the future of AI-powered health shopping!', 'color: #764ba2; font-size: 14px;');