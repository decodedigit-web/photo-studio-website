
/*
  NOIR STUDIO WEBSITE
  Before publishing, replace the WhatsApp number below.
  Use your full number with country code, digits only.
  Example format for India: 919876543210
*/

const WHATSAPP_NUMBER = "919999999999"; // REPLACE WITH YOUR NUMBER

const loader = document.getElementById("loader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const backTop = document.getElementById("backTop");

function makeWhatsAppLink(message) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function setBookingLink(element, message) {
  if (!element) return;
  element.href = makeWhatsAppLink(message);
  element.target = "_blank";
  element.rel = "noopener noreferrer";
}

window.addEventListener("load", () => {
  document.body.classList.remove("loading");
  window.setTimeout(() => loader?.classList.add("done"), 450);
});

// Mobile navigation
menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Portfolio category filters
const filters = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const selected = button.dataset.filter;
    galleryItems.forEach(item => {
      const show = selected === "all" || item.dataset.category === selected;
      item.classList.toggle("hidden", !show);
    });
  });
});

// WhatsApp booking links
const defaultMessage =
  "Hello NOIR STUDIO! I would like to enquire about wedding photography in Srikakulam. Please share your availability and packages.";

setBookingLink(document.getElementById("whatsappBooking"), defaultMessage);
setBookingLink(document.getElementById("floatingWhatsApp"), defaultMessage);

document.querySelectorAll(".package-book").forEach(button => {
  const packageName = button.dataset.package;
  const message =
    `Hello NOIR STUDIO! I am interested in the ${packageName} package. ` +
    "Please share availability, inclusions and booking details.";
  setBookingLink(button, message);
});

// Smooth reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("in-view"));
}

// Back to top and footer year
window.addEventListener("scroll", () => {
  backTop?.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Helpful development warning
if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
  console.warn("Replace WHATSAPP_NUMBER in script.js with your full WhatsApp number.");
}
