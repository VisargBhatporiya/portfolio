import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { portfolioData } from './config.js';
import { soundFx } from './audio.js';
import { setupFloatingBadges } from './floatingBadges.js';
import { setupLiquidText } from './liquidText.js';
import { initElasticStrings } from './elasticString.js';
import { initPortraitEffect } from './portraitEffect.js';

gsap.registerPlugin(ScrollTrigger);

let lenis;

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderExpertiseCards();
  renderProjects();
  renderJournal();

  initLenis();
  initCustomCursor();
  setupFloatingBadges();
  setupLiquidText();
  initElasticStrings();
  initPortraitEffect();
  initModal();
  initAudioControls();
  initFooterTime();
  initForm();
  initFullscreenMenu();
  
  initPreloader();
});

// 1. High-Responsiveness Lenis Inertia Scroll
function initLenis() {
  lenis = new Lenis({
    duration: 0.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.5
  });

  lenis.on('scroll', ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// 2. Fullscreen Overlay Navigation Menu Logic
function initFullscreenMenu() {
  const menuBtn = document.querySelector('#menu-toggle-btn');
  const closeBtn = document.querySelector('#menu-close-btn');
  const menuOverlay = document.querySelector('#fullscreen-menu');
  const menuLinks = document.querySelectorAll('.menu-nav-item');

  if (!menuOverlay) return;

  function openMenu() {
    soundFx.playClick();
    menuOverlay.classList.add('active');
    
    gsap.fromTo('.menu-nav-item', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
    );
  }

  function closeMenu() {
    soundFx.playClick();
    menuOverlay.classList.remove('active');
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      soundFx.playClick();
      closeMenu();
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl && lenis) {
          lenis.scrollTo(targetEl, { offset: -60 });
        }
      }
    });
  });
}

// 3. Preloader Sequence
function initPreloader() {
  const preloader = document.querySelector('#preloader');
  const percentEl = document.querySelector('#loader-percent');
  const helloSvg = document.querySelector('#hello-svg-container');

  if (!preloader || !percentEl) return;

  let count = 0;
  const duration = 900; // ms
  const intervalTime = 20;
  const increment = 100 / (duration / intervalTime);

  const timer = setInterval(() => {
    count += increment;
    if (count >= 100) {
      count = 100;
      clearInterval(timer);
      percentEl.textContent = '100%';

      if (helloSvg) helloSvg.classList.remove('opacity-0');

      setTimeout(() => {
        gsap.to(preloader, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            playHeroEntrance();
            initScrollAnimations();
            ScrollTrigger.refresh();
          }
        });
      }, 350);
    } else {
      percentEl.textContent = `${Math.floor(count)}%`;
    }
  }, intervalTime);
}

// 4. Hero Entrance
function playHeroEntrance() {
  gsap.from('.hero-title-1, .hero-title-2', {
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out'
  });
}

// 5. Custom Cursor
function initCustomCursor() {
  const cursor = document.querySelector('#custom-cursor');
  if (!cursor) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.8;
    cursorY += (mouseY - cursorY) * 0.8;

    cursor.style.transform = `translate3d(${cursorX.toFixed(1)}px, ${cursorY.toFixed(1)}px, 0px) translate(-50%, -50%)`;
    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, input, textarea, .glass-card, .project-card, .expertise-item, .stat-box, .contact-card, .hamburger-btn, .menu-nav-item');
    if (target) {
      if (target.classList.contains('project-card')) {
        cursor.classList.add('viewing-project');
      } else {
        cursor.classList.add('hovering');
      }
      soundFx.playHover();
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, input, textarea, .glass-card, .project-card, .expertise-item, .stat-box, .contact-card, .hamburger-btn, .menu-nav-item');
    if (target) {
      cursor.classList.remove('hovering', 'viewing-project');
    }
  });
}

// 6. Render Stats Grid
function renderStats() {
  const container = document.querySelector('#stats-grid');
  if (!container) return;

  container.innerHTML = portfolioData.profile.stats.map(stat => `
    <div class="stat-box">
      <div class="stat-label">${stat.label}</div>
      <div class="stat-value">${stat.value}</div>
    </div>
  `).join('');
}

// 7. Render Expertise Cards (Matching Reference Screenshot media_1788763938775.png)
function renderExpertiseCards() {
  const container = document.querySelector('#expertise-cards-container');
  if (!container) return;

  container.innerHTML = portfolioData.expertise.map(item => `
    <div class="expertise-card-row">
      <div class="expertise-card-header">
        <div class="expertise-left-meta">
          <span class="expertise-card-num">${item.id}</span>
          <div class="expertise-icon-square">${item.icon || '</>'}</div>
          <h4 class="expertise-card-title">${item.title}</h4>
        </div>
        <div class="expertise-card-arrow">↗</div>
      </div>
      <p class="expertise-card-desc">${item.description}</p>
      <div class="expertise-card-tags">
        ${item.tags.map(t => `<span class="expertise-tag-item">${t}</span>`).join('<span class="dot-sep">•</span>')}
      </div>
    </div>
  `).join('');
}

// 8. Render Projects List
function renderProjects() {
  const container = document.querySelector('#projects-list-container');
  if (!container) return;

  container.innerHTML = portfolioData.projects.map((project) => `
    <div class="project-card" data-id="${project.id}">
      <div class="project-info-col">
        <div class="project-category">
          <span class="num">${project.number}</span>
          <span>•</span>
          <span>${project.category}</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="tag-pills" style="margin-bottom: 24px;">
          ${project.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
        <div class="project-card-actions">
          <button class="btn-pill btn-pill-cream view-details-btn" style="display: inline-flex; align-items: center; gap: 6px;">
            <span>View Details</span>
            <span>↗</span>
          </button>
        </div>
      </div>
      <div class="project-img-box">
        <img src="${project.image}" alt="${project.title}" loading="lazy" class="project-img" />
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.project-card').forEach(card => {
    const projId = card.getAttribute('data-id');
    const project = portfolioData.projects.find(p => p.id === projId);

    card.addEventListener('click', () => {
      soundFx.playClick();
      if (project) openModal(project);
    });

    const viewBtn = card.querySelector('.view-details-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundFx.playClick();
        if (project) openModal(project);
      });
    }
  });
}

// Render Journal / Experience Items
function renderJournal() {
  const container = document.querySelector('#journal-list-container');
  if (!container || !portfolioData.journal) return;

  container.innerHTML = portfolioData.journal.map(item => `
    <div class="journal-card-row">
      <div class="journal-card-left">
        <div class="journal-meta-row">
          <span class="journal-date-tag">${item.date}</span>
          <span class="dot-sep">•</span>
          <span class="journal-category-tag">${item.category}</span>
        </div>
        <h3 class="journal-card-title">${item.title}</h3>
        <p class="journal-card-summary">${item.summary}</p>
        <div class="tag-pills" style="margin-top: 16px;">
          ${item.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>
      </div>
      <div class="journal-card-right">
        <span class="btn-pill btn-pill-glass" style="font-size: 11px; padding: 8px 16px; display: inline-flex; align-items: center; gap: 6px;">
          <span>${item.linkText || 'Read Article'}</span>
          <span>↗</span>
        </span>
      </div>
    </div>
  `).join('');
}

// 9. Project Modal System
function openModal(project) {
  const modal = document.querySelector('#project-modal');
  const title = document.querySelector('#modal-title');
  const category = document.querySelector('#modal-category');
  const period = document.querySelector('#modal-period');
  const image = document.querySelector('#modal-image');
  const description = document.querySelector('#modal-description');
  const highlightsList = document.querySelector('#modal-highlights-list');
  const tagsContainer = document.querySelector('#modal-tags');

  if (!modal) return;

  if (title) title.textContent = project.title;
  if (category) category.textContent = project.category;
  if (period) period.textContent = project.period || '';
  if (image) {
    image.src = project.image;
    image.alt = project.title;
  }
  if (description) description.textContent = project.description;

  if (highlightsList) {
    const listItems = project.highlights || (project.previewDetails ? [project.previewDetails] : []);
    highlightsList.innerHTML = listItems.map(item => `
      <li class="modal-bullet-item">
        <span class="bullet-gold">•</span>
        <span>${item}</span>
      </li>
    `).join('');
  }

  if (tagsContainer) {
    tagsContainer.innerHTML = project.tags.map(tag => `
      <span class="tag-pill">${tag}</span>
    `).join('');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const modalBox = modal.querySelector('.project-modal-container') || modal.querySelector('div');
  if (modalBox) {
    gsap.fromTo(modalBox, 
      { y: 24, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  }
}

function initModal() {
  const modal = document.querySelector('#project-modal');
  const closeBtn = document.querySelector('#modal-close-btn');

  if (!modal) return;

  function closeModal() {
    soundFx.playClick();
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// 10. Audio Controls
function initAudioControls() {
  const btn = document.querySelector('#audio-toggle-btn');
  const text = document.querySelector('#audio-status-text');

  if (!btn || !text) return;

  btn.addEventListener('click', () => {
    const isEnabled = soundFx.toggle();
    text.textContent = isEnabled ? 'SOUND ON' : 'SOUND OFF';
    btn.style.opacity = isEnabled ? '1' : '0.5';
    soundFx.playClick();
  });
}

// 11. Footer Time Clock & Scroll Top
function initFooterTime() {
  const timeEl = document.querySelector('#local-time');
  const yearEl = document.querySelector('#current-year');
  const scrollTopBtn = document.querySelector('#scroll-top-btn');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function updateTime() {
    if (!timeEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' }) + ' IST';
    timeEl.textContent = timeStr;
  }

  setInterval(updateTime, 1000);
  updateTime();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      soundFx.playClick();
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// 12. Contact Form Logic
function initForm() {
  const form = document.querySelector('#contact-form');
  const copyEmailBtn = document.querySelector('#copy-email-btn');
  const statusMsg = document.querySelector('#form-status');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      soundFx.playClick();
      navigator.clipboard.writeText(portfolioData.profile.email);
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy';
      }, 2000);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      soundFx.playClick();
      if (statusMsg) {
        statusMsg.classList.remove('hidden');
        form.reset();
        setTimeout(() => {
          statusMsg.classList.add('hidden');
        }, 4000);
      }
    });
  }
}

// 13. Batch ScrollTrigger Animations
function initScrollAnimations() {
  const sections = document.querySelectorAll('#about, #journal, #expertise, #work, #contact');
  
  sections.forEach(section => {
    gsap.fromTo(section, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}
