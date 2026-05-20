import { useEffect, useState } from 'react'
import LoadingState from '../components/LoadingState.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const STATUS_VARIANTS = {
  new: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  contacted: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  scheduled: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ status: '', adminNotes: '' })
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => { fetchInquiries() }, [])

  async function fetchInquiries() {
    setLoading(true); setError(null)
    try {
      const res = await fetch(`${API_URL}/inquiries`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) throw new Error('Failed to fetch inquiries')
      const result = await res.json()
      setInquiries(result.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEditClick(inquiry) {
    setEditingId(inquiry._id)
    setEditData({ status: inquiry.status, adminNotes: inquiry.adminNotes || '' })
  }

  function handleCancelEdit() {
    setEditingId(null)
    setEditData({ status: '', adminNotes: '' })
  }

  async function handleSaveEdit(id) {
    setSaveLoading(true)
    try {
      const res = await fetch(`${API_URL}/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editData)
      })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Failed to update')
      }
      const result = await res.json()
      setInquiries(prev => prev.map(inq => inq._id === id ? result.data : inq))
      setSuccessMessage('Inquiry updated')
      setTimeout(() => setSuccessMessage(null), 3500)
      handleCancelEdit()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaveLoading(false)
    }
  }

  if (loading) return <LoadingState message="Loading inquiries..." />

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Inquiries</h1>
        <p className="mt-1 text-sm text-zinc-500">{inquiries.length} total enquier{inquiries.length !== 1 ? 'ies' : 'y'}</p>
      </div>

      {error && <ErrorAlert message={error} />}

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          {successMessage}
        </div>
      )}

      {inquiries.length === 0 ? (
        <EmptyState icon="💬" message="No inquiries yet" />
      ) : (
        <div className="space-y-3">
          {inquiries.map(inquiry => (
            <div key={inquiry._id} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-900">{inquiry.name}</h3>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_VARIANTS[inquiry.status] || STATUS_VARIANTS.new}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91A16 16 0 0 0 15 17l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {inquiry.phone}
                    </span>
                    <span>Property: <span className="text-zinc-700 font-medium">{inquiry.property?.title || 'Deleted'}</span></span>
                    {inquiry.createdAt && <span>{new Date(inquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                  </div>
                  {inquiry.message && (
                    <p className="text-xs text-zinc-600 bg-zinc-50 rounded-lg px-3 py-2 max-w-prose">{inquiry.message}</p>
                  )}
                  {inquiry.adminNotes && !editingId === inquiry._id && (
                    <p className="text-xs text-zinc-500"><span className="font-medium">Notes:</span> {inquiry.adminNotes}</p>
                  )}
                </div>

                <div className="shrink-0">
                  {editingId === inquiry._id ? (
                    <div className="space-y-3 min-w-[220px]">
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-zinc-700">Status</label>
                        <select
                          value={editData.status}
                          onChange={e => setEditData(prev => ({ ...prev, status: e.target.value }))}
                          className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-zinc-700">Admin notes</label>
                        <input
                          type="text"
                          value={editData.adminNotes}
                          onChange={e => setEditData(prev => ({ ...prev, adminNotes: e.target.value }))}
                          placeholder="Internal notes..."
                          className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleSaveEdit(inquiry._id)} loading={saveLoading}>Save</Button>
                        <Button size="sm" variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => handleEditClick(inquiry)}>Edit</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
