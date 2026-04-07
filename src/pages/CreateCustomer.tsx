import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type CustomerFormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  notes: string;
};

export default function CreateCustomer() {
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerFormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    notes: "",
  });

  function updateField<K extends keyof CustomerFormState>(
    key: K,
    value: CustomerFormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Create customer payload:", form);
    navigate("/customers");
  }

  return (
    <div className="jobs-page">
      <div className="create-job-breadcrumb">
        <Link to="/customers" className="create-job-breadcrumb-link">
          Customers
        </Link>
        <span className="create-job-breadcrumb-sep">›</span>
        <span className="create-job-breadcrumb-current">Add Customer</span>
      </div>

      <div className="jobs-toolbar-card" style={{ marginBottom: 24 }}>
        <h1 className="jobs-page-title" style={{ marginBottom: 8 }}>
          Add Customer
        </h1>
        <div style={{ color: "#6b7280" }}>
          Create a new customer profile for OpsCloud.
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 24 }}>
        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 20 }}>Customer Details</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
                Full Name
              </label>
              <input
                className="jobs-search-input"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
                Company Name
              </label>
              <input
                className="jobs-search-input"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
                Email Address
              </label>
              <input
                type="email"
                className="jobs-search-input"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
                Phone Number
              </label>
              <input
                className="jobs-search-input"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
                City
              </label>
              <input
                className="jobs-search-input"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="jobs-table-card" style={{ padding: 24 }}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Notes</h2>
          <textarea
            className="create-job-textarea"
            placeholder="Add customer notes..."
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
          }}
        >
          <Link
            to="/customers"
            className="jobs-secondary-button"
            style={{ textDecoration: "none" }}
          >
            Cancel
          </Link>
          <button type="submit" className="jobs-primary-button">
            Save Customer
          </button>
        </div>
      </form>
    </div>
  );
}