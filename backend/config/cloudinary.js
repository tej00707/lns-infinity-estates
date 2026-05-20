import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Verify Cloudinary is configured correctly
console.log('✓ Cloudinary configured:', {
  cloud_name: cloudinary.config().cloud_name ? '✓ loaded' : '✗ missing',
  api_key: cloudinary.config().api_key ? '✓ loaded' : '✗ missing',
  api_secret: cloudinary.config().api_secret ? '✓ loaded' : '✗ missing'
})

export default cloudinary
