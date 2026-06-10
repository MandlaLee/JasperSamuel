// ==========================
// script.js
// ==========================

// Wait until DOM loads
document.addEventListener("DOMContentLoaded", function () {

  // ==========================
  // STICKY HEADER ON SCROLL
  // ==========================
  const header = document.querySelector(".header");
  const stickyClass = "header-sticky";

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add(stickyClass);
    } else {
      header.classList.remove(stickyClass);
    }
  });

  // ==========================
  // SMOOTH SCROLLING FOR ANCHORS
  // ==========================
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach(function(link){
    link.addEventListener("click", function(e){
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if(targetEl){
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ==========================
  // MOBILE MENU TOGGLE
  // ==========================
  const nav = document.querySelector(".nav");
  const menuToggle = document.createElement("div");
  menuToggle.classList.add("menu-toggle");
  menuToggle.innerHTML = "&#9776;"; // Hamburger icon
  document.querySelector(".nav-container").prepend(menuToggle);

  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("nav-active");
  });

  // ==========================
  // FADE-IN ON SCROLL (Optional)
  // ==========================
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

});
