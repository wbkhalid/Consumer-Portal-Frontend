"use client";

import DownloadDropDown from "../../../../components/DownloadDropDown/DownloadDropDown";
import { exportDataToExcel, exportDataToPDF } from "../../../../utils/utils";
import { calculateTotals, getColumns } from "./List";
import { FineImposed } from "./page";

interface Props {
  data: FineImposed[];
  fileName: string;
}

const DownloadWrapper = ({ data, fileName }: Props) => {
  const columns = getColumns();
  const headers = ["Sr No.", ...columns.map((c) => c.label)];

  const buildRows = () => {
    const rows = data.map((d, index) => ({
      "Sr No.": `${index + 1}`,
      "Name of District": d.districtName,
      Complaints: d.complaints,
      "Fine Imposed": d.fineImposed,
    }));

    // Add totals
    const totals = calculateTotals(data);

    rows.push({
      "Sr No.": "TOTAL",
      "Name of District": "",
      Complaints: totals.totalComplaints,
      "Fine Imposed": totals.totalFineImposed,
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
