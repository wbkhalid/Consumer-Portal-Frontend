"use client";

import DownloadDropDown from "../../../../../components/DownloadDropDown/DownloadDropDown";
import { exportDataToExcel, exportDataToPDF } from "../../../../../utils/utils";
import { Complains, ComplaintSummary } from "../../list/page";
import { getColumns } from "./List";

interface Props {
  data: Complains[];
  fileName: string;
}

const DownloadWrapper = ({ data, fileName }: Props) => {
  const columns = getColumns();
  const headers = ["Sr No.", ...columns.map((c) => c.label)];

  const buildRows = () => {
    const rows = data.map((d, index) => ({
      "Sr No.": `${index + 1}`,
      "Shop Name": d.shopName,
      "Phone #": d.phoneNumber,
      Address: d.address,
      "Bill Board Image": d.billBoardImage,
      "Category Name": d.categoryName,
      "Section Category Name": d.sectionCategoryName,
      "Entry Type": d.entryType,
      Status: d.status,
      "Created At": d.createdAt,
      "Updated At": d.updatedAt,
      "Assigned To": d.assignedTo,
      "Hearing Date": d.hearingDate,
      Remarks: d.remarks,
      "Assignee Remarks": d.assigneeRemarks,
      "Assignee Status": d.assigneeStatus,
      "Closing Remarks": d.closingRemarks,
      "Closed Date": d.closedDate,
      "Fined Amount": d.finedAmount,
      "List Audio": d.listAudio,
      "List of Image": d.listOfImage,
      "List of Video": d.listOfVideo,
    }));

    // Add totals
    // const totals = calculateTotals(data);

    // rows.push({
    //   "Sr No.": "TOTAL",
    //   "Name of District": "",
    //   "Complaints Filed": totals.totalFiled,
    //   Disposal: totals.totalDisposal,
    //   "Percentage of Disposal (%)": totals.totalPercentage,
    //   "Pending Complaints": totals.totalPending,
    // });

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
