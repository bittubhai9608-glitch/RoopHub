const products = {
  "Men Health": [
    { 
      name: "ProstaVive Vitality", 
      rating: "4.9", 
      price: "Special Discount Available", 
      img: "Images/prostavive vitality.jpeg", 
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

function openProduct(link) {
  if (link) window.location.href = link;
}

function openPrivacyPolicy(){
  document.getElementById("privacyPolicyModal").style.display = "block";
}

function closePrivacyPolicy(){
  document.getElementById("privacyPolicyModal").style.display = "none";
}



function openTerms(){
  document.getElementById("termsModal").style.display = "block";
}

function closeTerms(){
  document.getElementById("termsModal").style.display = "none";
}



function openDisclaimer(){
  document.getElementById("disclaimerModal").style.display = "block";
}

function closeDisclaimer(){
  document.getElementById("disclaimerModal").style.display = "none";
}


function openFAQ(){
  document.getElementById("faqModal").style.display = "block";
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
// Password Reset Logic
function saveProfileChanges() {
    let user = JSON.parse(localStorage.getItem("roophub_user"));
    if (!user) {
        alert("User not logged in.");
        return;
    }

    const newName = document.getElementById('updateName').value.trim();
    const newPassword = document.getElementById('updatePass').value;

    if (newName && newName !== user.name) {
        user.name = newName;
    }

    if (newPassword) {
        if (newPassword.length >= 6) { // Basic validation
            user.password = newPassword;
        } else {
            alert("New password must be at least 6 characters long.");
            return;
        }
    }
    localStorage.setItem("roophub_user", JSON.stringify(user));
    alert("✅ Profile updated successfully!");

    // Sync with Backend
    fetch("https://roophub.onrender.com/auth-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            name: user.name, 
            email: user.email, 
            password: user.password, 
            type: "UPDATE" 
        })
    }).catch(err => console.error("Sync error:", err));

    checkAuthStatus(); 
    switchProfileTab('security'); 
}

function ensureAuthModals() {
    if (!document.getElementById('authModal')) {
        const modalHTML = `
            <div id="authModal" class="modal">
                <div class="modal-content auth-modal-content">
                    <span class="close" onclick="closeModal('authModal')">&times;</span>
                    <div class="auth-tabs">
                        <h3 id="signInTab" onclick="toggleAuth('signin')" class="active-tab">Sign In</h3>
                        <h3 id="signUpTab" onclick="toggleAuth('signup')">Sign Up</h3>
                    </div>
                    <form id="signInForm" class="auth-form">
                        <input type="email" id="signInEmail" placeholder="Email" required>
                        <input type="password" id="signInPassword" placeholder="Password" required>
                        <button type="submit" class="auth-btn">Sign In</button>
                    </form>
                    <form id="signUpForm" class="auth-form" style="display:none;">
                        <input type="text" id="signUpName" placeholder="Full Name" required>
                        <input type="email" id="signUpEmail" placeholder="Email" required>
                        <input type="password" id="signUpPassword" placeholder="Password" required>
                        <button type="submit" class="auth-btn">Sign Up</button>
                    </form>
                </div>
            </div>
            <div id="profileModal" class="modal">
                <div class="modal-content auth-modal-content">
                    <span class="close" onclick="closeModal('profileModal')">&times;</span>
                    <div id="profileDetails"></div>
                    <button onclick="logoutUser()" class="auth-btn" style="background:#ef4444; margin-top:10px;">Log Out</button>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

function handleForgotPassword(e) {
    e.preventDefault();
    const email = prompt("Apna registered email address enter karein:");
    if (!email) return;

    const savedUser = JSON.parse(localStorage.getItem("roophub_user"));
    if (savedUser && savedUser.email.toLowerCase() === email.toLowerCase().trim()) {
        const newPassword = prompt("Naya password set karein (Min 6 characters):");
        if (newPassword && newPassword.length >= 6) {
            savedUser.password = newPassword;
            localStorage.setItem("roophub_user", JSON.stringify(savedUser));
            alert("✅ Password kamiyabi se update ho gaya hai! Ab naye password se Sign In karein.");
            toggleAuth('signin');
        } else if (newPassword) {
            alert("❌ Password kam se kam 6 characters ka hona chahiye.");
        }
    } else {
        alert("❌ Is email se koi account nahi mila. Pehle Sign Up karein.");
        toggleAuth('signup');
    }
}

// Generic Modal close function
function closeModal(id) {
    const modals = [
        'aboutModal', 'importantInfoModal', 'privacyPolicyModal', 
        'termsModal', 'disclaimerModal', 'faqModal', 'contactModal',
        'privacyModal', 'affiliateModal', 'authModal', 'profileModal'
    ];
    
    const targetModals = id ? [id] : modals;
    targetModals.forEach(mId => {
        let m = document.getElementById(mId);
        if (m) m.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Modal kholne ke liye function (Example)
function openModal(type) {
    const modalMap = {
        'about': 'aboutModal',
        'info': 'importantInfoModal',
        'contact': 'contactModal',
        'faq': 'faqModal',
        'disclaimer': 'disclaimerModal',
        'terms': document.getElementById('termsModal') ? 'termsModal' : 'termsModal', // Ensure it points to the correct ID
        'privacy': document.getElementById('privacyPolicyModal') ? 'privacyPolicyModal' : 'privacyModal',
        'affiliate': 'affiliateModal',
        'auth': 'authModal',
        'profile': 'profileModal'
    };
    const id = modalMap[type] || type;
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function applyThemeAndSettings() {
    // Apply Dark Mode
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    // Apply Language (यह applyLanguage फंक्शन द्वारा पहले से ही हैंडल किया जाता है, लेकिन यह सुनिश्चित करने के लिए कि इसे कॉल किया गया है)
    applyLanguage(localStorage.getItem('language') || 'en');
    // Timezone आमतौर पर डिस्प्ले/आंतरिक लॉजिक के लिए क्लाइंट-साइड JS द्वारा हैंडल किया जाता है, न कि एक वैश्विक सेटिंग जो UI को बदलती है।
}

// New function to handle opening auth or profile modal based on login status
function openAuthOrProfileModal() {
    const user = JSON.parse(localStorage.getItem("roophub_user"));
    if (user && user.name) {
        showProfile(); // User logged in, show profile modal
    } else {
        openModal('auth'); // User not logged in, show auth modal
    }
}

function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem("roophub_user"));
    const btn = document.querySelector('.header-auth-btn');
    if (user && user.name && btn) {
        // Always show the hamburger icon, regardless of login status
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        btn.style.padding = "8px 12px";
        btn.style.background = "#27ae60";
        btn.style.color = "#ffffff";
        btn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
        btn.onclick = openAuthOrProfileModal; // Use the new function
    }
}

function showProfile() {
    const user = JSON.parse(localStorage.getItem("roophub_user"));
    if (!user) return;

    const details = document.getElementById('profileDetails');
    if (details) {
        switchProfileTab('overview');
    }
    openModal('profile');
}

function switchProfileTab(tab) {
    const user = JSON.parse(localStorage.getItem("roophub_user"));
    const details = document.getElementById('profileDetails');
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

    const avatarHtml = user.profilePic 
        ? `<img src="${user.profilePic}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #2563eb;">`
        : `<div style="width: 50px; height: 50px; background: linear-gradient(135deg, #2563eb, #1e40af); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold;">${initials}</div>`;

    const memberId = "RH-9532"; // As per your requirement
    const joinDate = "1 May 2026"; // As per your requirement

    let tabContent = '';

    if (tab === 'overview') {
        tabContent = `
            <div style="font-size: 14px; color: #475569;">
                <p style="margin: 15px 0; display: flex; justify-content: space-between; border-bottom: 1px dashed #eee; padding-bottom: 8px;"><strong>📧 Email:</strong> <span style="color: #1e293b;">${user.email}</span></p>
                <p style="margin: 15px 0; display: flex; justify-content: space-between; border-bottom: 1px dashed #eee; padding-bottom: 8px;"><strong>🆔 Member ID:</strong> <span style="color: #1e293b; font-family: monospace; font-weight: bold;">${memberId}</span></p>
                <p style="margin: 15px 0; display: flex; justify-content: space-between; border-bottom: 1px dashed #eee; padding-bottom: 8px;"><strong>📅 Joined:</strong> <span style="color: #1e293b;">${joinDate}</span></p>
                <p style="margin: 15px 0; display: flex; justify-content: space-between;"><strong>✅ Status:</strong> <span style="color: #166534; font-weight: bold;">Active Account</span></p>
                <p style="margin: 15px 0; display: flex; justify-content: space-between; border-top: 1px dashed #eee; padding-top: 8px;"><strong>🌟 Membership Tier:</strong> <span style="color: #854d0e; font-weight: bold;">Gold Member</span></p>
                <p style="margin: 15px 0; display: flex; justify-content: space-between;"><strong>⏰ Last Login:</strong> <span style="color: #1e293b;">${new Date().toLocaleString()}</span></p>
            </div>
        `;
    } else if (tab === 'settings') {
        const isDark = document.body.classList.contains('dark-mode');
        tabContent = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px;">
                    <span style="font-size: 13px; font-weight: 600;">🌙 Dark Mode</span>
                    <button onclick="toggleDarkMode()" style="padding: 5px 12px; border-radius: 15px; border: 1px solid #cbd5e1; cursor: pointer; background: ${isDark ? '#1e40af' : '#fff'}; color: ${isDark ? '#fff' : '#000'};">
                        ${isDark ? 'ON' : 'OFF'}
                    </button>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px;">
                    <span style="font-size: 13px; font-weight: 600;">🔔 Email Notifications</span>
                    <input type="checkbox" checked style="width: 18px; height: 18px; cursor: pointer;">
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px;">
                    <span style="font-size: 13px; font-weight: 600;">📩 Newsletter Sub</span>
                    <input type="checkbox" checked style="width: 18px; height: 18px; cursor: pointer;">
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px;">
                    <span style="font-size: 13px; font-weight: 600;">🖼️ Profile Photo</span>
                    <input type="file" accept="image/*" onchange="handleProfilePicUpload(event)" style="font-size: 11px; width: 150px;">
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px;">
                    <span style="font-size: 13px; font-weight: 600;">🌐 Language</span>
                    <select onchange="changeLanguage(this.value)" style="padding: 5px 8px; border-radius: 6px; border: 1px solid #cbd5e1; width: 150px; cursor: pointer;">
                        <option value="en" ${(localStorage.getItem('language') || 'en') === 'en' ? 'selected' : ''}>English</option>
                        <option value="hi" ${(localStorage.getItem('language') || 'en') === 'hi' ? 'selected' : ''}>Hindi</option>
                        <option value="es" ${(localStorage.getItem('language') || 'en') === 'es' ? 'selected' : ''}>Spanish</option>
                        <option value="fr" ${(localStorage.getItem('language') || 'en') === 'fr' ? 'selected' : ''}>French (Français)</option>
                        <option value="de" ${(localStorage.getItem('language') || 'en') === 'de' ? 'selected' : ''}>German (Deutsch)</option>
                        <option value="ar" ${(localStorage.getItem('language') || 'en') === 'ar' ? 'selected' : ''}>Arabic (العربية)</option>
                        <option value="pt" ${(localStorage.getItem('language') || 'en') === 'pt' ? 'selected' : ''}>Portuguese (Português)</option>
                        <option value="zh" ${(localStorage.getItem('language') || 'en') === 'zh' ? 'selected' : ''}>Chinese (中文)</option>
                        <option value="ja" ${(localStorage.getItem('language') || 'en') === 'ja' ? 'selected' : ''}>Japanese (日本語)</option>
                        <option value="ru" ${(localStorage.getItem('language') || 'en') === 'ru' ? 'selected' : ''}>Russian (Русский)</option>
                    </select>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px;">
                    <span style="font-size: 13px; font-weight: 600;">🌍 Time Zone</span>
                    <select onchange="localStorage.setItem('timezone', this.value)" style="padding: 5px 8px; border-radius: 6px; border: 1px solid #cbd5e1; width: 150px; cursor: pointer;">
                        <option value="utc" ${(localStorage.getItem('timezone') || 'utc') === 'utc' ? 'selected' : ''}>UTC (Universal)</option>
                        <option value="ist">IST (India - GMT+5:30)</option>
                        <option value="est">EST (US East - GMT-5)</option>
                        <option value="cst">CST (US Central - GMT-6)</option>
                        <option value="pst">PST (US West - GMT-8)</option>
                        <option value="gmt">GMT (London - GMT+0)</option>
                        <option value="cet">CET (Europe - GMT+1)</option>
                        <option value="msk">MSK (Moscow - GMT+3)</option>
                        <option value="gst">GST (Dubai - GMT+4)</option>
                        <option value="jst">JST (Tokyo - GMT+9)</option>
                        <option value="aest">AEST (Sydney - GMT+10)</option>
                        <option value="brt">BRT (Brazil - GMT-3)</option>
                        <option value="nzst">NZST (New Zealand - GMT+12)</option>
                    </select>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 5px;">
                    <button onclick="alert('Preferences Saved!')" style="flex: 1; background: #1e40af; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer;">Save</button>
                    <button onclick="resetToDefaultSettings()" style="flex: 1; background: #fff5f5; color: #dc2626; border: 1px solid #feb2b2; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer;">Reset</button>
                </div>
                <p style="font-size: 11px; color: #64748b; margin: 5px 0;">Preferences update hone mein thoda samay lag sakta hai.</p>
            </div>
        `;
    } else if (tab === 'security') {
        tabContent = `
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div class="input-group">
                    <label style="font-size: 12px; font-weight: 600;">Update Name</label>
                    <input type="text" id="updateName" value="${user.name}" style="padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
                </div>
                <div class="input-group">
                    <label style="font-size: 12px; font-weight: 600;">New Password</label>
                    <input type="password" id="updatePass" placeholder="Leave blank to keep same" style="padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px;">
                </div>
                <button onclick="saveProfileChanges()" style="background: #1e40af; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 5px;">Save Profile</button>

                <div style="margin-top: 25px; border-top: 1px dashed #e2e8f0; padding-top: 20px;">
                    <h4 style="margin: 0 0 15px 0; font-size: 14px; color: #1e293b; font-weight: 600;">Security Shield</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px; margin-bottom: 8px;">
                        <span style="font-size: 13px; font-weight: 600;">📩 Login Alerts</span>
                        <input type="checkbox" checked style="width: 18px; height: 18px; cursor: pointer;">
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px; margin-bottom: 8px;">
                        <span style="font-size: 13px; font-weight: 600;">🕵️ Privacy Mode</span>
                        <input type="checkbox" style="width: 18px; height: 18px; cursor: pointer;">
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
                        <span style="font-size: 13px; font-weight: 600; color: #166534;">🛡️ Security Level</span>
                        <span style="font-size: 12px; font-weight: 700; color: #15803d;">OPTIMIZED</span>
                    </div>
                    <p style="font-size: 11px; color: #64748b; margin-top: 10px;">Aapka account currently secured hai aur tracking protection active hai.</p>
                </div>

                <div style="margin-top: 25px; padding: 10px; background: #fff5f5; border-radius: 8px; border: 1px solid #fed7d7;">
                    <h4 style="margin: 0 0 5px 0; font-size: 13px; color: #c53030; font-weight: 600;">Danger Zone</h4>
                    <button onclick="confirm('Permanent delete?') && logoutUser()" style="background: none; border: none; color: #dc2626; font-size: 12px; cursor: pointer; padding: 0; text-decoration: underline;">❌ Delete Account Forever</button>
                </div>
            </div>
        `;
    } else if (tab === 'help') {
        tabContent = `
            <div style="text-align: center; padding: 10px;">
                <div style="font-size: 32px; margin-bottom: 10px;">🎧</div>
                <h4 style="margin: 0 0 10px 0; font-size: 16px; color: #1e293b;">How can we help?</h4>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="showContact()" style="display: block; width: 100%; background: #1e40af; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">📧 Email Support</button>
                    <a href="https://wa.me/918271734883" target="_blank" style="display: block; background: #22c55e; color: white; text-decoration: none; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 13px;">💬 WhatsApp Help</a>
                </div>
                <p style="font-size: 12px; color: #64748b; margin-top: 15px;"><strong>Call us:</strong> +91 82717 34883</p>
                <p style="font-size: 11px; color: #94a3b8; margin-top: 5px;">Average response time: 2 hours</p>
            </div>
        `;
    }

    details.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
            ${avatarHtml}
            <div>
                <h3 style="margin: 0; color: #1e293b; font-size: 16px;">${user.name}</h3>
                <span style="color: #64748b; font-size: 12px;">Premium Member</span>
            </div>
        </div>

        <!-- Professional Tab Navigation -->
        <div style="display: flex; border-bottom: 2px solid #f1f5f9; margin-bottom: 20px; gap: 20px;">
            <button onclick="switchProfileTab('overview')" style="background:none; border:none; padding: 10px 0; cursor:pointer; font-size:13px; font-weight:600; color: ${tab === 'overview' ? '#2563eb' : '#94a3b8'}; border-bottom: 2px solid ${tab === 'overview' ? '#2563eb' : 'transparent'}; margin-bottom: -2px;">Overview</button>
            <button onclick="switchProfileTab('settings')" style="background:none; border:none; padding: 10px 0; cursor:pointer; font-size:13px; font-weight:600; color: ${tab === 'settings' ? '#2563eb' : '#94a3b8'}; border-bottom: 2px solid ${tab === 'settings' ? '#2563eb' : 'transparent'}; margin-bottom: -2px;">Settings</button>
            <button onclick="switchProfileTab('security')" style="background:none; border:none; padding: 10px 0; cursor:pointer; font-size:13px; font-weight:600; color: ${tab === 'security' ? '#2563eb' : '#94a3b8'}; border-bottom: 2px solid ${tab === 'security' ? '#2563eb' : 'transparent'}; margin-bottom: -2px;">Security</button>
            <button onclick="switchProfileTab('help')" style="background:none; border:none; padding: 10px 0; cursor:pointer; font-size:13px; font-weight:600; color: ${tab === 'help' ? '#2563eb' : '#94a3b8'}; border-bottom: 2px solid ${tab === 'help' ? '#2563eb' : 'transparent'}; margin-bottom: -2px;">Help</button>
        </div>

        <!-- Tab Content -->
        <div id="tabContentArea" style="min-height: 200px; max-height: calc(100vh - 350px); overflow-y: auto; padding-right: 5px; scrollbar-width: thin; -webkit-overflow-scrolling: touch;">
            ${tabContent}
        </div>
    `;
}

function handleProfilePicUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const user = JSON.parse(localStorage.getItem("roophub_user"));
            user.profilePic = e.target.result;
            localStorage.setItem("roophub_user", JSON.stringify(user));
            switchProfileTab('settings');
        };
        reader.readAsDataURL(file);
    }
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

function resetToDefaultSettings() {
    if (confirm("Reset all settings to default?")) {
        localStorage.removeItem('darkMode');
        localStorage.removeItem('language');
        localStorage.removeItem('timezone');
        document.body.classList.remove('dark-mode');
        applyLanguage('en');
        switchProfileTab('settings');
        alert("Settings have been reset to default values.");
    }
}

function logoutUser() {
    localStorage.removeItem("roophub_user");
    closeModal('profileModal');
    checkAuthStatus();
    alert("Aap kamiyabi se logout ho gaye hain.");
}

function toggleAuth(type) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');

    if (!signInForm || !signUpForm) return;

    if (type === 'signin') {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
        signInTab.classList.add('active-tab');
        signUpTab.classList.remove('active-tab');
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
        signInTab.classList.remove('active-tab');
        signUpTab.classList.add('active-tab');
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
  ensureAuthModals(); 
  applyThemeAndSettings(); // लोकल स्टोरेज से सभी सेटिंग्स लागू करें
  updateHeaderTimeContext();
  setInterval(updateHeaderTimeContext, 60000); // Check for time-based updates every minute
  checkAuthStatus();
  
  // Sign Up Logic
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signUpName').value;
      const email = document.getElementById('signUpEmail').value;
      const password = document.getElementById('signUpPassword').value;

      const userData = { name, email, password };
      localStorage.setItem("roophub_user", JSON.stringify(userData));
      
      // Sign Up data direct Google Sheet mein store hoga via Python Backend
      fetch("https://roophub.onrender.com/auth-action", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, type: "SIGNUP" })
      })
      .then(res => res.json())
      .catch(err => console.error("Sheet logic error:", err));

      closeModal('authModal');
      checkAuthStatus();
      alert(`Welcome ${name}! Your account has been created successfully. 🎉`);
    });
  }

  // Sign In Logic
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signInEmail').value;
      const password = document.getElementById('signInPassword').value;
      
      const savedUser = JSON.parse(localStorage.getItem("roophub_user"));
      if (savedUser && savedUser.email === email && savedUser.password === password) {
        // Sign In data bhi log hoga
        fetch("https://roophub.onrender.com/auth-action", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: savedUser.name, email, password, type: "SIGNIN" })
        })
        .then(res => res.json())
        .catch(err => console.error("Sheet logic error:", err));

        closeModal('authModal');
        checkAuthStatus();
        alert(`Welcome back, ${savedUser.name}!`);
      } else {
        alert("Invalid email or password. Please Sign Up first if you don't have an account.");
      }
    });
  }

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
      const productName = document.querySelector('h1')?.innerText || "General Product";
      
      const formData = new FormData(reviewForm);
      const payload = {
        name: formData.get("Name"),
        email: formData.get("Email"),
        rating: formData.get("Rating"),
        comment: formData.get("Comment"),
        product: productName
      };

      submitBtn.disabled = true;
      submitBtn.innerText = "Saving to Database...";

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
      .catch(err => alert("❌ Server connection failed. Data not stored."))
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