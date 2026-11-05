const mongoose = require('mongoose');
const Member = require('../models/Member');

/**
 * Member Controller (Sprint 17: Second CRUD Module)
 * Handles business logic and request processing for Library Members
 * using Mongoose ODM connected to MongoDB Atlas.
 */

// @desc    Get all members from MongoDB
// @route   GET /api/members
// @access  Public
const getAllMembers = async (req, res, next) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single member by MongoDB ID or membershipId
// @route   GET /api/members/:id
// @access  Public
const getMemberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let member = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      member = await Member.findById(id);
    }

    if (!member) {
      member = await Member.findOne({ membershipId: id.toUpperCase() });
    }

    if (!member) {
      return res.status(404).json({
        success: false,
        message: `Member not found with ID ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new member in MongoDB
// @route   POST /api/members
// @access  Public
const createMember = async (req, res, next) => {
  try {
    let { membershipId, name, email, department, role, phone, borrowedCount, status } = req.body;

    // Auto-generate membershipId if omitted (e.g., MEM-101)
    if (!membershipId) {
      const count = await Member.countDocuments();
      membershipId = `MEM-${String(count + 1).padStart(3, '0')}`;
    }

    const newMember = await Member.create({
      membershipId: membershipId.trim().toUpperCase(),
      name: name?.trim(),
      email: email?.trim().toLowerCase(),
      department: department?.trim(),
      role: role || 'Student',
      phone: phone?.trim() || '',
      borrowedCount: borrowedCount || 0,
      status: status || 'Active',
    });

    res.status(201).json({
      success: true,
      message: 'Library member registered successfully',
      data: newMember,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || 'field';
      const val = error.keyValue ? error.keyValue[field] : '';
      return res.status(400).json({
        success: false,
        message: `Duplicate entry: A member with ${field.toUpperCase()} '${val}' already exists.`,
        error: error.message,
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
        errors: messages,
      });
    }

    next(error);
  }
};

// @desc    Update member details in MongoDB
// @route   PUT /api/members/:id
// @access  Public
const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: `Member not found with ID ${id}`,
      });
    }

    const updatedMember = await Member.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedMember) {
      return res.status(404).json({
        success: false,
        message: `Member not found with ID ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Member with ID ${id} updated successfully`,
      data: updatedMember,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || 'field';
      const val = error.keyValue ? error.keyValue[field] : '';
      return res.status(400).json({
        success: false,
        message: `Duplicate entry: A member with ${field.toUpperCase()} '${val}' already exists.`,
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
        errors: messages,
      });
    }

    next(error);
  }
};

// @desc    Delete a member from MongoDB
// @route   DELETE /api/members/:id
// @access  Public
const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: `Member not found with ID ${id}`,
      });
    }

    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: `Member not found with ID ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Member with ID ${id} deleted successfully`,
      data: deletedMember,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
