"use client";

import DownloadDropdown from "../../../components/DownloadDropdown";
import { FineImposedProp } from "../page";
import FineReportTable from "./FineReportTable";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DateFilter from "../../../components/DateFilter";
import YearFilter from "../../../components/YearFilter";
import SearchFilter from "../../../components/reuseable-filters/SearchFilter";
import ClearButton from "../../../components/ClearButton";
import { useSearchParams } from "next/navigation";
import PageHeader from "../../../components/PageHeader";

interface FineReportComponentProp {
  data: FineImposedProp[];
}

const FineReportComponent = ({ data }: FineReportComponentProp) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  if (search) {
    const lowerSearch = search.toLowerCase();

    data = data?.filter((c) =>
      c.districtName?.toLowerCase().includes(lowerSearch),
    );
  }

  const exportFineReportToExcel = (data: FineImposedProp[]) => {
    const formattedData = data.map((item, index) => ({
      "Sr. No": `${index + 1}`,
      "Name of District": item.districtName,
      Complaints: item.complaints,
      "Fine Imposed": item.fineImposed,
    }));

    const totalComplaints = data.reduce(
      (sum, item) => sum + (item.complaints || 0),
      0,
    );

    const totalFineImposed = data.reduce(
      (sum, item) => sum + (item.fineImposed || 0),
      0,
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
      0,
    );

    const totalFineImposed = data.reduce(
      (sum, item) => sum + (item.fineImposed || 0),
      0,
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
    <>
      <div className="flex justify-between items-center mb-2.5!">
        {/* <div className="flex items-center gap-1">
          <p className="text-[#111827] font-semibold">Fine Imposed Report</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {data?.length?.toLocaleString()} Records
          </p>
        </div> */}

        <PageHeader title={"Fine Imposed Report"} count={data?.length} />

        <DownloadDropdown
          onExportExcel={() => exportFineReportToExcel(data)}
          onExportPDF={() => exportFineReportToPDF(data)}
          disabled={!data?.length}
        />
      </div>
      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <DateFilter />
            <ClearButton />
          </div>
        </div>
        <FineReportTable rowsData={data ?? []} />
      </div>
    </>
  );
};

export default FineReportComponent;
