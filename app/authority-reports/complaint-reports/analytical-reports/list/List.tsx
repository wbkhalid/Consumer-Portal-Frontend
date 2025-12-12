"use client";

import { Fragment } from "react";
import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { AnalyticalReport } from "./page";
import { BaseQuery, Column } from "../../../../utils/utils";

export type Query = BaseQuery<AnalyticalReport>;

interface Props {
  data: AnalyticalReport[];
  searchParams: Query;
}

const List = ({ data, searchParams }: Props) => {
  const {
    totalFiled,
    totalDisposal,
    totalGrand,
    monthlyTotals,
    totalPercentage,
  } = calculateTotals(data);

  const columns = getColumns();
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
              {columns.slice(1).map((column) => (
                <CustomTableHeaderCell
                  key={column.value}
                  rowSpan={2}
                  label={column.label}
                  searchParams={searchParams}
                  columnValue={column.value}
                />
              ))}
            </tr>

            <tr className="font-semibold bg-white text-[#535862] text-center">
              {months.map((month) => (
                <Fragment key={`${month}-sub`}>
                  <CustomTableHeaderCell
                    label={"F"}
                    className="[writing-mode:vertical-rl] rotate-180 border-l border-[#E9EAEB] px-2!"
                  />
                  <CustomTableHeaderCell
                    label={"D"}
                    className="[writing-mode:vertical-rl] rotate-180 border-l border-[#E9EAEB] px-2!"
                  />
                </Fragment>
              ))}
            </tr>
          </thead>

          {/* ===== Table Body ===== */}
          <tbody>
            {data.map((d, index) => {
              const serial = index + 1;

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
                    <Fragment key={index}>
                      <TableBodyCell className="px-2!">
                        {month.filed}
                      </TableBodyCell>
                      <TableBodyCell className="px-2!">
                        {month.disposed}
                      </TableBodyCell>
                    </Fragment>
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
                <Fragment key={`mt-${index}`}>
                  <TableBodyCell>{mt.filed.toLocaleString()}</TableBodyCell>
                  <TableBodyCell>{mt.disposed.toLocaleString()}</TableBodyCell>
                </Fragment>
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

export default List;

// export const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// strongly typed column list
export const getColumns = (): Column<AnalyticalReport>[] => [
  { label: "Name of Authority", value: "districtName" },
  { label: "Complaints Filed", value: "totalFiled" },
  { label: "Grand Total", value: "grandTotal" },
  { label: "No. of Disposed", value: "totalDisposed" },
  { label: "% of Disposal", value: "percentageDisposal" },
];

export const calculateTotals = (data: AnalyticalReport[]) => {
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

  return {
    totalFiled,
    totalDisposal,
    totalGrand,
    totalPercentage,
    monthlyTotals,
  };
};
