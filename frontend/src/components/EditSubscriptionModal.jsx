import React, { useState, useEffect } from "react";

function EditSubscriptionModal({
  show,
  subscription,
  onClose,
  onSave,
}) {

  const [formData, setFormData] =
    useState({});

  useEffect(() => {
    if (subscription) {
      setFormData(subscription);
    }
  }, [subscription]);

  if (!show || !subscription)
    return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal d-block">

      <div className="modal-dialog">

        <div className="modal-content p-4">

          <h3>
            Edit Subscription
          </h3>

          <input
            className="form-control mb-2"
            name="service_name"
            value={
              formData.service_name || ""
            }
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            name="category"
            value={
              formData.category || ""
            }
            onChange={handleChange}
          />

          <input
            type="number"
            className="form-control mb-2"
            name="cost"
            value={formData.cost || ""}
            onChange={handleChange}
          />

          <select
            className="form-select mb-2"
            name="billing_cycle"
            value={
              formData.billing_cycle || ""
            }
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
              formData.next_billing_date || ""
            }
            onChange={handleChange}
          />

          <button
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Save Changes
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

export default EditSubscriptionModal;