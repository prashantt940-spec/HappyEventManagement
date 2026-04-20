const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbFile = path.join(dataDir, 'bookings.db');
const db = new Database(dbFile);

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    eventDate TEXT NOT NULL,
    eventTime TEXT NOT NULL,
    guests INTEGER NOT NULL,
    service TEXT,
    packageType TEXT,
    addons TEXT,
    notes TEXT,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const existingColumns = db.prepare("PRAGMA table_info(bookings)").all().map(col => col.name);
if (!existingColumns.includes('packageType')) {
  db.exec('ALTER TABLE bookings ADD COLUMN packageType TEXT');
}
if (!existingColumns.includes('addons')) {
  db.exec('ALTER TABLE bookings ADD COLUMN addons TEXT');
}

const getAllBookings = () => {
  const stmt = db.prepare('SELECT * FROM bookings ORDER BY createdAt DESC');
  return stmt.all();
};

const createBooking = (booking) => {
  const stmt = db.prepare(`
    INSERT INTO bookings (name, email, eventDate, eventTime, guests, service, packageType, addons, notes)
    VALUES (@name, @email, @eventDate, @eventTime, @guests, @service, @packageType, @addons, @notes)
  `);
  const result = stmt.run({
    name: booking.name,
    email: booking.email,
    eventDate: booking.eventDate,
    eventTime: booking.eventTime,
    guests: booking.guests,
    service: booking.service || '',
    packageType: booking.packageType || '',
    addons: Array.isArray(booking.addOns) ? booking.addOns.join(', ') : booking.addOns || '',
    notes: booking.notes || ''
  });
  return db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);
};

const deleteBooking = (id) => {
  const stmt = db.prepare('DELETE FROM bookings WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
};

module.exports = {
  getAllBookings,
  createBooking,
  deleteBooking,
};
