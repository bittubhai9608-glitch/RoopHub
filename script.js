const products = {
  "Men Health": [
    { name: "ProstaVive Vitality",rating:"4.9", price: "Special Discount Available", img: "Images/prostavive vitality.jpeg", link: "ProstaViveVitalityLandingPage.html" },
   
  ],

  "Weight Loss": [
    { name: "CitrusBurn Rapid Burn", rating:"4.8", price: "Limited Time Offer", img:"Images/citrusburn rapid burn.jpeg", link: "CitrusBurnRapidBurnLandingPage.html" },
    { name: "KeySlim Drops", rating:"4.6", price: "Best Price Guaranteed", img: "Images/keyslimdrop.jpeg", link: "keyslimdropslandingpage.html"},
  ],

  "Brain Boost": [
    { name: "Neuro Serge", rating:"4.9", price: "Limited Time Offer", img: "Images/neuroserge.jpeg", link: "NeuroSergelLandingPage.html" },
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

let currentCategory = 'View Top Deals';

/**
 * Utility to create a product card element to keep the UI consistent.
 */
function createProductCard(product, categoryLabel) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <div class="img-box">
      <span class="category">${categoryLabel}</span>
      <img src="${product.img}" alt="${product.name}">
    </div>
    <h3>${product.name}</h3>
    <p class="tag">⭐ ${product.rating || '4.7'} Rating | Best Seller</p>
    <p class="price">${product.price}</p>
    <button onclick="openProduct('${product.link}')">Check Offer</button>
  `;
  return div;
}

function loadProducts(category) {
  currentCategory = category;
  
  // Agar category exist nahi karti toh default 'Men Health' dikhao
  if (!products[category]) category = "Men Health";

  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  let items = [...products[category]];
  items.sort(() => 0.5 - Math.random());

  items.forEach(p => {
    container.appendChild(createProductCard(p, category));
  });
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

function showFullAbout() {
  const aboutFull = document.getElementById('aboutFull');
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  const aboutContent = document.getElementById('aboutContent');
  
  if (aboutFull) aboutFull.style.display = "block";
  if (seeMoreBtn) seeMoreBtn.style.display = "none";
  if (aboutContent) {
    aboutContent.scrollTop = 0;
    aboutContent.style.display = "block";
  }
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
  
  if (event.target === aboutModal) {
    aboutModal.style.display = 'none';
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
}

// Enter key support for chat
document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chatInput");
  if (chatInput) {
    chatInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }
});


loadProducts('Men Health');
function openProduct(link) {
  window.location.href = link;
}


document.getElementById("aboutFull").style.display = "block";
document.getElementById("aboutFull").style.display = "none";

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

function closeFAQ(){
  document.getElementById("faqModal").style.display = "none";
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
    document.getElementById("aiSuggestions").innerHTML = "";

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
        }, 50); // Speed of typing
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
function closeModal() {
    const modals = [
        'aboutModal', 'importantInfoModal', 'privacyPolicyModal', 
        'termsModal', 'disclaimerModal', 'faqModal', 'contactModal',
        'privacyModal', 'affiliateModal', 'authModal'
    ];
    
    modals.forEach(id => {
        let m = document.getElementById(id);
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
        'terms': 'termsModal',
        'privacy': 'privacyPolicyModal',
        'affiliate': 'affiliateModal',
        'auth': 'authModal'
    };
    const id = modalMap[type] || type;
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function toggleAuth(type) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    
    if (type === 'signin') {
        signInForm.style.display = 'flex';
        signUpForm.style.display = 'none';
        signInTab.classList.add('active-tab');
        signUpTab.classList.remove('active-tab');
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'flex';
        signInTab.classList.remove('active-tab');
        signUpTab.classList.add('active-tab');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadProducts('Men Health');
});