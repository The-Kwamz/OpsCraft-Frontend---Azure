import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

type CustomerStatus = "active" | "inactive";

type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  status: CustomerStatus;
};

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Kwame Test",
    company: "OpsCloud Demo",
    email: "kwame@test.com",
    phone: "071 000 0001",
    city: "Pretoria",
    status: "active",
  },
  {
    id: "2",
    name: "Vodacom Facilities",
    company: "Vodacom",
    email: "facilities@vodacom.co.za",
    phone: "071 000 0002",
    city: "Johannesburg",
    status: "active",
  },
  {
    id: "3",
    name: "Makhoba Projects",
    company: "Makhoba Projects",
    email: "admin@makhoba.co.za",
    phone: "071 000 0003",
    city: "Pretoria",
    status: "active",
  },
  {
    id: "4",
    name: "Legacy Client",
    company: "Legacy Client Pty Ltd",
    email: "info@legacyclient.co.za",
    phone: "071 000 0004",
    city: "Cape Town",
    status: "inactive",
  },
];

function getStatusLabel(status: CustomerStatus) {
  return status === "active" ? "Active" : "Inactive";
}

function getStatusClass(status: CustomerStatus) {
  return status === "active" ? "status-completed" : "status-booked";
}

export default function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredCustomers = useMemo(() => {
    let result = [...mockCustomers];

    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((customer) => {
        return (
          customer.name.toLowerCase().includes(query) ||
          customer.company.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.phone.toLowerCase().includes(query) ||
          customer.city.toLowerCase().includes(query)
        );
      });
    }

    if (statusFilter) {
      result = result.filter((customer) => customer.status === statusFilter);
    }

    return result;
  }, [search, statusFilter]);

  return (
    <div className="jobs-page">
      <div className="jobs-topbar">
        <div className="jobs-topbar-left">
          <h1 className="jobs-page-title">Customers</h1>
        </div>
      </div>

      <section className="jobs-toolbar-card">
        <div className="jobs-toolbar-row">
          <div className="jobs-toolbar-left">
            <input
              className="jobs-search-input"
              placeholder="Search customers"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="jobs-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Customer Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="jobs-toolbar-right">
            <Link to="/customers/new" className="jobs-primary-button">
              Add Customer +
            </Link>
          </div>
        </div>
      </section>

      <section className="jobs-table-card">
        <div className="jobs-table-wrap">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="jobs-empty-state">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.company}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.city}</td>
                    <td>
                      <span className={`jobs-status-pill ${getStatusClass(customer.status)}`}>
                        {getStatusLabel(customer.status)}
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