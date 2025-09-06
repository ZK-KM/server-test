document.addEventListener("DOMContentLoaded", () => {
  const brands = document.querySelectorAll(".brand");
  const brandSections = document.querySelectorAll(".brand-products");

  // Brand click: show brand section only
  brands.forEach(brand => {
    brand.addEventListener("click", () => {
      // Remove active from all brands
      brands.forEach(b => b.classList.remove("active"));
      brand.classList.add("active");

      // Hide all brand sections
      brandSections.forEach(section => {
        section.classList.remove("active");
        // Hide all product grids inside
        section.querySelectorAll(".products-grid").forEach(grid => {
          grid.style.display = "none";
          grid.querySelectorAll(".product-card").forEach(p => {
            p.classList.remove("show");
            p.style.animation = "none";
          });
        });
      });

      // Show only selected brand section (categories remain closed)
      const selectedBrand = brand.dataset.brand;
      const activeSection = document.querySelector(`.brand-products[data-brand="${selectedBrand}"]`);
      if (activeSection) {
        activeSection.classList.add("active");
      }
    });
  });

  // Auto-select the first brand on page load
  if (brands.length > 0) {
    brands[0].click();
  }

  // Category click: toggle its product grid
  const categories = document.querySelectorAll(".category-title");
  categories.forEach(category => {
    category.addEventListener("click", () => {
      const grid = category.nextElementSibling;
      if (!grid) return;

      const isOpen = grid.style.display === "grid";

      // Hide all other grids in the same brand
      const brandSection = category.closest(".brand-products");
      brandSection.querySelectorAll(".products-grid").forEach(g => {
        if (g !== grid) {
          g.style.display = "none";
          g.querySelectorAll(".product-card").forEach(p => {
            p.classList.remove("show");
            p.style.animation = "none";
          });
        }
      });

      if (isOpen) {
        // Close the grid if it was already open
        grid.style.display = "none";
        grid.querySelectorAll(".product-card").forEach(p => {
          p.classList.remove("show");
          p.style.animation = "none";
        });
      } else {
        // Open the grid with animation
        grid.style.display = "grid";
        const products = grid.querySelectorAll(".product-card");
        products.forEach((product, index) => {
          setTimeout(() => {
            product.classList.add("show");
            product.style.animation = "slideInLeft 0.6s ease forwards";
          }, index * 150);
        });
      }
    });
  });
});
