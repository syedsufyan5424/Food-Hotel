/**
 * MIROSA CAFE & KITCHEN - MENU COMPONENT & LOGIC
 */
import { store } from './store.js';
import { renderFoodCard, openDishModal, initDishModal, formatCategoryLabel } from './foodcard.js';

let activeCategory = 'all';
let activeDiet = 'all';
let searchQuery = '';
let sortBy = 'default';

export function initMenu() {
  // Check URL parameters for pre-selected category (e.g. from homepage tiles)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    activeCategory = catParam;
  }

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
 * Render Curated Signature Menu on Homepage (6 Highlights)
 */
export function renderSignatureMenu() {
  const container = document.getElementById('signature-menu-grid');
  if (!container) return;

  const items = store.getMenu().filter(item => item.isFeatured && item.isAvailable).slice(0, 6);

  container.innerHTML = items.map(item => renderFoodCard(item)).join('');

  // Attach click listeners to cards and View Details buttons
  attachCardListeners(container);
}

/**
 * Render Complete Interactive Menu
 */
export function renderFullMenu() {
  const container = document.getElementById('full-menu-grid');
  if (!container) return;

  let items = store.getMenu();
  const totalInStore = items.length;

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
      (item.dietary && item.dietary.some(d => d.toLowerCase().includes(q))) ||
      (item.choices && item.choices.toLowerCase().includes(q)) ||
      (item.servedWith && item.servedWith.toLowerCase().includes(q))
    );
  }

  // Sort items
  if (sortBy === 'price-low') {
    items.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    items.sort((a, b) => b.price - a.price);
  }

  // Update Result Stats indicator
  updateResultsCount(items.length, totalInStore);

  // Handle Empty State
  if (items.length === 0) {
    let emptyTitle = 'No dishes found';
    let emptyMessage = 'Try clearing your search or selecting a different category filter.';
    let emptyIcon = '🔍';

    if (activeCategory === 'veg-appetizers') {
      emptyIcon = '🌱';
      emptyTitle = 'Veg Appetizers Menu Pending Upload';
      emptyMessage = 'We are currently adding the printed appetizer selections. Categories 1–6 (Pizzas, Salads, Pastas, Soups, Sides, Indian Combos) are actively served!';
    } else if (activeCategory === 'nonveg-appetizers') {
      emptyIcon = '🍗';
      emptyTitle = 'Non-Veg Appetizers Menu Pending Upload';
      emptyMessage = 'We are currently adding the printed appetizer selections. Categories 1–6 (Pizzas, Salads, Pastas, Soups, Sides, Indian Combos) are actively served!';
    } else if (searchQuery.trim() !== '') {
      emptyTitle = `No results for "${escapeHtml(searchQuery)}"`;
      emptyMessage = 'No dishes matched your search. Check for typos or reset your filters.';
    }

    container.innerHTML = `
      <div class="menu-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem;">
        <div style="font-size: 2.75rem; margin-bottom: 0.75rem;">${emptyIcon}</div>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 0.5rem;">${emptyTitle}</h3>
        <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem; line-height: 1.6;">${emptyMessage}</p>
        <button class="btn btn-outline btn-md" id="btn-reset-filters">View All Dishes</button>
      </div>
    `;

    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchQuery = '';
        activeCategory = 'all';
        activeDiet = 'all';
        sortBy = 'default';
        const searchInput = document.getElementById('menu-search-input');
        if (searchInput) searchInput.value = '';
        const sortSelect = document.getElementById('menu-sort-select');
        if (sortSelect) sortSelect.value = 'default';
        updateFilterUI();
        renderFullMenu();
      });
    }
    return;
  }

  container.innerHTML = items.map(item => renderFoodCard(item)).join('');

  // Attach card click handlers
  attachCardListeners(container);
}

function attachCardListeners(container) {
  // Clicking anywhere on the card opens modal
  container.querySelectorAll('.food-card, .editorial-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent double trigger if clicked directly on details button
      if (e.target.closest('.btn-food-card-details')) return;
      const id = card.dataset.id;
      openDishModal(id);
    });
  });

  // Clicking "View Details →" button specifically
  container.querySelectorAll('.btn-food-card-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      openDishModal(id);
    });
  });
}

function updateResultsCount(currentCount, total) {
  const countEl = document.getElementById('menu-results-count');
  if (!countEl) return;

  if (activeCategory === 'all' && searchQuery === '' && activeDiet === 'all') {
    countEl.textContent = `Showing all ${total} dishes`;
  } else {
    const catName = formatCategoryLabel(activeCategory);
    let label = `Showing ${currentCount} ${currentCount === 1 ? 'dish' : 'dishes'}`;
    if (activeCategory !== 'all') {
      label += ` in ${catName}`;
    }
    if (activeDiet !== 'all') {
      label += ` (${activeDiet.toUpperCase()})`;
    }
    if (searchQuery) {
      label += ` matching "${searchQuery}"`;
    }
    countEl.textContent = label;
  }
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

  updateFilterUI();
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

  const dietBtns = document.querySelectorAll('.diet-toggle-btn');
  dietBtns.forEach(btn => {
    if (btn.dataset.diet === activeDiet) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
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

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
