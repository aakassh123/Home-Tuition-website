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
/* Optional: set this to your Google Apps Script web app URL or any server endpoint
  Example: https://script.google.com/macros/s/AKfycb.../exec */
const GOOGLE_SHEETS_ENDPOINT = "";

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
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      menuToggle.classList.remove("open");
      navLinks.classList.remove("open");
    }
  });
}

/* ---------- ACTIVE NAV LINK (auto-detect current page) ---------- */
if (navLinks) {
  let currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (!currentPage || currentPage === "") currentPage = "index.html";
  navLinks.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "index.html" && (href === "./" || href === "/"))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
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

// Build an in-page modal form for Demo booking and submit to WhatsApp
document.addEventListener('DOMContentLoaded', () => {
  // create modal HTML
  if (!document.getElementById('demoModal')) {
    const modal = document.createElement('div');
    modal.id = 'demoModal';
    modal.className = 'demo-modal';
    modal.innerHTML = `
      <div class="demo-modal-backdrop" data-role="backdrop"></div>
      <div class="demo-modal-dialog" role="dialog" aria-modal="true">
        <button class="demo-modal-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
        <div class="demo-modal-header">
          <span class="pill-badge pill-purple" style="display:inline-block;margin-bottom:10px;font-size:12px;">✨ 100% Free Demo Class</span>
          <h3>Book Your Free Demo</h3>
          <p>Fill in quick details. Our Gorakhpur coordinator will assign the best verified tutor and connect via WhatsApp.</p>
        </div>
        <form id="modalDemoForm">
          <div class="luxury-field">
            <div class="luxury-input-wrap">
              <i class="fa-solid fa-user input-icon"></i>
              <input type="text" name="name" placeholder="Student / Parent Full Name" autocomplete="name" required>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="luxury-field">
              <div class="luxury-input-wrap">
                <i class="fa-solid fa-graduation-cap input-icon"></i>
                <input type="text" name="class" placeholder="Class (e.g. 10th)" required>
              </div>
            </div>
            <div class="luxury-field">
              <div class="luxury-input-wrap">
                <i class="fa-solid fa-book-open input-icon"></i>
                <input type="text" name="subject" placeholder="Subject (e.g. Maths)">
              </div>
            </div>
          </div>
          <div class="luxury-field">
            <div class="luxury-input-wrap">
              <i class="fa-solid fa-location-dot input-icon"></i>
              <input type="text" name="location" placeholder="Area in Gorakhpur (e.g. Taramandal)" required>
            </div>
          </div>
          <div class="luxury-field">
            <div class="luxury-input-wrap">
              <i class="fa-brands fa-whatsapp input-icon" style="color:#25D366;"></i>
              <input type="tel" name="phone" placeholder="WhatsApp Number (10 digits)" required>
            </div>
          </div>
          <div class="demo-modal-actions">
            <button type="button" class="modal-btn-cancel" id="demoCancel">Cancel</button>
            <button type="submit" class="modal-btn-submit" id="demoSubmit"><i class="fa-brands fa-whatsapp"></i> Confirm via WhatsApp</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const openModal = () => modal.classList.add('show');
    const closeModal = () => modal.classList.remove('show');

    // open modal when clicking in-page demo CTAs (except when on demo.html where full page form exists)
    if (!window.location.pathname.endsWith('demo.html')) {
      document.querySelectorAll('.demo-btn, [data-trigger="demoModal"]').forEach((el) => {
        el.addEventListener('click', (ev) => {
          ev.preventDefault();
          openModal();
        });
      });
    }

    // close handlers
    modal.querySelector('[data-role="backdrop"]').addEventListener('click', closeModal);
    modal.querySelector('.demo-modal-close').addEventListener('click', closeModal);
    document.getElementById('demoCancel').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // form submit -> open WhatsApp
    const form = modal.querySelector('#modalDemoForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get('name') || '').toString().trim();
      const cls = (fd.get('class') || '').toString().trim();
      const subject = (fd.get('subject') || '').toString().trim();
      const location = (fd.get('location') || '').toString().trim();
      const phone = (fd.get('phone') || '').toString().trim();

      // basic validation for phone (digits, min 7)
      const digits = phone.replace(/[^0-9+]/g, '');
      if (digits.length < 7) {
        alert('Please enter a valid WhatsApp number including country code.');
        return;
      }

      const lines = [];
      lines.push('Free Demo Request');
      if (name) lines.push(`Name: ${name}`);
      if (cls) lines.push(`Class: ${cls}`);
      if (subject) lines.push(`Subject: ${subject}`);
      if (location) lines.push(`Location: ${location}`);
      lines.push(`Contact: ${phone}`);
      lines.push('Please contact to schedule the demo.');

      const message = encodeURIComponent(lines.join('\n'));

      // send to configured endpoint (if provided)
      if (typeof GOOGLE_SHEETS_ENDPOINT !== 'undefined' && GOOGLE_SHEETS_ENDPOINT) {
        try {
          // If endpoint looks like Google Apps Script, submit via a hidden form (avoids CORS)
          if (/script.google.com/.test(GOOGLE_SHEETS_ENDPOINT)) {
            let iframe = document.getElementById('demoFormTarget');
            if (!iframe) {
              iframe = document.createElement('iframe');
              iframe.name = 'demoFormTarget';
              iframe.id = 'demoFormTarget';
              iframe.style.display = 'none';
              document.body.appendChild(iframe);
            }
            const formPost = document.createElement('form');
            formPost.method = 'POST';
            formPost.action = GOOGLE_SHEETS_ENDPOINT;
            formPost.target = 'demoFormTarget';
            const addField = (n, v) => { const i = document.createElement('input'); i.type = 'hidden'; i.name = n; i.value = v; formPost.appendChild(i); };
            addField('name', name);
            addField('class', cls);
            addField('subject', subject);
            addField('location', location);
            addField('phone', phone);
            document.body.appendChild(formPost);
            formPost.submit();
            setTimeout(() => formPost.remove(), 2000);
          } else {
            // generic endpoint: send JSON via fetch (requires CORS allowed on server)
            fetch(GOOGLE_SHEETS_ENDPOINT, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, class: cls, subject, location, phone, timestamp: new Date().toISOString() }),
              mode: 'cors'
            }).then(res => {
              if (!res.ok) console.warn('Lead endpoint responded with status', res.status);
            }).catch(err => console.warn('Lead endpoint error', err));
          }
        } catch (err) {
          console.warn('Error sending lead to endpoint', err);
        }
      }

      // open WhatsApp using main configured number
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
      closeModal();
    });
  }

  /* ---------- TEACHER / MENTOR PROFILE EXPAND & MODAL ---------- */
  // 1. Accordion Toggle on Explore Profile button
  document.querySelectorAll(".tc-explore").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest(".team-card-v2");
      if (!card) return;

      const isExpanded = card.classList.contains("expanded");
      if (isExpanded) {
        card.classList.remove("expanded");
        btn.innerHTML = 'Explore Profile <i class="fa-solid fa-chevron-down"></i>';
      } else {
        card.classList.add("expanded");
        btn.innerHTML = 'Hide Profile <i class="fa-solid fa-chevron-up"></i>';
      }
    });
  });

  // 2. Full Bio Modal for Team/Mentors
  const teamModal = document.getElementById("teamModal");
  if (teamModal) {
    const modalImage = document.getElementById("modalImage");
    const modalName = document.getElementById("modalName");
    const modalQual = document.getElementById("modalQualification");
    const modalNote = document.getElementById("modalNote");
    const modalBio = document.getElementById("modalBio");
    const modalClose = document.getElementById("teamModalClose");
    const modalBackdrop = document.getElementById("teamModalBackdrop");

    const openTeamModal = (card) => {
      if (!card) return;
      if (modalImage) {
        modalImage.src = card.dataset.image || "";
        modalImage.alt = card.dataset.name || "Mentor Photo";
      }
      if (modalName) modalName.textContent = card.dataset.name || "";
      if (modalQual) modalQual.textContent = card.dataset.qualification || "";
      if (modalNote) modalNote.textContent = card.dataset.note || "";
      const detailsEl = card.querySelector(".tc-details");
      if (modalBio && detailsEl) {
        modalBio.innerHTML = detailsEl.innerHTML;
      }
      teamModal.classList.add("show");
      teamModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeTeamModal = () => {
      teamModal.classList.remove("show");
      teamModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    if (modalClose) modalClose.addEventListener("click", closeTeamModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeTeamModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && teamModal.classList.contains("show")) {
        closeTeamModal();
      }
    });

    // Clicking avatar or mentor name also opens full modal
    document.querySelectorAll(".team-card-v2 .tc-avatar-wrap, .team-card-v2 .tc-name-inline").forEach((el) => {
      el.style.cursor = "pointer";
      el.setAttribute("title", "Click to view full mentor profile");
      el.addEventListener("click", () => {
        const card = el.closest(".team-card-v2");
        openTeamModal(card);
      });
    });
  }

  /* ---------- FAQ ACCORDION (SEO / Rich Snippets) ---------- */
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
