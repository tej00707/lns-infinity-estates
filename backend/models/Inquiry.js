import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    message: {
      type: String
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new"
    },
    adminNotes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Inquiry", inquirySchema);