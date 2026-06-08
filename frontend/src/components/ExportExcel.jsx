import * as XLSX from "xlsx";

function ExportExcel({ subscriptions }) {

  const exportExcel = () => {
    const worksheet =
      XLSX.utils.json_to_sheet(
        subscriptions
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Subscriptions"
    );

    XLSX.writeFile(
      workbook,
      "subscriptions.xlsx"
    );
  };

  return (
    <button
      className="btn btn-success ms-2"
      onClick={exportExcel}
    >
      Export Excel
    </button>
  );
}

export default ExportExcel;