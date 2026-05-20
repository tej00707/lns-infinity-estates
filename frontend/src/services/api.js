const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getAuthHeaders() {
  const token = localStorage.getItem('token')

  if (!token) {
    return {}
  }

  return {
    Authorization: `Bearer ${token}`
  }
}

function toFriendlyError(status, notFoundMessage = 'Property not found') {
  if (status === 401) return 'Unauthorized'
  if (status === 403) return 'Forbidden'
  if (status === 404) return notFoundMessage
  return 'Something went wrong'
}

export async function getProperties() {
  const response = await fetch(`${BASE_URL}/properties`, {
    headers: {
      ...getAuthHeaders()
    }
  })

  if (!response.ok) {
    throw new Error(toFriendlyError(response.status, 'Property not found'))
  }

  const result = await response.json()
  return result.data
}

export async function getPropertyById(id) {
  const response = await fetch(`${BASE_URL}/properties/${id}`, {
    headers: {
      ...getAuthHeaders()
    }
  })

  if (!response.ok) {
    throw new Error(toFriendlyError(response.status, 'Property not found'))
  }

  const result = await response.json()
  return result.data
}

export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error || 'Something went wrong')
  }

  return result.data
}

export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error || toFriendlyError(response.status))
  }

  return result.data
}

export async function getFavorites() {
  const response = await fetch(`${BASE_URL}/favorites`, {
    headers: {
      ...getAuthHeaders()
    }
  })

  if (!response.ok) {
    throw new Error(toFriendlyError(response.status, 'Unable to load data'))
  }

  const result = await response.json()
  return result.data
}

export async function addFavorite(propertyId) {
  const response = await fetch(`${BASE_URL}/favorites/${propertyId}`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders()
    }
  })

  if (!response.ok) {
    throw new Error(toFriendlyError(response.status, 'Property not found'))
  }

  const result = await response.json()
  return result.data
}

export async function removeFavorite(propertyId) {
  const response = await fetch(`${BASE_URL}/favorites/${propertyId}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders()
    }
  })

  if (!response.ok) {
    throw new Error(toFriendlyError(response.status, 'Property not found'))
  }

  const result = await response.json()
  return result.data
}
