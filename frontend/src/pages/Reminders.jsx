import React, {
useEffect,
useState
} from "react";

import api from "../api/axios";

import {
useNavigate
} from "react-router-dom";

function Reminders() {

const navigate =
useNavigate();

const [
subscriptions,
setSubscriptions
] = useState([]);

useEffect(() => {
fetchData();
}, []);

const fetchData = async () => {


try {

  const token =
    localStorage.getItem(
      "access"
    );

  const response =
    await api.get(
      "http://127.0.0.1:8000/api/subscriptions/",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  setSubscriptions(
    response.data
  );

} catch (error) {

  console.error(error);

}


};

const getDaysLeft = (date) => {


const today =
  new Date();

const renewal =
  new Date(date);

const diff =
  renewal - today;

return Math.ceil(
  diff /
  (1000 * 60 * 60 * 24)
);


};

return (


<div className="container-fluid p-4">

  <button
    className="premium-back-btn"
    onClick={() => navigate("/")}
  >
    ← Back to Dashboard
  </button>

  <h2 className="premium-title mb-4">
    Renewal Reminders
  </h2>

  {subscriptions.length === 0 && (

    <div className="glass-card p-4">

      <h5>
        No subscriptions found
      </h5>

    </div>

  )}

  {subscriptions.map((sub) => {

    const daysLeft =
      getDaysLeft(
        sub.next_billing_date
      );

    return (

      <div
        key={sub.id}
        className="glass-card p-4 mb-3"
        style={{
          borderLeft:
            daysLeft <= 3
              ? "5px solid #EF4444"
              : daysLeft <= 7
              ? "5px solid #F59E0B"
              : "5px solid #10B981",
        }}
      >

        <h4>
          {sub.service_name}
        </h4>

        <p>
          Category:
          {sub.category}
        </p>

        <p>
          Cost:
          ₹{sub.cost}
        </p>

        <p> Renewal Date: {sub.next_billing_date}</p>

            <p style={{ color:"#10B981" }} >
            { Math.ceil(( new Date( sub.next_billing_date ) - new Date())/(1000*60*60*24))}
            Days Left
            </p>

        <h5>

          {daysLeft < 0
            ? "❌ Overdue"
            : `${daysLeft} Days Left`}

        </h5>

      </div>

    );

  })}

</div>


);

}

export default Reminders;
