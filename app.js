const bookingForm = document.getElementById('booking-form');
const bookingList = document.getElementById('booking-list');
const messageBox = document.getElementById('message');
const refreshButton = document.getElementById('refresh-button');
const contactForm = document.getElementById('contact-form');
const contactMessageBox = document.getElementById('contact-message');

const renderBookings = (bookings) => {
  if (!bookings.length) {
    bookingList.innerHTML = '<p class="empty-state">No bookings yet. Create the first reservation.</p>';
    return;
  }

  bookingList.innerHTML = bookings.map(booking => `
    <article class="booking-item">
      <div class="booking-main">
        <strong>${booking.name}</strong>
        <span>${booking.eventDate} @ ${booking.eventTime}</span>
        <span>${booking.guests} guest${booking.guests === 1 ? '' : 's'}</span>
      </div>
      <div class="booking-details">
        <span>${booking.email}</span>
        <span>${booking.packageType || booking.service || 'Package not selected'}</span>
        <span>Add-ons: ${booking.addons || 'None'}</span>
        <p>${booking.notes || 'No special requests.'}</p>
      </div>
      <button class="delete-button" data-id="${booking.id}">Delete</button>
    </article>
  `).join('');
};

const showMessage = (text, type = 'success') => {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
  setTimeout(() => {
    messageBox.textContent = '';
    messageBox.className = 'message';
  }, 3500);
};

const showContactMessage = (text, type = 'success') => {
  if (!contactMessageBox) return;
  contactMessageBox.textContent = text;
  contactMessageBox.className = `message ${type}`;
  setTimeout(() => {
    contactMessageBox.textContent = '';
    contactMessageBox.className = 'message';
  }, 3500);
};

const fetchBookings = async () => {
  const response = await fetch('/api/bookings');
  const data = await response.json();
  renderBookings(data);
};

const addBooking = async (formData) => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Could not save booking.');
  }

  return response.json();
};

const deleteBooking = async (id) => {
  const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Could not delete booking.');
  }
};

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const bookingData = {
    name: formData.get('name'),
    email: formData.get('email'),
    eventDate: formData.get('eventDate'),
    eventTime: formData.get('eventTime'),
    guests: Number(formData.get('guests')),
    packageType: formData.get('packageType'),
    service: '',
    addOns: formData.getAll('addons'),
    notes: formData.get('notes')
  };

  try {
    await addBooking(bookingData);
    showMessage('Booking saved successfully.');
    bookingForm.reset();
    fetchBookings();
  } catch (error) {
    showMessage(error.message, 'error');
  }
});

bookingList.addEventListener('click', async (event) => {
  if (!event.target.matches('.delete-button')) return;
  const id = event.target.dataset.id;
  try {
    await deleteBooking(id);
    showMessage('Booking deleted.');
    fetchBookings();
  } catch (error) {
    showMessage(error.message, 'error');
  }
});

refreshButton.addEventListener('click', fetchBookings);

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    showContactMessage('Thank you! We received your inquiry and will contact you shortly.');
  });
}

fetchBookings();
