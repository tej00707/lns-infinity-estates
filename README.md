# LNS Infinity Estates

A full-stack web application for browsing and managing property listings. Features user authentication, an admin dashboard for property management, and the ability to save favorites and submit inquiries.

## Features

- **Property Browsing** - View all available properties with details
- **User Authentication** - Register and login with secure password hashing
- **Favorites System** - Save favorite properties
- **Inquiry Management** - Submit inquiries for properties
- **Admin Dashboard** - Create, update, and manage properties
- **Image Uploads** - Upload property images using Cloudinary
- **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router  
**Backend:** Express.js, MongoDB, JWT, Bcrypt  
**Storage:** Cloudinary for image uploads

## Setup Instructions

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Cloudinary account](https://cloudinary.com/) (free tier is fine)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Cloudinary credentials
npm start
```

The backend will run at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env to point to your backend API
npm run dev
```

The frontend will run at `http://localhost:5173`

## Environment Variables

Create `.env` files by copying `.env.example` in both backend and frontend directories.

**Backend requirements:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` - From Cloudinary account
- `CORS_ORIGIN` - Frontend URL (default: http://localhost:5173)
- `PORT` - Server port (default: 5000)

**Frontend requirements:**
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)

## Project Structure

```
backend/
├── config/              # Database and Cloudinary configuration
├── models/              # MongoDB schemas (User, Property, Inquiry)
├── src/
│   ├── controllers/     # Request handlers and business logic
│   ├── routes/          # API route definitions
│   ├── middleware/      # Auth, validation, error handling
│   ├── schemas/         # Input validation schemas
│   └── server.js        # Express app initialization
└── package.json

frontend/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components (Home, Properties, Admin, etc.)
│   ├── services/        # API calls and auth logic
│   ├── hooks/           # Custom React hooks
│   ├── App.jsx          # Main app component
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json
```

## How to Run

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd lns-infinity-estates
   cd backend && npm install && cd ../frontend && npm install
   ```

2. **Setup backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your credentials
   npm start
   ```

3. **Setup frontend** (new terminal)
   ```bash
   cd frontend
   cp .env.example .env
   npm run dev
   ```

4. **Create admin account**
   - Register a new user through the app
   - In MongoDB, find your user and set `role: "admin"`
   - Access admin dashboard at `/admin`

## Possible Improvements

- Advanced search and filtering for properties
- User ratings and reviews system
- Email notifications for new listings
- Property comparison feature
- Virtual tours or 360° images
- Booking/viewing appointment system

## About

This is a full-stack project built to practice building scalable web applications with modern technologies. It covers user authentication, file uploads, database design, and front-end development.
- Review documentation in backend/ and frontend/ folders
