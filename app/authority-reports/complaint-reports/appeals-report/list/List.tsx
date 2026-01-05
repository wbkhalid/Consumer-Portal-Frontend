"use client";

import { useMemo, useState } from "react";
import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { BaseQuery, Column } from "../../../../utils/utils";
import { AppealReport } from "./page";
import PaginationControls from "../../../../components/table/PaginationControls";

export type Query = BaseQuery<AppealReport>;

interface Props {
  data: AppealReport[];
  searchParams: Query;
}

const List = ({ data, searchParams }: Props) => {
  const { totalAppeals } = calculateTotals(data);
  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const columns = getColumns();

  const totalPages = Math.ceil(data?.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data?.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  return (
    <>
      <div className="relative flex flex-col h-[calc(100vh-180px)]">
        <div className="flex-1 overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="font-semibold">
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
              {paginatedData?.map((d, index) => {
                const serial = (currentPage - 1) * pageSize + index + 1;
                return (
                  <tr
                    key={d?.districtName}
                    className="cursor-pointer! hover:bg-gray-100"
                  >
                    <TableBodyCell>{serial}</TableBodyCell>
                    <TableBodyCell>{d.districtName}</TableBodyCell>
                    <TableBodyCell>{d.numberOfAppeals}</TableBodyCell>
                  </tr>
                );
              })}

              <tr className="font-semibold bg-[#f1f1f1] text-center sticky bottom-0">
                <TableBodyCell colSpan={2} className="text-center">
                  Total
                </TableBodyCell>

                <TableBodyCell>{totalAppeals}</TableBodyCell>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="shrink-0 py-1! bg-white border-t border-[#e2e8f0]">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </>
  );
};

export default List;

// strongly typed column list
export const getColumns = (): Column<AppealReport>[] => [
  { label: "Name of District", value: "districtName" },
  { label: "Appeals", value: "numberOfAppeals" },
];

export const calculateTotals = (data: AppealReport[]) => {
  const totalAppeals = data.reduce(
    (sum, item) => sum + (item.numberOfAppeals || 0),
    0
  );

  return {
    totalAppeals,
  };
};
