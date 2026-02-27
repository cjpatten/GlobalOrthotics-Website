/* ============================================================
   Global Orthotics Inc. — Main JavaScript
   ============================================================ */

// ── Navbar scroll state ──────────────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile nav toggle (animated SVG hamburger — menu-toggle-icon pattern) ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const navHam    = document.getElementById('navHamburger');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navHam.classList.toggle('open', isOpen);
  navHam.querySelector('.nav__ham-top').classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close on link click + reset hamburger
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navHam.classList.remove('open');
    navHam.querySelector('.nav__ham-top').classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── Scroll-based reveal animations ──────────────────────────
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings in the same parent grid
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-animate]')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
animatedEls.forEach(el => observer.observe(el));

// ── Product tabs ─────────────────────────────────────────────
const tabs   = document.querySelectorAll('.products__tab');
const panels = document.querySelectorAll('.products__panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('products__tab--active'));
    panels.forEach(p => p.classList.remove('products__panel--active'));
    tab.classList.add('products__tab--active');
    const panel = document.getElementById(`tab-${target}`);
    if (panel) {
      panel.classList.add('products__panel--active');
      // Re-trigger animations for new panel content
      panel.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
      });
    }
  });
});

// ── Hero pill → scroll + switch tab ─────────────────────────
document.querySelectorAll('.hero__pill[data-tab]').forEach(pill => {
  pill.addEventListener('click', (e) => {
    e.preventDefault();
    const target = pill.dataset.tab;
    // Switch active tab
    tabs.forEach(t => t.classList.remove('products__tab--active'));
    panels.forEach(p => p.classList.remove('products__panel--active'));
    const matchingTab = document.querySelector(`.products__tab[data-tab="${target}"]`);
    if (matchingTab) matchingTab.classList.add('products__tab--active');
    const panel = document.getElementById(`tab-${target}`);
    if (panel) {
      panel.classList.add('products__panel--active');
      panel.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
      });
    }
    // Scroll to products section
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  });
});


// ── Contact form ─────────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Simulate send (replace with real form submission)
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#22c55e';
      btn.style.borderColor = '#22c55e';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        form.reset();
      }, 3000);
    }, 1200);
  });
}

// ── Smooth scroll offset for fixed nav ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
