document.addEventListener("DOMContentLoaded", () => {
  // ===== Loader Overlay =====
  const loader = document.getElementById("loader-overlay");
  window.addEventListener("load", () => {
    loader.classList.add("hidden");
  });

  // ===== Animate .child-view letter-by-letter =====
  const views = document.querySelectorAll(".child-view, .service-box");
  views.forEach(view => {
    const textElements = view.querySelectorAll("h3, p");
    textElements.forEach(el => {
      const words = el.textContent.split(" ");
      el.textContent = "";
      words.forEach(word => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.classList.add("letter");
        el.appendChild(span);
      });
    });
  });

  // ===== Utility: Intersection Observer =====
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
  };

  // ===== Fade/slide in elements on scroll =====
  const fadeElements = document.querySelectorAll(".child-box, .location-box, .contact-box, .service-box");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up-show");
        entry.target.classList.add("slide-in-show");
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ===== Animate letters inside .child-view when in viewport =====
  const letters = document.querySelectorAll(".child-view .letter , .service-box .letter");
  const letterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        letters.forEach((letter, idx) => {
          setTimeout(() => {
            letter.classList.add("show");
          }, idx * 50); // stagger letters by 50ms
        });
        letterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  views.forEach(view => letterObserver.observe(view));

  // ===== Optional: Animate service boxes separately =====
  const serviceBoxes = document.querySelectorAll(".service-box");
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.3 });

  serviceBoxes.forEach(box => serviceObserver.observe(box));
});
