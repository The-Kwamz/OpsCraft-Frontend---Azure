import { Routes, Route, Link, Navigate } from "react-router-dom";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">OpsCraft</div>

        <nav className="sidebar-nav">
          <button type="button" className="sidebar-item">
            Dashboard
          </button>

          <button type="button" className="sidebar-item active">
            Jobs
          </button>

          <button type="button" className="sidebar-item">
            Quotes
          </button>

          <button type="button" className="sidebar-item">
            Invoices
          </button>
        </nav>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="brand">OpsCraft</div>
          <nav>
            <Link to="/">Jobs</Link>
          </nav>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} OpsCraft MVP
        </footer>
      </div>
    </div>
  );
}