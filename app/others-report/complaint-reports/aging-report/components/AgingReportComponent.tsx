"use client";
import DownloadDropdown from "../../../../components/DownloadDropdown";
import { AgingReportProp } from "../page";
import AgingReportTable from "./AgingReportTable";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface AgingReportComponentProp {
  data: AgingReportProp[];
}

const AgingReportComponent = ({ data }: AgingReportComponentProp) => {
  const exportAgingReportToExcel = (data: AgingReportProp[]) => {
    const totalComplaints = data.reduce(
      (sum, item) => sum + (item.numberOfComplaints || 0),
      0
    );

    const formattedData = data.map((item, index) => ({
      "Sr #": `${index + 1}`,
      "Day Range": item.dayRange,
      "Number of Complaints": item.numberOfComplaints,
    }));

    formattedData.push({
      "Sr #": "",
      "Day Range": "Total",
      "Number of Complaints": totalComplaints,
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Aging Report");
    XLSX.writeFile(workbook, "Aging_Report.xlsx");
  };

  const exportAgingReportToPDF = (data: AgingReportProp[]) => {
    const doc = new jsPDF();

    const totalComplaints = data.reduce(
      (sum, item) => sum + (item.numberOfComplaints || 0),
      0
    );

    doc.setFontSize(14);
    doc.text("Aging Report", 14, 15);

    const tableBody = data.map((item, index) => [
      index + 1,
      item.dayRange,
      item.numberOfComplaints,
    ]);

    tableBody.push(["", "Total", totalComplaints]);

    autoTable(doc, {
      startY: 25,
      head: [["Sr #", "Day Range", "Number of Complaints"]],
      body: tableBody,
      styles: {
        fontSize: 10,
      },
      didParseCell: (hookData) => {
        if (hookData.row.index === tableBody.length - 1) {
          hookData.cell.styles.fontStyle = "bold";
          hookData.cell.styles.fillColor = [241, 241, 241];
        }
      },
    });

    doc.save("Aging_Report.pdf");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2.5!">
        <p className="text-[#111827] font-semibold">Aging Report</p>

        <DownloadDropdown
          onExportExcel={() => exportAgingReportToExcel(data)}
          onExportPDF={() => exportAgingReportToPDF(data)}
          disabled={!data?.length}
        />
      </div>
      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <AgingReportTable rowsData={data ?? []} />
      </div>
    </>
  );
};

export default AgingReportComponent;
