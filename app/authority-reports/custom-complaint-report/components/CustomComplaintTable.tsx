"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";
import { ManageCustomComplainsData } from "../../../hooks/useGetCustomComplaints";
import { formatDate } from "../../../utils/utils";

interface CustomComplaintProp {
  rowsData: ManageCustomComplainsData[];
}

const CustomComplaintTable = ({ rowsData }: CustomComplaintProp) => {
  const headers = [
    "Complaint #",
    "Shop Name",
    "Phone #",
    "Complaint Date",
    "Address",
    "Complaint Type",
    "Section Category",
    "Sections",
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {headers.map((header) => (
                <TableHeaderCell key={header} label={header} />
              ))}
            </tr>
          </thead>

          <tbody>
            {rowsData?.map((item, index) => (
              <tr
                key={item.id}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{item?.id}</TableBodyCell>

                <TableBodyCell className="whitespace-nowrap">
                  {item?.shopName}
                </TableBodyCell>
                <TableBodyCell className="whitespace-nowrap">
                  {item?.phoneNumber}
                </TableBodyCell>
                <TableBodyCell className="whitespace-nowrap">
                  {formatDate(item?.createdAt)}
                </TableBodyCell>
                <TableBodyCell>{item?.address}</TableBodyCell>
                <TableBodyCell>{item?.complaintType}</TableBodyCell>
                <TableBodyCell>{item?.categoryName}</TableBodyCell>
                <TableBodyCell>
                  {item?.sectionsDetails?.map((s) => s?.name).join(", ")}
                </TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomComplaintTable;
