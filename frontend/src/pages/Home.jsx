import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const PROPERTY_TYPES = [
  { type: 'apartment', icon: '🏢', label: 'Apartments', desc: 'Urban living spaces' },
  { type: 'villa', icon: '🏡', label: 'Villas', desc: 'Luxury standalone homes' },
  { type: 'plot', icon: '🌿', label: 'Plots', desc: 'Build your own dream' },
  { type: 'house', icon: '🏠', label: 'Houses', desc: 'Ready-to-move homes' },
  { type: 'farm', icon: '🌾', label: 'Farmlands', desc: 'Agricultural properties' },
]

const STATS = [
  { value: '500+', label: 'Properties listed' },
  { value: '12+', label: 'Years of trust' },
  { value: '1,200+', label: 'Happy families' },
  { value: '98%', label: 'Client satisfaction' },
]

export default function Home() {
  const { loggedIn } = useAuth()

  return (
    <div className="space-y-20 pb-20">
      <section className="relative -mx-4 overflow-hidden bg-zinc-900 px-4 py-24 sm:px-6 sm:py-32">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Premium Real Estate in India
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find your perfect property
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-xl mx-auto">
            LNS Infinity Estates curates premium plots, villas, apartments and homes. Discover verified listings with transparent pricing.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/properties" className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors">
              Browse properties
            </Link>
            {!loggedIn && (
              <Link to="/register" className="rounded-xl border border-zinc-700 bg-zinc-800 px-8 py-3.5 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors">
                Create free account
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900">Browse by type</h2>
          <p className="mt-2 text-sm text-zinc-500">Find what suits your lifestyle and budget</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PROPERTY_TYPES.map(({ type, icon, label, desc }) => (
            <Link
              key={type}
              to={`/properties?type=${type}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm transition-all hover:border-zinc-400 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-3xl">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">{label}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {!loggedIn && (
        <section className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 sm:flex-row">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Save properties you love</h3>
              <p className="mt-1 text-sm text-zinc-500">Create a free account to bookmark listings and get notified.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/login" className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">Sign in</Link>
              <Link to="/register" className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">Get started free</Link>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900">Why LNS Infinity Estates?</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: '✅', title: 'Verified listings', desc: 'Every property is verified by our team before listing.' },
            { icon: '💬', title: 'Direct inquiries', desc: 'Contact us directly through the listing — no middlemen.' },
            { icon: '🔒', title: 'Transparent pricing', desc: 'Clear prices with no hidden fees or commissions.' },
          ].map(item => (
            <div key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 text-sm font-semibold text-zinc-900">{item.title}</h3>
              <p className="mt-1.5 text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
