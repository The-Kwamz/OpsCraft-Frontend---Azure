import { useMemo, useState } from "react";

type QuoteStatus = "draft" | "sent" | "approved" | "rejected";

type Quote = {
  id: string;
  quoteNumber: string;
  customer: string;
  description: string;
  amount: number;
  status: QuoteStatus;
  createdAt: string;
};

const mockQuotes: Quote[] = [
  {
    id: "1",
    quoteNumber: "QT1001",
    customer: "Vodacom",
    description: "Call-out electrical inspection",
    amount: 3500,
    status: "sent",
    createdAt: "2026-03-28",
  },
  {
    id: "2",
    quoteNumber: "QT1002",
    customer: "Kwame Test",
    description: "Installation and wiring",
    amount: 12800,
    status: "draft",
    createdAt: "2026-03-29",
  },
  {
    id: "3",
    quoteNumber: "QT1003",
    customer: "Makhoba Projects",
    description: "Preventative maintenance visit",
    amount: 5400,
    status: "approved",
    createdAt: "2026-03-30",
  },
  {
    id: "4",
    quoteNumber: "QT1004",
    customer: "Legacy Client Pty Ltd",
    description: "Lighting replacement scope",
    amount: 7400,
    status: "rejected",
    createdAt: "2026-03-31",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function getQuoteStatusLabel(status: QuoteStatus) {
  switch (status) {
    case "draft":
      return "Draft";
    case "sent":
      return "Sent";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

function getQuoteStatusClass(status: QuoteStatus) {
  switch (status) {
    case "approved":
      return "status-completed";
    case "rejected":
      return "status-in-progress";
    case "sent":
      return "status-booked";
    case "draft":
    default:
      return "status-booked";
  }
}

export default function Quotes() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredQuotes = useMemo(() => {
    let result = [...mockQuotes];

    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((quote) => {
        return (
          quote.quoteNumber.toLowerCase().includes(query) ||
          quote.customer.toLowerCase().includes(query) ||
          quote.description.toLowerCase().includes(query)
        );
      });
    }

    if (statusFilter) {
      result = result.filter((quote) => quote.status === statusFilter);
    }

    return result;
  }, [search, statusFilter]);

  return (
    <div className="jobs-page">
      <div className="jobs-topbar">
        <div className="jobs-topbar-left">
          <h1 className="jobs-page-title">Quotes</h1>
        </div>
      </div>

      <section className="jobs-toolbar-card">
        <div className="jobs-toolbar-row">
          <div className="jobs-toolbar-left">
            <input
              className="jobs-search-input"
              placeholder="Search quotes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="jobs-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Quote Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="jobs-toolbar-right">
            <button type="button" className="jobs-primary-button">
              Create Quote +
            </button>
          </div>
        </div>
      </section>

      <section className="jobs-table-card">
        <div className="jobs-table-wrap">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Quote #</th>
                <th>Customer</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="jobs-empty-state">
                    No quotes found.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => (
                  <tr key={quote.id}>
                    <td>{quote.quoteNumber}</td>
                    <td>{quote.customer}</td>
                    <td>{quote.description}</td>
                    <td>{formatCurrency(quote.amount)}</td>
                    <td>
                      <span className={`jobs-status-pill ${getQuoteStatusClass(quote.status)}`}>
                        {getQuoteStatusLabel(quote.status)}
                      </span>
                    </td>
                    <td>{new Date(quote.createdAt).toLocaleDateString()}</td>
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