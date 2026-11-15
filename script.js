(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Mobile menu toggle
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menu.classList.remove('open'))
    );
  }

  // Highlight active section in the top nav as you scroll
  const navLinks = document.querySelectorAll('.nav-links a');
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

  // Fade sections and cards in as they scroll into view
  const revealEls = document.querySelectorAll('.block, .ai-card, .project, .entry');
  if ('IntersectionObserver' in window) {
    revealEls.forEach(el => el.classList.add('reveal'));
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => ro.observe(el));
  }
})();
