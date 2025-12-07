"use client";

import React from "react";
import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { AnalyticalReport } from "./page";

export interface Query {
  year?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
  search?: string;
  orderBy?: keyof AnalyticalReport;
  order?: "asc" | "desc";
}

interface Props {
  data: AnalyticalReport[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}

const AnalyticalReportTable = ({
  data,
  currentPage,
  pageSize,
  searchParams,
}: Props) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const totalFiled = data.reduce(
    (sum, item) => sum + (item.totalFiled || 0),
    0
  );

  const totalDisposal = data.reduce(
    (sum, item) => sum + (item.totalDisposed || 0),
    0
  );

  const totalGrand = data?.reduce(
    (sum, item) => sum + (item.grandTotal || 0),
    0
  );

  const totalPercentage =
    data && data.length > 0
      ? (
          data.reduce((sum, item) => sum + (item.percentageDisposal || 0), 0) /
          data.length
        ).toFixed(2)
      : 0;

  // Total for each month (filed + disposed)
  const monthlyTotals = months.map((_, monthIndex) => {
    const totalFiled = data.reduce(
      (sum, item) => sum + (item.monthlyData[monthIndex]?.filed || 0),
      0
    );

    const totalDisposed = data.reduce(
      (sum, item) => sum + (item.monthlyData[monthIndex]?.disposed || 0),
      0
    );

    return {
      filed: totalFiled,
      disposed: totalDisposed,
    };
  });

  const columns: {
    label: string;
    value: keyof AnalyticalReport;
    className?: string;
  }[] = [
    { label: "Name of Authority", value: "districtName" },
    { label: "Complaints Filed", value: "totalFiled" },
    { label: "Grand Total", value: "grandTotal" },
    { label: "No. of Disposed", value: "totalDisposed" },
    { label: "% of Disposal", value: "percentageDisposal" },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-175px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm border-separate border-spacing-0 border border-[#E9EAEB]">
          {/* ===== Table Header ===== */}
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white text-center">
              <CustomTableHeaderCell label={"Sr"} rowSpan={2} />
              <CustomTableHeaderCell
                label={columns[0].label}
                rowSpan={2}
                searchParams={searchParams}
                columnValue={columns[0].value}
              />
              {months.map((month, index) => (
                <CustomTableHeaderCell
                  key={index}
                  label={`${month} Complaints`}
                  colSpan={2}
                  className="border-l border-[#E9EAEB] whitespace-normal!"
                />
              ))}
              {columns.map((column) => (
                <CustomTableHeaderCell
                  rowSpan={2}
                  label={column.label}
                  searchParams={searchParams}
                  columnValue={column.value}
                />
              ))}
            </tr>

            <tr className="font-semibold bg-white text-[#535862] text-center">
              {months.map((month) => (
                <React.Fragment key={`${month}-sub`}>
                  <CustomTableHeaderCell
                    label={"Filed"}
                    className="[writing-mode:vertical-rl] rotate-180 border-l border-[#E9EAEB] px-2!"
                  />
                  <CustomTableHeaderCell
                    label={"Disposed"}
                    className="[writing-mode:vertical-rl] rotate-180 border-l border-[#E9EAEB] px-2!"
                  />
                </React.Fragment>
              ))}
            </tr>
          </thead>

          {/* ===== Table Body ===== */}
          <tbody>
            {data.map((d, index) => {
              const serial = (currentPage - 1) * pageSize + index + 1;

              return (
                <tr
                  key={serial}
                  className={`text-center transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{serial}</TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {d.districtName}
                  </TableBodyCell>

                  {d.monthlyData.map((month, index) => (
                    <React.Fragment key={index}>
                      <TableBodyCell className="px-2!">
                        {month.filed}
                      </TableBodyCell>
                      <TableBodyCell className="px-2!">
                        {month.disposed}
                      </TableBodyCell>
                    </React.Fragment>
                  ))}

                  <TableBodyCell>{d.totalFiled}</TableBodyCell>
                  <TableBodyCell>{d.grandTotal}</TableBodyCell>
                  <TableBodyCell>{d.totalDisposed}</TableBodyCell>
                  <TableBodyCell>{d.percentageDisposal}%</TableBodyCell>
                </tr>
              );
            })}

            {/* ===== TOTAL ROW ===== */}
            <tr className="font-semibold bg-[#f1f1f1] text-center sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
                Total
              </TableBodyCell>
              {monthlyTotals.map((mt, index) => (
                <React.Fragment key={`mt-${index}`}>
                  <TableBodyCell>{mt.filed.toLocaleString()}</TableBodyCell>
                  <TableBodyCell>{mt.disposed.toLocaleString()}</TableBodyCell>
                </React.Fragment>
              ))}

              <TableBodyCell>{totalFiled}</TableBodyCell>
              <TableBodyCell>{totalGrand}</TableBodyCell>
              <TableBodyCell>{totalDisposal}</TableBodyCell>
              <TableBodyCell>{totalPercentage}%</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticalReportTable;
