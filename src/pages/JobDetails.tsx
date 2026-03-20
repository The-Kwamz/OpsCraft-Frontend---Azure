import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Api } from '../lib/api'
import type { Job } from '../types'

function formatJobStatus(status: Job['status']) {
  switch (status) {
    case 'new':
      return 'Booked'
    case 'scheduled':
      return 'Scheduled'
    case 'in_progress':
      return 'In Progress'
    case 'completed':
      return 'Completed'
    default:
      return status
  }
}

function getStatusClass(status: Job['status']) {
  switch (status) {
    case 'new':
      return 'status-booked'
    case 'scheduled':
      return 'status-booked'
    case 'in_progress':
      return 'status-in-progress'
    case 'completed':
      return 'status-completed'
    default:
      return 'status-booked'
  }
}

export default function JobDetails() {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadJob() {
      if (!id) {
        setError('Missing job id')
        setLoading(false)
        return
      }

      try {
        const data = await Api.getJob(id)
        setJob(data)
      } catch (e: any) {
        setError(e.message || 'Failed to load job')
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [id])

  if (loading) {
    return (
      <div className="create-job-page">
        <div className="create-job-breadcrumb">
          <Link to="/" className="create-job-breadcrumb-link">Jobs</Link>
          <span className="create-job-breadcrumb-sep">›</span>
          <span className="create-job-breadcrumb-current">Job Details</span>
        </div>

        <div className="jobs-toolbar-card">
          <h1 className="jobs-page-title" style={{ marginBottom: 12 }}>Loading job...</h1>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="create-job-page">
        <div className="create-job-breadcrumb">
          <Link to="/" className="create-job-breadcrumb-link">Jobs</Link>
          <span className="create-job-breadcrumb-sep">›</span>
          <span className="create-job-breadcrumb-current">Job Details</span>
        </div>

        <div className="jobs-toolbar-card">
          <h1 className="jobs-page-title" style={{ marginBottom: 12 }}>Job not found</h1>
          {error && <div className="error" style={{ marginBottom: 16 }}>{error}</div>}
          <Link to="/" className="jobs-primary-button">Back to Jobs</Link>
        </div>
      </div>
    )
  }

  const customerEmail = `${job.customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`
  const customerPhone = '0000000000'
  const companyName = `${job.customerName} Pty Ltd`
  const locationText = job.address || 'No location selected'
  const startDate = job.scheduledDate
    ? new Date(job.scheduledDate).toLocaleDateString()
    : 'Not scheduled'
  const displaySolutionId = `SOL-${String(job.solutionId).padStart(5, '0')}`

  return (
    <div className="create-job-page">
      <div className="create-job-breadcrumb">
        <Link to="/" className="create-job-breadcrumb-link">Jobs</Link>
        <span className="create-job-breadcrumb-sep">›</span>
        <span className="create-job-breadcrumb-current">{job.customerName}</span>
      </div>

      <div className="jobs-toolbar-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1 className="jobs-page-title" style={{ marginBottom: 8 }}>
              {job.customerName}
            </h1>
            <div style={{ color: '#6b7280', fontSize: 16 }}>{job.serviceType}</div>
          </div>

          <div>
            <span className={`jobs-status-pill ${getStatusClass(job.status)}`}>
              {formatJobStatus(job.status)}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 24 }}>
        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 20 }}>Customer Details</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>{job.customerName}</div>
              <div style={{ color: '#374151', marginBottom: 8 }}>{companyName}</div>
              <div style={{ color: '#374151', marginBottom: 8 }}>{customerEmail}</div>
              <div style={{ color: '#374151' }}>{customerPhone}</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Location</div>
              <div>{locationText}</div>
            </div>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <h2 style={{ margin: 0 }}>Costing</h2>
            <button type="button" className="jobs-primary-button">
              Go to Costing
            </button>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 20 }}>Job Details</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Job Type</div>
              <div>{job.serviceType}</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Start Date *</div>
              <div>{startDate}</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Status</div>
              <div>{formatJobStatus(job.status)}</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Created At</div>
              <div>{new Date(job.createdAt).toLocaleString()}</div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>
              Description of the job *
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{job.notes}</div>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Linked Items</h2>
          <div style={{ color: '#6b7280' }}>No linked items</div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 20 }}>Additional details</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Assigned employees</div>
              <div>Not assigned</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Solution ID</div>
              <div>{displaySolutionId}</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Outcome of Site-comment</div>
              <div>Awaiting access</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Client Name</div>
              <div>{job.customerName}</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Project manager</div>
              <div>-</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Work Order Number</div>
              <div>-</div>
            </div>

            <div>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Reference Number</div>
              <div>{displaySolutionId}</div>
            </div>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Materials and Services</h2>
          <div style={{ color: '#6b7280' }}>No materials or services added yet.</div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <h2 style={{ margin: 0 }}>Customer Assets</h2>
            <button type="button" className="jobs-primary-button">
              Add Customer Asset
            </button>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Tasks</h2>
          <div style={{ color: '#6b7280' }}>No tasks added yet.</div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <h2 style={{ margin: 0 }}>Appointments</h2>
            <button type="button" className="jobs-primary-button">
              Add new
            </button>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Comments</h2>
          <textarea
            className="create-job-textarea"
            placeholder="Write your comment..."
          />
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>History</h2>
          <div style={{ color: '#6b7280' }}>
            History will show job edits, status changes, assignments, and updates once the backend audit trail is added.
          </div>
        </div>
      </div>
    </div>
  )
}