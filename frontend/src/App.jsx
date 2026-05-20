import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Home from './pages/Home.jsx'
import Properties from './pages/Properties.jsx'
import PropertyDetails from './pages/PropertyDetails.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Favorites from './pages/Favorites.jsx'
import AdminProperties from './pages/AdminProperties.jsx'
import AdminInquiries from './pages/AdminInquiries.jsx'
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx'
import { isAdmin } from './services/auth.js'

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={isAdmin() ? <Navigate to="/" replace /> : <Favorites />} />
          <Route
            path="/admin/properties"
            element={
              <ProtectedAdminRoute>
                <AdminProperties />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/inquiries"
            element={
              <ProtectedAdminRoute>
                <AdminInquiries />
              </ProtectedAdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
