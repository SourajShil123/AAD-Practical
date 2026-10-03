const express = require('express');
const cors = require('cors');
const testRoutes = require('./routes/testRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Library Management System API is running successfully'
  });
});

// Mount Routes
app.use('/api', testRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
