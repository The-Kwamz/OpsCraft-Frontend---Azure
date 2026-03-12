import { useEffect, useState } from 'react'
import { Api } from '../lib/api'
import type { Job } from '../types'

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [serviceType, setServiceType] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await Api.listJobs()
        setJobs(data)
      } catch (e: any) {
        setError(e.message || 'Failed to load jobs')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function createJob(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const job = await Api.createJob({
        serviceType,
        customerName,
        address,
        notes,
      })

      setJobs(prev => [job, ...prev])
      setServiceType('')
      setCustomerName('')
      setAddress('')
      setNotes('')
      setShowCreateForm(false)
    } catch (e: any) {
      setError(e.message || 'Failed to create job')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2>Dashboard</h2>

      {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}

      <section style={{ margin: '12px 0', padding: 12, border: '1px solid #ddd' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ marginTop: 0, marginBottom: 0 }}>Jobs</h3>
          <button type="button" onClick={() => setShowCreateForm(prev => !prev)}>
            {showCreateForm ? 'Close form' : 'Add Job'}
          </button>
        </div>

        {showCreateForm && (
          <form
            onSubmit={createJob}
            style={{ display: 'grid', gap: 8, maxWidth: 460, marginTop: 16 }}
          >
            <input
              placeholder="Service type *"
              required
              value={serviceType}
              onChange={e => setServiceType(e.target.value)}
            />
            <input
              placeholder="Customer name *"
              required
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
            />
            <input
              placeholder="Address *"
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <input
              placeholder="Notes *"
              required
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <button disabled={saving}>{saving ? 'Creating…' : 'Create job'}</button>
          </form>
        )}
      </section>

      <section style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Recent Jobs</h3>

        {loading ? (
          <div>Loading jobs…</div>
        ) : jobs.length === 0 ? (
          <div>No jobs yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '6px 4px' }}>ID</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '6px 4px' }}>Service</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '6px 4px' }}>Customer</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '6px 4px' }}>Status</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '6px 4px' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j.id}>
                  <td style={{ padding: '6px 4px' }}>{j.id}</td>
                  <td style={{ padding: '6px 4px' }}>{j.serviceType}</td>
                  <td style={{ padding: '6px 4px' }}>{j.customerName}</td>
                  <td style={{ padding: '6px 4px' }}>{j.status}</td>
                  <td style={{ padding: '6px 4px' }}>{new Date(j.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}