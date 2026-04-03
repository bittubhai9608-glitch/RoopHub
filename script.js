const products = {
  trend: [
    { name: "Trend Smartwatch", price: "₹2999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Wireless Earbuds", price: "₹1499", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Fitness Band", price: "₹999", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  best: [
    { name: "Premium Headphone", price: "₹3999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Luxury Sunglasses", price: "₹1999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Gaming Mouse", price: "₹1299", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  deals: [
    { name: "Budget Tablet", price: "₹8999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Home Speaker", price: "₹2199", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "LED Monitor", price: "₹10999", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  gadget: [
    { name: "Clip-on Camera", price: "₹2999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Tablet Stylus", price: "₹799", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Portable Charger", price: "₹1499", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  electro: [
    { name: "Smart Bulb", price: "₹899", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Kitchen Blender", price: "₹2599", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Air Purifier", price: "₹3299", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  mobile: [
    { name: "Android Phone", price: "₹13999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Refurbished Phone", price: "₹8999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Feature Phone", price: "₹1299", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  laptop: [
    { name: "Gaming Laptop", price: "₹49999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Business Laptop", price: "₹38999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Student Laptop", price: "₹29999", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  kids: [
    { name: "Toy Car", price: "₹499", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Puzzle Set", price: "₹699", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Drawing Kit", price: "₹399", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  gifts: [
    { name: "Gift Box", price: "₹1299", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Flower Basket", price: "₹899", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Customized Mug", price: "₹499", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  books: [
    { name: "Self Help Book", price: "₹299", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Science Book", price: "₹499", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Novel", price: "₹349", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  digital: [
    { name: "Ebook Subscription", price: "₹999", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Online Course", price: "₹1499", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Streaming Plan", price: "₹599", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  beauty: [
    { name: "Lipstick Set", price: "₹799", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Face Cream", price: "₹599", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Perfume", price: "₹1299", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],
  home: [
    { name: "CitrusBurn Rapid Burn", price: "$69", img:"Images/citrusburn rapid burn.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Max", price: "$79", img: "Images/CirtusBurn.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Fat Cutter", price: "$49", img:"Images/citrusburnmax.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn ThermoX", price: "$39", img:"Images/thermox.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Slim Booster", price: "$59", img:"Images/slimbooster.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Active+", price: "$39", img:"Images/citrusburn active+.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Fit Formula", price: "$39", img:"Images/citrusburn fit formula.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive Elite", price: "₹$39", img: "Images/Prostaviveelite.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive Prime", price: "₹$41", img: "Images/ProstaVive Prome.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive X", price: "₹$45", img: "Images/prostavive x.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive Core", price: "₹$59", img: "Images/proatavive core.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive Vitality", price: "₹$34", img: "Images/prostavive vitality.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
  ],

  health: [
    { name: "CitrusBurn Rapid Burn", price: "$69", img:"Images/citrusburn rapid burn.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Max", price: "$79", img: "Images/CirtusBurn.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Fat Cutter", price: "$49", img:"Images/citrusburnmax.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn ThermoX", price: "$39", img:"Images/thermox.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Slim Booster", price: "$59", img:"Images/slimbooster.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Active+", price: "$39", img:"Images/citrusburn active+.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "CitrusBurn Fit Formula", price: "$39", img:"Images/citrusburn fit formula.jpeg", link: "https://8e9e63ll3gh02xd2mfyl1y-kzl.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive Elite", price: "₹$39", img: "Images/Prostaviveelite.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive Prime", price: "₹$41", img: "Images/ProstaVive Prome.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive X", price: "₹$45", img: "Images/prostavive x.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive Core", price: "₹$59", img: "Images/proatavive core.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
    { name: "ProstaVive Vitality", price: "₹$34", img: "Images/prostavive vitality.jpeg", link: "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google" },
  ],

  electronics: [
    { name: "Mobile", price: "₹10000", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Laptop", price: "₹50000", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Headphones", price: "₹1200", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Speaker", price: "₹1500", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Camera", price: "₹25000", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "TV", price: "₹40000", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Mouse", price: "₹300", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Keyboard", price: "₹700", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ],

  fashion: [
    { name: "Shirt", price: "₹500", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Jeans", price: "₹1200", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Shoes", price: "₹1500", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "T-shirt", price: "₹400", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Jacket", price: "₹2000", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Cap", price: "₹200", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Watch", price: "₹800", img: "https://via.placeholder.com/200", link: "https://example.com" },
    { name: "Belt", price: "₹300", img: "https://via.placeholder.com/200", link: "https://example.com" }
  ]
};

let currentCategory = 'home';

function loadProducts(category) {
  currentCategory = category;

  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  let items = [...products[category]];
  items.sort(() => 0.5 - Math.random());

  items.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${p.price}</p>
      <a href="${p.link}" target="_blank">
        <button>Buy Now</button>
      </a>
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
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${p.price}</p>
      <a href="${p.link}" target="_blank">
        <button>Buy Now</button>
      </a>
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

loadProducts('home');