/**
 * MIROSA CAFE & KITCHEN - CORE APP CONTROLLER
 */
import { store } from './store.js';
import { initMenu, selectCategory } from './menu.js';
import { initGallery } from './gallery.js';
import { initReservations } from './reservations.js';
import { initAdmin } from './admin.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnnouncementBar();
  initCategoryTiles();
  initDeliveryOrderModal();
  initSmoothScroll();
  syncRestaurantInfo();

  // Initialize modular components
  initMenu();
  initGallery();
  initReservations();
  initAdmin();

  // Update dynamic elements when info changes
  store.addEventListener('info:updated', syncRestaurantInfo);
});

/**
 * Sync dynamic texts from store
 */
function syncRestaurantInfo() {
  const info = store.getInfo();

  // Announcement Bar
  const bar = document.getElementById('announcement-bar');
  const barText = document.getElementById('announcement-text');
  if (bar && barText) {
    if (info.announcement && info.announcement.active && info.announcement.text) {
      barText.textContent = info.announcement.text;
      bar.classList.remove('hidden');
      document.body.classList.add('announcement-active');
    } else {
      bar.classList.add('hidden');
      document.body.classList.remove('announcement-active');
    }
  }

  // Delivery links
  document.querySelectorAll('a.link-zomato').forEach(a => {
    a.href = info.zomatoUrl;
  });
  document.querySelectorAll('a.link-swiggy').forEach(a => {
    a.href = info.swiggyUrl;
  });

  // Phone numbers
  document.querySelectorAll('.info-phone-text').forEach(el => {
    el.textContent = info.phone;
  });
  document.querySelectorAll('a.info-phone-link').forEach(a => {
    a.href = `tel:${info.phoneRaw || info.phone.replace(/[^0-9+]/g, '')}`;
  });

  // Hours
  document.querySelectorAll('.info-timings-text').forEach(el => {
    el.textContent = info.timings;
  });
}

/**
 * Sticky Header and Mobile Drawer
 */
function initNavbar() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawer = document.getElementById('mobile-drawer-close');

  // Scroll detection
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeHandler = () => {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeDrawer) closeDrawer.addEventListener('click', closeHandler);
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeHandler();
    });

    mobileDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeHandler);
    });
  }
}

/**
 * Announcement Bar Dismissal
 */
function initAnnouncementBar() {
  const closeBtn = document.getElementById('announcement-close');
  const bar = document.getElementById('announcement-bar');
  if (closeBtn && bar) {
    closeBtn.addEventListener('click', () => {
      bar.classList.add('hidden');
      document.body.classList.remove('announcement-active');
    });
  }
}

/**
 * Category Tiles on Homepage
 */
function initCategoryTiles() {
  document.querySelectorAll('.category-tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = tile.dataset.category;
      if (cat) {
        selectCategory(cat);
      }
    });
  });
}

/**
 * Quick Delivery Options Modal
 */
function initDeliveryOrderModal() {
  const orderBtns = document.querySelectorAll('.trigger-order-modal');
  const modal = document.getElementById('order-modal');
  if (!modal) return;

  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Smooth Scroll for Navigation Anchors
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#admin') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.getElementById('site-header')?.offsetHeight || 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Global Toast Notification System
 */
export function showToast(message, type = 'normal') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" style="background:none;border:none;color:inherit;opacity:0.7;cursor:pointer;">&times;</button>
  `;

  container.appendChild(toast);

  const removeToast = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  };

  toast.querySelector('.toast-close').addEventListener('click', removeToast);
  setTimeout(removeToast, 4000);
}
