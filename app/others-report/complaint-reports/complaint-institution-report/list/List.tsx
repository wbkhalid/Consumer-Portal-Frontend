"use client";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { ComplaintInstitution } from "./page";

const List = ({ data }: { data: ComplaintInstitution[] }) => {
  // Calculate totals dynamically
  const totalWalkIn = data.reduce((sum, item) => sum + (item.walkIn || 0), 0);

  const totalOnline = data.reduce((sum, item) => sum + (item.online || 0), 0);

  const totalofTotal = data?.reduce((sum, item) => sum + (item.total || 0), 0);

  const headers = ["Sr #", "Name of District", "Walk In", "Online", "Total"];

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
                <TableBodyCell>{d.walkIn}</TableBodyCell>
                <TableBodyCell>{d.online}</TableBodyCell>
                <TableBodyCell>{d.total}</TableBodyCell>
              </tr>
            ))}

            {/* ✅ Total Row */}
            <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
                Total
              </TableBodyCell>
              <TableBodyCell>{totalWalkIn}</TableBodyCell>
              <TableBodyCell>{totalOnline}</TableBodyCell>
              <TableBodyCell>{totalofTotal}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
