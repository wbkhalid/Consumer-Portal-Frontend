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

    // ✅ Total row
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

    // ✅ Total row add
    tableBody.push(["", "Total", totalComplaints]);

    autoTable(doc, {
      startY: 25,
      head: [["Sr #", "Day Range", "Number of Complaints"]],
      body: tableBody,
      styles: {
        fontSize: 10,
      },
      didParseCell: (hookData) => {
        // 🎨 Total row styling
        if (hookData.row.index === tableBody.length - 1) {
          hookData.cell.styles.fontStyle = "bold";
          hookData.cell.styles.fillColor = [241, 241, 241];
        }
      },
    });

    doc.save("Aging_Report.pdf");
  };

  return (
    <div>
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
        <div className="flex justify-between items-center px-4! py-2!">
          <div className="flex items-center gap-1">
            <p className="text-(--primary) font-semibold">Aging Report</p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {data?.length?.toLocaleString()} Records
            </p>
          </div>
          <div>
            <DownloadDropdown
              onExportExcel={() => exportAgingReportToExcel(data)}
              onExportPDF={() => exportAgingReportToPDF(data)}
              disabled={!data?.length}
            />
          </div>
        </div>
        <AgingReportTable rowsData={data ?? []} />
      </div>
    </div>
  );
};

export default AgingReportComponent;
