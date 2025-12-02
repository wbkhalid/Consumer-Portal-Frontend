"use client";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { FineImposed } from "./page";

const List = ({ data }: { data: FineImposed[] }) => {
  // Calculate totals dynamically
  const totalComplaints = data.reduce(
    (sum, item) => sum + (item.complaints || 0),
    0
  );

  const totalFineImposed = data.reduce(
    (sum, item) => sum + (item.fineImposed || 0),
    0
  );

  const headers = ["Sr #", "District", "Complaints", "Fine Imposed"];

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
            {data?.map((d, index) => (
              <tr
                key={index}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{d.districtName}</TableBodyCell>
                <TableBodyCell>{d.complaints}</TableBodyCell>
                <TableBodyCell>{d.fineImposed}</TableBodyCell>
              </tr>
            ))}

            {/* ✅ Total Row */}
            <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
                Total
              </TableBodyCell>
              <TableBodyCell>{totalComplaints}</TableBodyCell>
              <TableBodyCell>{totalFineImposed}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
