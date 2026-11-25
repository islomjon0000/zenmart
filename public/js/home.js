document.addEventListener("DOMContentLoaded", () => {
  const products = window.ZENMART_PRODUCTS || [];
  document.querySelectorAll(".product_box, .tv_product_box, .event_product_box").forEach((card) => {
    const title = card.querySelector(".product_desc")?.textContent.trim() || "";
    const imageElement = card.querySelector(".product_img img, .event_product_img img");
    const imageBox = card.querySelector(".product_img_box");
    const imagePath = imageElement?.getAttribute("src")
      || imageBox?.getAttribute("style")?.match(/url\(([^)]+)\)/)?.[1]?.replaceAll(/["']/g, "")
      || "";
    const imageName = imagePath.split(/[\\/]/).pop();
    const matchingProduct = products.find((item) => imageName && item.image.split("/").pop() === imageName)
      || products.find((item) => title && (title.includes(item.title) || item.title.includes(title)));
    if (!matchingProduct) return;
    card.dataset.id = matchingProduct.id;
    card.querySelectorAll("a").forEach((link) => {
      link.href = `product.html?id=${encodeURIComponent(matchingProduct.id)}`;
    });
  });
});
