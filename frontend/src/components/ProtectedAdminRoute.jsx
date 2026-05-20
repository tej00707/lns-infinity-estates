import { Navigate } from 'react-router-dom'
import { isAdmin, isLoggedIn } from '../services/auth.js'

function ProtectedAdminRoute({ children }) {
  if (!isLoggedIn() || !isAdmin()) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedAdminRoute
