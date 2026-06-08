import React from "react";

function SubscriptionTable({
  subscriptions,
  search,
  setSearch,
  onEdit,
  onDelete,
}) {
  const filtered = subscriptions.filter((sub) =>
    sub.service_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-lg border-0 mt-4">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Subscriptions</h3>

          <input
            type="text"
            className="form-control"
            style={{ width: "300px" }}
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Billing</th>
              <th>Renewal</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.service_name}</td>

                <td>{sub.category}</td>

                <td>
                  <strong>₹{sub.cost}</strong>
                </td>

                <td>{sub.billing_cycle}</td>

                <td>{sub.next_billing_date}</td>

                <td>
                  <span
                    className={
                      sub.status === "Active"
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >
                    {sub.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(sub)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(sub.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default SubscriptionTable;