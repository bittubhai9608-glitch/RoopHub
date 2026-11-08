(() => {
  const scriptUrl = document.currentScript?.src;
  if (!scriptUrl) {
    return;
  }

  const platforms = [
    { name: "Amazon", image: "affiliated_amazon.jpeg" },
    { name: "Meesho", image: "affiliated_meesho.jpeg" },
    { name: "Flipkart", image: "affiliated_fliptkard.jpeg" },
    { name: "Myntra", image: "affiliated_mytra.jpeg" },
    { name: "ClickBank", image: "affiliated_clickbank.jpeg" },
  ];

  const style = document.createElement("style");
  style.textContent = `
    .roophub-site-brand {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: max-content;
      color: #000;
      font-family: Arial, sans-serif;
      font-size: 48px;
      font-weight: 900;
      letter-spacing: 2px;
      line-height: 1;
      text-decoration: none;
      white-space: nowrap;
    }
    .roophub-site-brand > span { font-size: inherit; }
    .roophub-site-brand img {
      width: 40px;
      height: 35px;
      border-radius: 10px;
      object-fit: cover;
    }
    .roophub-site-brand__roop { color: #d9100a; }
    .roophub-site-brand__hub { color: #000; }
    .roophub-site-header {
      position: fixed !important;
      top: 0;
      right: 0;
      left: 0;
      z-index: 1000;
      display: block;
      height: 75px !important;
      padding: 10px 0 !important;
      background: rgba(255, 255, 255, 0.95) !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
      backdrop-filter: blur(20px) !important;
    }
    .roophub-site-header__container {
      display: flex;
      width: 100%;
      max-width: 1200px;
      height: 100%;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      padding: 0 24px;
    }
    body.roophub-header-page {
      padding-top: 75px !important;
    }
    select.roophub-menu-toggle {
      position: fixed !important;
      top: 14px !important;
      right: 14px !important;
      z-index: 1100 !important;
      width: 48px !important;
      height: 48px !important;
      padding: 0 !important;
      overflow: hidden;
      border: 0 !important;
      border-radius: 14px !important;
      appearance: none;
      color: transparent !important;
      cursor: pointer;
      background-color: #d9100a !important;
      background-image:
        linear-gradient(#fff, #fff),
        linear-gradient(#fff, #fff),
        linear-gradient(#fff, #fff) !important;
      background-repeat: no-repeat !important;
      background-position: center 16px, center 23px, center 30px !important;
      background-size: 22px 2px !important;
      box-shadow: 0 4px 12px rgb(15 23 42 / 22%);
      transition: transform 160ms ease, box-shadow 160ms ease;
    }
    select.roophub-menu-toggle:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgb(15 23 42 / 26%);
    }
    select.roophub-menu-toggle:focus-visible {
      outline: 3px solid #fca5a5;
      outline-offset: 3px;
    }
    select.roophub-menu-toggle option {
      color: #172033;
      font-size: 16px;
    }
    .affiliate-platform-strip {
      padding: 28px 0 24px;
      overflow: hidden;
      background: linear-gradient(180deg, #f8fafc, #fff);
      border-top: 1px solid #e8edf3;
      border-bottom: 1px solid #e8edf3;
      color: #172033;
      font-family: inherit;
      text-align: center;
    }
    .affiliate-platform-strip__title {
      margin: 0 16px 6px;
      font-size: 1.05rem;
      font-weight: 700;
    }
    .affiliate-platform-strip__disclosure {
      margin: 0 16px 20px;
      color: #64748b;
      font-size: .88rem;
    }
    .affiliate-platform-strip__viewport {
      overflow: hidden;
    }
    .affiliate-platform-strip__track {
      display: flex;
      width: max-content;
      animation: affiliate-platform-scroll 32s linear infinite;
    }
    .affiliate-platform-strip__viewport:hover .affiliate-platform-strip__track,
    .affiliate-platform-strip__viewport:focus-within .affiliate-platform-strip__track {
      animation-play-state: paused;
    }
    .affiliate-platform-strip__group {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      gap: clamp(24px, 5vw, 64px);
      padding: 0 clamp(12px, 2.5vw, 32px);
    }
    .affiliate-platform-strip__logo {
      display: grid;
      width: 88px;
      height: 88px;
      flex: 0 0 88px;
      place-items: center;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 5px 18px rgb(15 23 42 / 9%);
    }
    .affiliate-platform-strip__logo img {
      width: 100%;
      height: 100%;
      padding: 9px;
      border-radius: 50%;
      object-fit: contain;
    }
    @keyframes affiliate-platform-scroll {
      to { transform: translateX(-25%); }
    }
    @media (max-width: 600px) {
      .roophub-site-header__container { padding: 0 16px; }
      .roophub-site-brand { font-size: clamp(1.7rem, 7vw, 2.5rem); }
      .roophub-site-brand img { width: 36px; height: 34px; }
      .affiliate-platform-strip { padding: 22px 0 20px; }
      .affiliate-platform-strip__logo {
        width: 72px;
        height: 72px;
        flex-basis: 72px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .affiliate-platform-strip__track { animation: none; }
      .affiliate-platform-strip__group:not(:first-child) { display: none; }
      .affiliate-platform-strip__track { width: 100%; justify-content: center; }
    }
  `;
  document.head.append(style);

  const existingHeader = document.querySelector("#navbar, header, nav.navbar");
  const header = existingHeader ?? document.createElement("header");
  header.className = "roophub-site-header";
  header.removeAttribute("style");

  const container = document.createElement("div");
  container.className = "roophub-site-header__container";

  const brand = document.createElement("a");
  brand.className = "roophub-site-brand";
  brand.href = "/index.html";
  brand.setAttribute("aria-label", "RoopHub home");

  const logo = document.createElement("img");
  logo.src = new URL("../BannerImages/RoopHubFavicon.ico", scriptUrl).href;
  logo.alt = "RoopHub logo";

  const wordmark = document.createElement("span");
  const roop = document.createElement("span");
  roop.className = "roophub-site-brand__roop";
  roop.textContent = "ROOP";
  const hub = document.createElement("span");
  hub.className = "roophub-site-brand__hub";
  hub.textContent = "HUB";
  wordmark.append(roop, hub);
  brand.append(logo, wordmark);

  const menu = document.createElement("select");
  menu.className = "roophub-menu-toggle";
  menu.setAttribute("aria-label", "Open navigation menu");

  const options = [
    ["≡", ""],
    ["Home", "/index.html"],
    ["Shoes", "/ShoesView/index.html"],
    ["Beauty", "/Beauty/index.html"],
    ["Trending", "/Trending/index.html"],
    ["Electronic", "/Electronic/index.html"],
    ["Contact", "/Footer/Contact.html"],
  ];

  for (const [label, value] of options) {
    const option = document.createElement("option");
    option.textContent = label;
    option.value = value;
    menu.append(option);
  }

  menu.addEventListener("change", () => {
    if (menu.value) {
      window.location.href = menu.value;
    }
  });

  container.append(brand, menu);
  header.replaceChildren(container);
  if (!existingHeader) {
    document.body.insertBefore(header, document.body.firstChild);
  }

  const homePaths = ["/", "/index.html", "/public/index.html"];
  document.body.classList.toggle(
    "roophub-header-page",
    !homePaths.includes(window.location.pathname.replace(/\/+$/, "") || "/")
  );

  if (document.querySelector(".affiliate-platform-strip")) {
    return;
  }

  const strip = document.createElement("section");
  strip.className = "affiliate-platform-strip";
  strip.setAttribute("aria-label", "Affiliate platform disclosure");

  const title = document.createElement("p");
  title.className = "affiliate-platform-strip__title";
  title.textContent = "Shop with our e-commerce affiliate partners";

  const disclosure = document.createElement("p");
  disclosure.className = "affiliate-platform-strip__disclosure";
  disclosure.textContent =
    "RoopHub is affiliated with Amazon, Meesho, Flipkart, Myntra, and ClickBank. We may earn a commission when you shop through our links, at no extra cost to you.";

  const viewport = document.createElement("div");
  viewport.className = "affiliate-platform-strip__viewport";

  const track = document.createElement("div");
  track.className = "affiliate-platform-strip__track";
  track.setAttribute("aria-hidden", "true");

  for (let groupIndex = 0; groupIndex < 4; groupIndex += 1) {
    const group = document.createElement("div");
    group.className = "affiliate-platform-strip__group";

    for (const platform of platforms) {
      const logo = document.createElement("span");
      logo.className = "affiliate-platform-strip__logo";

      const image = document.createElement("img");
      image.src = new URL(platform.image, scriptUrl).href;
      image.alt = "";
      image.title = platform.name;
      image.loading = "lazy";
      logo.append(image);
      group.append(logo);
    }

    track.append(group);
  }

  viewport.append(track);
  strip.append(title, disclosure, viewport);

  const footer = document.querySelector("footer, .footer");
  if (footer?.parentNode) {
    footer.parentNode.insertBefore(strip, footer);
  } else {
    document.body.append(strip);
  }
})();
