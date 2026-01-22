"use client";

import DownloadDropDown from "../../../components/DownloadDropDown/DownloadDropDown";
import { ManageCustomComplainsData } from "../../../hooks/useGetCustomComplaints";
import { exportDataToExcel, exportDataToPDF } from "../../../utils/utils";
import { getColumns } from "./CustomComplaintTable";

interface Props {
  data: ManageCustomComplainsData[];
  fileName: string;
}

const DownloadWrapper = ({ data, fileName }: Props) => {
  const columns = getColumns();

  const buildRows = () => {
    const rows = data.map((d, index) => ({
      "Complaint #": `${index + 1}`,
      "Shop Name": d.shopName,
      "Phone #": d.phoneNumber,
      "Complaint Date": d.complaintType,
      Address: d.address,
      "Complaint Type": d.complaintType,
      "Section Category": d.sectionCategoryName,
      "Nature of Complaint": d.categoryName,
      Sections: d.sectionsDetails?.map((s) => s?.name).join(", "),
    }));

    return rows;
  };

  const exportToExcel = () => {
    exportDataToExcel(
      buildRows(),
      columns,
      `${fileName} - ${new Date().toLocaleDateString()}.xlsx`
    );
  };

  const exportToPDF = () => {
    exportDataToPDF(
      columns,
      buildRows(),
      `${fileName} - ${new Date().toLocaleDateString()}.pdf`
    );
  };

  return (
    <DownloadDropDown
      onClickExcel={exportToExcel}
      onClickPdf={exportToPDF}
      styleVarient={2}
    />
  );
};

export default DownloadWrapper;
