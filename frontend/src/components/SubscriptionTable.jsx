import React, {useState} from "react";

function SubscriptionTable({
  subscriptions,
  search,
  setSearch,
  onEdit,
  onDelete,
}) {
  const [categoryFilter,
setCategoryFilter] =
useState("All");

const [billingFilter,
setBillingFilter] =
useState("All");

const [costFilter,
setCostFilter] =
useState("All");

const [statusFilter,
setStatusFilter] =
useState("All");

  const filtered =
subscriptions.filter((sub)=>{

// const searchMatch =
// sub.service_name
// .toLowerCase()
// .includes(
// search.toLowerCase()
// );

const searchMatch =

sub.service_name
.toLowerCase()
.includes(search.toLowerCase())

||

sub.category
.toLowerCase()
.includes(search.toLowerCase())

||

sub.billing_cycle
.toLowerCase()
.includes(search.toLowerCase())

||

sub.status
.toLowerCase()
.includes(search.toLowerCase())

||

sub.next_billing_date
.toLowerCase()
.includes(search.toLowerCase());

const costMatch =
  costFilter === "All" ||

  (costFilter === "0-300" &&
    Number(sub.cost) >= 0 &&
    Number(sub.cost) <= 300) ||

  (costFilter === "301-600" &&
    Number(sub.cost) >= 301 &&
    Number(sub.cost) <= 600) ||

  (costFilter === "601-1000" &&
    Number(sub.cost) >= 601 &&
    Number(sub.cost) <= 1000) ||

  (costFilter === "1001-1500" &&
    Number(sub.cost) >= 1001 &&
    Number(sub.cost) <= 1500) ||

  (costFilter === "1501-2000" &&
    Number(sub.cost) >= 1501 &&
    Number(sub.cost) <= 2000) ||

  (costFilter === "2000+" &&
    Number(sub.cost) > 2000);

const statusMatch =
statusFilter === "All" ||
sub.status === statusFilter;

const billingMatch =
billingFilter === "All" ||
sub.billing_cycle === billingFilter;

const categoryMatch =
categoryFilter === "All"
||
sub.category ===
categoryFilter;

return (
searchMatch &&
categoryMatch &&
statusMatch &&
billingMatch &&
costMatch
);
});
  

  return (
    <div className="card shadow-lg border-0 mt-4">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Subscriptions</h3>

          <div className="search-wrapper">

  <span className="search-icon">
    🔍
  </span>

  <input
    type="text"
    className="form-control subscription-search"
    placeholder="Search subscriptions..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>
        </div>
        




        <div className="advanced-filters">

  <h6>🔍 Advanced Filters</h6>

  <div className="filter-row">

    <select
      value={categoryFilter}
      onChange={(e)=>setCategoryFilter(e.target.value)}
      className="filter-select"
    >
      <option>All Categories</option>
      <option>Entertainment</option>
      <option>Music</option>
      <option>Productivity</option>
    </select>

    <select
      value={statusFilter}
      onChange={(e)=>setStatusFilter(e.target.value)}
      className="filter-select"
    >
      <option>All Status</option>
      <option>Active</option>
      <option>Inactive</option>
    </select>

    <select
      value={billingFilter}
      onChange={(e)=>setBillingFilter(e.target.value)}
      className="filter-select"
    >
      <option>All Billing</option>
      <option>Monthly</option>
      <option>Yearly</option>
    </select>

    <select
  className="filter-select"
  value={costFilter}
  onChange={(e) => setCostFilter(e.target.value)}
>
  <option value="All">All Costs</option>

  <option value="0-300">₹0 - ₹300</option>
  <option value="301-600">₹301 - ₹600</option>
  <option value="601-1000">₹601 - ₹1000</option>
  <option value="1001-1500">₹1001 - ₹1500</option>
  <option value="1501-2000">₹1501 - ₹2000</option>
  <option value="2000+">₹2000+</option>
</select>

    <button
      className="clear-btn"
      onClick={()=>{
        setSearch("");
        setCategoryFilter("All");
        setStatusFilter("All");
        setBillingFilter("All");
setCostFilter("All");
      }}
    >
      Reset
    </button>

  </div>

</div>

<div className="active-filters">

{categoryFilter !== "All" && (
<span className="filter-pill">
🏷 {categoryFilter}
</span>
)}

{statusFilter !== "All" && (
<span className="filter-pill">
🟢 {statusFilter}
</span>
)}

{billingFilter !== "All" && (
<span className="filter-pill">
💳 {billingFilter}
</span>
)}

{costFilter !== "All" && (
<span className="filter-pill">
💰 {costFilter}
</span>
)}

</div>




        <div className="table-responsive">

          <p className="filter-count">

Showing

<strong>
 {filtered.length}
</strong>

of

<strong>
 {subscriptions.length}
</strong>

subscriptions

</p>



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

{filtered.length === 0 ? (

<tr>
<td
colSpan="7"
className="text-center"
>
No subscriptions found
</td>
</tr>

) : (

filtered.map((sub) => (
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
              ))
            )}
          </tbody>

        </table>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionTable;