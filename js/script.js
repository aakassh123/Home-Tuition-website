/* ============================================================
   ERA OF EDUCATION - script.js
   Static site script (no backend / no database / no API calls)
   - WhatsApp lead helper (used by all forms)
   - Hero image slider (Home page)
   - Scroll reveal animation
   - Testimonial slider (Home page)
   - Back to top button
   ============================================================ */

/* ---------- WHATSAPP CONFIG ---------- */
/* Change this ONE number to update WhatsApp on the entire website */
const WHATSAPP_NUMBER = "917289053560"; // country code + number, no + or spaces

/**
 * Opens WhatsApp with a pre-filled message.
 * @param {string} message - plain text message (will be URL-encoded automatically)
 */
function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, "_blank");
}

/* ---------- HERO IMAGE SLIDER (Home page only) ---------- */
const heroImages = [
  "https://images.pexels.com/photos/4145193/pexels-photo-4145193.jpeg",
  "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
  "https://images.pexels.com/photos/8199703/pexels-photo-8199703.jpeg"
];

let heroIndex = 0;
const heroImg = document.getElementById("heroImg");

if (heroImg) {
  setInterval(() => {
    heroImg.style.opacity = 0;
    setTimeout(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroImg.src = heroImages[heroIndex];
      heroImg.style.opacity = 1;
    }, 500);
  }, 2500);
}

/* ---------- SCROLL REVEAL ANIMATION ---------- */
const animatedElements = document.querySelectorAll(".animate");

if (animatedElements.length) {
  window.addEventListener("scroll", () => {
    animatedElements.forEach((el) => {
      const position = el.getBoundingClientRect().top;
      if (position < window.innerHeight - 100) {
        el.classList.add("show");
      }
    });
  });
}

/* ---------- TESTIMONIAL SLIDER (Home page) ---------- */
const testimonials = document.querySelectorAll(".testimonial");

if (testimonials.length) {
  let testimonialIndex = 0;
  setInterval(() => {
    testimonials.forEach((t) => t.classList.remove("active"));
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    testimonials[testimonialIndex].classList.add("active");
  }, 4000);
}

/* ---------- BACK TO TOP BUTTON ---------- */
const backToTopBtn = document.querySelector(".back-to-top");

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================================
   NEW MODERN UI BEHAVIOR (theme.css companion)
   ============================================================ */

/* ---------- MOBILE MENU TOGGLE ---------- */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

/* ---------- ACTIVE NAV LINK (auto-detect current page) ---------- */
if (navLinks) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

/* ---------- STICKY HEADER SHADOW ON SCROLL ---------- */
const siteHeader = document.getElementById("siteHeader");

if (siteHeader) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  });
}

/* ---------- SCROLL REVEAL (IntersectionObserver, for .reveal elements) ---------- */
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ---------- ANIMATED STAT COUNTERS (elements with [data-count]) ---------- */
const counterEls = document.querySelectorAll("[data-count]");

if (counterEls.length && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10) || 0;
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1200;
        const startTime = performance.now();

        function tick(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counterEls.forEach((el) => counterObserver.observe(el));
}

/* ---------- LINK NORMALIZER (minimal, runtime) ---------- */
// Ensure any hardcoded wa.me/tel anchors on pages use the configured WhatsApp number
document.addEventListener('DOMContentLoaded', () => {
  try {
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
      try {
        const url = new URL(a.href);
        const params = url.search || '';
        a.href = `https://wa.me/${WHATSAPP_NUMBER}${params}`;
      } catch (e) {
        // ignore malformed URLs
      }
    });

    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
      a.href = 'tel:7289053560';
    });

    // Footer subscribe button: validate email and open WhatsApp to notify team
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeEmail = document.getElementById('subscribeEmail');
    if (subscribeBtn && subscribeEmail) {
      subscribeBtn.addEventListener('click', (e) => {
        const email = subscribeEmail.value.trim();
        const simpleEmailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!simpleEmailRe.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        const msg = `Subscribe Request from ${email} — please add to newsletter.`;
        openWhatsApp(msg);
      });
    }
  } catch (e) {
    // safe-guard: do nothing on older browsers
  }
});
