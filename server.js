const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const logger = require('./middleware/logger');
const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/student-management';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err));
app.use(express.json());
app.use(logger);
app.use('/students', studentRoutes);
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.listen(PORT, () => {
  console.log(`Student Management API running on http://localhost:${PORT}`);
});
