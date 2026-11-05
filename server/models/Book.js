const mongoose = require('mongoose');

/**
 * Mongoose Schema for Library Book Entity
 * Defines the structure, data types, and validation rules for book documents.
 */
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      minlength: [2, 'Book title must be at least 2 characters long'],
      maxlength: [200, 'Book title cannot exceed 200 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      minlength: [2, 'Author name must be at least 2 characters long'],
      maxlength: [100, 'Author name cannot exceed 100 characters'],
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return false;
          // Validates 10 or 13-digit ISBN (optional hyphens or spaces allowed)
          const cleaned = v.replace(/[-\s]/g, '');
          return /^(?:\d{9}[\dX]|\d{13})$/i.test(cleaned);
        },
        message: (props) => `${props.value} is not a valid ISBN! Must be a valid 10 or 13-digit ISBN.`,
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: [
          'Computer Science',
          'Software Engineering',
          'Web Development',
          'Technology',
          'Database Systems',
          'Artificial Intelligence',
          'Networking',
          'General',
        ],
        message: '{VALUE} is not a supported category',
      },
      default: 'General',
    },
    copies: {
      type: Number,
      required: [true, 'Number of copies is required'],
      min: [1, 'Number of copies must be at least 1'],
      default: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Number of copies must be an integer',
      },
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Available', 'Issued'],
        message: '{VALUE} is not a valid status (must be Available or Issued)',
      },
      default: 'Available',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for frontend backward-compatibility ('id' pointing to '_id')
bookSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
