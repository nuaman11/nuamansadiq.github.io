/* ═══════════════════════════════════════════════
   NUAMAN SADIQ · PORTFOLIO · minimal edition
═══════════════════════════════════════════════ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:       #F8F7F4;
  --ink:      #17181C;
  --ink-2:    #55585F;
  --ink-3:    #8B8D93;
  --line:     #E3E0D8;
  --accent:   #2A4B8D;
  --accent-tint: #EAEEF6;
  --fd: 'Space Grotesk', sans-serif;
  --fb: 'Inter', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--fb);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
ul { list-style: none; }

h2, h3 { font-family: var(--fd); font-weight: 600; }

::selection { background: var(--accent-tint); color: var(--accent); }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { animation: none !important; transition: none !important; }
}

/* ── PAGE GRID ── */
.page {
  display: grid;
  grid-template-columns: 300px 1fr;
  max-width: 1220px;
  margin: 0 auto;
}

/* ── SIDEBAR ── */
.sidebar {
  border-right: 1px solid var(--line);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
.sidebar-inner {
  padding: 48px 36px;
  display: flex;
  flex-direction: column;
  gap: 44px;
  min-height: 100%;
}

.mark {
  display: inline-block;
  font-family: var(--fd);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  border: 1px solid var(--line);
  padding: 6px 10px;
  border-radius: 4px;
  width: fit-content;
  margin-bottom: 22px;
}

.sidebar-name {
  font-family: var(--fd);
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
}

.sidebar-role {
  color: var(--accent);
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.sidebar-loc {
  color: var(--ink-3);
  font-size: 0.85rem;
  margin-bottom: 16px;
}

.sidebar-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--ink-2);
  line-height: 1.4;
}
.dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sidebar-nav a {
  font-size: 0.92rem;
  color: var(--ink-2);
  transition: color 0.15s;
  width: fit-content;
}
.sidebar-nav a:hover { color: var(--ink); }

.sidebar-contact {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}
.sidebar-contact a {
  font-size: 0.85rem;
  color: var(--ink-2);
  transition: color 0.15s;
}
.sidebar-contact a:first-child {
  color: var(--accent);
  font-weight: 500;
}
.sidebar-contact a:hover { color: var(--ink); }

/* ── MAIN ── */
.main {
  padding: 56px 56px 20px;
  max-width: 720px;
}

.intro { margin-bottom: 20px; }

.intro-lead {
  font-family: var(--fd);
  font-size: clamp(1.5rem, 2.6vw, 2.05rem);
  font-weight: 500;
  line-height: 1.32;
  letter-spacing: -0.01em;
  color: var(--ink);
  max-width: 620px;
}

.intro-stats {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}
.intro-stats div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.intro-stats strong {
  font-family: var(--fd);
  font-size: 1.05rem;
  font-weight: 600;
}
.intro-stats span {
  font-size: 0.78rem;
  color: var(--ink-3);
}

/* ── SECTIONS ── */
.block {
  padding: 52px 0;
  border-top: 1px solid var(--line);
}
.block h2 {
  font-size: 1.35rem;
  margin-bottom: 24px;
  letter-spacing: -0.01em;
}
.block > p {
  color: var(--ink-2);
  max-width: 560px;
  margin-bottom: 14px;
}
.block > p:last-child { margin-bottom: 0; }

/* ── EXPERIENCE / EDUCATION ENTRIES ── */
.entry { margin-bottom: 34px; }
.entry:last-child { margin-bottom: 0; }

.entry-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 3px;
}
.entry-head h3 {
  font-size: 1.05rem;
  font-weight: 600;
}
.entry-date {
  font-size: 0.8rem;
  color: var(--ink-3);
  white-space: nowrap;
}
.entry-org {
  color: var(--accent);
  font-size: 0.88rem;
  font-weight: 500;
  margin-bottom: 12px;
}
.entry ul { display: flex; flex-direction: column; gap: 7px; }
.entry li {
  font-size: 0.92rem;
  color: var(--ink-2);
  padding-left: 16px;
  position: relative;
  line-height: 1.6;
}
.entry li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--ink-3);
}

/* ── SKILLS ── */
.skill-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
}
.skill-row:first-child { border-top: none; }
.skill-cat {
  font-size: 0.85rem;
  color: var(--ink-3);
  font-weight: 500;
}
.skill-row p {
  font-size: 0.92rem;
  color: var(--ink);
}

@media (max-width: 560px) {
  .skill-row { grid-template-columns: 1fr; gap: 4px; }
}

/* ── PROJECTS ── */
.projects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.project {
  background: var(--bg);
  padding: 26px;
}
.project h3 {
  font-size: 1.05rem;
  margin-bottom: 6px;
}
.project-tags {
  font-size: 0.76rem;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 10px;
}
.project p:last-child {
  font-size: 0.88rem;
  color: var(--ink-2);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .projects { grid-template-columns: 1fr; }
}

/* ── CONTACT ── */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}
.contact-list a {
  font-size: 0.95rem;
  color: var(--ink);
  width: fit-content;
  border-bottom: 1px solid var(--line);
  padding-bottom: 2px;
  transition: border-color 0.15s, color 0.15s;
}
.contact-list a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* ── FOOTER ── */
.footer {
  padding: 28px 0 40px;
  border-top: 1px solid var(--line);
}
.footer p {
  font-size: 0.8rem;
  color: var(--ink-3);
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .page { grid-template-columns: 1fr; }
  .sidebar {
    position: static;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--line);
  }
  .sidebar-inner { gap: 28px; padding: 36px 24px; }
  .sidebar-nav { flex-direction: row; flex-wrap: wrap; gap: 18px; }
  .sidebar-contact { margin-top: 0; flex-direction: row; flex-wrap: wrap; gap: 16px; }
  .main { padding: 40px 24px 20px; max-width: none; }
}

@media (max-width: 480px) {
  .intro-stats { gap: 24px; }
  .block { padding: 40px 0; }
}
