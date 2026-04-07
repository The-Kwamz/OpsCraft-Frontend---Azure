import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CreateJob from "./pages/CreateJob";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Customers from "./pages/Customers";
import CreateCustomer from "./pages/CreateCustomer";
import Quotes from "./pages/Quotes";
import Invoices from "./pages/Invoices";
import opsCloudLogo from "./assets/opscloud-logo.png";

function TopNavLink({
  to,
  label,
}: {
  to: string;
  label: string;
}) {
  const location = useLocation();
  const isActive =
    to === "/"
      ? location.pathname === "/"
      : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={isActive ? "top-nav-item top-nav-item--active" : "top-nav-item"}
    >
      {label}
    </Link>
  );
}

function Brand() {
  return (
    <Link
      to="/dashboard"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        minWidth: "fit-content",
        lineHeight: 1,
        height: 64,
      }}
    >
      <img
        src={opsCloudLogo}
        alt="OpsCloud logo"
        style={{
          width: 190,
          height: 190,
          objectFit: "contain",
          display: "block",
        }}
      />
    </Link>
  );
}

export default function App() {
  return (
    <div className="app">
      <header
        className="topbar topbar--nav"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        <Brand />

        <div
          className="topbar-main"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <nav className="top-nav">
            <TopNavLink to="/dashboard" label="Dashboard" />
            <TopNavLink to="/schedule" label="Schedule" />
            <TopNavLink to="/customers" label="Customers" />
            <TopNavLink to="/quotes" label="Quotes" />
            <TopNavLink to="/invoices" label="Invoices" />
            <TopNavLink to="/" label="Jobs" />
          </nav>

          <div className="topbar-user">
            <Link
              to="/notifications"
              className="topbar-user-icon"
              aria-label="Notifications"
            >
              🔔
            </Link>

            <Link
              to="/profile"
              className="topbar-user-icon"
              aria-label="Profile"
            >
              👤
            </Link>
          </div>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new" element={<CreateCustomer />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/jobs/new" element={<CreateJob />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} OpsCloud MVP
      </footer>
    </div>
  );
}