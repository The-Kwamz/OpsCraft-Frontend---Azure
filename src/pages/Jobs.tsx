import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Api } from '../lib/api'
import type { Job } from '../types'

type JobsTab = 'jobs' | 'projects'

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

export default function Jobs() {
  const [activeTab, setActiveTab] = useState<JobsTab>('jobs')
  const [searchHere, setSearchHere] = useState('')
  const [tableSearch, setTableSearch] = useState('')
  const [jobStatus, setJobStatus] = useState('')
  const [jobType, setJobType] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [includeClosed, setIncludeClosed] = useState(false)
  const [includeArchived, setIncludeArchived] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true)
        setError(null)
        const data = await Api.listJobs()
        setJobs(data)
      } catch (e: any) {
        setError(e.message || 'Failed to fetch')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  const filteredJobs = useMemo(() => {
    let result = [...jobs]

    const query = tableSearch.trim().toLowerCase()
    if (query) {
      result = result.filter((job) => {
        const jobNumber = `jb${String(job.solutionId).padStart(5, '0')}`
        return (
          jobNumber.includes(query) ||
          job.customerName.toLowerCase().includes(query) ||
          job.address.toLowerCase().includes(query) ||
          job.serviceType.toLowerCase().includes(query) ||
          job.notes.toLowerCase().includes(query)
        )
      })
    }

    if (jobStatus) {
      result = result.filter((job) => job.status === jobStatus)
    }

    if (jobType) {
      result = result.filter((job) => job.serviceType === jobType)
    }

    if (!includeClosed) {
      result = result.filter((job) => job.status !== 'completed')
    }

    return result
  }, [jobs, tableSearch, jobStatus, jobType, includeClosed])

  return (
    <div className="jobs-page">
      <div className="jobs-topbar">
        <div className="jobs-topbar-left">
          <h1 className="jobs-page-title">Jobs</h1>
        </div>

        <div className="jobs-topbar-right">
          <div className="jobs-global-search-wrap">
            <input
              className="jobs-global-search"
              placeholder="Search here..."
              value={searchHere}
              onChange={(e) => setSearchHere(e.target.value)}
            />
          </div>

          <button type="button" className="jobs-user-button" aria-label="Search Job">
            <span className="jobs-avatar">SJ</span>
            <span className="jobs-user-name">Search Job</span>
          </button>
        </div>
      </div>

      <div className="jobs-tabs">
        <button
          type="button"
          className={activeTab === 'jobs' ? 'jobs-tab active' : 'jobs-tab'}
          onClick={() => setActiveTab('jobs')}
        >
          Jobs
        </button>

        <button
          type="button"
          className={activeTab === 'projects' ? 'jobs-tab active' : 'jobs-tab'}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <section className="jobs-toolbar-card">
        <div className="jobs-toolbar-row">
          <div className="jobs-toolbar-left">
            <input
              className="jobs-search-input"
              placeholder="Search"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
            />

            <button type="button" className="jobs-secondary-button">
              Filter
            </button>

            <button type="button" className="jobs-secondary-button">
              Columns
            </button>

            <select
              className="jobs-select"
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value)}
            >
              <option value="">Job Status</option>
              <option value="new">Booked</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="jobs-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Job Type</option>
              <option value="Call Out">Call Out</option>
              <option value="Installation">Installation</option>
              <option value="Maintenance">Maintenance</option>
            </select>

            <input
              className="jobs-date-input"
              placeholder="Start and End Dates"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>

          <div className="jobs-toolbar-right">
            <label className="jobs-checkbox">
              <input
                type="checkbox"
                checked={includeClosed}
                onChange={(e) => setIncludeClosed(e.target.checked)}
              />
              <span>Closed Jobs</span>
            </label>

            <label className="jobs-checkbox">
              <input
                type="checkbox"
                checked={includeArchived}
                onChange={(e) => setIncludeArchived(e.target.checked)}
              />
              <span>Archived Jobs</span>
            </label>

            <button type="button" className="jobs-icon-text-button" aria-label="Export">
              ⭳ <span>Export</span>
            </button>

            <Link to="/jobs/new" className="jobs-primary-button">
              Add Job +
            </Link>
          </div>
        </div>
      </section>

      <section className="jobs-table-card">
        <div className="jobs-table-wrap">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" aria-label="Select all rows" />
                </th>
                <th>Number</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Assigned To</th>
                <th>Job Type</th>
                <th>Start</th>
                <th>Status</th>
                <th>Updated Date</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="jobs-empty-state">
                    Loading jobs...
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="jobs-empty-state">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <input type="checkbox" aria-label={`Select job ${job.solutionId}`} />
                    </td>
                    <td>
                      <Link to={`/jobs/${job.id}`} className="jobs-number-link">
                        {`JB${String(job.solutionId).padStart(5, '0')}`}
                      </Link>
                    </td>
                    <td className="jobs-cell-truncate" title={job.customerName}>
                      {job.customerName}
                    </td>
                    <td className="jobs-cell-truncate" title={job.address}>
                      {job.address || '-'}
                    </td>
                    <td>Unassigned</td>
                    <td>{job.serviceType}</td>
                    <td>
                      {job.scheduledDate
                        ? new Date(job.scheduledDate).toLocaleDateString()
                        : '-'}
                    </td>
                    <td>
                      <span className={`jobs-status-pill ${getStatusClass(job.status)}`}>
                        {formatJobStatus(job.status)}
                      </span>
                    </td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="jobs-pagination">
          <div className="jobs-pagination-left">
            <button type="button" className="jobs-icon-button" aria-label="Refresh">
              ↻
            </button>
            <span>
              {loading ? '0' : `1–${filteredJobs.length}`} of {filteredJobs.length}
            </span>
          </div>

          <div className="jobs-pagination-right">
            <span>Rows per page</span>
            <select className="jobs-rows-select" defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>Page 1 of 1</span>
            <button type="button" className="jobs-icon-button" disabled aria-label="Previous page">
              ‹
            </button>
            <button type="button" className="jobs-icon-button" disabled aria-label="Next page">
              ›
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}