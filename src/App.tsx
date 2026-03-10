import { Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">OpsCraft</div>
        <nav>
          <Link to="/">Dashboard</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
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