export default function EmptyState({ message, icon, action }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center">
      {icon && <div className="mb-4 text-4xl opacity-40">{icon}</div>}
      <p className="text-sm font-medium text-zinc-600">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
