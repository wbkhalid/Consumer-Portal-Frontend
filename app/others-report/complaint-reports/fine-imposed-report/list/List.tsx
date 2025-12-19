"use client";
import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { BaseQuery, Column } from "../../../../utils/utils";
import { FineImposed } from "./page";

export type Query = BaseQuery<FineImposed>;

interface Props {
  data: FineImposed[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}

const List = ({ data, currentPage, pageSize, searchParams }: Props) => {
  const { totalComplaints, totalFineImposed } = calculateTotals(data);

  const columns = getColumns();

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
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
                  <TableBodyCell>{serial + 1}</TableBodyCell>
                  <TableBodyCell>{d.districtName}</TableBodyCell>
                  <TableBodyCell>{d.complaints}</TableBodyCell>
                  <TableBodyCell>{d.fineImposed}</TableBodyCell>
                </tr>
              );
            })}
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

// strongly typed column list
export const getColumns = (): Column<FineImposed>[] => [
  { label: "Name of District", value: "districtName" },
  { label: "Complaints", value: "complaints" },
  { label: "Fine Imposed", value: "fineImposed" },
];

export const calculateTotals = (data: FineImposed[]) => {
  // Calculate totals dynamically
  const totalComplaints = data.reduce(
    (sum, item) => sum + (item.complaints || 0),
    0
  );

  const totalFineImposed = data.reduce(
    (sum, item) => sum + (item.fineImposed || 0),
    0
  );

  return {
    totalComplaints,
    totalFineImposed,
  };
};
