// ============================================================================
// Portfolio Of Abid — Vanilla JavaScript (JSON-driven)
// ============================================================================
(function () {
  'use strict';
  window.__PORTFOLIO_BOOTING__ = true;

  const IS_FILE_PROTOCOL = window.location.protocol === 'file:';
  const APP_BASE_URL = (() => {
    try {
      const cs = document.currentScript && document.currentScript.src;
      if (cs) return new URL('./', cs).href;
    } catch (_) {}
    try {
      const scriptEl = document.querySelector('script[src*="script.js"]');
      if (scriptEl && scriptEl.src) return new URL('./', scriptEl.src).href;
    } catch (_) {}
    try {
      const href = window.location.href.split('#')[0].split('?')[0];
      return href.endsWith('/') ? href : href.replace(/\/[^/]*$/, '/');
    } catch (_) {
      return './';
    }
  })();

  const APP_BASE_PATH = (() => {
    try {
      return new URL(APP_BASE_URL).pathname || '/';
    } catch (_) {
      return '/';
    }
  })();

  const USE_HASH_ROUTING =
    IS_FILE_PROTOCOL ||
    window.location.pathname.endsWith('/index.html') ||
    window.location.hostname.endsWith('.github.io') ||
    APP_BASE_PATH !== '/';

  let portfolioData = window.__PORTFOLIO_DATA__ || {
    profile: {},
    navLinks: [
      { name: 'Home', href: '/' },
      { name: 'Education', href: '/education' },
      { name: 'Experience', href: '/experience' },
      { name: 'Certificates', href: '/certificates' },
      { name: 'Projects', href: '/projects' },
      { name: 'Contact', href: '/contact' }
    ],
    education: [],
    experience: [],
    certificates: [],
    projects: [],
    skillCategories: [],
    customMilestones: []
  };
  let appConfig = window.__APP_CONFIG__ || { updatesFeed: { limit: 10 } };

  // --------------------------------------------------------------------------
  // Lucide-compatible SVG Icons
  // --------------------------------------------------------------------------
  const svgAttr =
    'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  const ICONS = {
    menu: `<svg ${svgAttr}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    x: `<svg ${svgAttr}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    chevronRight: `<svg ${svgAttr}><path d="m9 18 6-6-6-6"/></svg>`,
    cpu: `<svg ${svgAttr}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    terminal: `<svg ${svgAttr}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
    code2: `<svg ${svgAttr}><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
    brain: `<svg ${svgAttr}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`,
    users: `<svg ${svgAttr}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    briefcase: `<svg ${svgAttr}><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>`,
    graduationCap: `<svg ${svgAttr}><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
    target: `<svg ${svgAttr}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    arrowDown: `<svg ${svgAttr}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>`,
    bookOpen: `<svg ${svgAttr}><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
    award: `<svg ${svgAttr}><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>`,
    layers: `<svg ${svgAttr}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
    mail: `<svg ${svgAttr}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    home: `<svg ${svgAttr}><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
    externalLink: `<svg ${svgAttr}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
    github: `<svg ${svgAttr}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    mapPin: `<svg ${svgAttr}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
    phone: `<svg ${svgAttr}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    linkedin: `<svg ${svgAttr}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    facebook: `<svg ${svgAttr}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    messageCircle: `<svg ${svgAttr}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    send: `<svg ${svgAttr}><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>`,
    loader2: `<svg ${svgAttr}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
    sun: `<svg ${svgAttr}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg ${svgAttr}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    clock: `<svg ${svgAttr}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  };

  // --------------------------------------------------------------------------
  // Portfolio Data & Configuration
  // --------------------------------------------------------------------------
  let PROFILE = portfolioData.profile || {};
  let NAV_LINKS = portfolioData.navLinks || [];
  let EDUCATION = portfolioData.education || [];
  let EXPERIENCE = portfolioData.experience || [];
  let CO_CURRICULAR = portfolioData.certificates || [];
  let PROJECTS = portfolioData.projects || [];
  let SKILL_CATEGORIES = [];
  let TYPEWRITER_WORDS = [];
  let CUSTOM_MILESTONES = [];

  function hydrateDataBindings(nextPortfolioData, nextAppConfig) {
    if (nextPortfolioData) portfolioData = nextPortfolioData;
    if (nextAppConfig) appConfig = nextAppConfig;

    PROFILE = portfolioData.profile || {};
    NAV_LINKS = Array.isArray(portfolioData.navLinks) ? portfolioData.navLinks : [];
    EDUCATION = Array.isArray(portfolioData.education) ? portfolioData.education : [];
    EXPERIENCE = Array.isArray(portfolioData.experience) ? portfolioData.experience : [];
    CO_CURRICULAR = Array.isArray(portfolioData.certificates) ? portfolioData.certificates : [];
    PROJECTS = Array.isArray(portfolioData.projects) ? portfolioData.projects : [];
    SKILL_CATEGORIES = (portfolioData.skillCategories || []).map((cat) => ({
      ...cat,
      icon: ICONS[cat.iconKey] || ICONS.code2
    }));
    TYPEWRITER_WORDS = Array.isArray(PROFILE.typewriterWords) ? PROFILE.typewriterWords : [];
    CUSTOM_MILESTONES = Array.isArray(portfolioData.customMilestones)
      ? [...portfolioData.customMilestones]
      : [];
  }

  hydrateDataBindings(portfolioData, appConfig);

  // --------------------------------------------------------------------------
  // State & DOM References
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const desktopNavLinks = document.getElementById('desktop-nav-links');
  const mobileNavLinks = document.getElementById('mobile-nav-links');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const pageRoot = document.getElementById('page-root');
  const mouseGlow = document.getElementById('mouse-glow');
  const floatingPackets = document.getElementById('floating-packets');
  const footerConnect = document.getElementById('footer-connect');

  const certModal = document.getElementById('certificate-modal');
  const certModalCard = document.getElementById('cert-modal-card');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalLoader = document.getElementById('cert-modal-loader');
  const certModalCloseIcon = document.getElementById('cert-modal-close-icon');
  const certModalCloseBtn = document.getElementById('cert-modal-close-btn');

  let isMobileMenuOpen = false;
  let currentPath = '/';
  let currentTheme = 'night';
  let updatesFilter = 'all';
  let typewriterTimer = null;
  let bdClockTimer = null;
  let revealObserver = null;
  let lastNavbarScrolled = null;
  let scrollTickPending = false;
  const prefersReducedMotionQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
  const isTouchOrMobileQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(max-width: 767px), (hover: none)')
      : null;
  const hasFinePointerHoverQuery =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(hover: hover) and (pointer: fine)')
      : null;

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function resolveAssetUrl(rawPath) {
    const p = String(rawPath || '').trim();
    if (!p) return '';
    if (/^(?:https?:|data:|blob:|mailto:|tel:|#)/i.test(p)) {
      return p;
    }
    const cleanRel = p.replace(/^\/+/, '');
    try {
      return new URL(cleanRel, APP_BASE_URL).href;
    } catch (_) {
      return cleanRel;
    }
  }

  function normalizePath(path) {
    if (!path || path === '/' || path === '/index.html') return '/';
    let cleaned = String(path).replace(/\/+$/, '');
    const baseNoTrail = APP_BASE_PATH.replace(/\/+$/, '');
    if (baseNoTrail && baseNoTrail !== '/' && cleaned.startsWith(baseNoTrail)) {
      cleaned = cleaned.slice(baseNoTrail.length) || '/';
    }
    if (cleaned === '/index.html') return '/';
    const validRoutes = NAV_LINKS.map((l) => l.href);
    return validRoutes.includes(cleaned) ? cleaned : '/';
  }

  function routeHref(route) {
    const normalized = normalizePath(route);
    if (USE_HASH_ROUTING) {
      return normalized === '/' ? './' : `#${normalized}`;
    }
    return normalized;
  }

  function getInitialPath() {
    if (window.location.hash) {
      const hashRoute = window.location.hash.slice(1);
      if (hashRoute.startsWith('/')) {
        return normalizePath(hashRoute);
      }
    }
    return normalizePath(window.location.pathname);
  }

  // --------------------------------------------------------------------------
  // Day / Night Mode Theme
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    currentTheme = theme === 'day' ? 'day' : 'night';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const themeMeta = document.getElementById('theme-color-meta');
    if (themeMeta) {
      themeMeta.setAttribute('content', currentTheme === 'day' ? '#f8fafc' : '#0b0e14');
    }

    try {
      window.localStorage.setItem('portfolio-theme', currentTheme);
    } catch (_) {
      // Ignore storage errors in restricted environments
    }

    if (themeToggle) {
      const isDay = currentTheme === 'day';
      const label = isDay ? 'Night' : 'Day';
      const actionLabel = isDay ? 'Switch to Night Mode' : 'Switch to Day Mode';
      themeToggle.innerHTML = `${isDay ? ICONS.moon : ICONS.sun}<span>${label}</span>`;
      themeToggle.setAttribute('aria-label', actionLabel);
      themeToggle.setAttribute('title', actionLabel);
      themeToggle.setAttribute('aria-pressed', String(isDay));
    }
  }

  function initTheme() {
    let savedTheme = 'night';
    try {
      const stored = window.localStorage.getItem('portfolio-theme');
      if (stored === 'day' || stored === 'night') {
        savedTheme = stored;
      }
    } catch (_) {
      savedTheme = 'night';
    }
    applyTheme(savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        applyTheme(currentTheme === 'day' ? 'night' : 'day');
      });
    }
  }

  // --------------------------------------------------------------------------
  // Ambient Background Initialization
  // --------------------------------------------------------------------------
  function initFloatingPackets() {
    if (!floatingPackets) return;
    if (
      (isTouchOrMobileQuery && isTouchOrMobileQuery.matches) ||
      (prefersReducedMotionQuery && prefersReducedMotionQuery.matches)
    ) {
      floatingPackets.innerHTML = '';
      return;
    }

    let html = '';

    for (let i = 0; i < 5; i++) {
      const left = (Math.random() * 100).toFixed(2);
      const duration = (15 + Math.random() * 15).toFixed(2);
      const delay = (Math.random() * 10).toFixed(2);
      html += `<div class="data-packet" style="left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s;"></div>`;
    }

    const terms = ['DATA', 'ML', 'AI'];
    terms.forEach((term, i) => {
      const left = (Math.random() * 100).toFixed(2);
      const top = (Math.random() * 100).toFixed(2);
      const duration = (8 + Math.random() * 8).toFixed(2);
      const delay = i * 4;
      html += `<div class="tech-term" style="left:${left}%;top:${top}%;animation-duration:${duration}s;animation-delay:${delay}s;">${term}</div>`;
    });

    floatingPackets.innerHTML = html;
  }

  function initMouseGlow() {
    if (!mouseGlow) return;
    if (
      !hasFinePointerHoverQuery ||
      !hasFinePointerHoverQuery.matches ||
      (prefersReducedMotionQuery && prefersReducedMotionQuery.matches)
    ) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMoved = false;
    let rafId = null;

    function tick() {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
        currentX = targetX;
        currentY = targetY;
        mouseGlow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
        rafId = null;
        return;
      }

      currentX += dx * 0.14;
      currentY += dy * 0.14;
      mouseGlow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      rafId = window.requestAnimationFrame(tick);
    }

    window.addEventListener(
      'mousemove',
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!hasMoved) {
          hasMoved = true;
          currentX = targetX;
          currentY = targetY;
          mouseGlow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
          return;
        }
        if (rafId === null) {
          rafId = window.requestAnimationFrame(tick);
        }
      },
      { passive: true }
    );
  }

  // --------------------------------------------------------------------------
  // Navbar & Mobile Menu
  // --------------------------------------------------------------------------
  function updateNavbarScrollState() {
    if (!navbar) return;
    const isScrolled = window.scrollY > 20 || currentPath !== '/';
    if (isScrolled === lastNavbarScrolled) return;
    lastNavbarScrolled = isScrolled;
    navbar.classList.toggle('scrolled', isScrolled);
  }

  function updateMobileMenuDom() {
    if (mobileMenuToggle) {
      mobileMenuToggle.innerHTML = isMobileMenuOpen ? ICONS.x : ICONS.menu;
      mobileMenuToggle.setAttribute('aria-expanded', String(isMobileMenuOpen));
    }

    if (mobileMenu) {
      mobileMenu.classList.toggle('open', isMobileMenuOpen);
    }
  }

  function renderNavbar() {
    if (desktopNavLinks) {
      desktopNavLinks.innerHTML = NAV_LINKS.map((link) => {
        const isActive = currentPath === link.href;
        return `
          <a href="${escapeHtml(routeHref(link.href))}" data-route="${escapeHtml(link.href)}" class="nav-link ${isActive ? 'active' : ''}">
            ${escapeHtml(link.name)}
            ${isActive ? '<span class="nav-link-underline"></span>' : ''}
          </a>
        `;
      }).join('');
    }

    if (mobileNavLinks) {
      mobileNavLinks.innerHTML =
        NAV_LINKS.map((link) => {
          const isActive = currentPath === link.href;
          return `
            <a href="${escapeHtml(routeHref(link.href))}" data-route="${escapeHtml(link.href)}" class="mobile-nav-link ${isActive ? 'active' : ''}">
              ${escapeHtml(link.name)}
            </a>
          `;
        }).join('') +
        `
          <a
            href="https://drive.google.com/file/d/1av2uOGhOnMayS2xQPic2vAB0hcpmdG3h/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-cv-btn"
          >
            CV
          </a>
        `;
    }

    updateMobileMenuDom();
  }

  function setMobileMenu(open) {
    isMobileMenuOpen = Boolean(open);
    updateMobileMenuDom();
  }

  // --------------------------------------------------------------------------
  // Home & Shared Page Sections
  // --------------------------------------------------------------------------

  const TIMELINE_MONTHS = {
    january: 0,
    jan: 0,
    february: 1,
    feb: 1,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    may: 4,
    june: 5,
    jun: 5,
    july: 6,
    jul: 6,
    august: 7,
    aug: 7,
    september: 8,
    sep: 8,
    sept: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11
  };

  function parseMilestoneSortScore(dateStr, updatedAt, priorityOffset = 0) {
    const text = String(dateStr || '').trim();
    const lower = text.toLowerCase();

    const yearMatches = text.match(/\b(20\d{2})\b/g);
    const maxYear = yearMatches ? Math.max(...yearMatches.map((y) => Number(y))) : null;

    let month = null;
    for (const [name, idx] of Object.entries(TIMELINE_MONTHS)) {
      if (new RegExp(`\\b${name}\\b`, 'i').test(lower)) {
        month = idx;
        break;
      }
    }

    const isOngoing = /\b(present|updating|in progress|running|ongoing)\b/i.test(lower);
    const isRange = /20\d{2}\s*-\s*20\d{2}/.test(lower);

    let derivedUtc = 0;
    if (maxYear !== null) {
      let resolvedMonth = month !== null ? month : 5;
      let dayBias = 15;
      if (isOngoing) {
        dayBias = 28;
        resolvedMonth = month !== null ? Math.min(10, Math.max(month + 8, 9)) : 8;
      } else if (isRange && maxYear === 2026 && month === null) {
        resolvedMonth = 1;
      }
      derivedUtc = Date.UTC(maxYear, resolvedMonth, dayBias);
    } else if (isOngoing) {
      derivedUtc = Date.UTC(2026, 10, 16);
    }

    let finalUtc = derivedUtc;
    if (updatedAt) {
      const parsed = Date.parse(updatedAt);
      if (!Number.isNaN(parsed)) {
        finalUtc = Math.max(derivedUtc, parsed);
      }
    }

    return finalUtc * 1000 + priorityOffset;
  }

  function getLatestUpdatesFeed(limit = 10) {
    const projectItems = PROJECTS.map((item, idx) => ({
      id: `project-${idx}`,
      category: 'Project',
      categoryRoute: '/projects',
      categoryLabel: 'Projects',
      title: item.title,
      subtitle: item.tech.join(' · '),
      dateLabel: item.date || 'Project',
      description: item.description,
      liveUrl: item.link && item.link !== '#' ? item.link : '',
      githubUrl: item.github && item.github !== '#' ? item.github : '',
      certUrl: '',
      sortScore: parseMilestoneSortScore(item.date, item.updatedAt, 900 - idx)
    })).sort((a, b) => b.sortScore - a.sortScore);

    const experienceItems = EXPERIENCE.map((item, idx) => ({
      id: `exp-${idx}`,
      category: 'Experience',
      categoryRoute: '/experience',
      categoryLabel: 'Experience',
      title: item.role,
      subtitle: item.company,
      dateLabel: item.duration,
      description: item.description,
      liveUrl: '',
      githubUrl: '',
      certUrl: item.certificate || '',
      sortScore: parseMilestoneSortScore(item.duration, item.updatedAt, 850 - idx)
    })).sort((a, b) => b.sortScore - a.sortScore);

    const certificateItems = CO_CURRICULAR.map((item, idx) => ({
      id: `cert-${idx}`,
      category: 'Certificate',
      categoryRoute: '/certificates',
      categoryLabel: 'Certificates',
      title: item.title,
      subtitle: item.organization,
      dateLabel: item.year,
      description: item.description,
      liveUrl: '',
      githubUrl: '',
      certUrl: item.certificate || '',
      sortScore: parseMilestoneSortScore(item.year, item.updatedAt, 800 - idx)
    })).sort((a, b) => b.sortScore - a.sortScore);

    const customItems = CUSTOM_MILESTONES.map((item, idx) => {
      const cat = item.category || 'Milestone';
      const routeMap = {
        Project: '/projects',
        Experience: '/experience',
        Certificate: '/certificates'
      };
      const labelMap = {
        Project: 'Projects',
        Experience: 'Experience',
        Certificate: 'Certificates'
      };
      return {
        id: `custom-${idx}`,
        category: cat,
        categoryRoute: item.route || routeMap[cat] || '/',
        categoryLabel: labelMap[cat] || 'Journey',
        title: item.title,
        subtitle: item.subtitle || 'Milestone Update',
        dateLabel: item.date || 'New',
        description: item.description || '',
        liveUrl: item.liveUrl || '',
        githubUrl: item.githubUrl || '',
        certUrl: item.certUrl || '',
        sortScore: parseMilestoneSortScore(item.date, item.updatedAt, 999 + (CUSTOM_MILESTONES.length - idx))
      };
    }).sort((a, b) => b.sortScore - a.sortScore);

    // Ensure configured minimum key projects + balanced mix of work experiences & certificates + any custom milestones
    const feedConfig = appConfig.updatesFeed || {};
    const targetLimit = limit || feedConfig.limit || 10;
    const minProjects = typeof feedConfig.minProjects === 'number' ? feedConfig.minProjects : 3;
    const selectedProjects = projectItems.slice(0, minProjects);
    const remainingSlots = Math.max(0, targetLimit - selectedProjects.length);

    const pickedCustom = customItems.slice(0, remainingSlots);
    const slotsAfterCustom = Math.max(0, remainingSlots - pickedCustom.length);

    const minExp = typeof feedConfig.minExperiences === 'number' ? feedConfig.minExperiences : 3;
    const minCert = typeof feedConfig.minCertificates === 'number' ? feedConfig.minCertificates : 3;
    const minExpCount = Math.min(minExp, experienceItems.length, slotsAfterCustom);
    const minCertCount = Math.min(minCert, certificateItems.length, Math.max(0, slotsAfterCustom - minExpCount));

    const pickedExp = experienceItems.slice(0, minExpCount);
    const pickedCert = certificateItems.slice(0, minCertCount);

    const overflowPool = [
      ...experienceItems.slice(minExpCount),
      ...certificateItems.slice(minCertCount)
    ].sort((a, b) => b.sortScore - a.sortScore);

    const extraNeeded = Math.max(0, slotsAfterCustom - pickedExp.length - pickedCert.length);
    const pickedExtra = overflowPool.slice(0, extraNeeded);

    return [
      ...pickedCustom,
      ...selectedProjects,
      ...pickedExp,
      ...pickedCert,
      ...pickedExtra
    ]
      .sort((a, b) => b.sortScore - a.sortScore)
      .slice(0, targetLimit);
  }

  function renderHomeLatestUpdatesSection() {
    const feed = getLatestUpdatesFeed((appConfig.updatesFeed && appConfig.updatesFeed.limit) || 10);
    const counts = {
      all: feed.length,
      Project: feed.filter((item) => item.category === 'Project').length,
      Experience: feed.filter((item) => item.category === 'Experience').length,
      Certificate: feed.filter((item) => item.category === 'Certificate').length
    };

    const visibleItems =
      updatesFilter === 'all'
        ? feed
        : feed.filter((item) => item.category === updatesFilter);

    const filterButtons = [
      { id: 'all', label: `All (${counts.all})` },
      { id: 'Project', label: `Projects (${counts.Project})` },
      { id: 'Experience', label: `Experience (${counts.Experience})` },
      { id: 'Certificate', label: `Certificates (${counts.Certificate})` }
    ];

    return `
      <section id="latest-updates-section" class="updates-section">
        <div class="container-xl">
          <div class="section-header-center updates-header">
            <span class="updates-kicker">Timeline &amp; Activity</span>
            <h2 class="page-title">Latest Updates: <span class="text-violet-500">News &amp; Milestones</span></h2>

            <div class="updates-filters" role="group" aria-label="Filter latest updates">
              ${filterButtons
                .map(
                  (btn) => `
                <button
                  type="button"
                  class="updates-filter-btn${updatesFilter === btn.id ? ' active' : ''}"
                  data-updates-filter="${btn.id}"
                  aria-pressed="${updatesFilter === btn.id ? 'true' : 'false'}"
                >
                  ${escapeHtml(btn.label)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="updates-timeline">
            ${visibleItems
              .map((item, idx) => {
                const nodeModifier =
                  item.category === 'Project'
                    ? 'is-project'
                    : item.category === 'Experience'
                    ? 'is-experience'
                    : 'is-certificate';
                const isNewestOverall = Boolean(feed[0] && item.id === feed[0].id);

                return `
                  <article class="updates-item reveal-up" style="transition-delay: ${Math.min(idx * 20, 80)}ms">
                    <div class="updates-rail-col" aria-hidden="true">
                      <span class="updates-node ${nodeModifier}"></span>
                    </div>

                    <div class="warp-card updates-card">
                      <div class="updates-meta">
                        ${isNewestOverall ? '<span class="updates-latest-label">Latest</span><span class="updates-sep" aria-hidden="true">&middot;</span>' : ''}
                        <span class="updates-meta-date">${escapeHtml(item.dateLabel)}</span>
                        <span class="updates-sep" aria-hidden="true">&middot;</span>
                        <span class="updates-meta-cat ${nodeModifier}">${escapeHtml(item.category)}</span>
                        <span class="updates-sep" aria-hidden="true">&middot;</span>
                        <span class="updates-meta-org">${escapeHtml(item.subtitle)}</span>
                      </div>

                      <h3 class="updates-card-title">${escapeHtml(item.title)}</h3>
                      <p class="updates-card-desc">${escapeHtml(item.description)}</p>

                      <div class="updates-card-actions">
                        ${
                          item.certUrl
                            ? `<button type="button" class="updates-action-btn" data-cert-url="${escapeHtml(resolveAssetUrl(item.certUrl))}" data-cert-title="${escapeHtml(item.title)}">View Certificate ${ICONS.externalLink}</button>`
                            : ''
                        }
                        ${
                          item.liveUrl
                            ? `<a href="${escapeHtml(item.liveUrl)}" target="_blank" rel="noopener noreferrer" class="updates-action-link">Live Demo ${ICONS.externalLink}</a>`
                            : ''
                        }
                        ${
                          item.githubUrl
                            ? `<a href="${escapeHtml(item.githubUrl)}" target="_blank" rel="noopener noreferrer" class="updates-action-link updates-action-muted">Source ${ICONS.github}</a>`
                            : ''
                        }
                        <a href="${escapeHtml(routeHref(item.categoryRoute))}" data-route="${escapeHtml(item.categoryRoute)}" class="updates-action-route">
                          Explore ${escapeHtml(item.categoryLabel)} ${ICONS.chevronRight}
                        </a>
                      </div>
                    </div>
                  </article>
                `;
              })
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  function refreshLatestUpdatesSection(makeVisibleImmediately = false) {
    const existing = document.getElementById('latest-updates-section');
    if (!existing) return;
    existing.outerHTML = renderHomeLatestUpdatesSection();
    if (makeVisibleImmediately) {
      document
        .querySelectorAll('#latest-updates-section .reveal-up')
        .forEach((el) => el.classList.add('is-visible'));
    } else {
      initObservers();
    }
  }

  window.PortfolioUpdates = {
    add(milestone) {
      if (!milestone || !milestone.title) return getLatestUpdatesFeed(10);
      CUSTOM_MILESTONES.unshift({
        ...milestone,
        updatedAt: milestone.updatedAt || new Date().toISOString()
      });
      if (currentPath === '/') {
        refreshLatestUpdatesSection(true);
      }
      return getLatestUpdatesFeed(10);
    },
    getFeed() {
      return getLatestUpdatesFeed(10);
    }
  };

  function renderHomeSkillsSection() {
    return `
      <section class="home-skills-section">
        <div class="container-xl">
          <div class="section-header-center">
            <h2 class="page-title">Expertise</h2>
            <p class="page-subtitle">Technical stack and statistical tools in my environment.</p>
          </div>

          <div class="skills-grid">
            ${SKILL_CATEGORIES.map(
              (cat) => `
              <div class="warp-card skill-card reveal-up">
                <div class="skill-card-head">
                  <div class="skill-icon-box">
                    ${cat.icon}
                  </div>
                  <h3 class="skill-cat-title">${escapeHtml(cat.title)}</h3>
                </div>
                <div class="skill-list">
                  ${cat.skills
                    .map(
                      (skill) => `
                    <div>
                      <div class="skill-row-head">
                        <span class="skill-name">${escapeHtml(skill.name)}</span>
                        <span class="skill-pct">${skill.level}%</span>
                      </div>
                      <div class="skill-track">
                        <div class="skill-bar" style="width: ${skill.level}%" data-level="${skill.level}"></div>
                      </div>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
            `
            ).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderExploreJourney() {
    const featuredCertificate =
      CO_CURRICULAR.find((item) => item.title === 'Code Trap') || CO_CURRICULAR[0];
    const certificatePreviews = [
      featuredCertificate,
      ...CO_CURRICULAR.filter((item) => item !== featuredCertificate).slice(0, 2)
    ].filter(Boolean);

    const featuredProject =
      PROJECTS.find((item) => item.title === 'Agrapathik Social Organization Website') || PROJECTS[0];
    const projectPreviews = [
      featuredProject,
      ...PROJECTS.filter((item) => item !== featuredProject).slice(0, 2)
    ].filter(Boolean);

    const envelopeCategories = [
      {
        name: 'Education',
        href: '/education',
        accent: 'violet',
        icon: ICONS.bookOpen,
        summary: `${EDUCATION.length} Academic Records · 2019–Present`,
        previews: EDUCATION.slice(0, 3).map((item) => ({
          title: item.degree,
          meta: item.year,
          sub: item.institution
        }))
      },
      {
        name: 'Experience',
        href: '/experience',
        accent: 'blue',
        icon: ICONS.briefcase,
        summary: `${EXPERIENCE.length} Roles · Leadership & Tech`,
        previews: EXPERIENCE.slice(0, 3).map((item) => ({
          title: item.role,
          meta: item.duration,
          sub: item.company,
          image: item.certificate
        }))
      },
      {
        name: 'Certificates',
        href: '/certificates',
        accent: 'amber',
        icon: ICONS.award,
        summary: `${CO_CURRICULAR.length} Verified Credentials`,
        previews: certificatePreviews.map((item) => ({
          title: item.title,
          meta: item.year,
          sub: item.organization,
          image: item.certificate
        }))
      },
      {
        name: 'Projects',
        href: '/projects',
        accent: 'emerald',
        icon: ICONS.layers,
        summary: `${PROJECTS.length} Builds · Code & Web`,
        previews: projectPreviews.map((item) => ({
          title: item.title,
          meta: item.date || 'Featured',
          sub: Array.isArray(item.tech) ? item.tech.slice(0, 3).join(' · ') : '',
          image: item.image
        }))
      }
    ].filter((cat) => normalizePath(cat.href) !== normalizePath(currentPath));

    return `
      <section class="explore-section">
        <div class="container-xl">
          <div class="section-header-center">
            <h2 class="explore-title">Explore My Journey</h2>
            <p class="explore-sub">
              Click any envelope to explore the full archive of my academic background, experiences, certificates, and builds.
            </p>
          </div>

          <div class="envelope-grid">
            ${envelopeCategories
              .map((cat) => {
                // Reverse order in DOM so index 2 renders at the back/top and index 0 renders at the front/bottom
                const stackedPreviews = [
                  cat.previews[2] ? { ...cat.previews[2], tier: 'back' } : null,
                  cat.previews[1] ? { ...cat.previews[1], tier: 'mid' } : null,
                  cat.previews[0] ? { ...cat.previews[0], tier: 'front' } : null
                ].filter(Boolean);

                return `
              <a
                href="${escapeHtml(routeHref(cat.href))}"
                data-route="${escapeHtml(cat.href)}"
                class="envelope-card envelope-accent-${cat.accent} reveal-up"
                aria-label="Check all the ${escapeHtml(cat.name)}"
              >
                <div class="envelope-stage">
                  <div class="envelope-shell">
                    <!-- Open Top Flap -->
                    <div class="envelope-flap" aria-hidden="true">
                      <svg class="envelope-flap-svg" viewBox="0 0 400 184" preserveAspectRatio="none">
                        <path
                          class="envelope-flap-fill"
                          d="M 1 183 L 180 17 Q 200 2 220 17 L 399 183 Z"
                          vector-effect="non-scaling-stroke"
                        />
                      </svg>
                    </div>

                    <!-- Recessed Inner Envelope Cavity -->
                    <div class="envelope-cavity" aria-hidden="true"></div>

                    <!-- Peeking Preview Items Inside Envelope -->
                    <div class="envelope-sheets">
                      ${stackedPreviews
                        .map((preview) =>
                          preview.image
                            ? `
                        <div class="envelope-sheet envelope-sheet--visual envelope-sheet--${preview.tier}">
                          <div class="envelope-sheet-fallback">
                            <span class="envelope-sheet-title">${escapeHtml(preview.title)}</span>
                          </div>
                          <img
                            class="envelope-sheet-img"
                            src="${escapeHtml(resolveAssetUrl(preview.image))}"
                            alt="${escapeHtml(preview.title)}"
                            referrerpolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            onerror="this.style.display='none'"
                          />
                          <div class="envelope-sheet-caption">
                            <span class="envelope-sheet-caption-title">${escapeHtml(preview.title)}</span>
                            <span class="envelope-sheet-caption-meta">${escapeHtml(preview.meta)}</span>
                          </div>
                        </div>
                      `
                            : `
                        <div class="envelope-sheet envelope-sheet--${preview.tier}">
                          <div class="envelope-sheet-row">
                            <span class="envelope-sheet-title">${escapeHtml(preview.title)}</span>
                            <span class="envelope-sheet-meta">${escapeHtml(preview.meta)}</span>
                          </div>
                          ${
                            preview.tier === 'front' && preview.sub
                              ? `<p class="envelope-sheet-sub">${escapeHtml(preview.sub)}</p>`
                              : ''
                          }
                        </div>
                      `
                        )
                        .join('')}
                    </div>

                    <!-- Front Envelope Pocket (Mail Cover) -->
                    <div class="envelope-pocket">
                      <svg class="envelope-pocket-svg" viewBox="0 0 400 190" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          class="envelope-pocket-fill"
                          d="M 1 1 L 186 33 Q 200 36 214 33 L 399 1 L 399 172 Q 399 189 382 189 L 18 189 Q 1 189 1 172 Z"
                          vector-effect="non-scaling-stroke"
                        />
                        <path
                          class="envelope-pocket-crease"
                          d="M 1 2 L 154 114 M 399 2 L 246 114 M 14 188 L 154 114 Q 200 94 246 114 L 386 188"
                          fill="none"
                          vector-effect="non-scaling-stroke"
                        />
                      </svg>

                      <div class="envelope-pocket-content">
                        <div class="envelope-seal" aria-hidden="true">
                          ${cat.icon}
                        </div>
                        <p class="envelope-meta-line">${escapeHtml(cat.summary)}</p>
                        <div class="envelope-front-cta">
                          <span class="envelope-front-label">Check all the ${escapeHtml(cat.name)}</span>
                          <span class="envelope-front-arrow" aria-hidden="true">${ICONS.chevronRight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            `;
              })
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  // --------------------------------------------------------------------------
  // Page Renderers
  // --------------------------------------------------------------------------
  function renderHomePage() {
    const bdClock = getBangladeshTimeParts();
    return `
      <div class="page-wrapper">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-glow-1"></div>
          <div class="hero-glow-2"></div>

          <div class="hero-floating-icons" aria-hidden="true">
            <div class="hero-float-cpu">${ICONS.cpu}</div>
            <div class="hero-float-terminal">${ICONS.terminal}</div>
            <div class="hero-float-code">${ICONS.code2}</div>
          </div>

          <div class="container-xl hero-grid">
            <div class="hero-copy">
              <span class="hero-badge">Software Engineering &amp; Data Science</span>
              <h1 class="hero-title">
                Hi, I'm <span class="hero-name-gradient">Mehedi Hasan Abid</span>
              </h1>
              <div class="hero-typewriter-wrap">
                I am a <span class="text-white"><span id="typewriter-text"></span><span class="typewriter-cursor">|</span></span>
              </div>

              <div class="hero-bd-clock" aria-label="Current Bangladesh Time (GMT+6)">
                <span class="hero-bd-clock-icon" aria-hidden="true">${ICONS.clock}</span>
                <span class="hero-bd-clock-dot" aria-hidden="true"></span>
                <span class="hero-bd-clock-zone">Dhaka, BD</span>
                <span class="hero-bd-clock-sep" aria-hidden="true">&middot;</span>
                <time id="bd-clock-time" class="hero-bd-clock-time">${escapeHtml(bdClock.time)}</time>
                <span class="hero-bd-clock-sep" aria-hidden="true">&middot;</span>
                <span id="bd-clock-date" class="hero-bd-clock-date">${escapeHtml(bdClock.date)}</span>
                <span class="hero-bd-clock-offset">GMT+6</span>
              </div>

              <div class="hero-actions">
                <a href="${escapeHtml(routeHref('/projects'))}" data-route="/projects" class="hero-btn-primary">
                  View Projects ${ICONS.chevronRight}
                </a>
                <a href="${escapeHtml(routeHref('/contact'))}" data-route="/contact" class="hero-btn-secondary">
                  Contact Me
                </a>
              </div>
            </div>

            <div class="hero-image-col">
              <div class="hero-image-frame-wrap">
                <div class="hero-image-pulse"></div>
                <div class="hero-image-card">
                  <picture>
                    <source
                      srcset="${escapeHtml(resolveAssetUrl('images/hero-abid-640.webp'))} 640w, ${escapeHtml(resolveAssetUrl('images/hero-abid.webp'))} 1200w"
                      sizes="(max-width: 767px) 88vw, 512px"
                      type="image/webp"
                    />
                    <img
                      src="${escapeHtml(resolveAssetUrl(PROFILE.heroImage || 'images/hero-abid.png'))}"
                      alt="Mehedi Hasan Abid"
                      width="1536"
                      height="1024"
                      loading="eager"
                      fetchpriority="high"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div class="hero-deco-tr"></div>
                <div class="hero-deco-bl"></div>
              </div>
            </div>
          </div>

          <div class="scroll-indicator">
            <span class="scroll-indicator-label">Scroll to explore</span>
            <div class="scroll-indicator-arrow">${ICONS.arrowDown}</div>
          </div>
        </section>

        <!-- About Section -->
        <section class="about-section">
          <div class="container-xl">
            <div class="about-grid">
              <div class="about-image-wrap reveal-left">
                <div class="about-image-card">
                  <img
                    src="https://lh3.googleusercontent.com/d/1bKCgrClSnZ740vDgDpjWALJKmc0wW8Hl"
                    alt="Mehedi Hasan Abid"
                    width="800"
                    height="800"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    fetchpriority="low"
                    decoding="async"
                  />
                </div>
                <div class="about-deco-br"></div>
                <div class="about-deco-tl"></div>
              </div>

              <div class="reveal-right">
                <h2 class="about-heading">About Me</h2>
                <p class="about-text">
                  I am a <span class="highlight">Software Engineering student</span> at <span class="highlight">Daffodil International University</span> with a track record of academic excellence, including a <span class="highlight">perfect 5.00 GPA</span> in my SSC and HSC. Currently serving as the <span class="highlight">Chief Executive Officer (CEO) of Agrapathik</span>, I blend executive leadership with a deep technical curiosity. My vision is to evolve into a <span class="highlight">Data Science professional</span> specializing in <span class="highlight">Machine Learning and AI</span>. I am dedicated to designing intelligent, data-driven solutions that solve real-world problems and enhance efficiency through innovative system architecture.
                </p>

                <div class="about-cards-grid">
                  <div class="warp-card about-mini-card">
                    <div class="about-mini-icon bg-violet-soft text-violet-400">
                      ${ICONS.briefcase}
                    </div>
                    <div>
                      <h4 class="about-mini-title">Focus</h4>
                      <p class="about-mini-desc">Machine Learning &amp; Analytics</p>
                    </div>
                  </div>

                  <div class="warp-card about-mini-card">
                    <div class="about-mini-icon bg-blue-soft text-blue-400">
                      ${ICONS.graduationCap}
                    </div>
                    <div>
                      <h4 class="about-mini-title">Education</h4>
                      <p class="about-mini-desc">Data Science &amp; SWE Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- My Vision Section -->
        <section class="vision-section">
          <div class="container-xl">
            <div class="warp-card vision-card reveal-up">
              <div class="vision-glow-tr"></div>
              <div class="vision-glow-bl"></div>

              <div class="vision-flex">
                <div class="vision-icon-box">
                  ${ICONS.target}
                </div>
                <div>
                  <h2 class="vision-title">My Vision</h2>
                  <p class="vision-quote">
                    "My vision is to become a highly skilled software engineer and data science professional with expertise in machine learning and artificial intelligence. I aim to combine my technical proficiency with analytical thinking to design intelligent, data-driven solutions that solve real-world problems. By leveraging the power of AI and modern software development, I strive to create innovative systems that enhance efficiency, improve decision-making, and contribute to technological advancement. I am committed to continuous learning and growth, with the goal of making a meaningful impact in the evolving world of data and intelligent technologies."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        ${renderHomeLatestUpdatesSection()}

        ${renderHomeSkillsSection()}

        ${renderExploreJourney()}
      </div>
    `;
  }

  function renderEducationPage() {
    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="section-header-center">
              <h2 class="page-title">Education</h2>
              <p class="page-subtitle">Academic records from my journey.</p>
            </div>

            <div class="stack-16">
              ${EDUCATION.map(
                (item) => `
                <div class="warp-card edu-card reveal-up">
                  <div>
                    <span class="item-year-violet">${escapeHtml(item.year)}</span>
                    <h3 class="item-title-3xl">${escapeHtml(item.degree)}</h3>
                    <p class="item-org-xl">${escapeHtml(item.institution)}</p>
                    <p class="item-desc-lg">${escapeHtml(item.description)}</p>
                  </div>
                </div>
              `
              ).join('')}
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }

  function renderExperiencePage() {
    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="section-header-center">
              <h2 class="page-title">Experience</h2>
              <p class="page-subtitle">Professional history and roles executed in the field.</p>
            </div>

            <div class="stack-16">
              ${EXPERIENCE.map(
                (item) => `
                <div class="warp-card exp-card reveal-up">
                  <div>
                    <span class="item-year-blue">${escapeHtml(item.duration)}</span>
                    <h3 class="item-title-3xl">${escapeHtml(item.role)}</h3>
                    <p class="item-org-xl">${escapeHtml(item.company)}</p>
                    <p class="item-desc-lg">${escapeHtml(item.description)}</p>
                  </div>
                  ${
                    item.certificate
                      ? `
                    <div>
                      <div
                        class="exp-cert-box"
                        data-cert-url="${escapeHtml(resolveAssetUrl(item.certificate))}"
                        data-cert-title="${escapeHtml(item.role)}"
                        role="button"
                        tabindex="0"
                      >
                        <img
                          src="${escapeHtml(resolveAssetUrl(item.certificate))}"
                          alt="${escapeHtml(item.role)} Certificate"
                          referrerpolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div class="exp-cert-overlay">
                          <span class="exp-cert-pill">
                            View Certificate ${ICONS.externalLink}
                          </span>
                        </div>
                      </div>
                    </div>
                  `
                      : ''
                  }
                </div>
              `
              ).join('')}
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }

  function renderCertificatesPage() {
    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="section-header-center">
              <h2 class="page-title">Certificates</h2>
              <p class="page-subtitle">Activities and leadership roles beyond the curriculum.</p>
            </div>

            <div class="cert-grid">
              ${CO_CURRICULAR.map(
                (item) => `
                <div class="warp-card cert-card reveal-up">
                  <div
                    class="cert-thumb-box"
                    data-cert-url="${escapeHtml(resolveAssetUrl(item.certificate))}"
                    data-cert-title="${escapeHtml(item.title)}"
                    role="button"
                    tabindex="0"
                  >
                    <img
                      src="${escapeHtml(resolveAssetUrl(item.certificate))}"
                      alt="${escapeHtml(item.title)} Certificate"
                      referrerpolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="cert-overlay">
                      <span class="cert-pill warp-glow">
                        View Certificate ${ICONS.externalLink}
                      </span>
                    </div>
                  </div>
                  <div class="cert-content">
                    <span class="item-year-violet">${escapeHtml(item.year)}</span>
                    <h3 class="cert-title">${escapeHtml(item.title)}</h3>
                    <p class="cert-org">${escapeHtml(item.organization)}</p>
                    <p class="cert-desc">${escapeHtml(item.description)}</p>
                  </div>
                </div>
              `
              ).join('')}
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }

  function renderProjectsPage() {
    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="section-header-center">
              <h2 class="page-title">Data Projects</h2>
              <p class="page-subtitle-projects">
                A selection of my work in data analysis, machine learning, and statistical modeling.
              </p>
            </div>

            <div class="projects-grid">
              ${PROJECTS.map(
                (project) => `
                <div class="warp-card project-card reveal-up">
                  <div class="project-thumb">
                    <img
                      src="${escapeHtml(resolveAssetUrl(project.image))}"
                      alt="${escapeHtml(project.title)}"
                      referrerpolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div class="project-body">
                    <div class="project-tech-list">
                      ${project.tech
                        .map((t) => `<span class="project-tech-tag">${escapeHtml(t)}</span>`)
                        .join('')}
                    </div>
                    ${
                      project.date
                        ? `<span class="item-year-violet project-date">${escapeHtml(project.date)}</span>`
                        : ''
                    }
                    <h3 class="project-title">${escapeHtml(project.title)}</h3>
                    <p class="project-desc">${escapeHtml(project.description)}</p>
                    <div class="project-links">
                      ${
                        project.link && project.link !== '#'
                          ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer" class="project-link-demo">Live Demo ${ICONS.externalLink}</a>`
                          : ''
                      }
                      ${
                        project.github && project.github !== '#'
                          ? `<a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="project-link-source">Source ${ICONS.github}</a>`
                          : ''
                      }
                    </div>
                  </div>
                </div>
              `
              ).join('')}
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }


  function renderContactPage() {
    const socialIconMap = {
      github: ICONS.github,
      linkedin: ICONS.linkedin,
      facebook: ICONS.facebook,
      whatsapp: ICONS.messageCircle
    };
    const socials = (PROFILE.socials || []).map((s) => ({
      icon: socialIconMap[s.name] || ICONS.externalLink,
      href: s.url
    }));

    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="contact-grid">
              <div class="reveal-left">
                <h2 class="contact-heading">Connect</h2>
                <p class="contact-sub">
                  I'm always open to new opportunities and collaborations. Feel free to reach out via any of the channels below.
                </p>

                <div class="contact-channels">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=mehedihasanabid17@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="warp-card contact-channel-card violet"
                  >
                    <div class="contact-channel-icon violet">
                      ${ICONS.mail}
                    </div>
                    <div>
                      <p class="contact-channel-label">Email</p>
                      <p class="contact-channel-val">mehedihasanabid17@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Uttara+Sector+6+Dhaka-1230+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="warp-card contact-channel-card blue"
                  >
                    <div class="contact-channel-icon blue">
                      ${ICONS.mapPin}
                    </div>
                    <div>
                      <p class="contact-channel-label">Location</p>
                      <p class="contact-channel-val">Uttara Sector 6, Dhaka-1230, Bangladesh</p>
                    </div>
                  </a>

                  <a href="tel:01905032251" class="warp-card contact-channel-card emerald">
                    <div class="contact-channel-icon emerald">
                      ${ICONS.phone}
                    </div>
                    <div>
                      <p class="contact-channel-label">Phone</p>
                      <p class="contact-channel-val">01905032251</p>
                    </div>
                  </a>
                </div>

                <div class="contact-socials">
                  ${socials
                    .map(
                      (social) => `
                    <a
                      href="${social.href}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="social-btn"
                    >
                      ${social.icon}
                    </a>
                  `
                    )
                    .join('')}
                </div>
              </div>

              <div class="warp-card contact-form-card reveal-right">
                <form id="contact-form" class="contact-form">
                  <div class="contact-form-row">
                    <div class="form-field">
                      <label class="form-label" for="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        placeholder="Enter name..."
                        class="form-input"
                      />
                    </div>
                    <div class="form-field">
                      <label class="form-label" for="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        placeholder="Enter email..."
                        class="form-input"
                      />
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="form-label" for="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      rows="5"
                      name="message"
                      required
                      placeholder="Type message here..."
                      class="form-input form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" class="form-submit-btn warp-glow">
                    Send Message ${ICONS.send}
                  </button>

                  <p class="form-note">
                    This will open your email app to send the message directly.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // Typewriter Effect
  // --------------------------------------------------------------------------
  function stopTypewriter() {
    if (typewriterTimer !== null) {
      window.clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }
  }

  function startTypewriter() {
    stopTypewriter();
    const target = document.getElementById('typewriter-text');
    if (!target) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function step() {
      if (document.hidden) {
        typewriterTimer = window.setTimeout(step, 500);
        return;
      }

      const currentEl = document.getElementById('typewriter-text');
      if (!currentEl) return;

      const currentWord = TYPEWRITER_WORDS[wordIndex];

      if (!isDeleting) {
        charIndex += 1;
        currentEl.textContent = currentWord.slice(0, charIndex);

        if (charIndex === currentWord.length) {
          isDeleting = true;
          typewriterTimer = window.setTimeout(step, 1000);
          return;
        }
        typewriterTimer = window.setTimeout(step, 70);
      } else {
        charIndex -= 1;
        currentEl.textContent = currentWord.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % TYPEWRITER_WORDS.length;
          typewriterTimer = window.setTimeout(step, 200);
          return;
        }
        typewriterTimer = window.setTimeout(step, 50);
      }
    }

    step();
  }

  // --------------------------------------------------------------------------
  // Live Bangladesh Time Clock (Asia/Dhaka, UTC+6)
  // --------------------------------------------------------------------------
  const bdTimeFormatter =
    typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function'
      ? new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      : null;

  const bdDateFormatter =
    typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function'
      ? new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      : null;

  function getBangladeshTimeParts() {
    const now = new Date();
    if (bdTimeFormatter && bdDateFormatter) {
      try {
        return {
          time: bdTimeFormatter.format(now),
          date: bdDateFormatter.format(now)
        };
      } catch (_) {}
    }
    const utcPlus6 = new Date(now.getTime() + 6 * 60 * 60 * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hours24 = utcPlus6.getUTCHours();
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = String(hours24 % 12 || 12).padStart(2, '0');
    const mins = String(utcPlus6.getUTCMinutes()).padStart(2, '0');
    const secs = String(utcPlus6.getUTCSeconds()).padStart(2, '0');
    return {
      time: `${hours12}:${mins}:${secs} ${ampm}`,
      date: `${days[utcPlus6.getUTCDay()]}, ${months[utcPlus6.getUTCMonth()]} ${utcPlus6.getUTCDate()}`
    };
  }

  function updateBdClockDom() {
    const timeEl = document.getElementById('bd-clock-time');
    const dateEl = document.getElementById('bd-clock-date');
    if (!timeEl) return false;
    const parts = getBangladeshTimeParts();
    if (timeEl.textContent !== parts.time) {
      timeEl.textContent = parts.time;
    }
    if (dateEl && dateEl.textContent !== parts.date) {
      dateEl.textContent = parts.date;
    }
    return true;
  }

  function stopBdClock() {
    if (bdClockTimer !== null) {
      window.clearTimeout(bdClockTimer);
      bdClockTimer = null;
    }
  }

  function startBdClock() {
    stopBdClock();
    if (!updateBdClockDom()) return;

    function tick() {
      if (!document.getElementById('bd-clock-time')) {
        stopBdClock();
        return;
      }
      if (!document.hidden) {
        updateBdClockDom();
      }
      const delay = 1000 - (Date.now() % 1000) + 12;
      bdClockTimer = window.setTimeout(tick, delay);
    }

    const initialDelay = 1000 - (Date.now() % 1000) + 12;
    bdClockTimer = window.setTimeout(tick, initialDelay);
  }

  // --------------------------------------------------------------------------
  // Scroll Reveal & Skill Bars Observer
  // --------------------------------------------------------------------------
  let revealCheckTimer = null;
  let pendingRevealNodes = [];

  function checkPendingReveals() {
    if (!pendingRevealNodes.length) return;
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    const remaining = [];
    for (let i = 0; i < pendingRevealNodes.length; i += 1) {
      const el = pendingRevealNodes[i];
      if (!el || !el.isConnected || el.classList.contains('is-visible')) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh + 140 && rect.bottom >= -140) {
        el.classList.add('is-visible');
        if (revealObserver) revealObserver.unobserve(el);
      } else {
        remaining.push(el);
      }
    }
    pendingRevealNodes = remaining;
  }

  function initObservers() {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }
    if (revealCheckTimer !== null) {
      window.clearTimeout(revealCheckTimer);
      revealCheckTimer = null;
    }

    const revealElements = document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
    );
    const skillBars = document.querySelectorAll('.skill-bar');
    pendingRevealNodes = [...revealElements, ...skillBars];

    if (!('IntersectionObserver' in window)) {
      pendingRevealNodes.forEach((el) => el.classList.add('is-visible'));
      pendingRevealNodes = [];
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('is-visible');
          observer.unobserve(el);
        });
      },
      { threshold: 0.01, rootMargin: '120px 0px 120px 0px' }
    );

    pendingRevealNodes.forEach((el) => revealObserver.observe(el));

    window.requestAnimationFrame(checkPendingReveals);
    revealCheckTimer = window.setTimeout(checkPendingReveals, 250);
  }

  // --------------------------------------------------------------------------
  // Certificate Modal
  // --------------------------------------------------------------------------
  function openCertificateModal(url, title) {
    if (!certModal || !certModalImg || !certModalTitle || !certModalLoader) return;

    certModalTitle.textContent = title || '';
    certModalLoader.classList.remove('hidden');
    certModalImg.classList.add('is-loading');
    certModalImg.alt = title || 'Certificate';
    certModalImg.src = resolveAssetUrl(url);

    if (certModalImg.complete && certModalImg.naturalWidth > 0) {
      certModalLoader.classList.add('hidden');
      certModalImg.classList.remove('is-loading');
    }

    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    if (certModalCloseIcon) {
      certModalCloseIcon.focus();
    }
  }

  function closeCertificateModal() {
    if (!certModal) return;
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
  }

  function initCertificateModal() {
    if (certModalCloseIcon) {
      certModalCloseIcon.innerHTML = ICONS.x;
      certModalCloseIcon.addEventListener('click', closeCertificateModal);
    }
    if (certModalCloseBtn) {
      certModalCloseBtn.addEventListener('click', closeCertificateModal);
    }
    if (certModalLoader) {
      certModalLoader.innerHTML = ICONS.loader2;
    }
    if (certModalImg) {
      const doneLoading = () => {
        certModalLoader.classList.add('hidden');
        certModalImg.classList.remove('is-loading');
      };
      certModalImg.addEventListener('load', doneLoading);
      certModalImg.addEventListener('error', doneLoading);
    }
    if (certModal) {
      certModal.addEventListener('click', closeCertificateModal);
    }
    if (certModalCard) {
      certModalCard.addEventListener('click', (e) => e.stopPropagation());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal && certModal.classList.contains('open')) {
        closeCertificateModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Contact Form Handler
  // --------------------------------------------------------------------------
  function bindContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:mehedihasanabid17@gmail.com?subject=${subject}&body=${body}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mehedihasanabid17@gmail.com&su=${subject}&body=${body}`;

      const tempLink = document.createElement('a');
      tempLink.href = gmailUrl;
      tempLink.target = '_blank';
      tempLink.rel = 'noopener noreferrer';
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      const noteEl = form.querySelector('.form-note');
      if (noteEl) {
        noteEl.innerHTML = `Opening Gmail compose &mdash; or <a href="${escapeHtml(mailtoUrl)}" class="text-violet-400">open your default mail app</a>.`;
      }
    });
  }

  // --------------------------------------------------------------------------
  // Router & Page Lifecycle
  // --------------------------------------------------------------------------
  function renderCurrentPage() {
    if (!pageRoot) return;
    stopTypewriter();
    stopBdClock();

    let html = '';
    switch (currentPath) {
      case '/education':
        html = renderEducationPage();
        break;
      case '/experience':
        html = renderExperiencePage();
        break;
      case '/certificates':
        html = renderCertificatesPage();
        break;
      case '/projects':
        html = renderProjectsPage();
        break;
      case '/contact':
        html = renderContactPage();
        break;
      case '/':
      default:
        html = renderHomePage();
        break;
    }

    pageRoot.innerHTML = html;
    renderNavbar();
    updateNavbarScrollState();
    initObservers();

    if (currentPath === '/') {
      startTypewriter();
      startBdClock();
    } else if (currentPath === '/contact') {
      bindContactForm();
    }
  }

  function scrollToPageTopInstant() {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  }

  function navigateTo(targetPath, pushHistory = true) {
    const nextPath = normalizePath(targetPath);
    if (isMobileMenuOpen) {
      isMobileMenuOpen = false;
    }

    if (pushHistory) {
      if (USE_HASH_ROUTING) {
        const targetHash = nextPath === '/' ? '#/' : `#${nextPath}`;
        if (window.location.hash !== targetHash) {
          window.location.hash = targetHash;
        }
      } else if (window.location.pathname !== nextPath) {
        try {
          window.history.pushState({ path: nextPath }, '', nextPath);
        } catch (_) {
          // Ignore pushState restrictions in sandboxed/in-app contexts
        }
      }
    }

    currentPath = nextPath;
    scrollToPageTopInstant();
    renderCurrentPage();
  }

  // --------------------------------------------------------------------------
  // Global Event Delegation & Bootstrap
  // --------------------------------------------------------------------------
  function syncStaticRouteHrefs() {
    document.querySelectorAll('a[data-route]').forEach((anchor) => {
      const route = anchor.getAttribute('data-route');
      if (route) {
        anchor.setAttribute('href', routeHref(route));
      }
    });
  }

  function renderFooterConnect() {
    if (!footerConnect) return;

    const phone = String(PROFILE.phone || '').trim();
    const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;
    const email = String(PROFILE.email || '').trim();
    const footerSocialConfigs = [
      { key: 'facebook', label: 'Facebook', icon: ICONS.facebook },
      { key: 'linkedin', label: 'LinkedIn', icon: ICONS.linkedin },
      { key: 'whatsapp', label: 'WhatsApp', icon: ICONS.messageCircle }
    ];

    const socialLinks = footerSocialConfigs
      .map((cfg) => {
        const match = (PROFILE.socials || []).find((s) => s.name === cfg.key);
        return match ? { ...cfg, url: match.url } : null;
      })
      .filter(Boolean);

    footerConnect.innerHTML = `
      ${
        phone
          ? `<a href="${escapeHtml(phoneHref)}" class="footer-phone-link" aria-label="Call ${escapeHtml(phone)}">
              ${ICONS.phone}
              <span>${escapeHtml(phone)}</span>
            </a>`
          : ''
      }
      <div class="footer-socials" aria-label="Social and email links">
        ${socialLinks
          .map(
            (social) => `
          <a
            href="${escapeHtml(social.url)}"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-social-btn"
            aria-label="${escapeHtml(social.label)}"
            title="${escapeHtml(social.label)}"
          >
            ${social.icon}
          </a>
        `
          )
          .join('')}
        ${
          email
            ? `<a
                href="mailto:${escapeHtml(email)}"
                class="footer-social-btn"
                aria-label="Email ${escapeHtml(email)}"
                title="${escapeHtml(email)}"
              >
                ${ICONS.mail}
              </a>`
            : ''
        }
      </div>
      <a href="${escapeHtml(routeHref('/contact'))}" data-route="/contact" class="footer-contact-btn">
        ${ICONS.mail}
        <span>Contact</span>
      </a>
    `;
  }

  function syncLiveJsonData() {
    if (IS_FILE_PROTOCOL || typeof window.fetch !== 'function') return;
    const prevSnapshot = JSON.stringify({ portfolioData, appConfig });
    Promise.all([
      fetch(resolveAssetUrl('portfolio-data.json')).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(resolveAssetUrl('config.json')).then((r) => (r.ok ? r.json() : null)).catch(() => null)
    ]).then(([freshPortfolio, freshConfig]) => {
      if (!freshPortfolio && !freshConfig) return;
      const nextPortfolio = freshPortfolio || portfolioData;
      const nextConfig = freshConfig || appConfig;
      const nextSnapshot = JSON.stringify({ portfolioData: nextPortfolio, appConfig: nextConfig });
      if (nextSnapshot !== prevSnapshot) {
        hydrateDataBindings(nextPortfolio, nextConfig);
        safeRun(renderFooterConnect);
        renderCurrentPage();
      }
    }).catch(() => {});
  }

  function safeRun(fn) {
    try {
      fn();
    } catch (_) {
      // Non-critical enhancement error must never block page render
    }
  }

  function init() {
    safeRun(syncStaticRouteHrefs);
    safeRun(renderFooterConnect);
    safeRun(initTheme);
    safeRun(initFloatingPackets);
    safeRun(initMouseGlow);
    safeRun(initCertificateModal);

    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        setMobileMenu(!isMobileMenuOpen);
      });
    }

    window.addEventListener(
      'scroll',
      () => {
        if (scrollTickPending) return;
        scrollTickPending = true;
        window.requestAnimationFrame(() => {
          scrollTickPending = false;
          updateNavbarScrollState();
          checkPendingReveals();
        });
      },
      { passive: true }
    );

    window.addEventListener('pageshow', (e) => {
      scrollTickPending = false;
      updateNavbarScrollState();
      if (e.persisted) {
        initObservers();
        if (currentPath === '/') {
          startTypewriter();
          startBdClock();
        }
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && currentPath === '/') {
        updateBdClockDom();
      }
    });

    window.addEventListener('popstate', () => {
      currentPath = getInitialPath();
      isMobileMenuOpen = false;
      scrollToPageTopInstant();
      renderCurrentPage();
    });

    window.addEventListener('hashchange', () => {
      if (USE_HASH_ROUTING || window.location.hash.startsWith('#/')) {
        currentPath = getInitialPath();
        isMobileMenuOpen = false;
        scrollToPageTopInstant();
        renderCurrentPage();
      }
    });

    // Delegate route link/card clicks, updates filter tabs, and certificate modal clicks
    document.addEventListener('click', (e) => {
      const updatesFilterBtn = e.target.closest('[data-updates-filter]');
      if (updatesFilterBtn) {
        const nextFilter = updatesFilterBtn.getAttribute('data-updates-filter') || 'all';
        if (nextFilter !== updatesFilter) {
          updatesFilter = nextFilter;
          refreshLatestUpdatesSection(true);
        }
        return;
      }

      const routeTrigger = e.target.closest('[data-route]');
      if (routeTrigger) {
        if (routeTrigger.tagName === 'A' && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) {
          return;
        }
        e.preventDefault();
        navigateTo(routeTrigger.getAttribute('data-route'), true);
        return;
      }

      const certTrigger = e.target.closest('[data-cert-url]');
      if (certTrigger) {
        const url = certTrigger.getAttribute('data-cert-url');
        const title = certTrigger.getAttribute('data-cert-title') || '';
        if (url) {
          openCertificateModal(url, title);
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const routeTrigger = e.target.closest('[data-route]');
        if (routeTrigger && routeTrigger.tagName !== 'A') {
          e.preventDefault();
          navigateTo(routeTrigger.getAttribute('data-route'), true);
          return;
        }

        const certTrigger = e.target.closest('[data-cert-url]');
        if (certTrigger) {
          e.preventDefault();
          const url = certTrigger.getAttribute('data-cert-url');
          const title = certTrigger.getAttribute('data-cert-title') || '';
          if (url) {
            openCertificateModal(url, title);
          }
        }
      }
    });

    currentPath = getInitialPath();
    renderCurrentPage();
    window.__PORTFOLIO_BOOTED__ = true;
    safeRun(syncLiveJsonData);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
