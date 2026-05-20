import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isAdmin, isLoggedIn, getUser } from '../services/auth.js'

export function useAuth() {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  const [adminUser, setAdminUser] = useState(isAdmin())
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    setLoggedIn(isLoggedIn())
    setAdminUser(isAdmin())
    setUser(getUser())
  }, [location.pathname])

  return { loggedIn, adminUser, user }
}
