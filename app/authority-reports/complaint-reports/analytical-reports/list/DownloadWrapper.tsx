"use client";

import DownloadDropDown from "../../../../components/DownloadDropDown/DownloadDropDown";
import { exportDataToExcel, exportDataToPDF } from "../../../../utils/utils";
import { calculateTotals, months } from "./List";
import { AnalyticalReport } from "./page";

interface Props {
  data: AnalyticalReport[];
  fileName: string;
}

const DownloadWrapper = ({ data, fileName }: Props) => {
  const monthHeaders = months.flatMap((m) => [`${m} F`, `${m} D`]);

  const headers = [
    "Sr No.",
    "Name of Authority",
    ...monthHeaders,
    "Complaints Filed",
    "Grand Total",
    "No. of Disposed",
    "% of Disposal",
  ];

  const buildRows = () => {
    const rows = data.map((d, index) => {
      const row: Record<string, any> = {
        "Sr No.": index + 1,
        "Name of Authority": d.districtName,
      };

      d.monthlyData.forEach((month, i) => {
        row[`${months[i]} F`] = month.filed;
        row[`${months[i]} D`] = month.disposed;
      });

      row["Complaints Filed"] = d.totalFiled;
      row["Grand Total"] = d.grandTotal;
      row["No. of Disposed"] = d.totalDisposed;
      row["% of Disposal"] = d.percentageDisposal;

      return row;
    });

    // ===== Add Total Row =====
    const totals = calculateTotals(data);

    const totalRow: Record<string, any> = {
      "Sr No.": "TOTAL",
      "Name of Authority": "",
    };

    totals.monthlyTotals.forEach((m, i) => {
      totalRow[`${months[i]} F`] = m.filed;
      totalRow[`${months[i]} D`] = m.disposed;
    });

    totalRow["Complaints Filed"] = totals.totalFiled;
    totalRow["Grand Total"] = totals.totalGrand;
    totalRow["No. of Disposed"] = totals.totalDisposal;
    totalRow["% of Disposal"] = totals.totalPercentage;

    rows.push(totalRow);

    return rows;
  };

  const exportToExcel = () => {
    exportDataToExcel(
      buildRows(),
      headers,
      `Analytical Report - ${new Date().toLocaleDateString()}.xlsx`
    );
  };

  const exportToPDF = () => {
    exportDataToPDF(
      headers,
      buildRows(),
      `Analytical Report - ${new Date().toLocaleDateString()}.pdf`,
      "landscape"
    );
  };

  return (
    <DownloadDropDown onClickExcel={exportToExcel} onClickPdf={exportToPDF} />
  );
};

export default DownloadWrapper;
