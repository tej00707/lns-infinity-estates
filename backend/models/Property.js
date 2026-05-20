import mongoose from 'mongoose';

// Define Property schema
const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
    type: Number,
    },
    showPrice: {
    type: Boolean,
    default: true,
    },
    location: {
      type: String,
    },
    showLocation: {
      type: Boolean,
      default: true,
    },
    propertyType: {
      type: String,
      enum: ['plot', 'apartment', 'villa', 'house', 'farm'],
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'pending'],
      default: 'available',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Create and export Property model
const Property = mongoose.model('Property', PropertySchema);

export default Property;
