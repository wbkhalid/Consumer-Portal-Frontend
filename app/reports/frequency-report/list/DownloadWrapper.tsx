"use client";

import DownloadDropDown from "../../../components/DownloadDropDown/DownloadDropDown";
import { exportDataToExcel, exportDataToPDF } from "../../../utils/utils";
import { calculateTotals, getColumns } from "./List";
import { FrequencyReport } from "./page";

interface Props {
  data: FrequencyReport[];
  fileName: string;
}

const DownloadWrapper = ({ data, fileName }: Props) => {
  const columns = getColumns();
  const headers = ["Sr No.", ...columns.map((c) => c.label)];

  const buildRows = () => {
    const rows = data.map((d, index) => ({
      "Sr No.": `${index + 1}`,
      Name: d.name,
      "Phone #": d.phoneNumber,
      "Total Complaints": d.totalComplaints,
    }));

    // Add totals
    const totals = calculateTotals(data);

    rows.push({
      "Sr No.": "TOTAL",
      Name: "",
      "Phone #": "",
      "Total Complaints": totals.totalComplaints,
    });

    return rows;
  };

  const exportToExcel = () => {
    exportDataToExcel(
      buildRows(),
      headers,
      `${fileName} - ${new Date().toLocaleDateString()}.xlsx`,
    );
  };

  const exportToPDF = () => {
    exportDataToPDF(
      headers,
      buildRows(),
      `${fileName} - ${new Date().toLocaleDateString()}.pdf`,
    );
  };

  return (
    <DownloadDropDown onClickExcel={exportToExcel} onClickPdf={exportToPDF} />
  );
};

export default DownloadWrapper;
