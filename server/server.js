require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

// Start Express server and connect to MongoDB
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to database:', err);
  }
});