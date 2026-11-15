(function () {
  'use strict';
  document.documentElement.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ── Mobile menu
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // ── Rotating headline word
  const rotator = document.getElementById('rotator');
  const words = ['Mobile applications', 'Web applications', 'Websites', 'AI automations', 'AI agents'];
  // Shrink the rotating line just enough that the longest phrase fits on one line,
  // so the headline never changes height while words swap.
  const fitRotator = () => {
    if (!rotator) return;
    const current = rotator.textContent;
    rotator.style.fontSize = '1em';
    const avail = rotator.parentElement.clientWidth;
    let widest = 0;
    words.forEach(w => { rotator.textContent = w; widest = Math.max(widest, rotator.scrollWidth); });
    rotator.textContent = current;
    rotator.style.fontSize = Math.min(1, (avail - 4) / widest).toFixed(3) + 'em';
  };
  fitRotator();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitRotator);
  window.addEventListener('resize', fitRotator);

  if (rotator && !reduceMotion) {
    let i = 0;
    setInterval(() => {
      rotator.classList.add('out');
      setTimeout(() => {
        i = (i + 1) % words.length;
        rotator.textContent = words[i];
        rotator.classList.remove('out');
      }, 380);
    }, 2600);
  }

  // ── Reveal on scroll, with a small stagger inside each grid
  const reveals = document.querySelectorAll('.reveal');
  document.querySelectorAll('.about-grid, .ai-grid, .apps-grid, .skills-grid, .edu-row, .timeline, .hero').forEach(group => {
    group.querySelectorAll(':scope > .reveal, :scope > * > .reveal').forEach((el, idx) => {
      el.style.setProperty('--d', (Math.min(idx, 6) * 0.08) + 's');
    });
  });
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveals.forEach(el => ro.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // ── Count-up stats
  const counters = document.querySelectorAll('[data-count]');
  const runCount = el => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now(), dur = 1400;
    const step = now => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    });
    counters.forEach(c => co.observe(c));
  } else {
    counters.forEach(c => { c.textContent = c.dataset.count; });
  }

  // ── Scroll progress + active nav link
  const progress = document.querySelector('.progress');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    if (progress) progress.style.setProperty('--p', p.toFixed(4));
    let current = null;
    sections.forEach(s => { if (s.getBoundingClientRect().top < window.innerHeight * 0.4) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (!finePointer || reduceMotion) return;

  // ── Cursor glow
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', e => {
    if (glow) {
      glow.style.setProperty('--cx', e.clientX + 'px');
      glow.style.setProperty('--cy', e.clientY + 'px');
    }
  }, { passive: true });

  // ── Glass shine follows the cursor (sets --mx/--my per element)
  document.querySelectorAll('.glass').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ── 3D tilt
  document.querySelectorAll('.tilt').forEach(el => {
    const max = el.classList.contains('photo-glass') ? 10 : 5;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', (-y * max).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (x * max).toFixed(2) + 'deg');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });

  // ── Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
})();
