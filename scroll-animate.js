document.addEventListener("DOMContentLoaded", () => {

  // ===== Animate .child-view word-by-word =====
  const views = document.querySelectorAll(".child-view");
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

  let currentIndex = 0;
  function animateView(view, callback) {
    const words = view.querySelectorAll(".letter");
    words.forEach((word, i) => {
      setTimeout(() => {
        word.classList.add("show");
        if (i === words.length - 1 && callback) {
          setTimeout(callback, 400);
        }
      }, i * 200);
    });
  }

  function checkAndAnimateViews() {
    if (currentIndex >= views.length) return;
    const view = views[currentIndex];
    const rect = view.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      animateView(view, () => {
        currentIndex++;
        checkAndAnimateViews();
      });
      window.removeEventListener("scroll", checkAndAnimateViews);
      setTimeout(() => window.addEventListener("scroll", checkAndAnimateViews), 1000);
    }
  }

  window.addEventListener("scroll", checkAndAnimateViews);
  checkAndAnimateViews();

  // ===== Fade-up for .child-box, .client-box, .location-box =====
  const fadeElements = document.querySelectorAll(".child-box, .client-box, .location-box");
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-up-show");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  fadeElements.forEach(el => fadeObserver.observe(el));

  // ===== Sequential slide-in for .location-box (desktop) =====
  const locationElements = document.querySelectorAll(".location-box");
  const slideObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          locationElements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add("slide-in-show");
            }, i * 600);
          });
          slideObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  locationElements.forEach(el => slideObserver.observe(el));

  // ===== Sequential slide-in for .contact-box (desktop) =====
  const contactElements = document.querySelectorAll(".contact-box");
  const contactObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactElements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add("slide-in-show");
            }, i * 600);
          });
          contactObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  contactElements.forEach(el => contactObserver.observe(el));

  // ===== Make contact boxes clickable =====
  const contactLinks = [
    "tel:+9647730027392",              // Phone
    "mailto:ZKKM_STUDIO@GMAIL.COM",    // Email
    "https://www.instagram.com/Z.K.K_M", // Instagram
    "https://www.facebook.com/Z.K.K_M"    // Facebook
  ];

  contactElements.forEach((el, i) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      const url = contactLinks[i];
      if (url.startsWith("tel:") || url.startsWith("mailto:")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank");
      }
    });

    // Optional hover effect
    el.addEventListener("mouseenter", () => el.style.transform = "translateY(-5px)");
    el.addEventListener("mouseleave", () => el.style.transform = "translateY(0)");
  });

});

// ===== Loader fade-out =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader-overlay");
  loader.classList.add("hidden");
});

document.getElementById('year').textContent = new Date().getFullYear();
