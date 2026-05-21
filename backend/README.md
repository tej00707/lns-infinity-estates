# Backend - LNS Infinity Estates

Express.js API server for the real estate management platform.

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Cloudinary credentials
npm start
```

Server runs at `http://localhost:5000`

## Environment Setup

Create `.env` file with:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/db
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CORS_ORIGIN=http://localhost:5173
PORT=5000
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (Admin only)
- `PUT /api/properties/:id` - Update property (Admin only)
- `DELETE /api/properties/:id` - Delete property (Admin only)

### Inquiries
- `POST /api/inquiries` - Submit inquiry for property
- `GET /api/inquiries` - Get all inquiries (Admin only)
- `DELETE /api/inquiries/:id` - Delete inquiry (Admin only)

### Favorites
- `GET /api/favorites` - Get user's favorite properties
- `POST /api/favorites/:propertyId` - Add property to favorites
- `DELETE /api/favorites/:propertyId` - Remove property from favorites

## Project Structure

```
backend/
├── config/          # Database and Cloudinary setup
├── models/          # MongoDB schemas
├── src/
│   ├── controllers/ # Request handlers and business logic
│   ├── routes/      # API route definitions
│   ├── middleware/  # Authentication, validation, error handling
│   ├── schemas/     # Request validation (Zod schemas)
│   └── server.js    # Express server initialization
└── package.json
```

## Key Technologies

- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image hosting and optimization
- **Multer** - File upload handling
- **Zod** - Schema validation

## Notes

- All responses follow `{ success: boolean, data: ... }` format
- JWT tokens required in `Authorization: Bearer <token>` header for protected routes
- Image uploads are handled via Multer and stored in Cloudinary
