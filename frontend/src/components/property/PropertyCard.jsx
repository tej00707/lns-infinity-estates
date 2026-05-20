import { Link } from 'react-router-dom'
import Badge from '../ui/Badge.jsx'

const TYPE_ICONS = {
  plot: '🌿',
  apartment: '🏢',
  villa: '🏡',
  house: '🏠',
  farm: '🌾',
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

export default function PropertyCard({
  property,
  isFavorited = false,
  favoriteLoading = false,
  showFavoriteButton = false,
  onFavorite,
  onRemove,
}) {
  const firstImage = property.images?.[0]
  const icon = TYPE_ICONS[property.propertyType] || '🏠'

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onFavorite) onFavorite(property._id)
  }

  const handleRemoveClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onRemove) onRemove(property._id)
  }

  return (
    <Link
      to={`/properties/${property._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-48 bg-zinc-100 overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-50">
            <span className="text-4xl opacity-30">{icon}</span>
          </div>
        )}

        {/* Status badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge label={property.status || 'available'} variant={property.status || 'available'} />
        </div>

        {/* Favorite button */}
        {showFavoriteButton && (
          <button
            type="button"
            onClick={isFavorited ? handleRemoveClick : handleFavoriteClick}
            disabled={favoriteLoading}
            aria-label={isFavorited ? 'Remove from saved' : 'Save property'}
            className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-150 cursor-pointer
              ${isFavorited ? 'text-rose-500 hover:bg-rose-50' : 'text-zinc-400 hover:text-rose-400 hover:bg-white'}
              disabled:opacity-60`}
          >
            {favoriteLoading ? (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
            ) : (
              <HeartIcon filled={isFavorited} />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 leading-snug line-clamp-2 group-hover:text-zinc-700 transition-colors">
            {property.title}
          </h3>
          <span className="text-base shrink-0">{icon}</span>
        </div>

        {property.showLocation && property.location ? (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-zinc-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="truncate">{property.location}</span>
          </div>
        ) : null}

        <div className="mt-3 flex items-center justify-between">
          <Badge label={property.propertyType} variant={property.propertyType} />
          {property.showPrice && property.price ? (
            <p className="text-sm font-semibold text-zinc-900">
              ₹{Number(property.price).toLocaleString('en-IN')}
            </p>
          ) : (
            <p className="text-xs text-zinc-400 italic">Price on request</p>
          )}
        </div>
      </div>
    </Link>
  )
}
