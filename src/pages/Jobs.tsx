import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

type JobsTab = 'jobs' | 'projects'

type MockJob = {
  id: string
  number: string
  customer: string
  location: string
  assignedTo: string
  jobType: string
  start: string
  status: 'Booked' | 'In Progress' | 'Completed' | 'Cancelled' | 'Overdue'
  inStatus: number
  overall: number
  updatedBy: string
  updatedDate: string
  van: string
}

const mockJobs: MockJob[] = [
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
    van: '',
  },
]

export default function Jobs() {
  const [activeTab, setActiveTab] = useState<JobsTab>('jobs')
  const [searchHere, setSearchHere] = useState('')
  const [tableSearch, setTableSearch] = useState('')
  const [jobStatus, setJobStatus] = useState('')
  const [jobType, setJobType] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [includeClosed, setIncludeClosed] = useState(false)
  const [includeArchived, setIncludeArchived] = useState(false)

  const filteredJobs = useMemo(() => {
    const query = tableSearch.trim().toLowerCase()

    if (!query) return mockJobs

    return mockJobs.filter((job) => {
      return (
        job.number.toLowerCase().includes(query) ||
        job.customer.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      )
    })
  }, [tableSearch])

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

          <button type="button" className="jobs-user-button" aria-label="User menu">
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
              <option value="booked">Booked</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="jobs-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Job Type</option>
              <option value="callout">Call Out</option>
              <option value="installation">Installation</option>
              <option value="repair">Repair</option>
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
                <th>In Status</th>
                <th>Overall</th>
                <th>Updated By</th>
                <th>Updated Date</th>
                <th>Van</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={13} className="jobs-empty-state">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <input type="checkbox" aria-label={`Select ${job.number}`} />
                    </td>
                    <td>
                      <Link to={`/jobs/${job.id}`} className="jobs-number-link">
                        {job.number}
                      </Link>
                    </td>
                    <td className="jobs-cell-truncate" title={job.customer}>
                      {job.customer}
                    </td>
                    <td className="jobs-cell-truncate" title={job.location}>
                      {job.location}
                    </td>
                    <td className="jobs-cell-truncate" title={job.assignedTo}>
                      {job.assignedTo}
                    </td>
                    <td>{job.jobType}</td>
                    <td>{job.start}</td>
                    <td>
                      <span className={`jobs-status-pill status-${job.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="jobs-numeric-cell">{job.inStatus}</td>
                    <td className="jobs-numeric-cell">{job.overall}</td>
                    <td className="jobs-cell-truncate" title={job.updatedBy}>
                      {job.updatedBy}
                    </td>
                    <td>{job.updatedDate}</td>
                    <td>{job.van || '-'}</td>
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
            <span>1–{filteredJobs.length} of {filteredJobs.length}</span>
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