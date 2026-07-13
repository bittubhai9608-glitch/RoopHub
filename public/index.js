/* ============================================
   NeuroSerge - AI Affiliate Marketplace
   Interactive JavaScript
   ============================================ */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionalities
    initNavbar();
    initHeroSlider();
    shuffleProducts(); // Randomize products on load
    initSearch();
    initViewMore(); // Initialize "View More" after shuffling
    initDiscountButtons();
});

/* ============================================
   PRODUCT SHUFFLE FUNCTIONALITY
   ============================================ */
function shuffleProducts() {
    const productGrids = document.querySelectorAll('.products-grid');
    if (!productGrids.length) return;

    productGrids.forEach(productGrid => {
        const products = Array.from(productGrid.children);
        products.sort(() => Math.random() - 0.5);

        // Ensure all products are visible before re-appending and re-hiding by initViewMore
        products.forEach(product => {
            product.style.display = ''; // Clear inline display style
        });

        products.forEach(product => productGrid.appendChild(product));
    });
}

/* ============================================
   NAVBAR FUNCTIONALITY
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

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
    startAutoSlide();
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
   SCROLL TO TOP
   ============================================ */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', () => performSearch(true));
};
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

// Function to generate a random discount percentage
function generateRandomDiscount() {
    const discounts = [20, 30, 40, 50, 60]; // Possible discount percentages
    const randomIndex = Math.floor(Math.random() * discounts.length);
    return discounts[randomIndex];
}

function initDiscountButtons() {
    document.querySelectorAll('.btn-discount').forEach(button => {
        // This button class does not exist in the provided HTML,
        // but keeping the logic in case it's used elsewhere.
        const discount = generateRandomDiscount();
        const discountSpan = button.querySelector('.discount-percentage');
        if (discountSpan) {
            discountSpan.textContent = `${discount}% OFF`;
        } else {
            button.textContent = `Get Discount ${discount}% OFF`; // Fallback if span not found
        }

        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            this.textContent = 'Discount Applied!';
            this.disabled = true; // Disable button after click
            this.style.background = 'var(--secondary-color)'; // Change color to indicate applied
        });
    });
}

/* ============================================
   VIEW MORE FUNCTIONALITY
   ============================================ */
function initViewMore() {
    // This function can be adapted to handle multiple "View More" sections if needed.
    // For now, it targets the healthcare products section.
    const productSections = document.querySelectorAll('.product-section');

    productSections.forEach(section => {
        const viewMoreBtn = section.querySelector('.view-more-btn'); // Assuming a common class for view more buttons
        const productGrid = section.querySelector('.products-grid');

        if (!viewMoreBtn || !productGrid) return;

        const allProducts = Array.from(productGrid.children);
        const initialVisibleCount = 8;

        // Hide products beyond the initial count after shuffling
        allProducts.forEach((product, index) => {
            if (index >= initialVisibleCount) {
                product.style.display = 'none';
            } else {
                product.style.display = 'flex'; // Ensure the first 8 are visible and use flex layout
            }
        });

        if (allProducts.length <= initialVisibleCount) {
            viewMoreBtn.style.display = 'none';
        } else {
            viewMoreBtn.style.display = 'inline-flex'; // Or 'block'
        }

        viewMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const hiddenProducts = Array.from(productGrid.children).filter(p => p.style.display === 'none');
            const productsToShow = hiddenProducts.slice(0, 4);
            productsToShow.forEach(product => {
                product.style.display = 'flex'; // Use 'flex' as per your .product-card style
            });

            if (hiddenProducts.length <= 4) {
                viewMoreBtn.style.display = 'none';
            }
        });
    });
}