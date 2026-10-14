/**
 * MIROSA CAFE & KITCHEN - GALLERY & LIGHTBOX LOGIC
 */
import { GALLERY_ITEMS } from './data.js';
import { ICONS } from './icons.js';

let activeGalleryFilter = 'all';
let currentLightboxIndex = 0;
let filteredItems = [...GALLERY_ITEMS];

export function initGallery() {
  renderGallery();
  initGalleryFilters();
  initLightbox();
}

export function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  if (activeGalleryFilter === 'all') {
    filteredItems = [...GALLERY_ITEMS];
  } else {
    filteredItems = GALLERY_ITEMS.filter(item => item.category === activeGalleryFilter);
  }

  container.innerHTML = filteredItems.map((item, index) => `
    <div class="gallery-item ${item.span || ''}" data-index="${index}" tabindex="0" role="button" aria-label="View photo: ${item.title}">
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="gallery-item-overlay">
        <h4 class="gallery-item-title">${item.title}</h4>
        <p class="gallery-item-desc">${item.description}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const index = parseInt(item.dataset.index, 10);
      openLightbox(index);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const index = parseInt(item.dataset.index, 10);
        openLightbox(index);
      }
    });
  });
}

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGalleryFilter = btn.dataset.filter;
      renderGallery();
    });
  });
}

function initLightbox() {
  const modal = document.getElementById('gallery-lightbox-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevLightboxImage);
  if (nextBtn) nextBtn.addEventListener('click', nextLightboxImage);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
  });
}

export function openLightbox(index) {
  if (index < 0 || index >= filteredItems.length) return;
  currentLightboxIndex = index;
  updateLightboxContent();

  const modal = document.getElementById('gallery-lightbox-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function updateLightboxContent() {
  const item = filteredItems[currentLightboxIndex];
  if (!item) return;

  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');
  const counterEl = document.getElementById('lightbox-counter');

  if (imgEl) {
    imgEl.src = item.image;
    imgEl.alt = item.title;
  }
  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.description;
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${filteredItems.length}`;
}

export function closeLightbox() {
  const modal = document.getElementById('gallery-lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % filteredItems.length;
  updateLightboxContent();
}

export function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + filteredItems.length) % filteredItems.length;
  updateLightboxContent();
}
