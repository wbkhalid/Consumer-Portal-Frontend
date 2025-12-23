"use client";

import DownloadDropdown from "../../../../components/DownloadDropdown";
import { FineImposedProp } from "../page";
import FineReportTable from "./FineReportTable";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DateFilter from "../../../../components/DateFilter";
import YearFilter from "../../../../components/YearFilter";

interface FineReportComponentProp {
  data: FineImposedProp[];
}

const FineReportComponent = ({ data }: FineReportComponentProp) => {
  const exportFineReportToExcel = (data: FineImposedProp[]) => {
    const formattedData = data.map((item, index) => ({
      "Sr. No": `${index + 1}`,
      "Name of District": item.districtName,
      Complaints: item.complaints,
      "Fine Imposed": item.fineImposed,
    }));

    const totalComplaints = data.reduce(
      (sum, item) => sum + (item.complaints || 0),
      0
    );

    const totalFineImposed = data.reduce(
      (sum, item) => sum + (item.fineImposed || 0),
      0
    );

    formattedData.push({
      "Sr. No": "",
      "Name of District": "Total",
      Complaints: totalComplaints,
      "Fine Imposed": totalFineImposed,
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Fine Imposed Report");
    XLSX.writeFile(workbook, "Fine_Imposed_Report.xlsx");
  };

  const exportFineReportToPDF = (data: FineImposedProp[]) => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Fine Imposed Report", 14, 15);

    const totalComplaints = data.reduce(
      (sum, item) => sum + (item.complaints || 0),
      0
    );

    const totalFineImposed = data.reduce(
      (sum, item) => sum + (item.fineImposed || 0),
      0
    );

    const tableData = data.map((item, index) => [
      index + 1,
      item.districtName,
      item.complaints,
      item.fineImposed,
    ]);

    tableData.push(["", "Total", totalComplaints, totalFineImposed]);

    autoTable(doc, {
      startY: 25,
      head: [["Sr. No", "Name of District", "Complaints", "Fine Imposed"]],
      body: tableData,
      styles: { fontSize: 10 },
      didParseCell: (hookData) => {
        if (hookData.row.index === tableData.length - 1) {
          hookData.cell.styles.fontStyle = "bold";
          hookData.cell.styles.fillColor = [241, 241, 241];
        }
      },
    });

    doc.save("Fine_Imposed_Report.pdf");
  };

  return (
    <div>
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
        <div className="flex justify-between items-center px-4! py-2!">
          <div className="flex items-center gap-1">
            <p className="text-(--primary) font-semibold">
              Fine Imposed Report
            </p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {data?.length?.toLocaleString()} Records
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <YearFilter />
            <DateFilter />

            <DownloadDropdown
              onExportExcel={() => exportFineReportToExcel(data)}
              onExportPDF={() => exportFineReportToPDF(data)}
              disabled={!data?.length}
            />
          </div>
        </div>
        <FineReportTable rowsData={data ?? []} />
      </div>
    </div>
  );
};

export default FineReportComponent;
