document.addEventListener("DOMContentLoaded", () => {
  const products = window.ZENMART_PRODUCTS || [];
  document.querySelectorAll(".product_box, .tv_product_box, .event_product_box").forEach((card) => {
    if (card.dataset.id) return;
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

  document.querySelectorAll(".tv_frame").forEach((carousel) => {
    const track = carousel.querySelector(".tv_product_boxes");
    const cards = Array.from(track.querySelectorAll(".tv_product_box"));
    const controls = carousel.querySelectorAll(".tv_wrapper > .next_prev_box");
    const previous = controls[0];
    const next = controls[1];
    const dots = carousel.querySelector(".pagination_dot");
    const pageArrows = carousel.querySelectorAll(".pagination_main > img");
    if (!cards.length || !previous || !next || !dots || pageArrows.length < 2) return;
    const previousControls = [previous, pageArrows[0]];
    const nextControls = [next, pageArrows[1]];

    const visibleCount = () => window.matchMedia("(max-width: 600px)").matches
      ? 1
      : window.matchMedia("(max-width: 900px)").matches ? 2 : 4;
    let itemsPerPage = visibleCount();
    let currentPage = 0;

    const getPageCount = () => Math.ceil(cards.length / itemsPerPage);
    const updateControls = () => {
      dots.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentPage);
        dot.setAttribute("aria-current", index === currentPage ? "page" : "false");
      });
      previousControls.forEach((control) => control.setAttribute("aria-disabled", String(currentPage === 0)));
      nextControls.forEach((control) => control.setAttribute("aria-disabled", String(currentPage === getPageCount() - 1)));
    };
    const renderDots = () => {
      dots.innerHTML = Array.from({ length: getPageCount() }, (_, index) =>
        `<div class="dot${index === currentPage ? " active" : ""}" data-page="${index}" role="button" tabindex="0" aria-label="Go to carousel page ${index + 1}" aria-current="${index === currentPage ? "page" : "false"}"><div></div></div>`
      ).join("");
      updateControls();
    };
    const goToPage = (page, behavior) => {
      currentPage = Math.max(0, Math.min(page, getPageCount() - 1));
      const firstCard = cards[currentPage * itemsPerPage];
      if (firstCard) {
        const scrollLeft = track.scrollLeft
          + firstCard.getBoundingClientRect().left
          - track.getBoundingClientRect().left;
        const targetScrollLeft = Math.max(0, Math.min(scrollLeft, track.scrollWidth - track.clientWidth));
        if (behavior === "auto") {
          track.scrollLeft = targetScrollLeft;
        } else {
          track.scrollTo({
            left: targetScrollLeft,
            behavior: behavior || "smooth"
          });
        }
      }
      updateControls();
    };

    [...previousControls, ...nextControls].forEach((control) => {
      control.setAttribute("role", "button");
      control.setAttribute("tabindex", "0");
      control.setAttribute("aria-label", previousControls.includes(control) ? "Previous products" : "Next products");
      control.addEventListener("click", () => {
        previousControls.includes(control)
          ? goToPage(currentPage - 1)
          : goToPage(currentPage + 1);
      });
      control.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        previousControls.includes(control)
          ? goToPage(currentPage - 1)
          : goToPage(currentPage + 1);
      });
    });
    dots.addEventListener("click", (event) => {
      const dot = event.target.closest(".dot[data-page]");
      if (dot) goToPage(Number(dot.dataset.page));
    });
    dots.addEventListener("keydown", (event) => {
      const dot = event.target.closest(".dot[data-page]");
      if (!dot || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      goToPage(Number(dot.dataset.page));
    });
    track.addEventListener("scroll", () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      currentPage = maxScroll - track.scrollLeft <= 1
        ? getPageCount() - 1
        : Math.min(getPageCount() - 1, Math.round(track.scrollLeft / track.clientWidth));
      updateControls();
    }, { passive: true });

    renderDots();
    window.addEventListener("resize", () => {
      const nextItemsPerPage = visibleCount();
      if (nextItemsPerPage === itemsPerPage) return;
      currentPage = Math.floor((currentPage * itemsPerPage) / nextItemsPerPage);
      itemsPerPage = nextItemsPerPage;
      currentPage = Math.min(currentPage, getPageCount() - 1);
      renderDots();
      goToPage(currentPage, "auto");
    });
  });
});
