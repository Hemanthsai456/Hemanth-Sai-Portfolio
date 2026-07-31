// ===== PROJECTS PAGE JAVASCRIPT =====

// ─── Particles (Space Theme — same config as homepage) ───
tsParticles.load("particles", {
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true, area: 1000 } },
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
      opacity: 0.08,
      distance: 130,
      width: 1
    },
    twinkle: {
      particles: {
        enable: true,
        frequency: 0.03,
        opacity: 0.6,
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
        distance: 150,
        links: { opacity: 0.15, color: "#7C5CFF" }
      }
    }
  },
  detectRetina: true
});

// ─── Navbar Scroll Effect ───
const navbar = document.getElementById("navbar");
const navToggle = document.querySelector(".nav-toggle");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ─── Mobile Nav Toggle ───
function closeMobileNav() {
  if (!navbar || !navbar.classList.contains("nav-open")) return;
  navbar.classList.remove("nav-open");
  document.body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("nav-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });
}

// ─── Mouse-Follow Glow ───
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
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
})();

// ─── Card Spotlight Tracking & Tilt ───
document.querySelectorAll(".archive-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const rotateX = (y / rect.height - 0.5) * 2.5;
    const rotateY = (x / rect.width - 0.5) * -2.5;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1200px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ─── Scroll Reveal for Archive Cards ───
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(24px)';
      entry.target.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`;

      // Stagger slightly based on position in list
      const delay = 0.05;
      requestAnimationFrame(() => {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay * 1000 * (Array.from(entry.target.parentNode.children).indexOf(entry.target) % 4));
      });

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(".archive-card").forEach(card => {
  card.style.opacity = '0';
  revealObserver.observe(card);
});
