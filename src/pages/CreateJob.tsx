import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CreateJob() {
  const [customer, setCustomer] = useState('')
  const [contact, setContact] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="create-job-page">
      <div className="create-job-breadcrumb">
        <Link to="/" className="create-job-breadcrumb-link">Jobs</Link>
        <span className="create-job-breadcrumb-sep">›</span>
        <span className="create-job-breadcrumb-current">Create Job</span>
      </div>

      <div className="create-job-layout">
        <div className="create-job-form-column">
          <div className="create-job-field">
            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="create-job-select"
            >
              <option value="">Select Customer *</option>
              <option value="vodacom">Vodacom</option>
              <option value="makhoba">Makhoba Professional Services</option>
            </select>
          </div>

          <div className="create-job-field">
            <select
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="create-job-select"
            >
              <option value="">Select Contact *</option>
              <option value="kwame">Kwame Yinkah</option>
              <option value="admin">Admin Contact</option>
            </select>
          </div>

          <div className="create-job-field">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="create-job-select"
            >
              <option value="">Select Location</option>
              <option value="johannesburg">Johannesburg</option>
              <option value="pretoria">Pretoria</option>
            </select>
          </div>

          <div className="create-job-label">Job Type *</div>
          <div className="create-job-field">
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="create-job-select"
            >
              <option value="">Select job type</option>
              <option value="callout">Call Out</option>
              <option value="installation">Installation</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="create-job-label">Description of the job *</div>
          <div className="create-job-field">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="create-job-textarea"
            />
          </div>

          <button type="button" className="create-job-submit">
            Create Job
          </button>
        </div>

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