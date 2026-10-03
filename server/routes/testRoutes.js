const express = require('express');
const router = express.Router();
const { getTestStatus } = require('../controllers/testController');

// GET /api/test - Test route to verify server operation
router.get('/test', getTestStatus);

module.exports = router;
