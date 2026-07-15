/* =================================================================
   FlowState — Landing page interactions (vanilla JS, no dependencies)
   ================================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initHeaderScrollState();
    initScrollReveal();
    initBillingToggle();
    initFooterYear();
  });

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.contains("is-open");
      setOpen(!isOpen);
    });

    // Close the menu after tapping a link.
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    // Close on Escape for keyboard users.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    // Reset state when resizing back up to desktop.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) setOpen(false);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  function initHeaderScrollState() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- Scroll reveal via IntersectionObserver ---------- */
  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    // Fallback: if IntersectionObserver is unavailable, just show everything.
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Pricing billing toggle (monthly / annual) ---------- */
  function initBillingToggle() {
    const switchEl = document.getElementById("billing-switch");
    const values = document.querySelectorAll(".price__value");
    if (!switchEl || !values.length) return;

    function render(isAnnual) {
      switchEl.setAttribute("aria-checked", String(isAnnual));
      values.forEach(function (el) {
        const next = isAnnual ? el.dataset.annual : el.dataset.monthly;
        if (next != null) el.textContent = next;
      });
    }

    switchEl.addEventListener("click", function () {
      const isAnnual = switchEl.getAttribute("aria-checked") === "true";
      render(!isAnnual);
    });

    // Allow toggling with keyboard (Space / Enter).
    switchEl.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        switchEl.click();
      }
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }
})();
