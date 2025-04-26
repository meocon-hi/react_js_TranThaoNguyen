const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const connection = require('./db');

app.use(cors());
app.use(express.json());

// Lấy danh sách phòng với tên phương thức thanh toán
app.get('/rooms', (req, res) => {
  const sql = `
    SELECT rooms.*, payment_methods.method_name 
    FROM rooms 
    LEFT JOIN payment_methods ON rooms.payment_method_id = payment_methods.id
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching rooms:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Rooms data:', results); // Log để debug
    res.json(results);
  });
});

// Tìm kiếm phòng theo mã phòng, tên, hoặc số điện thoại
app.get('/rooms/search', (req, res) => {
  const { query } = req.query;
  // Chuyển query thành số nếu có dạng PT-XXX
  const idQuery = query.startsWith('PT-') ? query.replace('PT-', '') : query;
  const sql = `
    SELECT rooms.*, payment_methods.method_name 
    FROM rooms 
    LEFT JOIN payment_methods ON rooms.payment_method_id = payment_methods.id
    WHERE rooms.id LIKE ? OR rooms.tenant_name LIKE ? OR rooms.phone_number LIKE ?
  `;
  const searchTerm = `%${idQuery}%`;
  connection.query(sql, [searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Error searching rooms:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Search rooms data:', results); // Log để debug
    res.json(results);
  });
});

// Thêm phòng mới
app.post('/rooms', (req, res) => {
  const { tenant_name, phone_number, start_date, payment_method_id, note } = req.body;
  const sql = 'INSERT INTO rooms (tenant_name, phone_number, start_date, payment_method_id, note) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [tenant_name, phone_number, start_date, payment_method_id, note], (err, result) => {
    if (err) {
      console.error('Error adding room:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ id: result.insertId });
  });
});

// Xóa phòng theo ID
app.delete('/rooms/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM rooms WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting room:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ message: 'Deleted successfully' });
  });
});

// Xóa nhiều phòng
app.post('/rooms/delete-multi', (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    res.status(400).send('Invalid or empty ID list');
    return;
  }
  const sql = 'DELETE FROM rooms WHERE id IN (?)';
  connection.query(sql, [ids], (err, result) => {
    if (err) {
      console.error('Error deleting multiple rooms:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ message: 'Deleted multiple rooms successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});