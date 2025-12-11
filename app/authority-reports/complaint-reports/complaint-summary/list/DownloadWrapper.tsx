"use client";

import DownloadDropDown from "../../../../components/DownloadDropDown/DownloadDropDown";
import { exportDataToExcel } from "../../../../utils/utils";
import { calculateTotals, getColumns } from "./List";
import { ComplaintSummary } from "./page";

interface Props {
  data: ComplaintSummary[];
}

const DownloadWrapper = ({ data }: Props) => {
  const exportToExcel = (data: ComplaintSummary[]) => {
    const columns = getColumns();

    const printedData = data?.map((d, index) => ({
      "Sr No.": `${index + 1}`,
      "Name of District": d.districtName,
      "Complaints Filed": d.complaintsFiled,
      Disposal: d.disposal,
      "Percentage of Disposal (%)": d.percentageDisposal,
      "Pending Complaints": d.pendingComplaints,
    }));

    // ⬇ ADD TOTAL ROW ⬇
    const totals = calculateTotals(data);

    printedData.push({
      "Sr No.": "TOTAL",
      "Name of District": "",
      "Complaints Filed": totals.totalFiled,
      Disposal: totals.totalDisposal,
      "Percentage of Disposal (%)": totals.totalPercentage,
      "Pending Complaints": totals.totalPending,
    });

    exportDataToExcel(
      printedData,
      columns.map((col) => col.label),
      `Complaint Summary Report ${new Date().toLocaleDateString()}.xlsx`
    );
  };

  return <DownloadDropDown onClickExcel={() => exportToExcel(data)} />;
};

export default DownloadWrapper;
