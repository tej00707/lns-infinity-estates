export function getUser() {
  const storedUser = localStorage.getItem('user')

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser)
  } catch {
    return null
  }
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem('token'))
}

export function isAdmin() {
  const user = getUser()
  return user?.role === 'admin'
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
