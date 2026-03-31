import { useMemo } from "react";

type JobStatus = "new" | "scheduled" | "in_progress" | "completed";
type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

type DashboardJob = {
  id: string;
  customer: string;
  serviceType: string;
  status: JobStatus;
  createdAt: string;
};

type DashboardAppointment = {
  id: string;
  jobNumber: string;
  customer: string;
  technician: string;
  date: string;
  time: string;
  location: string;
};

type DashboardInvoice = {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  status: InvoiceStatus;
};

const mockJobs: DashboardJob[] = [
  { id: "1", customer: "Vodacom", serviceType: "Call Out", status: "new", createdAt: "2026-03-25" },
  { id: "2", customer: "Kwame Test", serviceType: "Installation", status: "scheduled", createdAt: "2026-03-26" },
  { id: "3", customer: "Makhoba Projects", serviceType: "Maintenance", status: "in_progress", createdAt: "2026-03-27" },
  { id: "4", customer: "Legacy Client Pty Ltd", serviceType: "Call Out", status: "completed", createdAt: "2026-03-28" },
  { id: "5", customer: "Apex Facilities", serviceType: "Installation", status: "scheduled", createdAt: "2026-03-29" },
  { id: "6", customer: "Blue Rock Estates", serviceType: "Maintenance", status: "in_progress", createdAt: "2026-03-30" },
];

const mockAppointments: DashboardAppointment[] = [
  {
    id: "1",
    jobNumber: "JB00021",
    customer: "Vodacom",
    technician: "S. Mokoena",
    date: "2026-04-01",
    time: "08:00",
    location: "Johannesburg",
  },
  {
    id: "2",
    jobNumber: "JB00022",
    customer: "Kwame Test",
    technician: "T. Nkosi",
    date: "2026-04-01",
    time: "10:30",
    location: "Pretoria",
  },
  {
    id: "3",
    jobNumber: "JB00023",
    customer: "Makhoba Projects",
    technician: "L. Dlamini",
    date: "2026-04-01",
    time: "13:00",
    location: "Midrand",
  },
];

const mockInvoices: DashboardInvoice[] = [
  { id: "1", invoiceNumber: "INV2001", customer: "Vodacom", amount: 3500, status: "sent" },
  { id: "2", invoiceNumber: "INV2002", customer: "Kwame Test", amount: 12800, status: "draft" },
  { id: "3", invoiceNumber: "INV2003", customer: "Makhoba Projects", amount: 5400, status: "paid" },
  { id: "4", invoiceNumber: "INV2004", customer: "Legacy Client Pty Ltd", amount: 7400, status: "overdue" },
  { id: "5", invoiceNumber: "INV2005", customer: "Blue Rock Estates", amount: 9100, status: "overdue" },
];

const jobsByDay = [
  { label: "Mon", value: 2, color: "#2563eb" },
  { label: "Tue", value: 4, color: "#7c3aed" },
  { label: "Wed", value: 3, color: "#0891b2" },
  { label: "Thu", value: 5, color: "#16a34a" },
  { label: "Fri", value: 4, color: "#ea580c" },
  { label: "Sat", value: 1, color: "#dc2626" },
  { label: "Sun", value: 2, color: "#9333ea" },
];

function formatJobStatus(status: JobStatus) {
  switch (status) {
    case "new":
      return "Booked";
    case "scheduled":
      return "Scheduled";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

function getJobStatusClass(status: JobStatus) {
  switch (status) {
    case "new":
    case "scheduled":
      return "status-booked";
    case "in_progress":
      return "status-in-progress";
    case "completed":
      return "status-completed";
    default:
      return "status-booked";
  }
}

function formatInvoiceStatus(status: InvoiceStatus) {
  switch (status) {
    case "draft":
      return "Draft";
    case "sent":
      return "Sent";
    case "paid":
      return "Paid";
    case "overdue":
      return "Overdue";
    default:
      return status;
  }
}

function getInvoiceStatusClass(status: InvoiceStatus) {
  switch (status) {
    case "paid":
      return "status-completed";
    case "overdue":
      return "status-in-progress";
    case "sent":
    case "draft":
    default:
      return "status-booked";
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Dashboard() {
  const metrics = useMemo(() => {
    const activeJobs = mockJobs.filter((job) => job.status !== "completed").length;
    const scheduledToday = mockAppointments.length;
    const pendingQuotes = 6;
    const overdueInvoices = mockInvoices.filter((invoice) => invoice.status === "overdue").length;

    return { activeJobs, scheduledToday, pendingQuotes, overdueInvoices };
  }, []);

  const jobStatusCounts = useMemo(() => {
    return {
      new: mockJobs.filter((job) => job.status === "new").length,
      scheduled: mockJobs.filter((job) => job.status === "scheduled").length,
      in_progress: mockJobs.filter((job) => job.status === "in_progress").length,
      completed: mockJobs.filter((job) => job.status === "completed").length,
    };
  }, []);

  const maxStatusCount = Math.max(
    jobStatusCounts.new,
    jobStatusCounts.scheduled,
    jobStatusCounts.in_progress,
    jobStatusCounts.completed,
    1
  );

  const maxTrendValue = Math.max(...jobsByDay.map((item) => item.value), 1);

  const recentJobs = mockJobs.slice(0, 5);
  const urgentInvoices = mockInvoices.filter(
    (invoice) => invoice.status === "overdue" || invoice.status === "draft"
  );

  return (
    <div className="jobs-page">
      <div className="jobs-topbar" style={{ marginBottom: 8 }}>
        <div className="jobs-topbar-left">
          <h1 className="jobs-page-title" style={{ marginBottom: 0 }}>Dashboard</h1>
        </div>
      </div>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div className="jobs-toolbar-card" style={{ padding: 16 }}>
          <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 4 }}>Active Jobs</div>
          <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>{metrics.activeJobs}</div>
        </div>

        <div className="jobs-toolbar-card" style={{ padding: 16 }}>
          <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 4 }}>Scheduled Today</div>
          <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>{metrics.scheduledToday}</div>
        </div>

        <div className="jobs-toolbar-card" style={{ padding: 16 }}>
          <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 4 }}>Quotes Pending</div>
          <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>{metrics.pendingQuotes}</div>
        </div>

        <div className="jobs-toolbar-card" style={{ padding: 16 }}>
          <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 4 }}>Overdue Invoices</div>
          <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1 }}>{metrics.overdueInvoices}</div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: 14,
          marginBottom: 14,
        }}
      >
        <div className="jobs-table-card" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0, marginBottom: 14, fontSize: 22 }}>Jobs by Status</h2>

          <div style={{ display: "grid", gap: 12 }}>
            {[
              { label: "Booked", value: jobStatusCounts.new, color: "#2563eb" },
              { label: "Scheduled", value: jobStatusCounts.scheduled, color: "#7c3aed" },
              { label: "In Progress", value: jobStatusCounts.in_progress, color: "#f59e0b" },
              { label: "Completed", value: jobStatusCounts.completed, color: "#16a34a" },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 10,
                    background: "#e5e7eb",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(item.value / maxStatusCount) * 100}%`,
                      borderRadius: 999,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0, marginBottom: 14, fontSize: 22 }}>Jobs This Week</h2>

          <div
            style={{
              display: "flex",
              alignItems: "end",
              gap: 10,
              minHeight: 165,
            }}
          >
            {jobsByDay.map((item) => (
              <div
                key={item.label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: 6,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600 }}>{item.value}</div>
                <div
                  style={{
                    width: "100%",
                    maxWidth: 34,
                    height: `${(item.value / maxTrendValue) * 110}px`,
                    minHeight: 14,
                    background: item.color,
                    borderRadius: 10,
                    boxShadow: `0 6px 12px ${item.color}22`,
                  }}
                />
                <div style={{ fontSize: 11, color: "#6b7280" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: 14,
          marginBottom: 14,
        }}
      >
        <div className="jobs-table-card" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: 22 }}>Today&apos;s Schedule</h2>

          <div className="jobs-table-wrap">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Job #</th>
                  <th>Customer</th>
                  <th>Technician</th>
                  <th>Time</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.jobNumber}</td>
                    <td>{appointment.customer}</td>
                    <td>{appointment.technician}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: 22 }}>Attention Items</h2>

          <div style={{ display: "grid", gap: 10 }}>
            <div
              style={{
                padding: 12,
                borderRadius: 12,
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 4, color: "#1d4ed8", fontSize: 14 }}>
                Overdue Invoices
              </div>
              <div style={{ color: "#475569", fontSize: 13 }}>
                {metrics.overdueInvoices} invoices need follow-up from finance.
              </div>
            </div>

            <div
              style={{
                padding: 12,
                borderRadius: 12,
                background: "#fff7ed",
                border: "1px solid #fdba74",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 4, color: "#c2410c", fontSize: 14 }}>
                Unassigned Jobs
              </div>
              <div style={{ color: "#475569", fontSize: 13 }}>
                2 jobs still need technicians assigned before dispatch.
              </div>
            </div>

            <div
              style={{
                padding: 12,
                borderRadius: 12,
                background: "#f0fdf4",
                border: "1px solid #86efac",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 4, color: "#15803d", fontSize: 14 }}>
                Pending Quotes
              </div>
              <div style={{ color: "#475569", fontSize: 13 }}>
                6 quotes are awaiting approval or client response.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        <div className="jobs-table-card" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: 22 }}>Recent Jobs</h2>

          <div className="jobs-table-wrap">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.customer}</td>
                    <td>{job.serviceType}</td>
                    <td>
                      <span className={`jobs-status-pill ${getJobStatusClass(job.status)}`}>
                        {formatJobStatus(job.status)}
                      </span>
                    </td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 16 }}>
          <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: 22 }}>Invoice Watchlist</h2>

          <div className="jobs-table-wrap">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {urgentInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.customer}</td>
                    <td>{formatCurrency(invoice.amount)}</td>
                    <td>
                      <span className={`jobs-status-pill ${getInvoiceStatusClass(invoice.status)}`}>
                        {formatInvoiceStatus(invoice.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}