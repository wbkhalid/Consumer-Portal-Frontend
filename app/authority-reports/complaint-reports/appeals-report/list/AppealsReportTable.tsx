"use client";

import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import { AppealReport } from "./page";

export interface Query {
  year?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
  search?: string;
  orderBy?: keyof AppealReport;
  order?: "asc" | "desc";
}

interface Props {
  data: AppealReport[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}

const AppealsReportTable = ({
  data,
  currentPage,
  pageSize,
  searchParams,
}: Props) => {
  const totalAppeals = data.reduce(
    (sum, item) => sum + (item.numberOfAppeals || 0),
    0
  );
  const columns: {
    label: string;
    value: keyof AppealReport;
    className?: string;
  }[] = [
    { label: "Name of District", value: "districtName" },
    { label: "Appeals", value: "numberOfAppeals" },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm border-separate border-spacing-0 border border-[#E9EAEB]">
          {/* ===== Table Header ===== */}
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

          {/* ===== Table Body ===== */}
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
                  <TableBodyCell>{d.numberOfAppeals}</TableBodyCell>
                </tr>
              );
            })}

            {/* ===== TOTAL ROW ===== */}
            <tr className="font-semibold bg-[#f1f1f1] text-center sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
                Total
              </TableBodyCell>

              <TableBodyCell>{totalAppeals}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppealsReportTable;
