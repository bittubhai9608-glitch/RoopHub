
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionalities
    initNavbar();
    initHeroSlider();
    shuffleProducts(); // Randomize products on load
    initSearch();
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

    searchInput.addEventListener('input', () => {
        performSearch(false); // Don't scroll while typing
    });
};

function performSearch(shouldScroll = false) {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();

    // Filter products immediately
    filterProducts(query);

    if (shouldScroll) {
        const productsSection = document.getElementById('products');
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = productsSection.offsetTop - navbarHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}


function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) {
        matrix[0][i] = i;
    }

    for (let j = 0; j <= b.length; j++) {
        matrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1, // deletion
                matrix[j - 1][i] + 1, // insertion
                matrix[j - 1][i - 1] + indicator, // substitution
            );
        }
    }

    return matrix[b.length][a.length];
}

function filterProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    const noResultsMessage = document.getElementById('noResultsMessage');

    if (!query) {
        productCards.forEach(card => {
            card.style.display = 'flex';
        });
        noResultsMessage.style.display = 'none';
        return;
    }

    let foundResults = false;
    // Threshold for fuzzy search. A lower number means a stricter match.
    // This can be adjusted based on desired "fuzziness".
    const threshold = 3;

    productCards.forEach(card => {
        const titleElement = card.querySelector('.product-title');

        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        
        const distance = levenshteinDistance(query, title);

        if (title.includes(query) || distance <= threshold) {
            card.style.display = 'flex';
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
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
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