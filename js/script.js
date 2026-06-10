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
