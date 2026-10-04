const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const testRoutes = require('./routes/testRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Request logging middleware (Sprint 12)
app.use(requestLogger);

// Body parsing and CORS middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Library Management System API is running successfully',
  });
});

// Mount Routes
app.use('/api', testRoutes);
app.use('/api/books', bookRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
