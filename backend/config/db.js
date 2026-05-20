import mongoose from 'mongoose';

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Read MONGODB_URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    // Connect to MongoDB with proper options
    await mongoose.connect(mongoURI);
    
    // Log success message
    console.log('MongoDB connected');
  } catch (error) {
    // Log error and exit process
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Export connectDB function
export default connectDB;
