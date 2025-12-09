"use client";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { ComplaintInstitution } from "./page";
import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import { BaseQuery } from "../../../../utils/utils";

export type Query = BaseQuery<ComplaintInstitution>;

interface Props {
  data: ComplaintInstitution[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}

const List = ({ data, currentPage, pageSize, searchParams }: Props) => {
  // Calculate totals dynamically
  const totalWalkIn = data.reduce((sum, item) => sum + (item.walkIn || 0), 0);

  const totalOnline = data.reduce((sum, item) => sum + (item.online || 0), 0);

  const totalofTotal = data?.reduce((sum, item) => sum + (item.total || 0), 0);

  const columns: {
    label: string;
    value: keyof ComplaintInstitution;
    className?: string;
  }[] = [
    { label: "Name of District", value: "districtName" },
    { label: "Walk In", value: "walkIn" },
    { label: "Online", value: "online" },
    { label: "Total", value: "total" },
  ];

  return (
    <table className="min-w-full text-sm">
      <thead className="sticky top-0 z-10">
        <tr className="font-semibold bg-white text-center">
          <CustomTableHeaderCell label="Sr #" />

          {columns.map((column) => (
            <CustomTableHeaderCell
              key={column.value}
              columnValue={column.value}
              label={column.label}
              searchParams={searchParams}
            />
          ))}
        </tr>
      </thead>

      <tbody>
        {data?.map((d, index) => {
          const serial = (currentPage - 1) * pageSize + index + 1;

          return (
            <tr
              key={serial}
              className={`transition-colors duration-150 ${
                index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
              } hover:bg-gray-100`}
            >
              <TableBodyCell>{serial}</TableBodyCell>
              <TableBodyCell>{d.districtName}</TableBodyCell>
              <TableBodyCell>{d.walkIn}</TableBodyCell>
              <TableBodyCell>{d.online}</TableBodyCell>
              <TableBodyCell>{d.total}</TableBodyCell>
            </tr>
          );
        })}

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
  );
};

export default List;
