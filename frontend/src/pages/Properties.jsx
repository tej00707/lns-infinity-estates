import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addFavorite, getFavorites, getProperties } from '../services/api.js'
import PropertyCard from '../components/property/PropertyCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'

const TYPES = ['all', 'plot', 'apartment', 'villa', 'house', 'farm']
const STATUSES = ['all', 'available', 'sold', 'pending']

export default function Properties() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [favoriteLoadingId, setFavoriteLoadingId] = useState('')
  const [favoriteIds, setFavoriteIds] = useState(new Set())
  const [search, setSearch] = useState('')

  const isLoggedIn = Boolean(localStorage.getItem('token'))
  const typeFilter = searchParams.get('type') || 'all'
  const statusFilter = searchParams.get('status') || 'all'

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getProperties()
        setProperties(data || [])
        if (isLoggedIn) {
          const favs = await getFavorites()
          setFavoriteIds(new Set((favs || []).map(p => p._id)))
        }
      } catch (err) {
        setError('Unable to load properties')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isLoggedIn])

  const handleFavorite = async (propertyId) => {
    if (!isLoggedIn) { setFeedback('Please sign in to save properties'); return }
    if (favoriteIds.has(propertyId)) return
    try {
      setFavoriteLoadingId(propertyId)
      await addFavorite(propertyId)
      setFavoriteIds(prev => new Set(prev).add(propertyId))
      setFeedback('Saved to favourites')
      setTimeout(() => setFeedback(''), 3000)
    } catch {
      setFeedback('Something went wrong')
    } finally {
      setFavoriteLoadingId('')
    }
  }

  const setFilter = (key, val) => {
    const next = new URLSearchParams(searchParams)
    if (val === 'all') next.delete(key)
    else next.set(key, val)
    setSearchParams(next)
  }

  const filtered = properties.filter(p => {
    const matchType = typeFilter === 'all' || p.propertyType === typeFilter
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.location || '').toLowerCase().includes(search.toLowerCase())
    return matchType && matchStatus && matchSearch
  })

  if (loading) return <LoadingState message="Loading properties..." />
  if (error) return <ErrorAlert message={error} />

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Properties</h1>
          <p className="mt-1 text-sm text-zinc-500">{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        {!isLoggedIn && (
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5">
            <p className="text-xs font-medium text-blue-800">Sign in to save favourites</p>
            <button type="button" onClick={() => navigate('/login')} className="text-xs font-semibold text-blue-700 underline cursor-pointer hover:text-blue-900">Sign in</button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        {/* Type filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0">
          {TYPES.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter('type', t)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer
                ${typeFilter === t ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1">
          {STATUSES.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter('status', s)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer
                ${statusFilter === s ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback toast */}
      {feedback && (
        <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
          {feedback}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon="🏠" message="No properties match your filters" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(property => (
            <PropertyCard
              key={property._id}
              property={property}
              isFavorited={favoriteIds.has(property._id)}
              favoriteLoading={favoriteLoadingId === property._id}
              showFavoriteButton={isLoggedIn}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
