import React, {
useEffect,
useState
} from "react";

import api from "../api/axios";

import {
useNavigate
} from "react-router-dom";

import {
LineChart,
Line,
PieChart,
Pie,
Cell,
CartesianGrid,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
} from "recharts";

function Analytics() {

const navigate =
useNavigate();

const [
subscriptions,
setSubscriptions
] = useState([]);

useEffect(() => {
fetchSubscriptions();
}, []);

const fetchSubscriptions = async () => {


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

const totalSpend =
subscriptions.reduce(
(sum, sub) =>
sum + Number(sub.cost),
0
);

const totalSubscriptions =
subscriptions.length;

const categoryMap = {};

subscriptions.forEach((sub) => {


if (!categoryMap[sub.category]) {

  categoryMap[sub.category] =
    Number(sub.cost);

} else {

  categoryMap[sub.category] +=
    Number(sub.cost);

}


});

const categoryData =
Object.keys(categoryMap).map(
(key) => ({
name: key,
value: categoryMap[key],
})
);

const monthlyData =
subscriptions.map(
(sub, index) => ({
month: `S${index + 1}`,
spend: Number(sub.cost),
})
);

const COLORS = [
"#4F46E5",
"#06B6D4",
"#10B981",
"#F59E0B",
"#EF4444",
"#8B5CF6",
];

const highestSubscription =
subscriptions.length > 0
? subscriptions.reduce(
(max, sub) =>
Number(sub.cost) >
Number(max.cost)
? sub
: max
)
: null;

const exportPdf = async () => {

  try {

    const token =
      localStorage.getItem(
        "access"
      );

    const response =
      await api.get(
        "http://127.0.0.1:8000/export-pdf/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          },
          responseType: "blob"
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "subscriptions.pdf";

    document.body.appendChild(
      link
    );

    link.click();

  } catch (error) {

    console.error(error);

  }

};

const exportExcel = async () => {

  try {

    const token =
      localStorage.getItem(
        "access"
      );

    const response =
      await api.get(
        "http://127.0.0.1:8000/export-excel/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          },
          responseType: "blob"
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "subscriptions.xlsx";

    document.body.appendChild(
      link
    );

    link.click();

  } catch (error) {

    console.error(error);

  }

};

return (


<div className="container-fluid p-4">

  <button
    className= "premium-back-btn"
    onClick={() => navigate("/")}
  >
    ← Back to Dashboard
  </button>

  <h2 className="premium-title mb-4">
    Analytics Dashboard
  </h2>


  <div className="mb-4">

  <button
    className="btn btn-danger me-2"
    onClick={exportPdf}
  >
    Export PDF
  </button>

  <button
    className="btn btn-success"
    onClick={exportExcel}
  >
    Export Excel
  </button>

</div>

  <div className="row mb-4">

    <div className="col-md-3">
      <div className="glass-card p-4 text-center">
        <h6>💰 Total Spend</h6>
        <h2>₹{totalSpend}</h2>
      </div>
    </div>

    <div className="col-md-3">
      <div className="glass-card p-4 text-center">
        <h6>📦 Subscriptions</h6>
        <h2>{totalSubscriptions}</h2>
      </div>
    </div>

    <div className="col-md-3">
      <div className="glass-card p-4 text-center">
        <h6>📈 Annual Spend</h6>
        <h2>₹{totalSpend * 12}</h2>
      </div>
    </div>

    <div className="col-md-3">
      <div className="glass-card p-4 text-center">
        <h6>🏆 Highest Cost</h6>
        <h2>
          ₹
          {highestSubscription
            ? highestSubscription.cost
            : 0}
        </h2>
      </div>
    </div>

  </div>

  <div className="row">

    <div className="col-md-8">

      <div className="glass-card p-4">

        <h4>
          Subscription Cost Trend
        </h4>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={monthlyData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="spend"
              stroke="#4F46E5"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

    <div className="col-md-4">

      <div className="glass-card p-4">

        <h4 className="mb-4">
  Category Breakdown
</h4>

<div className="donut-wrapper">



        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <PieChart>

            <Pie
  data={categoryData}
  dataKey="value"
  innerRadius={70}
  outerRadius={120}
  paddingAngle={5}
>

              {categoryData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

        <div className="donut-center">

  <h2>
    ₹{totalSpend}
  </h2>

  <span>
    Monthly Spend
  </span>

</div>

</div>

      



      </div>

    </div>

  </div>

  <div className="row mt-4">

    <div className="col-md-12">

      <div className="glass-card p-4">

        <h4>
          Subscription Details
        </h4>

        <table className="table">

          <thead>

            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {subscriptions.map(
              (sub) => (

                <tr key={sub.id}>

                  <td>
                    {sub.service_name}
                  </td>

                  <td>
                    {sub.category}
                  </td>

                  <td>
                    ₹{sub.cost}
                  </td>

                  <td>
                    {sub.status}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>


);

}

export default Analytics;
