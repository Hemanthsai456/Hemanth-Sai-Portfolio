// ===== FEATURED PROJECTS RENDERER =====
// Reads from PROJECTS (assets/js/projects-data.js) and builds the
// homepage Featured Solutions grid. Output is identical to the previous
// hardcoded HTML.
(function renderFeaturedProjects() {
  const grid = document.getElementById("featured-project-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  const featured = PROJECTS
    .filter(p => p.published && p.featured && p.featuredData)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);

  featured.forEach(project => {
    const fd = project.featuredData;

    // Build highlights list items
    const highlightItems = fd.highlights
      .map(h => `<li>${h}</li>`)
      .join("\n            ");

    // Build stack spans
    const stackSpans = fd.stackShort
      .map(s => `<span>${s}</span>`)
      .join("\n            ");

    // Build link elements
    const linkEls = fd.links.map(link => {
      const isSvgIcon = link.icon === "github" || link.icon === "external-link" || link.icon === "arrow-up-right";
      const iconHtml = `<i data-lucide="${link.icon}"></i>`;
      return `<a href="${link.href}" target="_blank" class="${link.cls}" aria-label="${link.ariaLabel}">${iconHtml} ${link.label}</a>`;
    }).join("\n            ");

    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
          <div class="card-glow"></div>
          <div class="project-header">
            <div class="project-icon-box"><i data-lucide="${fd.icon}"></i></div>
            <span class="project-metric">${fd.metric}</span>
          </div>
          <h3 class="project-title">${fd.titleShort}</h3>
          <p class="project-description">
            ${fd.descriptionHtml}
          </p>
          <ul class="project-highlights">
            ${highlightItems}
          </ul>
          <div class="project-stack">
            ${stackSpans}
          </div>
          <div class="project-links">
            ${linkEls}
          </div>`;

    grid.appendChild(card);
  });

  // Re-initialise lucide icons for the newly created elements
  if (typeof lucide !== "undefined") lucide.createIcons();
})();

// ===== SMOOTH SCROLL WITH OFFSET =====
const navbar = document.getElementById("navbar");
const navToggle = document.querySelector(".nav-toggle");

function getScrollOffset() {
  return navbar ? navbar.offsetHeight + 16 : 80;
}

function closeMobileNav() {
  if (!navbar || !navbar.classList.contains("nav-open")) return;
  navbar.classList.remove("nav-open");
  document.body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - getScrollOffset(),
        behavior: "smooth"
      });

      // Close mobile menu after navigation
      closeMobileNav();
    }
  });
});

// ================= ACTIVE NAV =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - getScrollOffset() - 80;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ================= SCROLL REVEAL =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll("section").forEach(sec => {
  sec.classList.add("hidden");
  observer.observe(sec);
});

// ================= TYPING EFFECT =================
const roles = [
  " AI Engineer ",
  " Machine Learning Engineer ",
  " Data Engineer & Analyst "
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const subtitle = document.querySelector(".subtitle");

function typeEffect() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    subtitle.textContent = current.substring(0, charIndex++);
  } else {
    subtitle.textContent = current.substring(0, charIndex--);
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// ================= SKILL BAR ANIMATION =================
const bars = document.querySelectorAll(".bar span");

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
    }
  });
});

bars.forEach(bar => {
  bar.style.width = "0";
  barObserver.observe(bar);
});

// ================= 3D CARD TILT EFFECT & SPOTLIGHT =================
document.querySelectorAll(".project-card, .glass-card, .skill-card, .contact-form").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set custom properties for spotlight tracking
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const rotateX = (y / rect.height - 0.5) * 4;
    const rotateY = (x / rect.width - 0.5) * -4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ================= MOUSE-FOLLOW GLOW =================
(function initMouseGlow() {
  const glow = document.createElement('div');
  glow.classList.add('mouse-glow');
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    // Smooth lerp
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';

    requestAnimationFrame(animateGlow);
  }

  animateGlow();
})();

// ================= PARTICLES (Space Theme) =================
tsParticles.load("particles", {
  fpsLimit: 60,
  particles: {
    number: { value: 100, density: { enable: true, area: 1000 } },
    size: { value: { min: 0.5, max: 1.8 } },
    color: { value: ["#7C5CFF", "#3B82F6", "#A78BFA", "#60A5FA"] },
    opacity: {
      value: { min: 0.15, max: 0.5 },
      animation: { enable: true, speed: 0.8, minimumValue: 0.1 }
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" }
    },
    links: {
      enable: true,
      color: "#7C5CFF",
      opacity: 0.25,
      distance: 130,
      width: 1
    },
    twinkle: {
      particles: {
        enable: true,
        frequency: 0.03,
        opacity: 0.5,
        color: { value: "#A78BFA" }
      }
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: true
    },
    modes: {
      grab: {
        distance: 170,
        links: { opacity: 0.4, color: "#7C5CFF" }
      }
    }
  },
  detectRetina: true
});

// ===== NAVBAR SCROLL EFFECT & MOBILE MENU =====
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("nav-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileNav();
    }
  });
}

// ===== STAGGERED CARD ANIMATIONS =====
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Add a small stagger delay per card/item
      const cards = entry.target.querySelectorAll('.glass-card, .project-card, .skill-card, .proof-item, .about-highlight-item');
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;

        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.hero-proof-strip, .about-highlights-stack, .project-grid, .skill-grid').forEach(container => {
  cardObserver.observe(container);
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById("contact-form");
const formSubmitBtn = document.getElementById("form-submit-btn");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset status message
    hideStatus();

    // Perform validation check
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      showStatus("Please fill in all fields.", "error");
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    // Show sending state
    formSubmitBtn.disabled = true;
    const originalBtnText = formSubmitBtn.innerHTML;
    formSubmitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    showStatus("Sending your message...", "info");

    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    })
      .then(async (response) => {
        let jsonRes = await response.json();
        if (response.status === 200) {
          showStatus("Your message has been sent successfully!", "success");
          contactForm.reset();
        } else {
          console.log(response);
          showStatus(jsonRes.message || "Something went wrong. Please try again later.", "error");
        }
      })
      .catch((error) => {
        console.log(error);
        showStatus("Failed to send message. Please check your connection and try again.", "error");
      })
      .then(() => {
        // Reset button state
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;
        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      });
  });
}

function showStatus(msg, type) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.className = "form-status " + type;
}

function hideStatus() {
  if (!formStatus) return;
  formStatus.textContent = "";
  formStatus.className = "form-status";
}

