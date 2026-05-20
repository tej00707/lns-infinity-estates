import Inquiry from "../../models/Inquiry.js";
import {
  createInquirySchema,
  updateInquirySchema
} from "../schemas/inquiry.schema.js";

const createInquiry = async (req, res, next) => {
  try {
    const validatedData = createInquirySchema.parse(req.body);
    const inquiry = await Inquiry.create(validatedData);

    res.status(201).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    return next(error);
  }
};

const getAllInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().populate("property");

    res.status(200).json({
      success: true,
      data: inquiries
    });
  } catch (error) {
    return next(error);
  }
};

const updateInquiry = async (req, res, next) => {
  try {
    const validatedData = updateInquirySchema.parse(req.body);

    const updateData = {
      ...(validatedData.status !== undefined && { status: validatedData.status }),
      ...(validatedData.adminNotes !== undefined && {
        adminNotes: validatedData.adminNotes
      })
    };

    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    if (!inquiry) {
      throw new Error("Inquiry not found");
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    return next(error);
  }
};

export { createInquiry, getAllInquiries, updateInquiry };