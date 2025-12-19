"use client";

import DownloadDropDown from "../../../../components/DownloadDropDown/DownloadDropDown";
import { exportDataToExcel, exportDataToPDF } from "../../../../utils/utils";
import { calculateTotals, getColumns } from "./List";
import { DecidedComplaint } from "./page";

interface Props {
  data: DecidedComplaint[];
  fileName: string;
}

const DownloadWrapper = ({ data, fileName }: Props) => {
  const columns = getColumns();
  const headers = ["Sr No.", ...columns.map((c) => c.label)];

  const buildRows = () => {
    const rows = data.map((d, index) => ({
      "Sr No.": `${index + 1}`,
      "Name of District": d.districtName,
      "Total Complaints": d.totalComplaints,
      "Avg Days": d.avgDays,
    }));

    // Add totals
    const totals = calculateTotals(data);

    rows.push({
      "Sr No.": "TOTAL",
      "Name of District": "",
      "Total Complaints": totals.totalComplaints,
      "Avg Days": totals.totalAvgDays,
    });

    return rows;
  };

  const exportToExcel = () => {
    exportDataToExcel(
      buildRows(),
      headers,
      `${fileName} - ${new Date().toLocaleDateString()}.xlsx`
    );
  };

  const exportToPDF = () => {
    exportDataToPDF(
      headers,
      buildRows(),
      `${fileName} - ${new Date().toLocaleDateString()}.pdf`
    );
  };

  return (
    <DownloadDropDown onClickExcel={exportToExcel} onClickPdf={exportToPDF} />
  );
};

export default DownloadWrapper;
