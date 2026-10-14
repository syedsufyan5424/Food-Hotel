/**
 * MIROSA CAFE & KITCHEN - TABLE RESERVATIONS LOGIC
 */
import { store } from './store.js';
import { showToast } from './main.js';

export function initReservations() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  // Set min date to today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  form.addEventListener('submit', handleReservationSubmit);

  // Confirmation Modal Close
  const modal = document.getElementById('reservation-confirmation-modal');
  if (modal) {
    const closeBtns = modal.querySelectorAll('.close-res-modal');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

function handleReservationSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('res-name');
  const phoneInput = document.getElementById('res-phone');
  const emailInput = document.getElementById('res-email');
  const dateInput = document.getElementById('res-date');
  const timeInput = document.getElementById('res-time');
  const guestsInput = document.getElementById('res-guests');
  const occasionInput = document.getElementById('res-occasion');
  const notesInput = document.getElementById('res-notes');

  // Basic Validation
  let isValid = true;

  if (!nameInput.value.trim()) {
    showInputError(nameInput, 'Please enter your name');
    isValid = false;
  } else {
    clearInputError(nameInput);
  }

  const phoneVal = phoneInput.value.trim().replace(/\s+/g, '');
  if (!phoneVal || phoneVal.length < 10) {
    showInputError(phoneInput, 'Please provide a valid 10-digit mobile number');
    isValid = false;
  } else {
    clearInputError(phoneInput);
  }

  if (!dateInput.value) {
    showInputError(dateInput, 'Please choose a date');
    isValid = false;
  } else {
    clearInputError(dateInput);
  }

  if (!isValid) return;

  const reservationData = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim() || 'N/A',
    date: dateInput.value,
    time: timeInput.value,
    guests: guestsInput.value,
    occasion: occasionInput.value || 'Casual Dining',
    notes: notesInput.value.trim() || 'None'
  };

  const created = store.addReservation(reservationData);

  // Reset form
  e.target.reset();
  const today = new Date().toISOString().split('T')[0];
  if (dateInput) dateInput.value = today;

  showToast('Table reservation enquiry submitted successfully!', 'success');
  showConfirmationModal(created);
}

function showInputError(input, msg) {
  input.classList.add('error');
  const parent = input.closest('.form-group');
  if (parent) {
    let feedback = parent.querySelector('.form-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'form-feedback error';
      parent.appendChild(feedback);
    }
    feedback.textContent = msg;
    feedback.style.display = 'block';
  }
}

function clearInputError(input) {
  input.classList.remove('error');
  const parent = input.closest('.form-group');
  if (parent) {
    const feedback = parent.querySelector('.form-feedback');
    if (feedback) feedback.style.display = 'none';
  }
}

function showConfirmationModal(res) {
  const modal = document.getElementById('reservation-confirmation-modal');
  const detailsBox = document.getElementById('res-confirmation-details');
  if (!modal || !detailsBox) return;

  const formattedDate = new Date(res.date).toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  detailsBox.innerHTML = `
    <div style="background: var(--bg-secondary); border-radius: var(--radius-sm); padding: 1.25rem; margin: 1.5rem 0; text-align: left; font-size: 0.9rem;">
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-medium); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
        <span style="color: var(--text-muted); font-weight: 500;">Reference ID</span>
        <strong style="color: var(--color-terracotta); font-family: var(--font-mono);">${res.id}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="color: var(--text-muted);">Guest Name:</span>
        <strong style="color: var(--text-primary);">${res.name}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="color: var(--text-muted);">Date & Time:</span>
        <strong style="color: var(--text-primary);">${formattedDate} at ${res.time}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span style="color: var(--text-muted);">Party Size:</span>
        <strong style="color: var(--text-primary);">${res.guests} Guests (${res.occasion})</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-muted);">Contact:</span>
        <strong style="color: var(--text-primary);">${res.phone}</strong>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
