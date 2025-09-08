document.addEventListener("DOMContentLoaded", () => {
  const brands = document.querySelectorAll(".brand");
  const brandSections = document.querySelectorAll(".brand-products");

  // Handle brand clicks
  brands.forEach(brand => {
    brand.addEventListener("click", () => {
      // Highlight the clicked brand
      brands.forEach(b => b.classList.remove("active"));
      brand.classList.add("active");

      // Hide all brand sections
      brandSections.forEach(section => {
        section.classList.remove("active");

        // Hide categories and reset active category
        const categories = section.querySelector(".category-list");
        if (categories) {
          categories.style.display = "none";
          categories.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        }

        // Hide all products
        section.querySelectorAll(".product-card").forEach(p => {
          p.classList.remove("show");
          p.style.animation = "none";
        });
      });

      // Show only the selected brand's category list
      const selectedBrand = brand.dataset.brand;
      const activeSection = document.querySelector(`.brand-products[data-brand="${selectedBrand}"]`);
      if (activeSection) {
        activeSection.classList.add("active");
        const categories = activeSection.querySelector(".category-list");
        if (categories) categories.style.display = "flex";

        // Products remain hidden until category clicked
        activeSection.querySelectorAll(".product-card").forEach(p => {
          p.classList.remove("show");
          p.style.animation = "none";
        });

        // ✅ Auto-select the first category of the brand
        const firstCategory = categories?.querySelector("li");
        if (firstCategory) firstCategory.click();
      }
    });
  });

  // Handle category clicks with cascading animation
  document.querySelectorAll(".brand-products").forEach(section => {
    const categories = section.querySelectorAll(".category-list li");
    const productsGrids = section.querySelectorAll(".products-grid");

    categories.forEach(cat => {
      cat.addEventListener("click", () => {
        // Highlight only the clicked category
        categories.forEach(c => c.classList.remove("active"));
        cat.classList.add("active");

        const selectedCategory = cat.dataset.category;

        // Show products of selected category only
        productsGrids.forEach(grid => {
          const products = grid.querySelectorAll(".product-card");

          if (grid.dataset.category === selectedCategory) {
            products.forEach((p, index) => {
              setTimeout(() => {
                p.classList.add("show");
                p.style.animation = "slideInLeft 0.6s ease forwards";
              }, index * 150); // cascading delay
            });
          } else {
            products.forEach(p => {
              p.classList.remove("show");
              p.style.animation = "none";
            });
          }
        });
      });
    });
  });

  // Auto-select first brand (and its first category via above logic)
  if (brands.length > 0) brands[0].click();
});
