(() => {
  const scriptUrl = document.currentScript?.src;
  if (!scriptUrl || document.querySelector(".affiliate-platform-strip")) {
    return;
  }

  const platforms = [
    { name: "Amazon", image: "affiliateecommarce/affiliated_amazon.jpeg" },
    { name: "Meesho", image: "affiliateecommarce/affiliated_meesho.jpeg" },
    { name: "Flipkart", image: "affiliateecommarce/affiliated_fliptkard.jpeg" },
    { name: "Myntra", image: "affiliateecommarce/affiliated_mytra.jpeg" },
  ];

  const style = document.createElement("style");
  style.textContent = `
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

  const strip = document.createElement("section");
  strip.className = "affiliate-platform-strip";
  strip.setAttribute("aria-label", "Affiliate platform disclosure");

  const title = document.createElement("p");
  title.className = "affiliate-platform-strip__title";
  title.textContent = "Shop with our e-commerce affiliate partners";

  const disclosure = document.createElement("p");
  disclosure.className = "affiliate-platform-strip__disclosure";
  disclosure.textContent =
    "RoopHub is affiliated with Amazon, Meesho, Flipkart, and Myntra. We may earn a commission when you shop through our links, at no extra cost to you.";

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
