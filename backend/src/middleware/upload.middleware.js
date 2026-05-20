import multer from 'multer'

// Use memory storage instead of disk
const storage = multer.memoryStorage()

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${allowedMimes.join(', ')}`))
  }
}

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
})

// Export middleware for single file upload
export const uploadSingle = upload.single('image')

// Export middleware for multiple file uploads
export const uploadMultiple = upload.array('images', 10) // Max 10 files

export default upload
