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

// SHOW BUTTON
window.addEventListener("scroll", ()=>{
  let btn=document.querySelector(".scrollTop");
  if(window.scrollY>200){
    btn.style.display="block";
  }else{
    btn.style.display="none";
  }
});

let currentCategory = 'View Top Deals';

function loadProducts(category) {
  currentCategory = category;

  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  let items = [...products[category]];
  items.sort(() => 0.5 - Math.random());

  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    // div.innerHTML = `
    //   <img src="${p.img}" alt="${p.name}">
    //   <h3>${p.name}</h3>
    //   <p class="price">${p.price}</p>
    //   <a href="${p.link}" target="_blank">
    //     <button>See Full Details</button>
    //   </a>
    // `;
   div.innerHTML = `
  <div class="img-box">
    <span class="category">${category}</span>
    <img src="${p.img}" alt="${p.name}">
  </div>

  <h3>${p.name}</h3>

  <p class="tag">⭐ ${p.rating} Rating | Best Seller</p>

  <p class="price">${p.price}</p>

  <button onclick="openProduct('${p.link}')">Check Offer</button>
`;
    container.appendChild(div);
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
  Object.values(products).forEach(categoryProducts => {
    categoryProducts.forEach(product => {
      if (product.name.toLowerCase().includes(searchInput) || 
          product.price.toLowerCase().includes(searchInput)) {
        foundProducts.push(product);
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
    const div = document.createElement('div');
    div.className = 'card';
    
    div.innerHTML = `
  <div class="img-box">
    <span class="category">${currentCategory}</span>
    <img src="${p.img}" alt="${p.name}">
  </div>

  <h3>${p.name}</h3>

  <p class="tag">⭐ 4.7 Rating | Best Seller</p>

  <p class="price">${p.price}</p>

  <button onclick="openProduct('${p.link}')">Check Offer</button>
`;
    
    container.appendChild(div);
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

let currentPage = 1;
const totalPages = 1;

function showAbout() {
  const modal = document.getElementById('aboutModal');
  const aboutFull = document.getElementById('aboutFull');
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  
  if (modal) modal.style.display = 'flex';
  if (aboutFull) aboutFull.style.display = 'none';
  if (seeMoreBtn) seeMoreBtn.style.display = 'block';
  currentPage = 1;
}

function closeModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) modal.style.display = 'none';
}

function showFullAbout() {
  const aboutFull = document.getElementById('aboutFull');
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  const aboutContent = document.getElementById('aboutContent');
  
  if (aboutFull) aboutFull.style.display = 'block';
  if (seeMoreBtn) seeMoreBtn.style.display = 'none';
  if (aboutContent) {
    aboutContent.scrollTop = 0;
    aboutContent.style.display = 'block';
  }
  currentPage = 1;
  loadPage(1);
}

function loadPage(page) {
  const contentDiv = document.getElementById('aboutContent');
  if (contentDiv) {
    contentDiv.scrollTop = 0;
    updatePagination();
  }
}

function changePage(direction) {
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
  alert('Contact us at:\nEmail: bittubhai96081@email.com\nPhone: 8271734883');
}

function showImportantInfo() {
  const modal = document.getElementById('importantInfoModal');
  if (modal) modal.style.display = 'flex';
}

function closeImportantInfoModal() {
  const modal = document.getElementById('importantInfoModal');
  if (modal) modal.style.display = 'none';
}

// Mobile menu toggle

const menuToggle = document.getElementById('menuToggle');
const navItems = document.getElementById('navItems');
const navRight = document.getElementById('navRight');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navItems.classList.toggle('open');
    navRight.classList.toggle('open');
  });
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const aboutModal = document.getElementById('aboutModal');
  const importantInfoModal = document.getElementById('importantInfoModal');
  
  if (event.target === aboutModal) {
    aboutModal.style.display = 'none';
  }
  if (event.target === importantInfoModal) {
    importantInfoModal.style.display = 'none';
  }
}


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

function sendMessage(){
    let input = document.getElementById("chatInput");
    let msg = input.value.trim();
    if(msg === "") return;

    chatHistory.push({role:"user", text:msg});
    renderMessages();
    input.value = "";

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
        chatHistory.push({role:"ai", text:data.reply});
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        renderMessages();
    })
    .catch(err => {
        alert("❌ Flask server start karo");
        console.log(err);
    });
}

function renderMessages(){
    let box = document.getElementById("aiMessages");
    box.innerHTML = "";

    chatHistory.forEach(m => {
        box.innerHTML += `
        <div style="
        margin:5px;
        padding:8px;
        border-radius:8px;
        background:${m.role==='ai'?'#f1f1f1':'#d1f0ff'}
        ">
        <b>${m.role==='ai'?'AI':'You'}:</b> ${m.text}
        </div>
        `;
    });

    box.scrollTop = box.scrollHeight;
}