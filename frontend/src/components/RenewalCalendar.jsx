import React from "react";

function RenewalCalendar({ subscriptions }) {
  return (
    <div className="glass-card p-4">

      <h3>📅 Renewal Calendar</h3>

      <table className="table mt-3">

        <thead>
          <tr>
            <th>Service</th>
            <th>Renewal Date</th>
          </tr>
        </thead>

        <tbody>

          {subscriptions.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.service_name}</td>

              <td>
                {sub.next_billing_date}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RenewalCalendar;