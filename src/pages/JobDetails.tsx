import { Link, useParams } from 'react-router-dom'

type JobDetail = {
  id: string
  number: string
  customer: string
  location: string
  assignedTo: string
  jobType: string
  start: string
  status: string
  inStatus: number
  overall: number
  updatedBy: string
  updatedDate: string
  van: string
  description: string
}

const mockJobs: JobDetail[] = [
  {
    id: '1',
    number: 'JB10001',
    customer: 'Kwame Yinkah',
    location: '56 Hare Street, Johannesburg',
    assignedTo: 'Unassigned',
    jobType: 'Call Out',
    start: '12 Mar 2026',
    status: 'Booked',
    inStatus: 0,
    overall: 0,
    updatedBy: 'kwameyinkah@gmail.com',
    updatedDate: '12 Mar 2026',
    van: '-',
    description: 'Call out job for customer support and on-site inspection.',
  },
]

export default function JobDetails() {
  const { id } = useParams()
  const job = mockJobs.find((item) => item.id === id)

  if (!job) {
    return (
      <div className="create-job-page">
        <div className="create-job-breadcrumb">
          <Link to="/" className="create-job-breadcrumb-link">Jobs</Link>
          <span className="create-job-breadcrumb-sep">›</span>
          <span className="create-job-breadcrumb-current">Job Details</span>
        </div>

        <div className="jobs-toolbar-card">
          <h1 className="jobs-page-title" style={{ marginBottom: 12 }}>Job not found</h1>
          <Link to="/" className="jobs-primary-button">Back to Jobs</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="create-job-page">
      <div className="create-job-breadcrumb">
        <Link to="/" className="create-job-breadcrumb-link">Jobs</Link>
        <span className="create-job-breadcrumb-sep">›</span>
        <span className="create-job-breadcrumb-current">{job.number}</span>
      </div>

      <div className="jobs-toolbar-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1 className="jobs-page-title" style={{ marginBottom: 8 }}>{job.number}</h1>
            <div style={{ color: '#6b7280', fontSize: 16 }}>{job.customer}</div>
          </div>

          <div>
            <span className={`jobs-status-pill status-${job.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {job.status}
            </span>
          </div>
        </div>
      </div>

      <div className="create-job-layout">
        <div className="create-job-form-column">
          <div className="jobs-table-card" style={{ padding: 24 }}>
            <h2 style={{ marginTop: 0, marginBottom: 20 }}>Job Information</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))', gap: 16 }}>
              <div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Customer</div>
                <div>{job.customer}</div>
              </div>

              <div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Location</div>
                <div>{job.location}</div>
              </div>

              <div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Assigned To</div>
                <div>{job.assignedTo}</div>
              </div>

              <div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Job Type</div>
                <div>{job.jobType}</div>
              </div>

              <div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Start</div>
                <div>{job.start}</div>
              </div>

              <div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Van</div>
                <div>{job.van}</div>
              </div>

              <div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Updated By</div>
                <div>{job.updatedBy}</div>
              </div>

              <div>
                <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>Updated Date</div>
                <div>{job.updatedDate}</div>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>Description</div>
              <div>{job.description}</div>
            </div>
          </div>
        </div>

        <div className="create-job-history-column">
          <div className="create-job-history-illustration">📋</div>
          <div className="create-job-history-title">Job Summary</div>
          <div className="create-job-history-text">
            In Status: {job.inStatus}
            <br />
            Overall: {job.overall}
          </div>
        </div>
      </div>
    </div>
  )
}