/* ═══════════════════════════════════════════════
   NUAMAN SADIQ · PORTFOLIO · minimal edition
   Functional JS only — no particles, no custom
   cursor, no scroll-triggered reveals.
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  // Highlight the active section in the sidebar nav as you scroll.
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === id ? 'var(--ink)' : '';
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(sec => observer.observe(sec));
  }
})();
