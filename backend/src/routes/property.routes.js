import express from 'express'
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from '../controllers/property.controller.js'
import { uploadMultiple } from '../middleware/upload.middleware.js'

// Mount property routes at /api/properties
const router = express.Router()

// POST / - Create a new property with image uploads
router.post('/', uploadMultiple, createProperty)

// GET / - Get all properties
router.get('/', getAllProperties)

// GET /:id - Get property by ID
router.get('/:id', getPropertyById)

// PUT /:id - Update property by ID
router.put('/:id', uploadMultiple, updateProperty)

// DELETE /:id - Delete property by ID
router.delete('/:id', deleteProperty)

export default router
