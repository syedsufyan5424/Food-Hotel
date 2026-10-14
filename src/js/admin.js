/**
 * MIROSA CAFE & KITCHEN - STAFF ADMIN PORTAL LOGIC
 */
import { store } from './store.js';
import { showToast } from './main.js';
import { ICONS } from './icons.js';
import { MENU_CATEGORIES } from './data.js';

let isAuthenticated = false;
let editingItemId = null;

export function initAdmin() {
  const adminModal = document.getElementById('admin-modal');
  if (!adminModal) return;

  // Open modal triggers (footer button or #admin hash)
  const openBtns = document.querySelectorAll('.open-admin-btn');
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAdminModal();
    });
  });

  if (window.location.hash === '#admin') {
    openAdminModal();
  }

  // Close modal trigger
  const closeBtn = document.getElementById('admin-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeAdminModal);
  }

  // PIN Login Form
  const authForm = document.getElementById('admin-auth-form');
  if (authForm) {
    authForm.addEventListener('submit', handleAdminLogin);
  }

  // Tab Switching
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.querySelectorAll('.admin-view-panel').forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`admin-panel-${target}`);
      if (activePanel) activePanel.classList.add('active');
    });
  });

  // Add Item Button
  const btnAddItem = document.getElementById('admin-btn-add-item');
  if (btnAddItem) {
    btnAddItem.addEventListener('click', () => {
      openItemEditModal(null);
    });
  }

  // Item Form Submit
  const itemForm = document.getElementById('admin-item-form');
  if (itemForm) {
    itemForm.addEventListener('submit', handleSaveItem);
  }

  // Store Settings Form Submit
  const settingsForm = document.getElementById('admin-settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', handleSaveSettings);
  }

  // Reset to Defaults
  const btnReset = document.getElementById('admin-btn-reset-defaults');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all menu items and settings to defaults? This will overwrite recent changes.')) {
        store.resetToDefaults();
        showToast('System reset to verified defaults.', 'gold');
        renderAdminTables();
        populateSettingsForm();
      }
    });
  }

  // Logout
  const btnLogout = document.getElementById('admin-btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      isAuthenticated = false;
      document.getElementById('admin-auth-view').style.display = 'block';
      document.getElementById('admin-dashboard-view').style.display = 'none';
      showToast('Logged out of Staff Portal.', 'success');
    });
  }

  // Listen to store updates
  store.addEventListener('menu:updated', renderAdminTables);
  store.addEventListener('reservations:updated', renderAdminTables);
  store.addEventListener('info:updated', populateSettingsForm);
}

export function openAdminModal() {
  const modal = document.getElementById('admin-modal');
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (!isAuthenticated) {
    document.getElementById('admin-auth-view').style.display = 'block';
    document.getElementById('admin-dashboard-view').style.display = 'none';
    const pinInput = document.getElementById('admin-pin-input');
    if (pinInput) {
      pinInput.value = '';
      setTimeout(() => pinInput.focus(), 100);
    }
  } else {
    document.getElementById('admin-auth-view').style.display = 'none';
    document.getElementById('admin-dashboard-view').style.display = 'block';
    renderAdminTables();
    populateSettingsForm();
  }
}

export function closeAdminModal() {
  const modal = document.getElementById('admin-modal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pinInput = document.getElementById('admin-pin-input');
  const errorEl = document.getElementById('admin-auth-error');
  const pin = pinInput.value.trim();

  if (store.verifyAdminPin(pin)) {
    isAuthenticated = true;
    errorEl.style.display = 'none';
    document.getElementById('admin-auth-view').style.display = 'none';
    document.getElementById('admin-dashboard-view').style.display = 'block';
    showToast('Staff authenticated successfully', 'success');
    renderAdminTables();
    populateSettingsForm();
  } else {
    errorEl.textContent = 'Invalid staff PIN. Default demo PIN is 2024';
    errorEl.style.display = 'block';
    pinInput.select();
  }
}

function renderAdminTables() {
  renderAdminMenuTable();
  renderAdminReservationsTable();
}

function renderAdminMenuTable() {
  const tbody = document.getElementById('admin-menu-tbody');
  if (!tbody) return;

  const items = store.getMenu();
  tbody.innerHTML = items.map(item => `
    <tr>
      <td>
        <img src="${item.image}" alt="${item.name}" class="admin-table-thumb" />
      </td>
      <td>
        <strong>${item.name}</strong>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${item.category} · ${item.isVeg ? 'Veg' : 'Non-Veg'}</div>
      </td>
      <td>₹${item.price}</td>
      <td>
        <button class="btn-toggle-status ${item.isAvailable ? 'table-badge-active' : 'table-badge-inactive'}" data-id="${item.id}" data-action="toggle-available" style="border:none; cursor:pointer;">
          ${item.isAvailable ? 'Available' : 'Sold Out'}
        </button>
      </td>
      <td>
        <button class="btn-toggle-featured" data-id="${item.id}" data-action="toggle-featured" style="background:none; border:none; cursor:pointer; color: ${item.isFeatured ? 'var(--color-gold)' : 'var(--text-muted)'};">
          ${ICONS.star} ${item.isFeatured ? 'Featured' : 'Standard'}
        </button>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn-icon-action btn-edit-item" data-id="${item.id}" title="Edit Dish">${ICONS.edit}</button>
          <button class="btn-icon-action delete btn-delete-item" data-id="${item.id}" title="Delete Dish">${ICONS.trash}</button>
        </div>
      </td>
    </tr>
  `).join('');

  // Attach table actions
  tbody.querySelectorAll('[data-action="toggle-available"]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.toggleItemAvailability(btn.dataset.id);
      showToast('Item availability updated', 'success');
    });
  });

  tbody.querySelectorAll('[data-action="toggle-featured"]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.toggleItemFeatured(btn.dataset.id);
      showToast('Featured status updated', 'gold');
    });
  });

  tbody.querySelectorAll('.btn-edit-item').forEach(btn => {
    btn.addEventListener('click', () => {
      openItemEditModal(btn.dataset.id);
    });
  });

  tbody.querySelectorAll('.btn-delete-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = store.getMenuItem(id);
      if (confirm(`Are you sure you want to delete "${item?.name}"?`)) {
        store.deleteMenuItem(id);
        showToast('Item removed from menu', 'success');
      }
    });
  });
}

function renderAdminReservationsTable() {
  const tbody = document.getElementById('admin-reservations-tbody');
  if (!tbody) return;

  const reservations = store.getReservations();
  if (reservations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No reservation enquiries recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = reservations.map(res => `
    <tr>
      <td><strong style="font-family: var(--font-mono); color: var(--color-terracotta);">${res.id}</strong></td>
      <td>
        <div><strong>${res.name}</strong></div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${res.phone}</div>
      </td>
      <td>
        <div>${res.date}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${res.time}</div>
      </td>
      <td>${res.guests} Guests</td>
      <td>
        <span class="${res.status === 'Confirmed' ? 'table-badge-active' : 'table-badge-inactive'}">
          ${res.status}
        </span>
      </td>
      <td style="font-size: 0.8125rem; max-width: 200px; color: var(--text-secondary);">${res.notes || 'None'}</td>
      <td>
        <div style="display: flex; gap: 4px;">
          <button class="btn btn-sm btn-outline btn-res-confirm" data-id="${res.id}" style="padding: 2px 8px; font-size: 0.75rem;">
            ${res.status === 'Confirmed' ? 'Mark Pending' : 'Confirm'}
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.btn-res-confirm').forEach(btn => {
    btn.addEventListener('click', () => {
      const res = store.getReservations().find(r => r.id === btn.dataset.id);
      const nextStatus = res.status === 'Confirmed' ? 'Received' : 'Confirmed';
      store.updateReservationStatus(btn.dataset.id, nextStatus);
      showToast(`Reservation status marked as ${nextStatus}`, 'success');
    });
  });
}

function openItemEditModal(id) {
  editingItemId = id;
  const modal = document.getElementById('admin-item-modal');
  const title = document.getElementById('admin-item-modal-title');
  if (!modal) return;

  if (id) {
    title.textContent = 'Edit Menu Item';
    const item = store.getMenuItem(id);
    if (item) {
      document.getElementById('item-name').value = item.name;
      document.getElementById('item-category').value = item.category;
      document.getElementById('item-price').value = item.price;
      document.getElementById('item-diet').value = item.isVeg ? 'veg' : 'nonveg';
      document.getElementById('item-desc').value = item.description;
      document.getElementById('item-image').value = item.image;
      document.getElementById('item-dietary-tags').value = (item.dietary || []).join(', ');
      document.getElementById('item-chef-special').checked = item.isChefSpecial || false;
      document.getElementById('item-featured').checked = item.isFeatured || false;
    }
  } else {
    title.textContent = 'Add New Menu Dish';
    document.getElementById('admin-item-form').reset();
    document.getElementById('item-image').value = '/assets/images/hero-dining.jpg';
  }

  modal.classList.add('active');
}

function handleSaveItem(e) {
  e.preventDefault();
  const name = document.getElementById('item-name').value.trim();
  const category = document.getElementById('item-category').value;
  const price = parseFloat(document.getElementById('item-price').value) || 0;
  const isVeg = document.getElementById('item-diet').value === 'veg';
  const description = document.getElementById('item-desc').value.trim();
  const image = document.getElementById('item-image').value.trim() || '/assets/images/hero-dining.jpg';
  const tagsRaw = document.getElementById('item-dietary-tags').value;
  const dietary = tagsRaw ? tagsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
  const isChefSpecial = document.getElementById('item-chef-special').checked;
  const isFeatured = document.getElementById('item-featured').checked;

  const itemData = {
    id: editingItemId || `mirosa-custom-${Date.now()}`,
    name,
    category,
    price,
    isVeg,
    description,
    image,
    dietary,
    isChefSpecial,
    isFeatured,
    isAvailable: true
  };

  store.saveMenuItem(itemData);
  showToast(editingItemId ? 'Dish updated successfully!' : 'New dish added to menu!', 'success');

  document.getElementById('admin-item-modal').classList.remove('active');
}

function populateSettingsForm() {
  const info = store.getInfo();
  const form = document.getElementById('admin-settings-form');
  if (!form) return;

  const bannerToggle = document.getElementById('set-banner-active');
  const bannerText = document.getElementById('set-banner-text');
  const phone = document.getElementById('set-phone');
  const hours = document.getElementById('set-hours');
  const zomato = document.getElementById('set-zomato');
  const swiggy = document.getElementById('set-swiggy');

  if (bannerToggle) bannerToggle.checked = info.announcement?.active !== false;
  if (bannerText) bannerText.value = info.announcement?.text || '';
  if (phone) phone.value = info.phone || '';
  if (hours) hours.value = info.timings || '';
  if (zomato) zomato.value = info.zomatoUrl || '';
  if (swiggy) swiggy.value = info.swiggyUrl || '';
}

function handleSaveSettings(e) {
  e.preventDefault();
  const info = store.getInfo();

  const updated = {
    announcement: {
      active: document.getElementById('set-banner-active').checked,
      text: document.getElementById('set-banner-text').value.trim(),
      badge: 'Offer'
    },
    phone: document.getElementById('set-phone').value.trim(),
    timings: document.getElementById('set-hours').value.trim(),
    zomatoUrl: document.getElementById('set-zomato').value.trim(),
    swiggyUrl: document.getElementById('set-swiggy').value.trim()
  };

  store.updateInfo(updated);
  showToast('Restaurant details & delivery links updated!', 'success');
}
