import { useMemo, useState } from "react";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

type Invoice = {
  id: string;
  invoiceNumber: string;
  customer: string;
  relatedJob: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
};

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV2001",
    customer: "Vodacom",
    relatedJob: "JB00021",
    amount: 3500,
    status: "sent",
    issuedAt: "2026-03-28",
  },
  {
    id: "2",
    invoiceNumber: "INV2002",
    customer: "Kwame Test",
    relatedJob: "JB00022",
    amount: 12800,
    status: "draft",
    issuedAt: "2026-03-29",
  },
  {
    id: "3",
    invoiceNumber: "INV2003",
    customer: "Makhoba Projects",
    relatedJob: "JB00023",
    amount: 5400,
    status: "paid",
    issuedAt: "2026-03-30",
  },
  {
    id: "4",
    invoiceNumber: "INV2004",
    customer: "Legacy Client Pty Ltd",
    relatedJob: "JB00024",
    amount: 7400,
    status: "overdue",
    issuedAt: "2026-03-31",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function getInvoiceStatusLabel(status: InvoiceStatus) {
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
      return "status-booked";
    case "draft":
    default:
      return "status-booked";
  }
}

export default function Invoices() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredInvoices = useMemo(() => {
    let result = [...mockInvoices];

    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((invoice) => {
        return (
          invoice.invoiceNumber.toLowerCase().includes(query) ||
          invoice.customer.toLowerCase().includes(query) ||
          invoice.relatedJob.toLowerCase().includes(query)
        );
      });
    }

    if (statusFilter) {
      result = result.filter((invoice) => invoice.status === statusFilter);
    }

    return result;
  }, [search, statusFilter]);

  return (
    <div className="jobs-page">
      <div className="jobs-topbar">
        <div className="jobs-topbar-left">
          <h1 className="jobs-page-title">Invoices</h1>
        </div>
      </div>

      <section className="jobs-toolbar-card">
        <div className="jobs-toolbar-row">
          <div className="jobs-toolbar-left">
            <input
              className="jobs-search-input"
              placeholder="Search invoices"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="jobs-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Invoice Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="jobs-toolbar-right">
            <button type="button" className="jobs-primary-button">
              Create Invoice +
            </button>
          </div>
        </div>
      </section>

      <section className="jobs-table-card">
        <div className="jobs-table-wrap">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Related Job</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Issued</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="jobs-empty-state">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.customer}</td>
                    <td>{invoice.relatedJob}</td>
                    <td>{formatCurrency(invoice.amount)}</td>
                    <td>
                      <span className={`jobs-status-pill ${getInvoiceStatusClass(invoice.status)}`}>
                        {getInvoiceStatusLabel(invoice.status)}
                      </span>
                    </td>
                    <td>{new Date(invoice.issuedAt).toLocaleDateString()}</td>
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