# Frontend - LNS Infinity Estates

React application for browsing properties and managing favorites in the real estate platform.

## Quick Start

```bash
npm install
cp .env.example .env
# Set VITE_API_URL to your backend API
npm run dev
```

App runs at `http://localhost:5173`

## Environment Setup

Create `.env` file with:
```
VITE_API_URL=http://localhost:5000
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint linter
```

## Project Structure

```
frontend/src/
├── components/
│   ├── layout/          # Navbar and page layout
│   ├── property/        # Property card and inquiry form
│   ├── ui/              # Reusable UI (Button, Input, Modal, Badge)
│   ├── EmptyState.jsx   # Empty state display
│   ├── ErrorAlert.jsx   # Error message component
│   ├── LoadingState.jsx # Loading skeleton
│   └── ProtectedAdminRoute.jsx  # Admin route guard
├── pages/
│   ├── Home.jsx         # Landing page
│   ├── Properties.jsx   # Browse properties
│   ├── PropertyDetails.jsx  # Single property and inquiry form
│   ├── Favorites.jsx    # User's saved properties
│   ├── Login.jsx        # Login form
│   ├── Register.jsx     # Registration form
│   ├── AdminProperties.jsx  # Admin: manage properties
│   └── AdminInquiries.jsx   # Admin: view inquiries
├── services/
│   ├── api.js           # API client with base configuration
│   └── auth.js          # Authentication utilities
├── hooks/
│   └── useAuth.js       # Custom hook for auth state
├── App.jsx              # Main app with routing
└── main.jsx             # React entry point
```

## Key Pages

- **Home** - Landing page with property overview
- **Properties** - Browse all available properties
- **PropertyDetails** - View full property info and submit inquiries
- **Favorites** - View saved properties (requires login)
- **Login/Register** - User authentication
- **Admin Dashboard** - Create and manage properties (admin only)

## Features

### Authentication
- JWT token stored in localStorage
- Protected routes require login
- Admin routes require admin role
- Automatic logout if token expires

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- Responsive design for all screen sizes
- Consistent color scheme across pages

### API Integration
- Base URL from `VITE_API_URL` environment variable
- Automatic JWT token injection in all requests
- Centralized error handling

## Notes

- Built with React 19 and React Router v7
- Uses Vite for fast development and optimized builds
- Vite for fast development and building
- ES6 syntax throughout
- Component-based architecture
