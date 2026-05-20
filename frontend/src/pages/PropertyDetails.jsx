import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPropertyById } from '../services/api.js'
import LoadingState from '../components/LoadingState.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import Badge from '../components/ui/Badge.jsx'
import InquiryForm from '../components/property/InquiryForm.jsx'

const TYPE_ICONS = { plot: '🌿', apartment: '🏢', villa: '🏡', house: '🏠', farm: '🌾' }

export default function PropertyDetails() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (!id || id.length !== 24) { setError('Invalid property ID'); setLoading(false); return }
    const load = async () => {
      try {
        setLoading(true)
        const data = await getPropertyById(id)
        setProperty(data)
      } catch {
        setError('Unable to load property details')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <LoadingState message="Loading property..." />
  if (error) return (
    <div className="space-y-4">
      <ErrorAlert message={error} />
      <Link to="/properties" className="text-sm text-zinc-600 hover:text-zinc-900 underline">← Back to properties</Link>
    </div>
  )
  if (!property) return <p className="text-zinc-600">Property not found.</p>

  const images = Array.isArray(property.images) && property.images.length > 0 ? property.images : []
  const icon = TYPE_ICONS[property.propertyType] || '🏠'

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500">
        <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-zinc-900 transition-colors">Properties</Link>
        <span>/</span>
        <span className="text-zinc-900 font-medium truncate max-w-xs">{property.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Images + Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Image Gallery */}
          {images.length > 0 ? (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                <img
                  src={images[activeImg]}
                  alt={`${property.title} - image ${activeImg + 1}`}
                  className="h-72 w-full object-cover sm:h-96"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={`${img}-${i}`}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      className={`shrink-0 overflow-hidden rounded-xl border-2 transition-colors cursor-pointer ${i === activeImg ? 'border-zinc-900' : 'border-transparent hover:border-zinc-300'}`}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="h-16 w-24 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-72 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50">
              <span className="text-6xl opacity-20">{icon}</span>
            </div>
          )}

          {/* Property Info */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-zinc-900">{property.title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge label={property.status || 'available'} variant={property.status || 'available'} />
                  <Badge label={property.propertyType} variant={property.propertyType} />
                  {property.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
              {property.showPrice && property.price ? (
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-zinc-900">₹{Number(property.price).toLocaleString('en-IN')}</p>
                </div>
              ) : (
                <p className="text-sm text-zinc-400 italic">Price on request</p>
              )}
            </div>

            {property.showLocation && property.location && (
              <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-zinc-400">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {property.location}
              </div>
            )}

            {property.description && (
              <div className="border-t border-zinc-100 pt-4">
                <h3 className="text-sm font-semibold text-zinc-900 mb-2">About this property</h3>
                <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Inquiry */}
        <div className="space-y-4">
          <InquiryForm propertyId={property._id} />
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center">
            <p className="text-xs text-zinc-500">Have questions? We typically respond within a few hours.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
