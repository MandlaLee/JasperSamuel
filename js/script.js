/* =========================================
   JASPER SAMUEL WEBSITE SCRIPT
========================================= */

/* STICKY HEADER COLOR CHANGE */

window.addEventListener("scroll", function () {

  const header = document.querySelector(".header");

  if (window.scrollY > 50) {

    header.style.background = "#2568a5";
    header.style.padding = "18px 0";
    header.style.transition = "0.3s ease";

  } else {

    header.style.background = "#2f78bb";
    header.style.padding = "22px 0";

  }

});


/* MOBILE MENU */

const nav = document.querySelector(".nav");
const navContainer = document.querySelector(".nav-container");

/* CREATE MENU BUTTON */

const menuButton = document.createElement("div");

menuButton.classList.add("menu-toggle");

menuButton.innerHTML = "☰";

navContainer.appendChild(menuButton);


/* TOGGLE NAVIGATION */

menuButton.addEventListener("click", function () {

  nav.classList.toggle("show-nav");

});


/* CLOSE MOBILE MENU WHEN LINK CLICKED */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

  link.addEventListener("click", function () {

    nav.classList.remove("show-nav");

  });

});


/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {

      target.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});


/* SIMPLE FADE-IN ANIMATION */

const fadeElements = document.querySelectorAll(
  ".featured-card, .book-card, .donation-box, .impact-box, .category-box"
);

function fadeInOnScroll() {

  fadeElements.forEach(element => {

    const position = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (position < screenPosition) {

      element.classList.add("fade-in");

    }

  });

}

window.addEventListener("scroll", fadeInOnScroll);

fadeInOnScroll();


/* NEWSLETTER FORM */

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {

  newsletterForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("Thank you for signing up!");

    newsletterForm.reset();

  });

}


/* CONTACT FORM */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("Your message has been sent successfully!");

    contactForm.reset();

  });

}


function openHandsPopup() {
  document.getElementById("openHandsModal").style.display = "flex";
}

function closeOpenHandsPopup() {
  document.getElementById("openHandsModal").style.display = "none";
}

function confirmOpenHands() {
  window.location.href = "https://YOUR-KINGSHIP-WEBSITE-URL.com/open-hands";
}







/* =========================
  SLIDERRRRRRRR
========================= */
(function() {
  function initSlider() {
    if (typeof Swiper === 'undefined') {
      console.warn("Swiper not loaded yet, retrying...");
      setTimeout(initSlider, 100);
      return;
    }
    const bgShape = document.querySelector('.bg-shape');
    const productImages = document.querySelectorAll('.product-img__item');
    const gradients = [
      "radial-gradient(circle at 15% 25%, #c73f4a, #8b1e3a)",
      "radial-gradient(circle at 75% 20%, #2c3e8f, #0f1a2f)",
      "radial-gradient(circle at 30% 80%, #1f6392, #0b1c2c)",
      "radial-gradient(circle at 65% 40%, #b53b4b, #641e33)",
      "radial-gradient(circle at 20% 60%, #2c5a7a, #0c1a28)",
      "radial-gradient(circle at 70% 70%, #b5473a, #721c2c)",
      "radial-gradient(circle at 40% 30%, #1f5680, #0a1422)",
      "radial-gradient(circle at 80% 50%, #b73c48, #651e2e)",
      "radial-gradient(circle at 25% 45%, #2b6d8f, #0c1d2b)",
      "radial-gradient(circle at 55% 80%, #c24249, #7a1c2f)",
      "radial-gradient(circle at 10% 70%, #1f5a78, #0f1a2c)",
      "radial-gradient(circle at 85% 25%, #aa3643, #4a1528)",
      "radial-gradient(circle at 45% 55%, #1d6185, #0b1724)",
      "radial-gradient(circle at 60% 35%, #bc414b, #681e2f)"
    ];
    function updateSlide(swiper) {
      if (!swiper || !productImages.length) return;
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) return;
      const targetId = activeSlide.getAttribute('data-target');
      if (targetId) {
        productImages.forEach(img => img.classList.remove('active'));
        const matched = document.querySelector(`.product-img__item[data-img="${targetId}"]`);
        if (matched) matched.classList.add('active');
      }
      if (bgShape && gradients.length) {
        const idx = swiper.realIndex % gradients.length;
        bgShape.style.background = gradients[idx];
      }
    }
    const swiper = new Swiper('.product-slider', {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true },
      speed: 550,
      navigation: { nextEl: '.next', prevEl: '.prev' },
      on: {
        init: function() { updateSlide(this); },
        slideChange: function() { updateSlide(this); },
        transitionEnd: function() { updateSlide(this); }
      }
    });
    if (bgShape && !bgShape.style.background) bgShape.style.background = gradients[0];
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
})();
