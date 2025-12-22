"use client";

import DownloadDropDown from "../../../../components/DownloadDropDown/DownloadDropDown";
import { exportDataToExcel, exportDataToPDF } from "../../../../utils/utils";
import { calculateTotals, getColumns } from "./List";
import { AgingReport } from "./page";

interface Props {
  data: AgingReport[];
  fileName: string;
}

const DownloadWrapper = ({ data, fileName }: Props) => {
  const columns = getColumns();
  const headers = ["Sr No.", ...columns.map((c) => c.label)];

  const buildRows = () => {
    const rows = data.map((d, index) => ({
      "Sr No.": `${index + 1}`,
      "Day Range": d.dayRange,
      "No. of Complaints": d.numberOfComplaints,
    }));

    // Add totals
    const totals = calculateTotals(data);

    rows.push({
      "Sr No.": "TOTAL",
      "Day Range": "",
      "No. of Complaints": totals.totalComplaints,
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
