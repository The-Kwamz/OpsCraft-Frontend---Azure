import { useMemo, useState } from "react";

type AppointmentStatus = "scheduled" | "in_progress" | "completed";

type Appointment = {
  id: string;
  jobNumber: string;
  customer: string;
  technician: string;
  date: string;
  time: string;
  location: string;
  status: AppointmentStatus;
};

const mockAppointments: Appointment[] = [
  {
    id: "1",
    jobNumber: "JB00021",
    customer: "Vodacom",
    technician: "S. Mokoena",
    date: "2026-04-01",
    time: "08:00",
    location: "Johannesburg",
    status: "scheduled",
  },
  {
    id: "2",
    jobNumber: "JB00022",
    customer: "Kwame Test",
    technician: "T. Nkosi",
    date: "2026-04-01",
    time: "10:30",
    location: "Pretoria",
    status: "in_progress",
  },
  {
    id: "3",
    jobNumber: "JB00023",
    customer: "Makhoba Projects",
    technician: "L. Dlamini",
    date: "2026-04-02",
    time: "09:00",
    location: "Midrand",
    status: "scheduled",
  },
  {
    id: "4",
    jobNumber: "JB00024",
    customer: "Legacy Client Pty Ltd",
    technician: "P. Khumalo",
    date: "2026-04-02",
    time: "13:00",
    location: "Cape Town",
    status: "completed",
  },
];

function getStatusLabel(status: AppointmentStatus) {
  switch (status) {
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

function getStatusClass(status: AppointmentStatus) {
  switch (status) {
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

export default function Schedule() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredAppointments = useMemo(() => {
    let result = [...mockAppointments];

    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((appointment) => {
        return (
          appointment.jobNumber.toLowerCase().includes(query) ||
          appointment.customer.toLowerCase().includes(query) ||
          appointment.technician.toLowerCase().includes(query) ||
          appointment.location.toLowerCase().includes(query)
        );
      });
    }

    if (statusFilter) {
      result = result.filter((appointment) => appointment.status === statusFilter);
    }

    return result;
  }, [search, statusFilter]);

  return (
    <div className="jobs-page">
      <div className="jobs-topbar">
        <div className="jobs-topbar-left">
          <h1 className="jobs-page-title">Schedule</h1>
        </div>
      </div>

      <section className="jobs-toolbar-card">
        <div className="jobs-toolbar-row">
          <div className="jobs-toolbar-left">
            <input
              className="jobs-search-input"
              placeholder="Search schedule"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="jobs-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Appointment Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="jobs-toolbar-right">
            <button type="button" className="jobs-primary-button">
              Add Appointment +
            </button>
          </div>
        </div>
      </section>

      <section className="jobs-table-card">
        <div className="jobs-table-wrap">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job #</th>
                <th>Customer</th>
                <th>Technician</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="jobs-empty-state">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.jobNumber}</td>
                    <td>{appointment.customer}</td>
                    <td>{appointment.technician}</td>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.location}</td>
                    <td>
                      <span className={`jobs-status-pill ${getStatusClass(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}