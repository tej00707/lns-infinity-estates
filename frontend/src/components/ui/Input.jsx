export default function Input({
  label,
  id,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm
          text-zinc-900 placeholder:text-zinc-400
          transition-colors
          focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200
          disabled:bg-zinc-50 disabled:text-zinc-500
          ${error ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  )
}
