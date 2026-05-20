import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Admin Panel</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => navigate('/admin/properties')}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-6 text-left font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          Manage Properties
        </button>

        <button
          type="button"
          onClick={() => navigate('/admin/inquiries')}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-6 text-left font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          Manage Inquiries
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard
