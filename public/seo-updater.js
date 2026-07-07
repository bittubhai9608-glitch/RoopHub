document.addEventListener('DOMContentLoaded', () => {
    const productTitleElement = document.querySelector('.product-info h1');
    const productDescriptionElement = document.querySelector('.about-product p');
    let canonicalLink = document.querySelector('link[rel="canonical"]');

    // Extract product title from the H1 tag and append " | RoopHub"
    const title = productTitleElement ? productTitleElement.textContent.trim() + ' | RoopHub' : 'RoopHub';
    
    // Extract product description from the first paragraph in the "About This Product" section
    const description = productDescriptionElement ? productDescriptionElement.textContent.trim() : 'Roophub is an affiliate marketplace that offers a wide range of all types of products recommended by artificial intelligence.';
    
    // Construct the canonical URL using the current page's path and origin
    const currentPath = window.location.pathname;
    const canonicalUrl = new URL(currentPath, window.location.origin).href;

    // Update the document title
    document.title = title;

    // Update or create the meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update or create the canonical link tag, removing any non-standard attributes
    if (canonicalLink) {
        canonicalLink.parentNode.removeChild(canonicalLink); // Remove existing canonical to clean up extra attributes
    }
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', canonicalUrl);
    document.head.appendChild(canonicalLink);
});