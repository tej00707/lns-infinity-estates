import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/property/PropertyCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import { getFavorites, removeFavorite } from '../services/api.js'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [removingId, setRemovingId] = useState('')
  const isLoggedIn = Boolean(localStorage.getItem('token'))

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return }
    const load = async () => {
      try {
        const data = await getFavorites()
        setFavorites(data || [])
      } catch {
        setError('Unable to load saved properties')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isLoggedIn])

  const handleRemove = async (propertyId) => {
    const previous = favorites
    setRemovingId(propertyId)
    setFavorites(curr => curr.filter(p => p._id !== propertyId))
    try {
      await removeFavorite(propertyId)
    } catch {
      setFavorites(previous)
      setError('Something went wrong')
    } finally {
      setRemovingId('')
    }
  }

  if (loading) return <LoadingState message="Loading saved properties..." />

  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-md py-16 text-center space-y-4">
        <span className="text-5xl">🔒</span>
        <h2 className="text-xl font-bold text-zinc-900">Sign in to view saved properties</h2>
        <p className="text-sm text-zinc-500">Create a free account to save and track your favourite listings.</p>
        <div className="flex justify-center gap-3 pt-2">
          <Link to="/login" className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">Sign in</Link>
          <Link to="/register" className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">Get started</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Saved properties</h1>
        <p className="mt-1 text-sm text-zinc-500">{favorites.length} saved listing{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      {error && <ErrorAlert message={error} />}

      {favorites.length === 0 ? (
        <EmptyState
          icon="🏠"
          message="No saved properties yet"
          action={
            <Link to="/properties" className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">
              Browse properties
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map(property => (
            <PropertyCard
              key={property._id}
              property={property}
              isFavorited={true}
              favoriteLoading={removingId === property._id}
              showFavoriteButton={true}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  )
}
