import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ subscriptions }) {

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text(
      "SubSmart Subscription Report",
      20,
      20
    );

    autoTable(doc, {
      head: [
        [
          "Service",
          "Category",
          "Cost"
        ]
      ],
      body: subscriptions.map((sub) => [
        sub.service_name,
        sub.category,
        sub.cost,
      ]),
    });

    doc.save("subscriptions.pdf");
  };

  return (
    <button
      className="btn btn-danger"
      onClick={exportPDF}
    >
      Export PDF
    </button>
  );
}

export default ExportPDF;