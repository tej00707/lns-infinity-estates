import Property from '../../models/Property.js'
import mongoose from 'mongoose'
import cloudinary from '../../config/cloudinary.js'
import { createPropertySchema, updatePropertySchema } from '../schemas/property.schema.js'

// Create a new property
export const createProperty = async (req, res, next) => {
  try {
    // Convert FormData types before validation
    if (req.body.price) {
      req.body.price = Number(req.body.price)
    }
    if (req.body.showPrice) {
      req.body.showPrice = req.body.showPrice === 'true' || req.body.showPrice === true
    }

    // Validate request body using Zod before database operations
    const validatedData = createPropertySchema.parse(req.body)

    // Handle image uploads if files are provided
    if (req.files && req.files.length > 0) {
      const uploadedUrls = []

      // Upload each file to Cloudinary
      for (const file of req.files) {
        // Use promise wrapper for upload stream
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'lns-infinity-estates/properties',
              resource_type: 'auto'
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          stream.end(file.buffer)
        })

        uploadedUrls.push(uploadResult.secure_url)
      }

      // Replace images field with uploaded URLs
      validatedData.images = uploadedUrls
    }

    const property = await Property.create(validatedData)
    res.status(201).json({ success: true, data: property })
  } catch (error) {
    // On validation failure, pass error to centralized error middleware
    return next(error)
  }
}

// Get all properties
export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    return next(error);
  }
};

// Get property by ID
export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid property ID');
    }

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    return next(error);
  }
};

// Update property by ID
export const updateProperty = async (req, res, next) => {
  try {
    // Safely handle req.body with fallback to empty object
    const data = req.body || {}

    // Convert FormData types before validation
    if (data.price) {
      data.price = Number(data.price)
    }
    if (data.showPrice) {
      data.showPrice = data.showPrice === 'true' || data.showPrice === true
    }

    // Handle image uploads if new files are provided
    if (req.files && req.files.length > 0) {
      const uploadedUrls = []

      // Upload each file to Cloudinary
      for (const file of req.files) {
        // Use promise wrapper for upload stream
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'lns-infinity-estates/properties',
              resource_type: 'auto'
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          stream.end(file.buffer)
        })

        uploadedUrls.push(uploadResult.secure_url)
      }

      // Set new images from upload
      data.images = uploadedUrls
    }
    // If no new files, data.images is not set, so existing images are kept

    // Validate request body using Zod before database operations
    const validatedData = updatePropertySchema.parse(data);
    
    const property = await Property.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    // On validation failure, pass error to centralized error middleware
    return next(error);
  }
};

// Delete property by ID
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.status(200).json({ success: true, data: property });
  } catch (error) {
    return next(error);
  }
};
