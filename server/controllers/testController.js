/**
 * Test Controller
 * Handles test route operations to verify backend functionality.
 */
const getTestStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Library Management System backend is operational!',
    sprint: 11,
    status: 'Running',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getTestStatus
};
