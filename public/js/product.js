document.addEventListener("DOMContentLoaded", () => {
  const products = window.ZENMART_PRODUCTS || [];
  const requestedId = new URLSearchParams(location.search).get("id");
  const product = products.find((item) => item.id === requestedId)
    || products.find((item) => item.id === "macbook-pro-16");
  if (!product) {
    throw new Error("No product data is available to render.");
  }

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  const formatPrice = (price) => `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  const escapeHTML = (value) => {
    const element = document.createElement("span");
    element.textContent = String(value);
    return element.innerHTML;
  };

  setText("productBrand", product.brand);
  setText("productTitle", product.title);
  setText("breadcrumbProduct", product.title);
  setText("productPrice", formatPrice(product.price));
  setText("productOldPrice", formatPrice(product.oldPrice));
  setText("reviewCount", `${product.reviews} reviews`);
  setText("productSku", product.sku || product.id.toUpperCase());
  document.title = `${product.title} | Zenmart`;

  const mainImage = document.getElementById("mainProductImage");
  const thumbnailList = document.getElementById("thumbnailList");
  const galleryImages = product.images.length ? product.images : [product.image];
  mainImage.src = galleryImages[0];
  mainImage.alt = product.title;
  thumbnailList.innerHTML = galleryImages.map((image, index) =>
    `<button class="thumbnail_button${index === 0 ? " active" : ""}" type="button" data-image="${escapeHTML(image)}" aria-label="View product image ${index + 1}"><img src="${escapeHTML(image)}" alt=""></button>`
  ).join("");
  thumbnailList.addEventListener("click", (event) => {
    const button = event.target.closest(".thumbnail_button");
    if (!button) return;
    thumbnailList.querySelectorAll(".thumbnail_button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    mainImage.src = button.dataset.image;
  });

  const specificationRows = product.specs.map(([label, value]) =>
    `<tr><th scope="row">${escapeHTML(label)}</th><td>${escapeHTML(value)}</td></tr>`
  ).join("");
  document.getElementById("specsList").innerHTML = specificationRows;

  const quantity = document.getElementById("quantity");
  document.getElementById("decreaseQty").addEventListener("click", () => {
    quantity.value = Math.max(1, Number(quantity.value) - 1);
  });
  document.getElementById("increaseQty").addEventListener("click", () => {
    quantity.value = Number(quantity.value) + 1;
  });

  const descriptionContent = product.id === "macbook-pro-16"
    ? `<p>The MacBook Pro combines the Apple M1 Pro chip with a Liquid Retina XDR display, long battery life, and the ports professionals need.</p>
      <h2>Performance and display</h2>
      <ul>
        <li>Apple M1 Pro chip for fast CPU, graphics, and machine learning performance</li>
        <li>16 GB of memory and a 1 TB solid state drive</li>
        <li>16.2-inch Liquid Retina XDR display</li>
        <li>Studio-quality microphones and a high-fidelity speaker system</li>
      </ul>`
    : `<p>${escapeHTML(product.title)} from ${escapeHTML(product.brand)}.</p>`;
  const specContent = `<table class="description_specs"><tbody>${specificationRows}</tbody></table>`;
  const descriptions = {
    description: ["Description", descriptionContent],
    specs: ["Details & Specs", specContent],
    included: ["What's Included", `<p>${escapeHTML(product.title)} and manufacturer documentation.</p>`],
    vendor: ["Vendor", `<p>${escapeHTML(product.brand)}</p>`],
    returns: ["Return Policy", "<p>Returns are accepted within 30 days of delivery, subject to the store's return terms.</p>"],
    questions: ["Questions and Answers", "<p>There are no questions for this product yet.</p>"],
    reviews: ["Customer Reviews", `<p>★★★★★ &nbsp; ${escapeHTML(product.reviews)} customer reviews</p>`]
  };
  const tabContent = document.getElementById("tabContent");
  tabContent.innerHTML = `<h2>Description</h2>${descriptionContent}`;
  document.querySelectorAll(".tabs button").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tabs button").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      const [heading, content] = descriptions[tab.dataset.tab];
      tabContent.innerHTML = `<h2>${heading}</h2>${content}`;
    });
  });

  const laptops = (window.ZENMART_LAPTOP_IDS || [])
    .filter((id) => id !== product.id)
    .map((id) => products.find((item) => item.id === id))
    .filter(Boolean);
  const renderCards = (containerId, items) => {
    document.getElementById(containerId).innerHTML = items.map((item) => `
      <div class="tv_product_box" data-id="${escapeHTML(item.id)}">
        <div class="product_img">
          <a href="product.html?id=${encodeURIComponent(item.id)}"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}"></a>
        </div>
        <div class="product_content_box">
          <span class="product_title">${escapeHTML(item.brand)}</span>
          <a href="product.html?id=${encodeURIComponent(item.id)}"><p class="product_desc">${escapeHTML(item.title)}</p></a>
          <div class="review_box" aria-label="5 out of 5 stars">
            ${Array.from({ length: 5 }, () => '<img src="public/images/icons/review.svg" alt="">').join("")}
            <span>${escapeHTML(item.reviews)} reviews</span>
          </div>
          <div class="price_box">
            <strong>${formatPrice(item.price)}</strong>
            <span>${formatPrice(item.oldPrice)}</span>
          </div>
        </div>
      </div>`).join("");
  };
  renderCards("relatedProducts", laptops);
  const recommendationSplit = Math.ceil(laptops.length / 2);
  renderCards("likeProducts", laptops.slice(recommendationSplit).concat(laptops.slice(0, recommendationSplit)));
});
