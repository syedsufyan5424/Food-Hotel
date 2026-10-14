/**
 * MIROSA CAFE & KITCHEN - MENU COMPONENT & LOGIC
 */
import { store } from './store.js';
import { ICONS } from './icons.js';

let activeCategory = 'all';
let activeDiet = 'all';
let searchQuery = '';
let sortBy = 'default';

export function initMenu() {
  renderSignatureMenu();
  renderFullMenu();
  initMenuFilters();
  initDishModal();

  // Re-render when store updates
  store.addEventListener('menu:updated', () => {
    renderSignatureMenu();
    renderFullMenu();
  });
}

/**
 * Render Featured / Signature Menu on Homepage
 */
export function renderSignatureMenu() {
  const container = document.getElementById('signature-menu-grid');
  if (!container) return;

  const items = store.getMenu().filter(item => item.isFeatured && item.isAvailable).slice(0, 6);

  container.innerHTML = items.map(item => createEditorialCard(item)).join('');

  // Attach click listeners to cards
  container.querySelectorAll('.editorial-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      openDishModal(id);
    });
  });
}

/**
 * Render Complete Interactive Menu
 */
export function renderFullMenu() {
  const container = document.getElementById('full-menu-grid');
  if (!container) return;

  let items = store.getMenu();

  // Filter by category
  if (activeCategory !== 'all') {
    items = items.filter(item => item.category === activeCategory);
  }

  // Filter by diet
  if (activeDiet === 'veg') {
    items = items.filter(item => item.isVeg);
  } else if (activeDiet === 'nonveg') {
    items = items.filter(item => !item.isVeg);
  } else if (activeDiet === 'chef') {
    items = items.filter(item => item.isChefSpecial);
  }

  // Filter by search query
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      (item.dietary && item.dietary.some(d => d.toLowerCase().includes(q)))
    );
  }

  // Sort items
  if (sortBy === 'price-low') {
    items.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    items.sort((a, b) => b.price - a.price);
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="menu-empty-state">
        <h3>No dishes found</h3>
        <p>Try clearing your search or selecting a different category filter.</p>
        <button class="btn btn-outline btn-sm" id="btn-reset-filters" style="margin-top: 1rem;">Reset Filters</button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        activeCategory = 'all';
        activeDiet = 'all';
        const searchInput = document.getElementById('menu-search-input');
        if (searchInput) searchInput.value = '';
        updateFilterUI();
        renderFullMenu();
      });
    }
    return;
  }

  container.innerHTML = items.map(item => createEditorialCard(item)).join('');

  // Attach card click handlers
  container.querySelectorAll('.editorial-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      openDishModal(id);
    });
  });
}

function createEditorialCard(item) {
  const dietClass = item.isVeg ? 'veg' : 'nonveg';
  const chefBadge = item.isChefSpecial ? `<span class="tag tag-chef">Chef's Special</span>` : '';
  const availabilityBadge = !item.isAvailable ? `<span class="tag tag-unavailable">Sold Out</span>` : '';

  return `
    <article class="editorial-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${item.name}">
      <div class="editorial-card-media">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="editorial-card-badges">
          <span class="diet-indicator ${dietClass}" title="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
          ${chefBadge}
          ${availabilityBadge}
        </div>
      </div>
      <div class="editorial-card-content">
        <div class="editorial-card-header">
          <h3 class="editorial-card-title">${item.name}</h3>
          <div class="item-price"><span class="currency">₹</span>${item.price}</div>
        </div>
        <p class="editorial-card-desc">${item.description}</p>
        <div class="editorial-card-footer">
          <div class="tag-list" style="display: flex; gap: 4px; flex-wrap: wrap;">
            ${(item.dietary || []).slice(0, 2).map(d => `<span class="tag tag-subtle">${d}</span>`).join('')}
          </div>
          <span class="editorial-card-action">
            Details ${ICONS.arrowRight}
          </span>
        </div>
      </div>
    </article>
  `;
}

/**
 * Filter and Search listeners
 */
function initMenuFilters() {
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderFullMenu();
    });
  }

  // Category Pills
  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      activeCategory = pill.dataset.category;
      updateFilterUI();
      renderFullMenu();
    });
  });

  // Dietary Toggles
  const dietBtns = document.querySelectorAll('.diet-toggle-btn');
  dietBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeDiet = btn.dataset.diet;
      dietBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFullMenu();
    });
  });

  // Sort Select
  const sortSelect = document.getElementById('menu-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderFullMenu();
    });
  }
}

function updateFilterUI() {
  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    if (pill.dataset.category === activeCategory) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}

/**
 * Switch category programmatically (e.g. from homepage category tiles)
 */
export function selectCategory(catId) {
  activeCategory = catId;
  updateFilterUI();
  renderFullMenu();

  const menuSec = document.getElementById('menu');
  if (menuSec) {
    menuSec.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * DISH DETAIL MODAL
 */
function initDishModal() {
  const modal = document.getElementById('dish-detail-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDishModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeDishModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeDishModal();
    }
  });
}

export function openDishModal(itemId) {
  const item = store.getMenuItem(itemId);
  if (!item) return;

  const modal = document.getElementById('dish-detail-modal');
  const content = document.getElementById('dish-modal-content');
  if (!modal || !content) return;

  const restaurantInfo = store.getInfo();
  const dietClass = item.isVeg ? 'veg' : 'nonveg';
  const dietLabel = item.isVeg ? 'Vegetarian' : 'Non-Vegetarian';

  content.innerHTML = `
    <div style="position: relative;">
      <div style="width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #000; border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg);">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </div>
    <div style="padding: 2rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="diet-indicator ${dietClass}"></span>
          <span style="font-size: 0.8125rem; font-weight: 600; color: var(--text-secondary);">${dietLabel}</span>
          ${item.isChefSpecial ? `<span class="tag tag-chef">Chef's Special</span>` : ''}
        </div>
        <div class="item-price" style="font-size: 1.6rem;"><span class="currency">₹</span>${item.price}</div>
      </div>

      <h2 style="font-size: 1.75rem; margin-bottom: 0.75rem; color: var(--text-primary);">${item.name}</h2>
      
      <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
        ${item.description}
      </p>

      <div style="background: var(--bg-secondary); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.75rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600;">Portion & Energy</div>
          <div style="font-weight: 600; font-size: 0.9375rem; color: var(--text-primary);">${item.calories || 'Chef Prepared'} · Made Fresh</div>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${(item.dietary || []).map(d => `<span class="tag tag-subtle">${d}</span>`).join('')}
        </div>
      </div>

      <div style="background: var(--bg-card-warm); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; text-align: center;">
        <div style="font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">
          Enjoy at Mirosa or Order Online
        </div>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Available for dine-in at Himayat Nagar outlet or doorstep delivery via verified aggregators.
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <a href="${restaurantInfo.zomatoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-zomato btn-sm" style="flex: 1; min-width: 140px;">
            Order on Zomato
          </a>
          <a href="${restaurantInfo.swiggyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-swiggy btn-sm" style="flex: 1; min-width: 140px;">
            Order on Swiggy
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeDishModal() {
  const modal = document.getElementById('dish-detail-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}
