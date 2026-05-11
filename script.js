/* ═══════════════════════════════════════════════════════
   NUAMAN SADIQ · PORTFOLIO · script.js  v2
   Core animations: pure JS + CSS (no CDN required)
   GSAP / Typed.js = progressive enhancement only
═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════
     1. LOADER — hide after 2s regardless of network
  ══════════════════════════════════════════════════ */
  const loader = document.getElementById('loader');

  function hideLoader() {
    if (loader) loader.classList.add('done');
    startHeroCounters();
    initTyped();
  }

  // Hide loader when page is ready, max 2.2s
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 1800);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 1800));
    // Safety net
    setTimeout(hideLoader, 3000);
  }

  /* ══════════════════════════════════════════════════
     2. REVEAL ANIMATIONS via IntersectionObserver
        Works on file:// with zero CDN dependency
  ══════════════════════════════════════════════════ */
  // Only add the hidden class AFTER page paint so
  // content shows even if JS fails
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.rv').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(36px)';
      });
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          entry.target.style.opacity = '';
          entry.target.style.transform = '';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe all reveal elements
  document.querySelectorAll('.rv').forEach(el => revealObserver.observe(el));

  /* ══════════════════════════════════════════════════
     3. SKILL BARS — animate when visible
  ══════════════════════════════════════════════════ */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const w = fill.dataset.width || '0';
          fill.style.width = w + '%';
          barObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.bar-fill').forEach(bar => barObserver.observe(bar));

  /* ══════════════════════════════════════════════════
     4. HERO COUNTERS
  ══════════════════════════════════════════════════ */
  function startHeroCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1800;
      const start  = performance.now();

      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }

  /* ══════════════════════════════════════════════════
     5. TYPED.JS — graceful fallback if CDN fails
  ══════════════════════════════════════════════════ */
  const roles = [
    'iOS Developer',
    'Swift & SwiftUI Specialist',
    'Mobile Experience Architect',
    'GenAI Integrator',
  ];

  function initTyped() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    if (typeof Typed !== 'undefined') {
      new Typed('#typed-text', {
        strings:   roles,
        typeSpeed:  55,
        backSpeed:  30,
        backDelay:  1800,
        loop:       true,
        showCursor: false,
      });
    } else {
      // Fallback: simple cycling text
      let ri = 0, ci = 0, deleting = false;

      function tick() {
        const word = roles[ri];
        el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

        if (!deleting && ci > word.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
        if (deleting && ci < 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          ci = 0;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, deleting ? 28 : 58);
      }
      tick();
    }
  }

  /* ══════════════════════════════════════════════════
     6. NAVBAR SCROLL EFFECT
  ══════════════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    // Scroll progress
    const prog = document.getElementById('scroll-progress');
    if (prog) {
      const maxS = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (window.scrollY / maxS * 100) + '%';
    }
  }, { passive: true });

  /* ══════════════════════════════════════════════════
     7. MOBILE NAV
  ══════════════════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  let menuOpen = false;

  function toggleMenu(force) {
    menuOpen = typeof force === 'boolean' ? force : !menuOpen;
    mobileNav.classList.toggle('open', menuOpen);
    const s = hamburger.querySelectorAll('span');
    if (menuOpen) {
      s[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      s[1].style.opacity   = '0';
      s[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      s[0].style.transform = s[2].style.transform = '';
      s[1].style.opacity = '';
    }
  }

  hamburger.addEventListener('click', () => toggleMenu());
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

  /* ══════════════════════════════════════════════════
     8. SMOOTH SCROLL
  ══════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const h = a.getAttribute('href');
      if (h.length > 1) {
        const t = document.querySelector(h);
        if (t) {
          e.preventDefault();
          window.scrollTo({ top: t.offsetTop - 78, behavior: 'smooth' });
        }
      }
    });
  });

  /* ══════════════════════════════════════════════════
     9. CUSTOM CURSOR (desktop only)
  ══════════════════════════════════════════════════ */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button, .tag, .project-card, .glass-card, .contact-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
    });
  }

  /* ══════════════════════════════════════════════════
     10. CANVAS PARTICLES — pure JS, no CDN
  ══════════════════════════════════════════════════ */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const CLRS = ['rgba(0,212,255,', 'rgba(123,47,255,', 'rgba(255,45,206,'];

    class P {
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.4 + 0.3;
        this.vx = (Math.random() - .5) * .35;
        this.vy = (Math.random() - .5) * .35;
        this.a  = Math.random() * .45 + .1;
        this.c  = CLRS[Math.floor(Math.random() * CLRS.length)];
      }
      constructor() { this.reset(); }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.c + this.a + ')';
        ctx.fill();
      }
    }

    const N = Math.min(100, Math.floor(W * H / 14000));
    for (let i = 0; i < N; i++) particles.push(new P());

    let mx = -999, my = -999;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${0.04 * (1 - d / 90)})`;
            ctx.lineWidth   = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Mouse repel
    setInterval(() => {
      particles.forEach(p => {
        const dx = p.x - mx, dy = p.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) { p.x += dx * .018; p.y += dy * .018; }
      });
    }, 30);

    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ══════════════════════════════════════════════════
     11. VANILLA TILT — progressive enhancement
  ══════════════════════════════════════════════════ */
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
      max: 7, speed: 400, glare: true, 'max-glare': 0.07,
    });
  }

  /* ══════════════════════════════════════════════════
     12. TAG hover micro-lift (pure CSS covers this,
         but add GSAP bounce if available)
  ══════════════════════════════════════════════════ */
  if (typeof gsap !== 'undefined') {
    try {
      gsap.registerPlugin(ScrollTrigger);

      // Parallax hero on scroll
      gsap.to('.hero-content', {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.hero-image-wrap', {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.4 },
      });

      // Timeline dot scale-in
      document.querySelectorAll('.tl-dot').forEach(d => {
        gsap.from(d, {
          scale: 0, duration: .5, ease: 'back.out(2)',
          scrollTrigger: { trigger: d, start: 'top 85%' },
        });
      });

      // Magnetic buttons
      document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(el => {
        el.addEventListener('mousemove', function (e) {
          const r  = this.getBoundingClientRect();
          const rx = e.clientX - r.left - r.width  / 2;
          const ry = e.clientY - r.top  - r.height / 2;
          gsap.to(this, { x: rx * .3, y: ry * .3, duration: .3, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', function () {
          gsap.to(this, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.5)' });
        });
      });
    } catch (e) { /* GSAP unavailable or ScrollTrigger missing */ }
  }

  console.log('%c NS · Portfolio loaded', 'color:#00d4ff;font-weight:700;font-size:14px');
})();
