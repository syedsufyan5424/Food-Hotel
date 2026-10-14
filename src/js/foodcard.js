/**
 * MIROSA CAFE & KITCHEN - REUSABLE FOODCARD COMPONENT & DISH DETAIL MODAL
 * Adheres strictly to the premium restaurant food-card reference standard
 */
import { store } from './store.js';
import { ICONS } from './icons.js';

/**
 * Format category identifier to human-readable label
 */
export function formatCategoryLabel(catId) {
  const map = {
    pizzas: 'Pizzas',
    salads: 'Salads',
    pastas: 'Pastas',
    soups: 'Soups',
    sides: 'Sides',
    combos: 'Indian Combos',
    'veg-appetizers': 'Veg Appetizers',
    'nonveg-appetizers': 'Non-Veg Appetizers'
  };
  return map[catId] || catId;
}

/**
 * Renders an editorial FoodCard HTML string
 */
export function renderFoodCard(item) {
  const isVeg = item.isVeg;
  const dietClass = isVeg ? 'veg' : 'nonveg';
  const dietTitle = isVeg ? 'Vegetarian' : 'Non-Vegetarian';
  
  // Format price display
  const priceDisplay = item.priceDisplay || `₹${item.price}`;
  
  // Badges
  const chefBadge = item.isChefSpecial ? `<span class="tag tag-chef">Chef's Special</span>` : '';
  const soldOutBadge = !item.isAvailable ? `<span class="tag tag-unavailable">Sold Out</span>` : '';
  const categoryLabel = formatCategoryLabel(item.category);

  // Variant or serving notes
  let variantSnippet = '';
  if (item.variants && item.variants.length > 0) {
    variantSnippet = `
      <div class="food-card-variants">
        ${item.variants.map(v => `<span class="variant-pill">${v.label}: ₹${v.price}</span>`).join('')}
      </div>
    `;
  } else if (item.servedWith) {
    variantSnippet = `<div class="food-card-served-note">✦ ${item.servedWith}</div>`;
  } else if (item.choices) {
    variantSnippet = `<div class="food-card-served-note">✦ ${item.choices}</div>`;
  }

  return `
    <article class="food-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${item.name}">
      <div class="food-card-media">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="food-card-badges">
          <span class="diet-indicator ${dietClass}" title="${dietTitle}"></span>
          ${chefBadge}
          ${soldOutBadge}
        </div>
        <span class="food-card-cat-badge">${categoryLabel}</span>
      </div>
      
      <div class="food-card-content">
        <div class="food-card-header">
          <h3 class="food-card-title">${item.name}</h3>
          <div class="food-card-price">${priceDisplay}</div>
        </div>
        
        <p class="food-card-desc">${item.description}</p>
        
        ${variantSnippet}
        
        <div class="food-card-footer">
          <div class="food-card-tags">
            ${(item.dietary || []).slice(0, 2).map(d => `<span class="tag tag-subtle">${d}</span>`).join('')}
          </div>
          <button type="button" class="btn-food-card-details" data-id="${item.id}" aria-label="View details for ${item.name}">
            View Details &rarr;
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Initialize dish modal event listeners
 */
export function initDishModal() {
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

/**
 * Open dish detail modal with complete item info & variant breakdown
 */
export function openDishModal(itemId) {
  const item = store.getMenuItem(itemId);
  if (!item) return;

  const modal = document.getElementById('dish-detail-modal');
  const content = document.getElementById('dish-modal-content');
  if (!modal || !content) return;

  const restaurantInfo = store.getInfo();
  const dietClass = item.isVeg ? 'veg' : 'nonveg';
  const dietLabel = item.isVeg ? 'Vegetarian' : 'Non-Vegetarian';
  const categoryLabel = formatCategoryLabel(item.category);

  // Variant breakdown HTML
  let variantBreakdownHtml = '';
  if (item.variants && item.variants.length > 0) {
    variantBreakdownHtml = `
      <div class="modal-variants-box">
        <div class="modal-variants-title">Price &amp; Options:</div>
        <div class="modal-variants-grid">
          ${item.variants.map(v => `
            <div class="modal-variant-item">
              <span class="modal-variant-name">${v.label}</span>
              <span class="modal-variant-price">₹${v.price}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Choices or accompaniments
  let extraNotesHtml = '';
  if (item.choices) {
    extraNotesHtml += `<div class="modal-note-pill">✦ ${item.choices}</div>`;
  }
  if (item.servedWith) {
    extraNotesHtml += `<div class="modal-note-pill">✦ ${item.servedWith}</div>`;
  }

  content.innerHTML = `
    <div style="position: relative;">
      <div style="width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #1a120c; border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg);">
        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
    </div>
    <div style="padding: 2rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="diet-indicator ${dietClass}"></span>
          <span style="font-size: 0.8125rem; font-weight: 600; color: var(--text-secondary);">${dietLabel}</span>
          <span class="tag tag-subtle">${categoryLabel}</span>
          ${item.isChefSpecial ? `<span class="tag tag-chef">Chef's Special</span>` : ''}
        </div>
        <div class="item-price" style="font-size: 1.6rem;"><span class="currency">₹</span>${item.priceDisplay || item.price}</div>
      </div>

      <h2 style="font-family: var(--font-serif); font-size: 1.85rem; margin-bottom: 0.75rem; color: var(--text-primary);">${item.name}</h2>
      
      <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.25rem;">
        ${item.description}
      </p>

      ${variantBreakdownHtml}
      ${extraNotesHtml ? `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1.25rem;">${extraNotesHtml}</div>` : ''}

      <div style="background: var(--bg-secondary); border-radius: var(--radius-sm); padding: 1rem; margin-bottom: 1.75rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600;">Portion &amp; Energy</div>
          <div style="font-weight: 600; font-size: 0.9375rem; color: var(--text-primary);">${item.calories || 'Freshly Prepared'} · Made to Order</div>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${(item.dietary || []).map(d => `<span class="tag tag-subtle">${d}</span>`).join('')}
        </div>
      </div>

      <div style="background: var(--bg-card-warm); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; text-align: center;">
        <div style="font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">
          Enjoy at Mirosa or Order Online
        </div>
        <p style="font-size: 0.8125rem; color: var(--text-secondary); margin-bottom: 1rem;">
          Available for dine-in at Himayat Nagar outlet or doorstep delivery via verified aggregators.
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <a href="${restaurantInfo.zomatoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-zomato btn-md" style="flex: 1; min-width: 140px;">
            Order on Zomato
          </a>
          <a href="${restaurantInfo.swiggyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-swiggy btn-md" style="flex: 1; min-width: 140px;">
            Order on Swiggy
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close dish detail modal
 */
export function closeDishModal() {
  const modal = document.getElementById('dish-detail-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}
