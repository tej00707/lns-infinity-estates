import { Link } from 'react-router-dom'

function PropertyCard({ property }) {
  return (
    <Link
      to={`/properties/${property._id}`}
      className="block cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">{property.title}</h3>
        <p className="text-sm text-slate-600">{property.location || 'N/A'}</p>
        {property.showPrice && (
          <p className="pt-1 text-base font-medium text-slate-800">
            ₹{Number(property.price || 0).toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  )
}

export default PropertyCard
