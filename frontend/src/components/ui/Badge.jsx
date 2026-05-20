const variants = {
  available: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  sold: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  plot: 'bg-stone-100 text-stone-700 ring-1 ring-stone-200',
  apartment: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  villa: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  house: 'bg-teal-50 text-teal-700 ring-1 ring-teal-200',
  farm: 'bg-green-50 text-green-700 ring-1 ring-green-200',
  default: 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200',
}

export default function Badge({ label, variant = 'default' }) {
  const cls = variants[variant] || variants.default
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${cls}`}>
      {label}
    </span>
  )
}
