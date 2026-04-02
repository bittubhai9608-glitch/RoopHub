const products = {
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

loadProducts('home');