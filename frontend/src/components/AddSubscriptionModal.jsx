import React, { useState } from "react";

function AddSubscriptionModal({
show,
onClose,
onAdd,
}) {

const [formData, setFormData] =
useState({
service_name: "",
category: "",
cost: "",
billing_cycle: "Monthly",
next_billing_date: "",
status: "Active",
});

const [customCategory,
setCustomCategory] =
useState("");

if (!show) return null;



const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]:
e.target.value,
});
};

const detectCategory = (name) => {

  const service = name.toLowerCase();

  if (
    service.includes("netflix") ||
    service.includes("prime") ||
    service.includes("hotstar") ||
    service.includes("youtube")
  ) {
    return "Entertainment";
  }

  if (
    service.includes("spotify") ||
    service.includes("apple music")
  ) {
    return "Music";
  }

  if (
    service.includes("aws") ||
    service.includes("azure")
  ) {
    return "Cloud";
  }

  if (
    service.includes("chatgpt") ||
    service.includes("github")
  ) {
    return "Productivity";
  }

  return "Other";
};

const handleSubmit = () => {

  console.log("onAdd:", onAdd);
  console.log("onClose:", onClose);
  console.log("formData:", formData);

  if (typeof onAdd !== "function") {
    alert("onAdd is not a function");
    return;
  }

  const updatedData = {
  ...formData,
  category: detectCategory(
    formData.service_name
  ),
};

const finalData = {

  ...formData,

  category:
    formData.category === "Other"
      ? customCategory
      : formData.category,

};

onAdd(finalData);

  setFormData({
    service_name: "",
    category: "",
    cost: "",
    billing_cycle: "Monthly",
    next_billing_date: "",
    status: "Active",
  });

  setCustomCategory("");

  onClose();
};

return ( <div className="modal d-block">

```
  <div className="modal-dialog">

    <div className="modal-content p-4">

      <h3>
        Add Subscription
      </h3>

      <input
        className="form-control mb-2"
        name="service_name"
        placeholder="Service Name"
        value={formData.service_name}
        onChange={handleChange}
      />

      <select
  className="form-select mb-2"
  name="category"
  value={formData.category}
  onChange={handleChange}
>
  <option value="">
    Select Category
  </option>

  <option value="Entertainment">
    Entertainment
  </option>

  <option value="Music">
    Music
  </option>

  <option value="Productivity">
    Productivity
  </option>

  <option value="Cloud">
    Cloud
  </option>

  <option value="Education">
    Education
  </option>

  <option value="Gaming">
    Gaming
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Finance">
    Finance
  </option>

  <option value="Other">
    Other
  </option>

</select>

{
  formData.category === "Other" && (

    <input
      className="form-control mb-2"
      placeholder="Enter Custom Category"
      value={customCategory}
      onChange={(e) =>
        setCustomCategory(
          e.target.value
        )
      }
    />

  )
}

      <input
        className="form-control mb-2"
        name="cost"
        type="number"
        placeholder="Cost"
        value={formData.cost}
        onChange={handleChange}
      />

      <select
        className="form-select mb-2"
        name="billing_cycle"
        value={formData.billing_cycle}
        onChange={handleChange}
      >
        <option>Monthly</option>
        <option>Yearly</option>
      </select>

      <input
        type="date"
        className="form-control mb-2"
        name="next_billing_date"
        value={
          formData.next_billing_date
        }
        onChange={handleChange}
      />

      <button
        className="btn btn-success"
        onClick={handleSubmit}
      >
        Add Subscription
      </button>

      <button
        className="btn btn-danger mt-2"
        onClick={onClose}
      >
        Cancel
      </button>

    </div>

  </div>

</div>


);
}

export default AddSubscriptionModal;
