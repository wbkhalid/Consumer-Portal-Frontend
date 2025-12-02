"use client";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { FrequencyReport } from "./page";

const List = ({ data }: { data: FrequencyReport[] }) => {
  // Calculate totals dynamically
  const totalComplaints = data.reduce(
    (sum, item) => sum + (item.totalComplaints || 0),
    0
  );

  const headers = ["Sr #", "Name", "Email", "Phone #", "Total Complaints"];

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
                <TableBodyCell>{d.name}</TableBodyCell>
                <TableBodyCell>{d.email}</TableBodyCell>
                <TableBodyCell>{d.phoneNumber}</TableBodyCell>
                <TableBodyCell>{d.totalComplaints}</TableBodyCell>
              </tr>
            ))}

            {/* ✅ Total Row */}
            <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
              <TableBodyCell colSpan={4} className="text-center">
                Total
              </TableBodyCell>
              <TableBodyCell>{totalComplaints}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
