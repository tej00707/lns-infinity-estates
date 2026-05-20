import { useState } from 'react'
import Input from '../ui/Input.jsx'
import Button from '../ui/Button.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function InquiryForm({ propertyId }) {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, property: propertyId }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Something went wrong')

      setSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
    } catch (err) {
      setError(err.message || 'Unable to submit inquiry')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="font-semibold text-emerald-900">Inquiry sent!</h3>
        <p className="mt-1 text-sm text-emerald-700">We'll get back to you shortly.</p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-4 text-xs text-emerald-600 underline cursor-pointer hover:text-emerald-800"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-zinc-900">Enquire about this property</h3>
      <p className="mt-1 text-sm text-zinc-500">We'll connect you with our team.</p>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <Input
          label="Your name"
          id="inq-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
          required
        />
        <Input
          label="Phone number"
          id="inq-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          required
        />
        <div className="space-y-1.5">
          <label htmlFor="inq-message" className="block text-sm font-medium text-zinc-700">
            Message <span className="text-zinc-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="inq-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us what you're looking for..."
            className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 resize-none"
          />
        </div>
        <Button type="submit" loading={loading} fullWidth>
          Send inquiry
        </Button>
      </form>
    </div>
  )
}
