import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Api } from '../lib/api'

export default function CreateJob() {
  const navigate = useNavigate()

  const [customer, setCustomer] = useState('')
  const [contact, setContact] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log('Create Job submit fired')
    setError(null)

    if (!customer || !contact || !location || !jobType || !description.trim()) {
      setError('Please complete all required fields.')
      return
    }

    setSaving(true)

    try {
      await Api.createJob({
        customerName: customer,
        serviceType: jobType,
        address: location,
        notes: `Contact: ${contact}\n\nDescription: ${description.trim()}`,
      })

      navigate('/')
    } catch (e: any) {
      setError(e.message || 'Failed to create job')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="create-job-page">
      <div className="create-job-breadcrumb">
        <Link to="/" className="create-job-breadcrumb-link">Jobs</Link>
        <span className="create-job-breadcrumb-sep">›</span>
        <span className="create-job-breadcrumb-current">Create Job</span>
      </div>

      <div className="create-job-layout">
        <form className="create-job-form-column" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <div className="create-job-field">
            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="create-job-select"
              required
            >
              <option value="">Select Customer *</option>
              <option value="Vodacom">Vodacom</option>
              <option value="Makhoba Professional Services">Makhoba Professional Services</option>
            </select>
          </div>

          <div className="create-job-field">
            <select
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="create-job-select"
              required
            >
              <option value="">Select Contact *</option>
              <option value="Kwame Yinkah">Kwame Yinkah</option>
              <option value="Admin Contact">Admin Contact</option>
            </select>
          </div>

          <div className="create-job-field">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="create-job-select"
              required
            >
              <option value="">Select Location *</option>
              <option value="Johannesburg">Johannesburg</option>
              <option value="Pretoria">Pretoria</option>
            </select>
          </div>

          <div className="create-job-label">Job Type *</div>
          <div className="create-job-field">
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="create-job-select"
              required
            >
              <option value="">Select job type</option>
              <option value="Call Out">Call Out</option>
              <option value="Installation">Installation</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="create-job-label">Description of the job *</div>
          <div className="create-job-field">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="create-job-textarea"
              required
            />
          </div>

          <button type="submit" className="create-job-submit" disabled={saving}>
            {saving ? 'Creating Job...' : 'Create Job'}
          </button>
        </form>

        <div className="create-job-history-column">
          <div className="create-job-history-illustration">🗂️</div>
          <div className="create-job-history-title">History</div>
          <div className="create-job-history-text">
            Once you select a customer
            <br />
            we will show a list of their previous jobs.
          </div>
        </div>
      </div>
    </div>
  )
}