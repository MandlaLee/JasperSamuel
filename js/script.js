/* Jasper Samuel Ministries — site interactions */
(() => {
  "use strict";

  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initHeader() {
    const header = qs(".header");
    if (!header) return;

    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  function initMobileNavigation() {
    const nav = qs(".nav");
    const navContainer = qs(".nav-container");
    if (!nav || !navContainer) return;

    nav.id = nav.id || "primary-navigation";

    let menuButton = qs(".menu-toggle", navContainer);
    if (!menuButton) {
      menuButton = document.createElement("button");
      menuButton.type = "button";
      menuButton.className = "menu-toggle";
      menuButton.setAttribute("aria-controls", nav.id);
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.innerHTML = "<span></span><span></span><span></span>";
      navContainer.appendChild(menuButton);
    }

    const closeMenu = () => {
      nav.classList.remove("show-nav");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("nav-open");
    };

    const openMenu = () => {
      nav.classList.add("show-nav");
      menuButton.classList.add("is-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Close navigation menu");
      document.body.classList.add("nav-open");
    };

    menuButton.addEventListener("click", () => {
      menuButton.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
    });

    qsa("a", nav).forEach(link => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
      if (!navContainer.contains(event.target)) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  function initSmoothLinks() {
    qsa('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener("click", event => {
        const target = qs(anchor.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
    });
  }

  function initRevealAnimations() {
    const elements = qsa(
      ".featured-card, .book-card, .about-card, .category-box, .donation-box, .impact-box, .mission-box, .identity-preview-card, .contact-form-box, .contact-info-box"
    );
    if (!elements.length || reduceMotion || !("IntersectionObserver" in window)) return;

    elements.forEach(element => element.classList.add("reveal"));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

    elements.forEach(element => observer.observe(element));
  }

  function initContactForm() {
    const form = qs(".contact-form");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const subjectField = qs('[name="subject"]', form) || qs("select", form);
    const messageField = qs('[name="message"]', form) || qs("textarea", form);
    const requestedSubject = params.get("subject");
    const requestedBook = params.get("book");

    if (subjectField && requestedSubject) {
      const option = qsa("option", subjectField).find(item => item.value === requestedSubject || item.textContent.trim() === requestedSubject);
      if (option) subjectField.value = option.value;
    }

    if (messageField && requestedBook && !messageField.value) {
      messageField.value = `Hello, I would like more information about “${requestedBook}”.`;
    }

    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const fields = qsa("input, select, textarea", form);
      const values = fields.reduce((data, field, index) => {
        const key = field.name || `field${index}`;
        data[key] = field.value.trim();
        return data;
      }, {});

      const firstName = values.firstName || values.field0 || "";
      const lastName = values.lastName || values.field1 || "";
      const email = values.email || values.field2 || "";
      const phone = values.phone || values.field3 || "";
      const subject = values.subject || values.field4 || "Website enquiry";
      const message = values.message || values.field5 || "";

      const body = [
        `Name: ${[firstName, lastName].filter(Boolean).join(" ")}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "",
        "",
        message
      ].filter((line, index, array) => line || (index > 0 && array[index - 1])).join("\n");

      const mailto = `mailto:kingshipchristiancentre@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      const status = qs(".form-status", form);
      if (status) status.textContent = "Your email application should now open with the message prepared.";
    });
  }

  function initNewsletterForm() {
    const form = qs(".newsletter-form");
    if (!form) return;

    form.addEventListener("submit", event => {
      event.preventDefault();
      const email = qs('input[type="email"]', form);
      if (email && !email.checkValidity()) {
        email.reportValidity();
        return;
      }

      const status = qs(".form-status", form) || document.createElement("p");
      status.className = "form-status";
      status.textContent = "Newsletter registration is being connected. Please follow Jasper Samuel on YouTube or Instagram for updates in the meantime.";
      if (!status.parentNode) form.insertAdjacentElement("afterend", status);
    });
  }

  function initIdentitySlider() {
    const slider = qs(".identity-slider");
    if (!slider) return;

    const slides = qsa(".identity-slide", slider);
    const dots = qsa(".dot", slider);
    const nextButton = qs(".next", slider);
    const previousButton = qs(".prev", slider);
    if (!slides.length) return;

    let current = Math.max(0, slides.findIndex(slide => slide.classList.contains("active")));
    let timer = null;

    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index === current ? "false" : "true");
    });

    dots.forEach((dot, index) => {
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "0");
      dot.setAttribute("aria-label", `Show slide ${index + 1}`);
    });

    if (previousButton) previousButton.setAttribute("aria-label", "Previous slide");
    if (nextButton) nextButton.setAttribute("aria-label", "Next slide");

    const showSlide = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === current;
        slide.classList.toggle("active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === current;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    const start = () => {
      stop();
      if (!reduceMotion && slides.length > 1) {
        timer = window.setInterval(() => showSlide(current + 1), 6000);
      }
    };

    previousButton?.addEventListener("click", () => { showSlide(current - 1); start(); });
    nextButton?.addEventListener("click", () => { showSlide(current + 1); start(); });

    dots.forEach((dot, index) => {
      const activate = () => { showSlide(index); start(); };
      dot.addEventListener("click", activate);
      dot.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);
    slider.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") showSlide(current - 1);
      if (event.key === "ArrowRight") showSlide(current + 1);
    });

    showSlide(current);
    start();
  }

  function initModal() {
    const modal = qs("#openHandsModal");
    if (!modal) return;

    const close = () => {
      modal.classList.remove("is-open");
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    };

    window.openHandsPopup = () => {
      modal.style.display = "flex";
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      qs(".btn-confirm", modal)?.focus();
    };

    window.closeOpenHandsPopup = close;
    window.confirmOpenHands = () => {
      window.location.href = "https://kingshipcentre.co.za/give.html";
    };

    modal.addEventListener("click", event => {
      if (event.target === modal) close();
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  }

  function initFooterYear() {
    qsa("[data-current-year]").forEach(element => {
      element.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileNavigation();
    initSmoothLinks();
    initRevealAnimations();
    initContactForm();
    initNewsletterForm();
    initIdentitySlider();
    initModal();
    initFooterYear();
  });
})();
