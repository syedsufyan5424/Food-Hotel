/**
 * MIROSA CAFE & KITCHEN - STATE STORE & LOCALSTORAGE PERSISTENCE
 */
import { RESTAURANT_INFO, INITIAL_MENU_ITEMS, INITIAL_RESERVATIONS, GALLERY_ITEMS } from './data.js';

const STORAGE_KEYS = {
  MENU: 'mirosa_menu_items_v1',
  INFO: 'mirosa_restaurant_info_v1',
  RESERVATIONS: 'mirosa_reservations_v1',
  GALLERY: 'mirosa_gallery_v1',
  ADMIN_PIN: 'mirosa_admin_pin_v1'
};

const DEFAULT_PIN = '2024';

class Store extends EventTarget {
  constructor() {
    super();
    this.init();
  }

  init() {
    // Menu Items
    const savedMenu = localStorage.getItem(STORAGE_KEYS.MENU);
    if (!savedMenu) {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(INITIAL_MENU_ITEMS));
    }

    // Restaurant Info
    const savedInfo = localStorage.getItem(STORAGE_KEYS.INFO);
    if (!savedInfo) {
      localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(RESTAURANT_INFO));
    }

    // Reservations
    const savedReservations = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (!savedReservations) {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(INITIAL_RESERVATIONS));
    }

    // Admin PIN
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PIN)) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, DEFAULT_PIN);
    }
  }

  // --- RESTAURANT INFO ---
  getInfo() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INFO);
      return data ? JSON.parse(data) : RESTAURANT_INFO;
    } catch {
      return RESTAURANT_INFO;
    }
  }

  updateInfo(newInfo) {
    const current = this.getInfo();
    const updated = { ...current, ...newInfo };
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(updated));
    this.dispatchEvent(new CustomEvent('info:updated', { detail: updated }));
    return updated;
  }

  // --- MENU ITEMS ---
  getMenu() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MENU);
      return data ? JSON.parse(data) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  }

  getMenuItem(id) {
    return this.getMenu().find(item => item.id === id);
  }

  saveMenuItem(item) {
    const items = this.getMenu();
    const index = items.findIndex(i => i.id === item.id);
    if (index >= 0) {
      items[index] = { ...items[index], ...item };
    } else {
      items.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
    this.dispatchEvent(new CustomEvent('menu:updated', { detail: items }));
    return items;
  }

  deleteMenuItem(id) {
    let items = this.getMenu();
    items = items.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
    this.dispatchEvent(new CustomEvent('menu:updated', { detail: items }));
    return items;
  }

  toggleItemAvailability(id) {
    const items = this.getMenu();
    const item = items.find(i => i.id === id);
    if (item) {
      item.isAvailable = !item.isAvailable;
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
      this.dispatchEvent(new CustomEvent('menu:updated', { detail: items }));
    }
    return items;
  }

  toggleItemFeatured(id) {
    const items = this.getMenu();
    const item = items.find(i => i.id === id);
    if (item) {
      item.isFeatured = !item.isFeatured;
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
      this.dispatchEvent(new CustomEvent('menu:updated', { detail: items }));
    }
    return items;
  }

  // --- RESERVATIONS ---
  getReservations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return data ? JSON.parse(data) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  }

  addReservation(reservationData) {
    const reservations = this.getReservations();
    const newReservation = {
      id: `MRS-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Received',
      ...reservationData
    };
    reservations.unshift(newReservation);
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    this.dispatchEvent(new CustomEvent('reservations:updated', { detail: reservations }));
    return newReservation;
  }

  updateReservationStatus(id, newStatus) {
    const reservations = this.getReservations();
    const target = reservations.find(r => r.id === id);
    if (target) {
      target.status = newStatus;
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
      this.dispatchEvent(new CustomEvent('reservations:updated', { detail: reservations }));
    }
    return reservations;
  }

  // --- ADMIN AUTH ---
  verifyAdminPin(pin) {
    const storedPin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_PIN;
    return pin === storedPin;
  }

  changeAdminPin(oldPin, newPin) {
    if (!this.verifyAdminPin(oldPin)) return false;
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin);
    return true;
  }

  // --- RESET ALL DATA ---
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(INITIAL_MENU_ITEMS));
    localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(RESTAURANT_INFO));
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(INITIAL_RESERVATIONS));
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, DEFAULT_PIN);
    this.dispatchEvent(new CustomEvent('info:updated', { detail: RESTAURANT_INFO }));
    this.dispatchEvent(new CustomEvent('menu:updated', { detail: INITIAL_MENU_ITEMS }));
    this.dispatchEvent(new CustomEvent('reservations:updated', { detail: INITIAL_RESERVATIONS }));
    return true;
  }
}

export const store = new Store();
