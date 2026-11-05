const mongoose = require('mongoose');

/**
 * Mongoose Schema for Library Member Entity (Sprint 17: Second CRUD Module)
 * Defines the structure, data types, and validation rules for member documents.
 */
const memberSchema = new mongoose.Schema(
  {
    membershipId: {
      type: String,
      required: [true, 'Membership ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    department: {
      type: String,
      required: [true, 'Academic department is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Member role is required'],
      enum: {
        values: ['Student', 'Faculty', 'Staff', 'Researcher'],
        message: '{VALUE} is not a valid member role',
      },
      default: 'Student',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    borrowedCount: {
      type: Number,
      default: 0,
      min: [0, 'Borrowed books count cannot be negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Borrowed count must be an integer',
      },
    },
    status: {
      type: String,
      required: [true, 'Membership status is required'],
      enum: {
        values: ['Active', 'Suspended', 'Expired'],
        message: '{VALUE} is not a valid status (must be Active, Suspended, or Expired)',
      },
      default: 'Active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field: maps _id to id for seamless client consumption
memberSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
