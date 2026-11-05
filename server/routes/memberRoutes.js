const express = require('express');
const router = express.Router();
const {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} = require('../controllers/memberController');

// Routes for /api/members
router
  .route('/')
  .get(getAllMembers)
  .post(createMember);

// Routes for /api/members/:id
router
  .route('/:id')
  .get(getMemberById)
  .put(updateMember)
  .delete(deleteMember);

module.exports = router;
