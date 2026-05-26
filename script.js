const products = {
  "Men Health": [
    { 
      name: "ProstaVive Vitality", 
      rating: "4.9", 
      price: "Special Discount Available", 
      img: "Images/logoprostavive.jpeg",
      link: "ProstaViveVitality.html",
      features: [
        "Supports Optimal Prostate Wellness",
        "Boosts Natural Vitality & Physical Energy",
        "100% Pure Natural & Organic Ingredients",
        "60-Day Risk-Free Money Back Guarantee"
      ]
    },
  ],

  "Brain Boost": [
    { 
      name: "Neuro Serge", 
      rating: "4.9", 
      price: "Limited Time Offer", 
      img: "Images/neuroserge.jpeg", 
      link: "NeuroSerge.html",
      features: ["Sharpen Mental Clarity", "Enhance Memory Recall", "100% Drug-Free"]
    },
    { name: "Visiflora Precision Vision", rating:"4.5", price: "$49", img:"Images/visiflora.jpeg", link: "https://bb380atn-sfu8kflvon6zfu24u.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
  ],

  "Skin Care": [
    { name: "Purisaki Berberine Patches", rating:"4.7", price: "Click to Check Price", img: "Images/purisaki2.jpeg", link: "https://ca114xufvmev4q3gvdqr-a76nn.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "iGenics Premium", rating:"4.8", price: "Limited Time Offer", img: "Images/igenics.jpeg", link: "https://674b1zlrulc0anegd5r9o2w5y5.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
  ]
};

// SCROLL TO TOP
function scrollToTop(){
  window.scrollTo({top:0, behavior:'smooth'});
}

// Pagination state
let currentPage = 1;
let totalPages = 1;

let currentCategory = '🔥 Exclusive Deals';

/**
 * Utility to create a product card element to keep the UI consistent.
 */
function createProductCard(product, categoryLabel) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <div class="img-box">
      <span class="category-badge" data-i18n="cat_${categoryLabel.replace(/\s+/g, '_')}">${categoryLabel}</span>
      <span class="hot-badge" data-i18n="best_seller">🔥 BEST SELLER</span>
      <img src="${product.img}" alt="${product.name}" loading="lazy">
    </div>
    <div class="card-content">
      <div class="rating-row">
        <span class="stars-icon">⭐⭐⭐⭐⭐</span>
        <span class="rating-val">(${product.rating || '4.9'})</span>
      </div>
      <h3 class="product-title">${product.name}</h3>
      <div class="pricing-banner">
        <span class="price-icon">🏷️</span>
        <span class="price-text" data-i18n="special_offer">${product.price}</span>
      </div>
      <ul class="product-features">
        ${(product.features || ["FDA Registered Facility", "Third Party Lab Tested", "Safe & Natural"]).map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
      </ul>
      <p class="official-verify" data-i18n="verified">🛡️ Official Verified Product</p>
      <button class="premium-cta" onclick="openProduct('${product.link}')" data-i18n="get_discount">
        Check Official Price <span class="arrow-icon">⚡</span>
      </button>
      <p class="limited-tag" data-i18n="limited_stock">⚡ Limited Stock Available</p>
    </div>
  `;
  return div;
}

function loadProducts(category) {
  currentCategory = category;
  
  // Highlight Active Button for better UX - Updated for new filter buttons
  const allFilterButtons = document.querySelectorAll('.filter-btn');
  allFilterButtons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes(category.toLowerCase())) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Fallback to 'Men Health' if category doesn't exist
  if (!products[category]) category = "Men Health";

  const container = document.getElementById("productContainer");
  if (!container) return; // Exit if not on home page
  
  // Show loading state
  const loadingState = document.getElementById("loadingState");
  if (loadingState) loadingState.style.display = 'block';
  
  container.innerHTML = "";

  // Simulate loading delay for UX
  setTimeout(() => {
    if (loadingState) loadingState.style.display = 'none';
    
    let items = [...products[category]];
    items.sort(() => 0.5 - Math.random());

    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <i class="fa-solid fa-inbox" style="font-size: 48px; color: #ddd; margin-bottom: 20px;"></i>
          <h3 style="color: #666; margin: 20px 0;">No Products Found</h3>
          <p style="color: #999;">Please try another category</p>
        </div>
      `;
      return;
    }

    items.forEach(p => {
      container.appendChild(createProductCard(p, category));
    });
  }, 300);
}

function searchProducts() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
  const statusEl = document.getElementById('searchStatus');
  
  if (!searchInput) {
    loadProducts(currentCategory);
    statusEl.textContent = '';
    return;
  }

  const container = document.getElementById('productContainer');
  container.innerHTML = '';
  
  let foundProducts = [];
  
  // Search across all products
  Object.keys(products).forEach(categoryName => {
    products[categoryName].forEach(product => {
      if (product.name.toLowerCase().includes(searchInput) || 
          product.price.toLowerCase().includes(searchInput)) {
        foundProducts.push({
          ...product,
          categorySource: categoryName
        });
      }
    });
  });

  if (foundProducts.length === 0) {
    statusEl.textContent = `No products found for "${searchInput}"`;
    statusEl.style.color = '#666';
    return;
  }

  statusEl.textContent = `Found ${foundProducts.length} product(s)`;
  statusEl.style.color = 'green';
  
  foundProducts.forEach(p => {
    container.appendChild(createProductCard(p, p.categorySource));
  });
}

function setSearchValue(val) {
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = val;
    searchProducts();
  }
}

function showAdsensePlaceholder() {
  const adContainer = document.getElementById('adContainer');
  if (!adContainer) return;
  adContainer.innerHTML = `
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7323884483465344" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  `;
  adContainer.classList.remove('hidden');
}

function hideAdsensePlaceholder() {
  const adContainer = document.getElementById('adContainer');
  if (!adContainer) return;
  adContainer.classList.add('hidden');
}

function toggleAdsense() {
  const adContainer = document.getElementById('adContainer');
  if (!adContainer) return;
  adContainer.classList.toggle('hidden');
}

function changePage(direction) { // Placeholder for future pagination
  const newPage = currentPage + direction;
  if (newPage > 0 && newPage <= totalPages) {
    currentPage = newPage;
    loadPage(currentPage);
  }
}

function updatePagination() {
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');
  
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function showContact() {
  closeModal(); // पुराने किसी भी खुले मोडल को बंद करें
  openModal('contact');
}

function showImportantInfo() {
  openModal('info');
}

// Mobile menu toggle

const menuToggle = document.getElementById('menuToggle');
const navItems = document.getElementById('navItems');
const navRight = document.getElementById('navRight');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isVisible = navItems.style.display === 'flex';
    navItems.style.display = isVisible ? 'none' : 'flex';
    navRight.style.display = isVisible ? 'none' : 'flex';
  });
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const aboutModal = document.getElementById('aboutModal');
  const importantInfoModal = document.getElementById('importantInfoModal');
  const privacyPolicyModal = document.getElementById('privacyPolicyModal');
  const termsModal = document.getElementById('termsModal');
  const disclaimerModal = document.getElementById('disclaimerModal');
  const faqModal = document.getElementById('faqModal');
  const authModal = document.getElementById('authModal');
  const profileModal = document.getElementById('profileModal');
  
  if (event.target === aboutModal) {
    aboutModal.style.display = 'none';
  }
  if (profileModal && event.target === profileModal) {
    closeModal('profileModal');
  }
  if (event.target === importantInfoModal) {
    importantInfoModal.style.display = 'none';
  }
  if (event.target === privacyPolicyModal) {
    privacyPolicyModal.style.display = 'none';
  }
  if (event.target === termsModal) {
    termsModal.style.display = 'none';
  }
  if (event.target === faqModal) {
    faqModal.style.display = 'none';
  }
  if (authModal && event.target === authModal) {
    closeModal('authModal');
  }
};

/**
 * Conversion Tracking Function
 * Tracks clicks to external platforms like WhatsApp, Telegram, and Store links
 */
function trackConversion(platform, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion_click', {
      'platform': platform,
      'label': label,
      'timestamp': new Date().toISOString()
    });
    console.log(`[Tracking] Event sent for ${platform}: ${label}`);
  } else {
    console.warn(`[Tracking] gtag not found. Interaction logged: ${platform} - ${label}`);
  }
}

function openProduct(link) {
  trackConversion('Affiliate Store', 'User redirected to official brand site');
  if (link) window.location.href = link;
}

/**
 * Universal function to open modals by type or ID
 */
function openModal(type) {
  const mapping = {
    'about': 'aboutModal',
    'contact': 'contactModal',
    'disclaimer': 'disclaimerModal',
    'faq': 'faqModal',
    'terms': 'termsModal',
    'privacy': 'privacyPolicyModal',
    'affiliate': 'affiliateModal',
    'info': 'importantInfoModal'
  };

  let id = mapping[type] || type;
  let modal = document.getElementById(id);

  // Fallback for privacy modal ID variations across pages
  if (!modal && type === 'privacy') {
    modal = document.getElementById('privacyModal');
  }

  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  } else {
    console.warn("Modal not found for type/id:", type);
  }
}

function openPrivacyPolicy(){
  openModal('privacy');
}

function closePrivacyPolicy(){
  closeModal('privacyPolicyModal');
}

function openTerms(){
  openModal('terms');
}

function closeTerms(){
  closeModal('termsModal');
}

function openDisclaimer(){
  openModal('disclaimer');
}

function closeDisclaimer(){
  closeModal('disclaimerModal');
}

function openFAQ(){
  openModal('faq');
}








let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

function toggleChat(){
    let box = document.getElementById("aiPopup");
    box.style.display = (box.style.display === "block") ? "none" : "block";
    renderMessages();
}

function detectLanguage(text){
    return /[\u0900-\u097F]/.test(text) ? "hi" : "en";
}

function sendMessage(manualMsg = null){
    let input = document.getElementById("chatInput");
    let msg = manualMsg || input.value.trim();
    if(msg === "") return;

    chatHistory.push({role:"user", text:msg});
    renderMessages();
    input.value = "";
    // Clear suggestions while AI is thinking
    const sugBox = document.getElementById("aiSuggestions");
    if (sugBox) sugBox.innerHTML = "";

    fetch("https://roophub.onrender.com/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            message:msg,
            lang:detectLanguage(msg)
        })
    })
    .then(res => res.json())
    .then(data => {
        // Add initial AI bubble for typing effect
        let box = document.getElementById("aiMessages");
        let botMsgDiv = document.createElement("div");
        botMsgDiv.style = "padding: 10px 14px; border-radius: 18px; max-width: 85%; font-size: 14px; line-height: 1.5; background: #e2e8f0; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px;";
        botMsgDiv.innerHTML = "<span class='typing-text'></span>";
        box.appendChild(botMsgDiv);
        
        let typingSpan = botMsgDiv.querySelector(".typing-text");
        const words = data.reply.split(" ");
        let i = 0;

        const timer = setInterval(() => {
            if(i < words.length) {
                typingSpan.textContent += words[i] + " ";
                i++;
                box.scrollTop = box.scrollHeight;
            } else {
                clearInterval(timer);
                chatHistory.push({role:"ai", text:data.reply});
                localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
                renderQuickReplies(data.suggestions);
            }
        }, 1); // Speed of typing (increased from 20ms to 10ms)
    })
    .catch(err => {
        console.log(err);
    });
}

function renderQuickReplies(suggestions) {
    let sugBox = document.getElementById("aiSuggestions");
    sugBox.innerHTML = "";
    if (!suggestions) return;

    suggestions.forEach(text => {
        let btn = document.createElement("button");
        btn.innerText = text;
        btn.style = "background:#eff6ff; border:1px solid #bfdbfe; color:#1e40af; padding:6px 12px; border-radius:20px; cursor:pointer; font-size:13px; font-weight:500; transition:0.2s;";
        btn.onclick = () => sendMessage(text);
        btn.onmouseover = () => { btn.style.background = "#dbeafe"; btn.style.transform = "translateY(-1px)"; };
        btn.onmouseout = () => { btn.style.background = "#eff6ff"; btn.style.transform = "translateY(0)"; };
        sugBox.appendChild(btn);
    });
}

function renderMessages(){
    let box = document.getElementById("aiMessages");
    box.innerHTML = "";

    chatHistory.forEach(m => {
        const isAi = m.role === 'ai';
        box.innerHTML += `
        <div style="
        padding: 10px 14px;
        border-radius: 18px;
        max-width: 85%;
        font-size: 14px;
        line-height: 1.5;
        ${isAi 
            ? 'background: #e2e8f0; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px;' 
            : 'background: #2563eb; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 4px;'}
        ">
        ${m.text}
        </div>
        `;
    });

    box.scrollTop = box.scrollHeight;
}
// Generic Modal close function
function closeModal(id) {
    const modals = [
        'aboutModal', 'importantInfoModal', 'privacyPolicyModal', 
        'termsModal', 'disclaimerModal', 'faqModal', 'contactModal', 'privacyModal', 'affiliateModal'
    ];
    
    const targetModals = id ? [id] : modals;
    targetModals.forEach(mId => {
        let m = document.getElementById(mId);
        if (m) m.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    switchProfileTab('settings'); // UI update karne ke liye
}

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    applyLanguage(lang);
    switchProfileTab('settings'); // Modal UI ko refresh karne ke liye
}

function applyLanguage(lang) {
    const translations = {
        en: { 
            welcome: "ROOPHUB", 
            search: "Search", 
            discount: "Get Exclusive Discount", 
            aiWelcome: "Hello! 👋 Welcome to ROOPHUB. How can I help you today?",
            hero_desc: "Online Affiliate Wellness",
            nav_men: "Men Health",
            nav_weight: "Weight Loss",
            nav_brain: "Brain Boost",
            nav_skin: "Skin Care",
            footer_about: "About Us",
            contact: "Contact",
            footer_legal: "Important Info",
            verified: "🛡️ Official Verified Product",
            limited_stock: "⚡ Limited Stock Available",
            best_seller: "🔥 BEST SELLER",
            special_offer: "Special Discount Available",
            ProstaVive_title: "ProstaVive",
            ProstaVive_desc: "Support healthy prostate function, urinary flow & natural stamina",
            neuro_title: "Neuro Serge",
            neuro_desc: "Boost memory, improve focus & get mental clarity — naturally",
            unmute_video: "🔊 Unmute Video",
            mute_video: "🔇 Mute Video"
        },
        hi: { 
            welcome: "ROOPHUB", 
            search: "खोजें", 
            discount: "खास छूट प्राप्त करें", 
            aiWelcome: "नमस्ते! 🙏 ROOPHUB में आपका स्वागत है। आज मैं आपकी क्या मदद कर सकता हूँ?",
            hero_desc: "ऑनलाइन एफिलिएट वेलनेस स्टोर",
            nav_men: "पुरुष स्वास्थ्य",
            nav_weight: "वजन घटाना",
            nav_brain: "दिमाग तेज करें",
            nav_skin: "त्वचा की देखभाल",
            footer_about: "हमारे बारे में",
            contact: "संपर्क करें",
            footer_legal: "ज़रूरी सूचना",
            verified: "🛡️ आधिकारिक सत्यापित उत्पाद",
            limited_stock: "⚡ स्टॉक सीमित है",
            best_seller: "🔥 बेस्ट सेलर",
            special_offer: "विशेष छूट उपलब्ध है",
            ProstaVive_title: "ProstaVive",
            ProstaVive_desc: "स्वस्थ प्रोस्टेट कार्य, मूत्र प्रवाह और प्राकृतिक सहनशक्ति का समर्थन करें",
            neuro_title: "न्यूरो सर्ज",
            neuro_desc: "याददाश्त बढ़ाएं, फोकस सुधारें और मानसिक स्पष्टता पाएं — प्राकृतिक रूप से",
            unmute_video: "🔊 वीडियो आवाज़ चालू करें",
            mute_video: "🔇 आवाज़ बंद करें"
        },
        es: { welcome: "ROOPHUB", search: "Buscar", discount: "Obtener Descuento", aiWelcome: "¡Hola! 👋 Bienvenido a ROOPHUB. ¿Cómo puedo ayudarte hoy?", hero_desc: "Bienestar de Afiliados en Línea" },
        fr: { welcome: "ROOPHUB", search: "Chercher", discount: "Obtenir une remise", aiWelcome: "Bonjour! 👋 Bienvenue sur ROOPHUB. Comment puis-je vous aider?", hero_desc: "Bien-être d'Affiliation en Ligne" },
        de: { welcome: "ROOPHUB", search: "Suche", discount: "Rabatt erhalten", aiWelcome: "Hallo! 👋 Willkommen bei ROOPHUB. Wie kann ich Ihnen heute helfen?", hero_desc: "Online-Affiliate-Wellness" },
        ar: { welcome: "ROOPHUB", search: "بحث", discount: "احصل على خصم", aiWelcome: "مرحباً! 👋 أهلاً بكم في ROOPHUB. كيف يمكنني مساعدتك اليوم؟", hero_desc: "العافية التابعة عبر الإنترنت" },
        ru: { welcome: "ROOPHUB", search: "Поиск", discount: "Получить скидку", aiWelcome: "Привет! 👋 Добро пожаловать в ROOPHUB. Чем я могу вам помочь сегодня?", hero_desc: "Интернет-магазин велнеसा" }
    };

    const t = translations[lang] || translations.en;

    // Main Heading update karein
    const heading = document.getElementById('animatedHeading') || document.querySelector('.brand-name');
    if (heading) heading.textContent = t.welcome;

    // Search Button update karein
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) searchBtn.textContent = t.search;

    // Saare buttons (Home + Landing pages) ko update karein
    document.querySelectorAll('.premium-cta, .cta-btn, .buy-btn, .buy-btn-sm').forEach(btn => {
        // Agar button ke paas khud ka data-i18n key hai, toh use use karein
        const key = btn.getAttribute('data-i18n');
        if (key && t[key]) {
            // Video buttons ke liye lightning bolt nahi dikhayenge
            if (key.includes('video')) {
                btn.innerHTML = t[key];
            } else {
                btn.innerHTML = `${t[key]} <span class="arrow-icon">⚡</span>`;
            }
            return;
        }
        btn.innerHTML = `${t.discount} <span class="arrow-icon">⚡</span>`;
    });

    // Generic Translation Loop: Saare elements jinme data-i18n hai
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            // Agar element input hai toh placeholder badlein, warna textContent
            if (el.tagName === 'INPUT') {
                el.placeholder = t[key];
            } else {
                // Check if the translation contains HTML (like icons)
                if (t[key].includes('<')) {
                    el.innerHTML = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        }
    });

    // Chatbot Welcome Message logic
    if (chatHistory.length === 0) {
        chatHistory.push({ role: "ai", text: t.aiWelcome });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderMessages();
    } else if (chatHistory.length === 1 && chatHistory[0].role === 'ai') {
        // Agar sirf welcome message hai aur user ne chat shuru nahi ki, toh use update karein
        chatHistory[0].text = t.aiWelcome;
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderMessages();
    }
}

function showAbout() {
    openModal('about');
}

// Initialize
// Update header context based on time
function updateHeaderTimeContext() {
  const hour = new Date().getHours();
  const greeting = document.querySelector('[data-greeting]');
  
  if (greeting) {
    if (hour < 12) {
      greeting.textContent = '🌅 Good Morning';
    } else if (hour < 18) {
      greeting.textContent = '☀️ Good Afternoon';
    } else {
      greeting.textContent = '🌙 Good Evening';
    }
  }
}

// FAQ Toggle Function
function toggleFAQ(button) {
  const answer = button.nextElementSibling;
  const isActive = button.classList.contains('active');
  
  // Close all other FAQs
  document.querySelectorAll('.faq-question').forEach(btn => {
    if (btn !== button && btn.classList.contains('active')) {
      btn.classList.remove('active');
      btn.nextElementSibling.classList.remove('show');
    }
  });
  
  // Toggle current FAQ
  if (isActive) {
    button.classList.remove('active');
    answer.classList.remove('show');
  } else {
    button.classList.add('active');
    answer.classList.add('show');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productContainer')) loadProducts('Men Health'); // केवल उन पेजों पर प्रोडक्ट्स लोड करें जहाँ productContainer है
  updateHeaderTimeContext();
  setInterval(updateHeaderTimeContext, 60000); // Check for time-based updates every minute

  const chatInput = document.getElementById("chatInput");
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  // Centralized Video Player Logic
  function loadVideo(placeholderElement) {
      const videoId = placeholderElement.dataset.videoId;
      if (!videoId) return;
  
      const iframe = document.createElement('iframe');
      iframe.id = 'ytVideo'; // Keep the ID for existing sound controls
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0`;
      iframe.frameborder = '0';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
  
      const videoWrapper = placeholderElement.parentElement;
      videoWrapper.innerHTML = ''; // Clear placeholder
      videoWrapper.appendChild(iframe);
      videoWrapper.classList.add('video-loaded'); // Add class to adjust wrapper if needed
  }
  
  function soundOn() {
      const video = document.getElementById("ytVideo");
      if (video && video.tagName === 'IFRAME') {
          const currentSrc = video.src;
          if (currentSrc.includes('mute=1')) {
              video.src = currentSrc.replace('mute=1', 'mute=0');
          }
      }
  }
  
  function soundOff() {
      const video = document.getElementById("ytVideo");
      if (video && video.tagName === 'IFRAME') {
          const currentSrc = video.src;
          if (currentSrc.includes('mute=0')) {
              video.src = currentSrc.replace('mute=0', 'mute=1');
          } else if (!currentSrc.includes('mute=1')) {
              // If mute parameter is not present, add it
              video.src = currentSrc + '&mute=1';
          }
      }
  }

  // Make sound functions globally accessible if they are called from HTML
  window.soundOn = soundOn;
  window.soundOff = soundOff;

  document.querySelectorAll('.video-placeholder').forEach(placeholder => {
      placeholder.addEventListener('click', () => loadVideo(placeholder));
  });

  // Centralized Review Form Submission logic
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = reviewForm.querySelector('.submit-btn');
      // Dynamically get the product name from the H1 tag or badge
      const productName = document.querySelector('[data-i18n*="_title"]')?.innerText || 
                          document.querySelector('h1')?.innerText || 
                          "General Product";
      
      const formData = new FormData(reviewForm);
      const payload = {
        name: formData.get("Name"),
        email: formData.get("Email"),
        rating: formData.get("Rating"),
        comment: formData.get("Comment"),
        product: productName
      };

      submitBtn.disabled = true;
      submitBtn.innerText = "Connecting to Server...";

      fetch("https://roophub.onrender.com/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(result => {
        if(result.status === "success") {
          alert("✅ Review shared successfully and saved to Database!");
          reviewForm.reset();
          reviewForm.style.display = 'none';
          if (typeof fetchServerReviews === 'function') fetchServerReviews();
        } else {
          alert("❌ Error: " + (result.message || "Failed to save review"));
        }
      })
      .catch(err => {
        console.error("Submission Error:", err);
        alert("❌ Server connection failed. The server might be waking up, please try again in 30 seconds.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Post Review";
      });
    });
  }

  // Contact Form Submission logic
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('contact-btn');
      const formData = new FormData(contactForm);

      const payload = new FormData();
      payload.append("name", formData.get("Name"));
      payload.append("email", formData.get("Email"));
      payload.append("subject", formData.get("Subject"));
      payload.append("message", formData.get("Message"));

      const fileInput = contactForm.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        for (let i = 0; i < fileInput.files.length; i++) {
          payload.append("attachments", fileInput.files[i]);
        }
      }

      btn.disabled = true;
      btn.innerText = "Sending Email...";

      fetch("https://roophub.onrender.com/send-email", {
        method: "POST",
        body: payload // Content-Type हेडर खुद ब्राउज़र सेट करेगा (multipart/form-data)
      })
      .then(res => res.json())
      .then(result => {
        if(result.status === "success") {
          alert("✅ Success! Your message has been sent to our email.");
          contactForm.reset();
          closeModal('contactModal');
        } else {
          alert("❌ Error sending email: " + result.message);
        }
      })
      .catch(err => alert("❌ Server connection failed."))
      .finally(() => {
        btn.disabled = false;
        btn.innerText = "Send Message Now";
      });
    });
  }
});