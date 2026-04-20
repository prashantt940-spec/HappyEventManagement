const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/bookings', (req, res) => {
  const bookings = db.getAllBookings();
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  const { name, email, eventDate, eventTime, guests, service, packageType, addOns, notes } = req.body;
  if (!name || !email || !eventDate || !eventTime || !guests || !packageType) {
    return res.status(400).json({ error: 'Name, email, date, time, guests and package selection are required.' });
  }

  const booking = db.createBooking({ name, email, eventDate, eventTime, guests, service, packageType, addOns, notes });
  res.status(201).json(booking);
});

app.delete('/api/bookings/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ error: 'Invalid booking id.' });
  }

  const removed = db.deleteBooking(id);
  if (!removed) {
    return res.status(404).json({ error: 'Booking not found.' });
  }
  res.json({ success: true });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Happy Event Management booking system running at http://localhost:${port}`);
});
