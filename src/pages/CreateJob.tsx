import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Api } from "../lib/api";

type JobFormState = {
  customerName: string;
  serviceType: string;
  address: string;
  notes: string;
  scheduledDate: string;
  scheduledTime: string;
};

function toDateInputValue(dateString: string | null) {
  if (!dateString) return "";
  return dateString;
}

export default function CreateJob() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialDate = useMemo(() => {
    return toDateInputValue(searchParams.get("date"));
  }, [searchParams]);

  const initialTime = useMemo(() => {
    return searchParams.get("time") || "";
  }, [searchParams]);

  const [form, setForm] = useState<JobFormState>({
    customerName: "",
    serviceType: "",
    address: "",
    notes: "",
    scheduledDate: initialDate,
    scheduledTime: initialTime,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof JobFormState>(key: K, value: JobFormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      let scheduledDate: string | null = null;

      if (form.scheduledDate) {
        if (form.scheduledTime) {
          scheduledDate = new Date(`${form.scheduledDate}T${form.scheduledTime}:00`).toISOString();
        } else {
          scheduledDate = new Date(`${form.scheduledDate}T08:00:00`).toISOString();
        }
      }

      await Api.createJob({
        customerName: form.customerName,
        serviceType: form.serviceType,
        address: form.address,
        notes: form.notes,
        scheduledDate,
      });

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create job");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="jobs-page">
      <div className="jobs-topbar">
        <div className="jobs-topbar-left">
          <h1 className="jobs-page-title">Add Job</h1>
        </div>
      </div>

      <section className="jobs-toolbar-card" style={{ maxWidth: 760 }}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="customerName">Customer Name</label>
            <input
              id="customerName"
              className="jobs-search-input"
              value={form.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
              required
            />
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="serviceType">Job Type / Service Type</label>
            <input
              id="serviceType"
              className="jobs-search-input"
              value={form.serviceType}
              onChange={(e) => updateField("serviceType", e.target.value)}
              required
            />
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              className="jobs-search-input"
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 16 }}>
            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="scheduledDate">Scheduled Date</label>
              <input
                id="scheduledDate"
                type="date"
                className="jobs-search-input"
                value={form.scheduledDate}
                onChange={(e) => updateField("scheduledDate", e.target.value)}
              />
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label htmlFor="scheduledTime">Scheduled Time</label>
              <input
                id="scheduledTime"
                type="time"
                className="jobs-search-input"
                value={form.scheduledTime}
                onChange={(e) => updateField("scheduledTime", e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={5}
              style={{
                width: "100%",
                borderRadius: 14,
                border: "1px solid #d1d5db",
                padding: 14,
                font: "inherit",
                resize: "vertical",
              }}
            />
          </div>

          {error ? (
            <div style={{ color: "#b91c1c", fontWeight: 600 }}>{error}</div>
          ) : null}

          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" className="jobs-primary-button" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Job"}
            </button>

            <Link to="/" className="top-nav-item" style={{ textDecoration: "none" }}>
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}