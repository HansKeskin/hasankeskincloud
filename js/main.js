// ===== UTILITY FUNCTIONS =====

// Throttle: ensures fn runs at most once every `limit` ms
function throttle(fn, limit) {
  let lastCall = 0;
  let scheduled = null;
  return function(...args) {
    const now = Date.now();
    const remaining = limit - (now - lastCall);
    if (remaining <= 0) {
      if (scheduled) { clearTimeout(scheduled); scheduled = null; }
      lastCall = now;
      fn.apply(this, args);
    } else if (!scheduled) {
      scheduled = setTimeout(() => {
        lastCall = Date.now();
        scheduled = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// Debounce: delays fn execution until `delay` ms after last call
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Escape HTML to prevent XSS - global utility for all pages
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// ===== FUZZY SEARCH =====
function levenshteinDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function fuzzyMatch(text, query) {
  text = text.toLowerCase();
  query = query.toLowerCase();
  if (text.includes(query)) return true;
  const textWords = text.split(/\s+/);
  const queryWords = query.split(/\s+/);
  return queryWords.every(qw => {
    const tolerance = Math.floor(qw.length / 3);
    if (text.includes(qw)) return true;
    if (tolerance === 0) return false;
    return textWords.some(tw => levenshteinDistance(tw, qw) <= tolerance);
  });
}

// ===== SPAM PROTECTION =====
const _spamTimestamps = {};
const _formCooldowns = {};
const FORM_COOLDOWN_MS = 10000;

function initSpamProtection(formId) {
  _spamTimestamps[formId] = Date.now();
}

function checkSpamProtection(formId, honeypotId) {
  const honeypot = document.getElementById(honeypotId);
  if (honeypot && honeypot.value) return false;
  const elapsed = Date.now() - (_spamTimestamps[formId] || 0);
  if (elapsed < 3000) return false;
  if (_formCooldowns[formId] && Date.now() - _formCooldowns[formId] < FORM_COOLDOWN_MS) return false;
  return true;
}

function markFormSubmitted(formId) {
  _formCooldowns[formId] = Date.now();
  _spamTimestamps[formId] = Date.now();
}

// ===== RAF MANAGEMENT =====
// Central registry for all requestAnimationFrame IDs so they can be cancelled
const rafIds = {
  particles: null
};

// Track page visibility for pausing animations
let pageVisible = true;

document.addEventListener('visibilitychange', () => {
  pageVisible = !document.hidden;

  if (document.hidden) {
    // Pause all RAF loops
    if (rafIds.particles) {
      cancelAnimationFrame(rafIds.particles);
      rafIds.particles = null;
    }
    // Pause snake game
    if (window._snakeLoop) {
      window._snakePausedByVisibility = true;
      clearInterval(window._snakeLoop);
      window._snakeLoop = null;
    }
  } else {
    // Resume RAF loops
    if (typeof _resumeParticles === 'function') _resumeParticles();
    // Resume snake game
    if (window._snakePausedByVisibility && window._snakeGameRunning) {
      window._snakeLoop = setInterval(window._snakeUpdateFn, 110);
      window._snakePausedByVisibility = false;
    }
  }
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  }
});

// ===== DARK / LIGHT MODE (with circle transition) =====
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.setAttribute('aria-pressed', savedTheme === 'dark');
  themeToggle.addEventListener('click', (e) => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', next === 'dark');

    // Create circle transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.style.background = next === 'dark' ? '#1e1e2e' : '#ffffff';
    const rect = themeToggle.getBoundingClientRect();
    overlay.style.top = (rect.top + rect.height / 2) + 'px';
    overlay.style.left = (rect.left + rect.width / 2) + 'px';
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add('expanding');
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      }, 200);
      setTimeout(() => overlay.remove(), 700);
    });
  });

  // Dark mode tooltip (once per user)
  if (!localStorage.getItem('dark_mode_hint')) {
    setTimeout(() => {
      const tip = document.createElement('div');
      tip.style.cssText = 'position:absolute;top:calc(100% + 10px);right:0;background:var(--dark,#1a1a2e);color:#fff;padding:8px 14px;border-radius:8px;font-size:0.8rem;font-family:Poppins,sans-serif;white-space:nowrap;z-index:9999;box-shadow:0 4px 15px rgba(0,0,0,0.3);animation:fadeInUp 0.3s ease;pointer-events:none;';
      tip.innerHTML = '<kbd style="background:rgba(255,255,255,0.2);padding:1px 6px;border-radius:4px;font-size:0.75rem;">D</kbd> tusuna basarak tema degistirebilirsiniz';
      themeToggle.style.position = 'relative';
      themeToggle.appendChild(tip);
      localStorage.setItem('dark_mode_hint', 'true');
      setTimeout(() => { tip.style.opacity = '0'; tip.style.transition = 'opacity 0.5s'; }, 2500);
      setTimeout(() => tip.remove(), 3000);
    }, 2000);
  }
}

// ===== PARALLAX EFFECT (data collected, logic in consolidated scroll handler) =====
const parallaxShapes = document.querySelectorAll('.parallax-shape');
const parallaxSpeeds = [0.03, -0.02, 0.015, -0.025];

// ===== NAVBAR SCROLL EFFECT (logic in consolidated scroll handler) =====
const navbar = document.querySelector('.navbar');

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate skill bars if present
      const skillBars = entry.target.querySelectorAll('.skill-bar .fill');
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width + '%';
        }
      });
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// ===== BLOG FILTERS (with debounce to prevent animation conflicts) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
let filterAnimationInProgress = false;

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Ignore clicks while a filter animation is in progress
    if (filterAnimationInProgress) return;
    filterAnimationInProgress = true;

    // Remove active from all
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    blogCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    // Unlock after the longest animation completes (300ms hide + 50ms buffer)
    setTimeout(() => {
      filterAnimationInProgress = false;
    }, 350);
  });
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  initSpamProtection('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checkSpamProtection('contactForm', 'contactHoneypot')) {
      if (typeof showToast === 'function') showToast('Lutfen formu tekrar doldurun.', 'error');
      return;
    }

    let isValid = true;

    // Reset errors
    contactForm.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });

    // Validate name
    const name = contactForm.querySelector('#name');
    if (name && name.value.trim().length < 2) {
      name.closest('.form-group').classList.add('error');
      isValid = false;
    }

    // Validate email
    const email = contactForm.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value.trim())) {
      email.closest('.form-group').classList.add('error');
      isValid = false;
    }

    // Validate subject
    const subject = contactForm.querySelector('#subject');
    if (subject && subject.value.trim().length < 3) {
      subject.closest('.form-group').classList.add('error');
      isValid = false;
    }

    // Validate message
    const message = contactForm.querySelector('#message');
    if (message && message.value.trim().length < 10) {
      message.closest('.form-group').classList.add('error');
      isValid = false;
    }

    if (isValid) {
      // Show success
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Mesaj Gonderildi!';
      btn.style.background = '#059669';
      markFormSubmitted('contactForm');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    }
  });
}

// ===== SCROLL TO TOP (logic in consolidated scroll handler) =====
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== PAGE TRANSITION =====
const pageTransition = document.querySelector('.page-transition');
if (pageTransition) {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('#') && href !== window.location.pathname) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        pageTransition.classList.add('active');
        setTimeout(() => { window.location.href = href; }, 300);
      });
    }
  });
}

// ===== TILT 3D CARD EFFECT =====
document.querySelectorAll('.card, .blog-card, .project-card, .skill-card').forEach(card => {
  card.classList.add('tilt-card');
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== PARTICLE BACKGROUND =====
const particleCanvas = document.getElementById('particleCanvas');
let _resumeParticles = null;

if (particleCanvas) {
  const ctx = particleCanvas.getContext('2d');
  let particles = [];
  const particleCount = 50;

  function resizeCanvas() {
    particleCanvas.width = particleCanvas.parentElement.offsetWidth;
    particleCanvas.height = particleCanvas.parentElement.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(67, 56, 202, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(67, 56, 202, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    rafIds.particles = requestAnimationFrame(animateParticles);
  }

  _resumeParticles = function() {
    if (!rafIds.particles) {
      animateParticles();
    }
  };

  animateParticles();
}

// ===== STAT COUNTER =====
let _statsVisible = false;

function animateStatCounters() {
  if (!_statsVisible) return;
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    if (!target || target === 0) return;
    if (el._animatedTarget === target) return;
    el._animatedTarget = target;

    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current + suffix;
    }, 30);
  });
}

// Observe stats section visibility
(function() {
  const statsGrid = document.getElementById('statsGrid');
  if (!statsGrid) return;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        _statsVisible = true;
        animateStatCounters();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsGrid);
})();

// ===== READING PROGRESS BAR (logic in consolidated scroll handler) =====
const readingProgress = document.querySelector('.reading-progress');

// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 3500);
}


// ===== KEYBOARD SHORTCUTS =====
const shortcutsModal = document.querySelector('.shortcuts-modal');

document.addEventListener('keydown', (e) => {
  const isTyping = ['INPUT','TEXTAREA'].includes(document.activeElement.tagName);

  // Ctrl+K => open global search
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    const gs = document.querySelector('.global-search');
    if (gs) { gs.classList.add('open'); const inp = gs.querySelector('input'); if (inp) setTimeout(() => inp.focus(), 100); }
  }
  // D => toggle dark mode (trigger button click for animation)
  if (e.key === 'd' && !isTyping) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) toggleBtn.click();
  }
  // ? => show shortcuts
  if (e.key === '?' && shortcutsModal) {
    shortcutsModal.classList.toggle('open');
  }
  // Escape => close modals
  if (e.key === 'Escape') {
    if (shortcutsModal) shortcutsModal.classList.remove('open');
    const gs = document.querySelector('.global-search');
    if (gs) gs.classList.remove('open');
    const pm = document.querySelector('.project-modal');
    if (pm) pm.classList.remove('open');
  }
  // H => go home
  if (e.key === 'h' && !isTyping) {
    window.location.href = '/';
  }
  // B => go blog
  if (e.key === 'b' && !isTyping) {
    window.location.href = '/blog/';
  }
  // R => toggle reading mode
  if (e.key === 'r' && !isTyping) {
    const rmBtn = document.querySelector('.reading-mode-toggle');
    if (rmBtn && rmBtn.classList.contains('visible')) rmBtn.click();
  }
});

// ===== ACTIVE NAV LINK =====
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === '/') || (currentPath.startsWith(href) && href !== '/')) {
    link.classList.add('active');
  }
});

// ===== TYPING EFFECT (Hero) =====
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
  const texts = JSON.parse(typingElement.getAttribute('data-texts') || '[]');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  if (texts.length > 0) {
    typeEffect();
  }
}

// ===== DIRECTIONAL REVEAL ANIMATIONS =====
document.querySelectorAll('.fade-left, .fade-right, .fade-up, .fade-down').forEach(el => {
  observer.observe(el);
});


// ===== BLOG VIEW TRACKING =====
function trackPostView(postId) {
  if (!postId) return;
  const views = JSON.parse(localStorage.getItem('post_views') || '{}');
  views[postId] = (views[postId] || 0) + 1;
  localStorage.setItem('post_views', JSON.stringify(views));
}

function getPostViews(postId) {
  const views = JSON.parse(localStorage.getItem('post_views') || '{}');
  return views[postId] || 0;
}

function getTotalViews() {
  const views = JSON.parse(localStorage.getItem('post_views') || '{}');
  return Object.values(views).reduce((sum, v) => sum + v, 0);
}

// ===== BOOKMARK SYSTEM =====
function getBookmarks() {
  return JSON.parse(localStorage.getItem('bookmarked_posts') || '[]');
}

function isBookmarked(postId) {
  return getBookmarks().includes(String(postId));
}

function toggleBookmark(postId) {
  let bookmarks = getBookmarks();
  const id = String(postId);
  if (bookmarks.includes(id)) {
    bookmarks = bookmarks.filter(b => b !== id);
    showToast('Okuma listesinden cikarildi', 'info');
  } else {
    bookmarks.push(id);
    showToast('Okuma listesine eklendi!', 'success');
  }
  localStorage.setItem('bookmarked_posts', JSON.stringify(bookmarks));
  // Update all bookmark buttons on the page
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    const btnId = btn.getAttribute('data-post-id');
    if (btnId === id) {
      btn.classList.toggle('bookmarked', bookmarks.includes(id));
      btn.querySelector('i').className = bookmarks.includes(id) ? 'fas fa-bookmark' : 'far fa-bookmark';
    }
  });
  // Update bookmark count
  const countEl = document.getElementById('bookmarkCount');
  if (countEl) countEl.textContent = bookmarks.length;
}

// ===== TABLE OF CONTENTS =====
// These variables are set by generateTOC and read by the consolidated scroll handler
let tocHeadings = null;
let tocContainerEl = null;

function generateTOC() {
  const postContent = document.getElementById('postContent');
  const tocContainer = document.getElementById('tocContainer');
  if (!postContent || !tocContainer) return;

  const headings = postContent.querySelectorAll('h2, h3');
  if (headings.length < 2) { tocContainer.style.display = 'none'; return; }

  let tocHtml = '';
  headings.forEach((h, i) => {
    const id = 'heading-' + i;
    h.id = id;
    const level = h.tagName === 'H3' ? 'toc-h3' : '';
    tocHtml += '<li class="' + level + '"><a href="#' + id + '">' + h.textContent + '</a></li>';
  });

  tocContainer.querySelector('.toc-list').innerHTML = tocHtml;
  tocContainer.style.display = 'block';

  // Toggle collapse (only bind once)
  const tocH4 = tocContainer.querySelector('h4');
  if (!tocH4._bound) {
    tocH4._bound = true;
    tocH4.addEventListener('click', () => {
      tocContainer.classList.toggle('collapsed');
    });
  }

  // Store references for consolidated scroll handler
  tocHeadings = headings;
  tocContainerEl = tocContainer;
}

// ===== READING TIME REMAINING =====
// These variables are set by initReadingRemaining and read by the consolidated scroll handler
let readingRemainingIndicator = null;
let readingRemainingMinutes = 0;
let readingRemainingContent = null;

function initReadingRemaining(totalMinutes) {
  const indicator = document.getElementById('readingRemaining');
  if (!indicator || !totalMinutes) return;

  const postContent = document.getElementById('postContent');
  if (!postContent) return;

  // Store references for consolidated scroll handler
  readingRemainingIndicator = indicator;
  readingRemainingMinutes = totalMinutes;
  readingRemainingContent = postContent;
}

// ===== GLOBAL SEARCH =====
const globalSearch = document.querySelector('.global-search');
if (globalSearch) {
  const searchInput = globalSearch.querySelector('input');
  const searchResults = globalSearch.querySelector('.global-search-results');

  globalSearch.setAttribute('role', 'dialog');
  globalSearch.setAttribute('aria-label', 'Arama');

  function openGlobalSearch() {
    globalSearch.classList.add('open');
    globalSearch.setAttribute('aria-hidden', 'false');
    setTimeout(() => searchInput && searchInput.focus(), 100);
  }

  function closeGlobalSearch() {
    globalSearch.classList.remove('open');
    globalSearch.setAttribute('aria-hidden', 'true');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }

  globalSearch.addEventListener('click', (e) => {
    if (e.target === globalSearch) closeGlobalSearch();
  });

  if (searchInput) {
    searchInput.addEventListener('input', async () => {
      const q = searchInput.value.toLowerCase().trim();
      if (q.length < 2) { searchResults.innerHTML = ''; return; }

      // Search pages
      const pages = [
        { title: 'Ana Sayfa', url: '/', icon: 'fa-home', gradient: 'var(--primary)', keywords: 'ana sayfa home hasan blog' },
        { title: 'Blog', url: '/blog/', icon: 'fa-blog', gradient: 'var(--primary)', keywords: 'blog yazilar posts' },
        { title: 'Projeler', url: '/projects/', icon: 'fa-code', gradient: 'var(--primary)', keywords: 'projeler projects' },
        { title: 'CV', url: '/cv/', icon: 'fa-file-alt', gradient: 'var(--primary-light)', keywords: 'cv ozgecmis resume egitim deneyim' },
        { title: 'Iletisim', url: '/contact/', icon: 'fa-envelope', gradient: 'var(--primary-light)', keywords: 'iletisim contact email' }
      ];

      let results = [];

      // Search pages
      pages.forEach(p => {
        if (p.title.toLowerCase().includes(q) || p.keywords.includes(q)) {
          results.push({ title: p.title, subtitle: 'Sayfa', url: p.url, icon: p.icon, gradient: p.gradient });
        }
      });

      // Search blog posts (if blog-data.js is loaded)
      if (typeof getAllPosts === 'function') {
        const lang = typeof getLang === 'function' ? getLang() : 'tr';
        const posts = await getAllPosts();
        posts.forEach(post => {
          const title = (post.title[lang] || post.title.tr);
          const summary = (post.summary[lang] || post.summary.tr);
          const tags = (post.tags || []).join(' ');
          if (fuzzyMatch(title, q) || fuzzyMatch(summary, q) || fuzzyMatch(tags, q)) {
            results.push({
              title: post.title[lang] || post.title.tr,
              subtitle: post.category + ' | ' + post.date,
              url: '/blog-post/?id=' + post.id,
              icon: post.icon,
              gradient: post.gradient
            });
          }
        });
      }

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results"><i class="fas fa-search"></i> Sonuc bulunamadi</div>';
      } else {
        searchResults.innerHTML = results.slice(0, 8).map(r => `
          <a href="${r.url}" class="search-result-item">
            <div class="result-icon" style="background: ${r.gradient};"><i class="fas ${r.icon}"></i></div>
            <div class="result-info"><h4>${r.title}</h4><p>${r.subtitle}</p></div>
          </a>
        `).join('');
      }
    });
  }
}


// ===== CONFETTI EFFECT =====
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#4338CA', '#6366F1', '#818CF8', '#A5B4FC', '#D97706', '#5B5BD6'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: Math.random() * -18 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.4 + Math.random() * 0.2,
      opacity: 1
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.008;
      if (p.opacity > 0 && p.y < canvas.height + 50) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });
    frame++;
    if (alive && frame < 180) requestAnimationFrame(animate);
    else canvas.remove();
  }
  animate();
}

// ===== SYNTAX HIGHLIGHTING =====
function highlightCodeBlocks() {
  document.querySelectorAll('.post-content pre code, .post-content pre').forEach(block => {
    if (block.querySelector('.syn-keyword')) return; // already highlighted
    let html = block.innerHTML;

    // Comments
    html = html.replace(/(\/\/.*?)(\n|$)/g, '<span class="syn-comment">$1</span>$2');
    html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syn-comment">$1</span>');
    // Strings
    html = html.replace(/(&quot;|"|')((?:(?!\1).)*?)\1/g, '<span class="syn-string">$1$2$1</span>');
    // Numbers
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="syn-number">$1</span>');
    // Keywords
    const keywords = ['const','let','var','function','return','if','else','for','while','class','import','export','from','async','await','new','this','try','catch','throw','switch','case','break','default','typeof','instanceof'];
    keywords.forEach(kw => {
      html = html.replace(new RegExp('\\b(' + kw + ')\\b', 'g'), '<span class="syn-keyword">$1</span>');
    });
    // HTML tags
    html = html.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="syn-tag">$2</span>');
    // Operators
    html = html.replace(/(===|!==|=>|&&|\|\|)/g, '<span class="syn-operator">$1</span>');

    block.innerHTML = html;
  });
}

// ===== SKELETON LOADING =====
function showSkeletons(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let html = '';
  for (let i = 0; i < count; i++) {
    html += '<div class="skeleton skeleton-card"></div>';
  }
  container.innerHTML = html;
}

function removeSkeletons(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.querySelectorAll('.skeleton').forEach(s => s.remove());
}

// ===== SCROLL-DRIVEN PARALLAX (data collected, logic in consolidated scroll handler) =====
const scrollParallaxElements = [];
document.querySelectorAll('.scroll-parallax').forEach(el => {
  scrollParallaxElements.push({
    el: el,
    speed: parseFloat(el.getAttribute('data-speed')) || 0.1
  });
});

// ===== READING MODE =====
const readingModeBtn = document.querySelector('.reading-mode-toggle');
if (readingModeBtn) {
  // Show only on blog post pages
  if (window.location.pathname.includes('blog-post') || window.location.search.includes('id=')) {
    readingModeBtn.classList.add('visible');
  }

  readingModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('reading-mode');
    const isOn = document.body.classList.contains('reading-mode');
    readingModeBtn.innerHTML = isOn ? '<i class="fas fa-times"></i>' : '<i class="fas fa-book-reader"></i>';
    if (typeof showToast === 'function') showToast(isOn ? 'Okuma modu aktif' : 'Okuma modu kapali', 'info');
  });
}

// ===== ACTIVITY FEED =====
function logActivity(type, detail) {
  const activities = JSON.parse(localStorage.getItem('site_activities') || '[]');
  activities.unshift({ type, detail, time: Date.now() });
  if (activities.length > 20) activities.length = 20;
  localStorage.setItem('site_activities', JSON.stringify(activities));
}

function renderActivityFeed() {
  const container = document.getElementById('activityFeed');
  if (!container) return;
  const activities = JSON.parse(localStorage.getItem('site_activities') || '[]');

  if (activities.length === 0) {
    container.innerHTML = '<p style="color:var(--dark-light); font-size:0.85rem; text-align:center; padding:10px;">Henuz aktivite yok</p>';
    return;
  }

  const iconMap = { view: 'fa-eye', like: 'fa-heart', comment: 'fa-comment', bookmark: 'fa-bookmark' };

  container.innerHTML = activities.slice(0, 8).map(a => {
    const ago = getTimeAgo(a.time);
    return '<div class="activity-item">' +
      '<div class="activity-icon ' + a.type + '"><i class="fas ' + (iconMap[a.type] || 'fa-circle') + '"></i></div>' +
      '<span class="activity-text">' + a.detail + '</span>' +
      '<span class="activity-time">' + ago + '</span>' +
    '</div>';
  }).join('');
}

function getTimeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Simdi';
  if (mins < 60) return mins + ' dk';
  const hours = Math.floor(mins / 60);
  if (hours < 24) return hours + ' sa';
  const days = Math.floor(hours / 24);
  return days + ' gun';
}

// Auto-highlight code blocks when present
if (document.querySelector('.post-content pre')) {
  highlightCodeBlocks();
}

// ===== SNAKE GAME (Ctrl+G) =====
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'g') {
    e.preventDefault();
    openSnakeGame();
  }
});

function openSnakeGame() {
  const overlay = document.querySelector('.snake-game-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  startSnakeGame();
}

function closeSnakeGame() {
  const overlay = document.querySelector('.snake-game-overlay');
  if (overlay) overlay.classList.remove('open');
  if (window._snakeLoop) clearInterval(window._snakeLoop);
  window._snakeLoop = null;
  window._snakeGameRunning = false;
  window._snakeUpdateFn = null;
  window._snakePausedByVisibility = false;
  if (window._snakeKeyHandler) {
    document.removeEventListener('keydown', window._snakeKeyHandler);
    window._snakeKeyHandler = null;
  }
}

function startSnakeGame() {
  const canvas = document.getElementById('snakeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const gridSize = 20;
  const tileCount = canvas.width / gridSize;

  let snake = [{x: 10, y: 10}];
  let food = {x: 15, y: 15};
  let dx = 0, dy = 0;
  let score = 0;
  let gameRunning = true;

  // Store game state for visibility-based pause/resume
  window._snakeGameRunning = true;

  if (window._snakeLoop) clearInterval(window._snakeLoop);

  function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    // Don't place on snake
    while (snake.some(s => s.x === food.x && s.y === food.y)) {
      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
    }
  }

  function update() {
    if (!gameRunning) return;
    if (dx === 0 && dy === 0) { draw(); return; }

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      gameOver(); return;
    }

    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      gameOver(); return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }

  // Store update function for visibility-based resume
  window._snakeUpdateFn = update;

  function draw() {
    // Background
    ctx.fillStyle = '#0f0f1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= tileCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(canvas.width, i * gridSize);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#D97706';
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#D97706';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    snake.forEach((seg, i) => {
      if (i === 0) {
        ctx.fillStyle = '#6366F1';
      } else {
        const ratio = 1 - (i / snake.length) * 0.5;
        ctx.fillStyle = `rgba(67, 56, 202, ${ratio})`;
      }
      const padding = 1;
      ctx.fillRect(seg.x * gridSize + padding, seg.y * gridSize + padding, gridSize - padding*2, gridSize - padding*2);

      if (i === 0) {
        ctx.fillStyle = '#1e1e2e';
        const eyeSize = 3;
        if (dx === 1) {
          ctx.fillRect(seg.x * gridSize + 13, seg.y * gridSize + 5, eyeSize, eyeSize);
          ctx.fillRect(seg.x * gridSize + 13, seg.y * gridSize + 12, eyeSize, eyeSize);
        } else if (dx === -1) {
          ctx.fillRect(seg.x * gridSize + 4, seg.y * gridSize + 5, eyeSize, eyeSize);
          ctx.fillRect(seg.x * gridSize + 4, seg.y * gridSize + 12, eyeSize, eyeSize);
        } else if (dy === -1) {
          ctx.fillRect(seg.x * gridSize + 5, seg.y * gridSize + 4, eyeSize, eyeSize);
          ctx.fillRect(seg.x * gridSize + 12, seg.y * gridSize + 4, eyeSize, eyeSize);
        } else {
          ctx.fillRect(seg.x * gridSize + 5, seg.y * gridSize + 13, eyeSize, eyeSize);
          ctx.fillRect(seg.x * gridSize + 12, seg.y * gridSize + 13, eyeSize, eyeSize);
        }
      }
    });

    // Score
    const scoreEl = document.getElementById('snakeScore');
    if (scoreEl) scoreEl.textContent = score;
  }

  function gameOver() {
    gameRunning = false;
    window._snakeGameRunning = false;
    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 28px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width/2, canvas.height/2 - 20);
    ctx.font = '500 16px Poppins, sans-serif';
    ctx.fillStyle = '#6366F1';
    ctx.fillText('Skor: ' + score, canvas.width/2, canvas.height/2 + 15);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '400 13px Poppins, sans-serif';
    ctx.fillText('Tekrar icin SPACE tusuna bas', canvas.width/2, canvas.height/2 + 50);

    // Save high score
    const highScore = parseInt(localStorage.getItem('snake_highscore') || '0');
    if (score > highScore) {
      localStorage.setItem('snake_highscore', score);
      ctx.fillStyle = '#D97706';
      ctx.font = '600 14px Poppins, sans-serif';
      ctx.fillText('Yeni Rekor!', canvas.width/2, canvas.height/2 + 80);
    }
  }

  function handleKey(e) {
    if (e.key === 'Escape') { closeSnakeGame(); return; }
    if (e.key === ' ') {
      e.preventDefault();
      if (window._snakeLoop) clearInterval(window._snakeLoop);
      snake = [{x:10, y:10}]; dx = 0; dy = 0; score = 0;
      gameRunning = true;
      window._snakeGameRunning = true;
      placeFood();
      window._snakeLoop = setInterval(update, 110);
      return;
    }
    if (!gameRunning) return;
    if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
    if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
    if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
    if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
  }

  if (window._snakeKeyHandler) document.removeEventListener('keydown', window._snakeKeyHandler);
  window._snakeKeyHandler = handleKey;
  document.addEventListener('keydown', handleKey);

  placeFood();
  draw();
  window._snakeLoop = setInterval(update, 110);
}

// ===== CONSOLIDATED SCROLL HANDLER =====
// Single throttled scroll listener that handles ALL scroll-dependent logic
function handleScroll() {
  const scrollY = window.scrollY;

  // 1. Parallax shapes
  if (parallaxShapes.length > 0) {
    parallaxShapes.forEach((shape, i) => {
      const speed = parallaxSpeeds[i % parallaxSpeeds.length];
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }

  // 2. Navbar scroll effect
  if (navbar) {
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // 3. Scroll to top button
  if (scrollTopBtn) {
    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  // 4. Reading progress bar
  if (readingProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollY / docHeight) * 100;
    readingProgress.style.width = Math.min(scrolled, 100) + '%';
  }

  // 5. TOC active heading
  if (tocHeadings && tocContainerEl) {
    let current = '';
    tocHeadings.forEach(h => {
      if (scrollY >= h.offsetTop - 120) current = h.id;
    });
    tocContainerEl.querySelectorAll('.toc-list a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  // 6. Reading time remaining
  if (readingRemainingIndicator && readingRemainingContent) {
    const contentTop = readingRemainingContent.offsetTop;
    const contentHeight = readingRemainingContent.offsetHeight;
    const scrolledInContent = scrollY - contentTop;
    const progress = Math.max(0, Math.min(1, scrolledInContent / contentHeight));
    const remaining = Math.ceil(readingRemainingMinutes * (1 - progress));

    if (progress > 0.05 && progress < 0.95) {
      readingRemainingIndicator.classList.add('visible');
      readingRemainingIndicator.innerHTML = '<i class="far fa-clock"></i> ' + remaining + ' dk kaldi';
    } else {
      readingRemainingIndicator.classList.remove('visible');
    }
  }

  // 7. Scroll-driven parallax elements
  scrollParallaxElements.forEach(item => {
    const rect = item.el.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    item.el.style.transform = 'translateY(' + (center * item.speed * -1) + 'px)';
  });

}

// Attach the single consolidated scroll handler, throttled at ~60fps (16ms)
window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });

// ===== RANDOM POST =====
async function goToRandomPost() {
  if (typeof getAllPosts !== 'function') return;
  const posts = await getAllPosts();
  if (posts.length === 0) return;
  const random = posts[Math.floor(Math.random() * posts.length)];
  window.location.href = '/blog-post/?id=' + random.id;
}

// ===== SNAKE EASTER EGG HINT (Progressive Discovery) =====
(function() {
  // Track unique visits
  var visits = parseInt(localStorage.getItem('site_visits') || '0');
  var lastVisitDate = localStorage.getItem('site_visit_date') || '';
  var today = new Date().toISOString().split('T')[0];

  // Count only once per day
  if (lastVisitDate !== today) {
    visits++;
    localStorage.setItem('site_visits', visits);
    localStorage.setItem('site_visit_date', today);
  }

  // Show snake hint after 3+ visits
  if (visits >= 3) {
    var footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
      var hint = document.createElement('span');
      hint.className = 'snake-hint';
      hint.innerHTML = '<span class="snake-emoji">\u{1F40D}</span><span class="snake-tooltip">Shhh... Ctrl+G</span>';
      footerBottom.appendChild(hint);
    }
  }
})();
