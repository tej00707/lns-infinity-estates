import 'dotenv/config'

// Initialize Cloudinary with environment variables
import '../config/cloudinary.js'

import "../models/User.js"

import express from 'express';
import cors from 'cors';
import connectDB from '../config/db.js';
import propertyRoutes from './routes/property.routes.js';
import inquiryRoutes from './routes/inquiry.routes.js';
import authRoutes from './routes/auth.routes.js';
import favoritesRoutes from './routes/favorites.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

// Initialize express app
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://lnsinfinityestates.vercel.app/'
  ],
  credentials: true
}));

// Add express.json middleware
app.use(express.json());

// Create GET /health endpoint
app.get('/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});

// Mount property routes at /api/properties
app.use('/api/properties', propertyRoutes);

// Mount inquiry routes at /api/inquiries
app.use('/api/inquiries', inquiryRoutes);

// Mount authentication routes at /api/auth
app.use('/api/auth', authRoutes);

// Mount favorite routes at /api/favorites
app.use('/api/favorites', favoritesRoutes);

// Error middleware (must be last)
app.use(errorMiddleware);

// Read PORT from environment variables with fallback to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Export app for future testing
export { app };     