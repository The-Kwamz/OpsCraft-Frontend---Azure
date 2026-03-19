import { Routes, Route, Link, Navigate } from "react-router-dom";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CreateJob from "./pages/CreateJob";

export default function App() {
  return (
    <div className="app">
      <header className="topbar topbar--nav">
        <div className="brand">OpsCraft</div>

        <div className="topbar-main">
          <nav className="top-nav">
            <button type="button" className="top-nav-item">
              Dashboard
            </button>

            <button type="button" className="top-nav-item">
              Schedule
            </button>

            <button type="button" className="top-nav-item">
              Customers
            </button>

            <button type="button" className="top-nav-item">
              Quotes
            </button>

            <button type="button" className="top-nav-item">
              Invoices
            </button>

            <Link to="/" className="top-nav-item top-nav-item--active">
              Jobs
            </Link>
          </nav>

          <div className="topbar-user">
            <Link to="/notifications" className="topbar-user-icon" aria-label="Notifications">
              🔔
            </Link>

            <Link to="/profile" className="topbar-user-icon" aria-label="Profile">
              👤
            </Link>
          </div>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/jobs/new" element={<CreateJob />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} OpsCraft MVP
      </footer>
    </div>
  );
}