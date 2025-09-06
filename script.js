document.addEventListener("DOMContentLoaded", () => {
  const brands = document.querySelectorAll(".brand");
  const brandSections = document.querySelectorAll(".brand-products");

  brands.forEach(brand => {
    brand.addEventListener("click", () => {
      // Remove active from brands
      brands.forEach(b => b.classList.remove("active"));
      brand.classList.add("active");

      // Hide all product sections
      brandSections.forEach(section => {
        section.classList.remove("active");
        // Reset animations inside
        section.querySelectorAll(".product-card").forEach(p => {
          p.classList.remove("show");
          p.style.animation = "none";
        });
      });

      // Show the selected brand’s products
      const selectedBrand = brand.dataset.brand;
      const activeSection = document.querySelector(`.brand-products[data-brand="${selectedBrand}"]`);
      if (activeSection) {
        activeSection.classList.add("active");

        // Animate products one by one
        const products = activeSection.querySelectorAll(".product-card");
        products.forEach((product, index) => {
          setTimeout(() => {
            product.classList.add("show");
            product.style.animation = "slideInLeft 0.6s ease forwards";
          }, index * 150); // cascade delay
        });
      }
    });
  });

  // Auto-select first brand
  if (brands.length > 0) {
    brands[0].click();
  }
});
