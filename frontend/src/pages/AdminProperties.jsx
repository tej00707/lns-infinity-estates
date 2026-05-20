import { useEffect, useState } from 'react'
import { getProperties } from '../services/api.js'
import LoadingState from '../components/LoadingState.jsx'
import ErrorAlert from '../components/ErrorAlert.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'
import ConfirmModal from '../components/ui/ConfirmModal.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const EMPTY_FORM = { title: '', location: '', description: '', price: '', propertyType: 'plot', showPrice: true, showLocation: true, status: 'available' }

export default function AdminProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' })
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => { fetchProperties() }, [])

  async function fetchProperties() {
    setLoading(true); setError(null)
    try {
      const data = await getProperties()
      setProperties(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function showSuccess(msg) {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(null), 3500)
  }

  async function handleDelete() {
    setDeleteLoading(true)
    try {
      const res = await fetch(`${API_URL}/properties/${deleteModal.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (!res.ok) throw new Error('Failed to delete')
      setProperties(prev => prev.filter(p => p._id !== deleteModal.id))
      showSuccess('Property deleted')
      setDeleteModal({ open: false, id: null, title: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }

  function handleEditClick(property) {
    setEditingId(property._id)
    setFormData({
      title: property.title || '',
      location: property.location || '',
      description: property.description || '',
      price: property.price?.toString() || '',
      propertyType: property.propertyType || 'plot',
      showPrice: property.showPrice ?? true,
      showLocation: property.showLocation ?? true,
      status: property.status || 'available',
    })
    setSelectedFiles([])
    setShowForm(true)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancelEdit() {
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setSelectedFiles([])
    setShowForm(false)
  }

  function handleFormChange(e) {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    setFormLoading(true); setError(null); setSuccessMessage(null)
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `${API_URL}/properties/${editingId}` : `${API_URL}/properties`
      let body, headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }

      if (selectedFiles.length > 0) {
        body = new FormData()
        Object.entries(formData).forEach(([k, v]) => {
          if (k !== 'images') body.append(k, String(v))
        })
        selectedFiles.forEach(file => body.append('images', file))
      } else {
        body = JSON.stringify({ ...formData, price: parseFloat(formData.price) || 0 })
        headers['Content-Type'] = 'application/json'
      }

      const res = await fetch(url, { method, headers, body })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || `Failed to ${editingId ? 'update' : 'create'} property`)
      }
      const result = await res.json()
      if (editingId) {
        setProperties(prev => prev.map(p => p._id === editingId ? result.data : p))
        showSuccess('Property updated')
      } else {
        setProperties(prev => [...prev, result.data])
        showSuccess('Property created')
      }
      handleCancelEdit()
    } catch (err) {
      setError(err.message)
    } finally {
      setFormLoading(false)
    }
  }

  if (loading) return <LoadingState message="Loading properties..." />

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete property?"
        message={`"${deleteModal.title}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, id: null, title: '' })}
        loading={deleteLoading}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Properties</h1>
          <p className="mt-1 text-sm text-zinc-500">{properties.length} total listing{properties.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => showForm ? handleCancelEdit() : setShowForm(true)} size="md">
          {showForm ? 'Cancel' : '+ Add property'}
        </Button>
      </div>

      {error && <ErrorAlert message={error} />}

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          {successMessage}
        </div>
      )}

      {showForm && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-base font-semibold text-zinc-900">{editingId ? 'Edit property' : 'Create new property'}</h2>
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Title" id="title" name="title" value={formData.title} onChange={handleFormChange} required placeholder="Property title" />
              <Input label="Location" id="location" name="location" value={formData.location} onChange={handleFormChange} placeholder="City, Area" />
              <Input label="Price (₹)" id="price" name="price" type="number" value={formData.price} onChange={handleFormChange} step="1" placeholder="0" />
              <div className="space-y-1.5">
                <label htmlFor="propertyType" className="block text-sm font-medium text-zinc-700">Property type</label>
                <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleFormChange} className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200">
                  <option value="plot">Plot</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">House</option>
                  <option value="farm">Farm</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="status" className="block text-sm font-medium text-zinc-700">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleFormChange} className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200">
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="description" className="block text-sm font-medium text-zinc-700">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleFormChange} rows={3} placeholder="Property description..." className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 resize-none" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="images" className="block text-sm font-medium text-zinc-700">Images</label>
              <input type="file" id="images" name="images" multiple accept="image/*" onChange={e => setSelectedFiles(Array.from(e.target.files || []))} className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1 file:text-xs file:font-medium file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer" />
              {selectedFiles.length > 0 && <p className="text-xs text-zinc-500">{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected</p>}
              {editingId && selectedFiles.length === 0 && <p className="text-xs text-zinc-400">No new files selected — existing images kept</p>}
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="showPrice" checked={formData.showPrice} onChange={handleFormChange} className="h-4 w-4 rounded border-zinc-300 text-zinc-900 cursor-pointer" />
                <span className="text-sm font-medium text-zinc-700">Show price</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="showLocation" checked={formData.showLocation} onChange={handleFormChange} className="h-4 w-4 rounded border-zinc-300 text-zinc-900 cursor-pointer" />
                <span className="text-sm font-medium text-zinc-700">Show location</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={formLoading}>
                {editingId ? 'Update property' : 'Create property'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
            </div>
          </form>
        </div>
      )}

      {properties.length === 0 ? (
        <EmptyState icon="🏠" message="No properties yet. Add your first listing!" />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  {['Title', 'Location', 'Type', 'Price', 'Status', 'Actions'].map(col => (
                    <th key={col} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {properties.map(p => (
                  <tr key={p._id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-zinc-900 max-w-[200px] truncate">{p.title}</td>
                    <td className="px-5 py-4 text-sm text-zinc-600">{p.showLocation ? (p.location || '—') : <span className="text-zinc-400 italic">Hidden</span>}</td>
                    <td className="px-5 py-4"><Badge label={p.propertyType} variant={p.propertyType} /></td>
                    <td className="px-5 py-4 text-sm text-zinc-700">
                      {p.showPrice && p.price ? `₹${Number(p.price).toLocaleString('en-IN')}` : <span className="text-zinc-400 text-xs italic">Hidden</span>}
                    </td>
                    <td className="px-5 py-4"><Badge label={p.status} variant={p.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => handleEditClick(p)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer">Edit</button>
                        <button type="button" onClick={() => setDeleteModal({ open: true, id: p._id, title: p.title })} className="rounded-lg px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
