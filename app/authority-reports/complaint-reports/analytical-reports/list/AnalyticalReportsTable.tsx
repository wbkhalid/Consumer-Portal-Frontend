"use client";

import React from "react";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { AnalyticalReport } from "./page";

const AnalyticalReportTable = ({
  analyticalReportsData,
}: {
  analyticalReportsData: AnalyticalReport[];
}) => {
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

  const totalFiled = analyticalReportsData.reduce(
    (sum, item) => sum + (item.totalFiled || 0),
    0
  );

  const totalDisposal = analyticalReportsData.reduce(
    (sum, item) => sum + (item.totalDisposed || 0),
    0
  );

  const totalGrand = analyticalReportsData?.reduce(
    (sum, item) => sum + (item.grandTotal || 0),
    0
  );

  const totalPercentage =
    analyticalReportsData && analyticalReportsData.length > 0
      ? (
          analyticalReportsData.reduce(
            (sum, item) => sum + (item.percentageDisposal || 0),
            0
          ) / analyticalReportsData.length
        ).toFixed(2)
      : 0;

  // Total for each month (filed + disposed)
  const monthlyTotals = months.map((_, monthIndex) => {
    const totalFiled = analyticalReportsData.reduce(
      (sum, item) => sum + (item.monthlyData[monthIndex]?.filed || 0),
      0
    );

    const totalDisposed = analyticalReportsData.reduce(
      (sum, item) => sum + (item.monthlyData[monthIndex]?.disposed || 0),
      0
    );

    return {
      filed: totalFiled,
      disposed: totalDisposed,
    };
  });

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm border-separate border-spacing-0 border border-[#E9EAEB]">
          {/* ===== Table Header ===== */}
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white text-center">
              <TableHeaderCell label={"Sr"} rowSpan={2} />
              <TableHeaderCell label={"Name of Authority"} rowSpan={2} />

              {months.map((month, index) => (
                <TableHeaderCell
                  key={index}
                  label={`${month} Complaints`}
                  colSpan={2}
                  className="border-l border-[#E9EAEB] whitespace-normal!"
                />
              ))}

              <TableHeaderCell label={"Complaints Filed"} rowSpan={2} />
              <TableHeaderCell label={"Grand Total"} rowSpan={2} />
              <TableHeaderCell label={"No. of Disposed"} rowSpan={2} />
              <TableHeaderCell label={"% of Disposal"} rowSpan={2} />
            </tr>

            <tr className="font-semibold bg-white text-[#535862] text-center">
              {months.map((month) => (
                <React.Fragment key={`${month}-sub`}>
                  <TableHeaderCell
                    label={"Filed"}
                    className="[writing-mode:vertical-rl] rotate-180 border-l border-[#E9EAEB] px-2!"
                  />
                  <TableHeaderCell
                    label={"Disposed"}
                    className="[writing-mode:vertical-rl] rotate-180 border-l border-[#E9EAEB] px-2!"
                  />
                </React.Fragment>
              ))}
            </tr>
          </thead>

          {/* ===== Table Body ===== */}
          <tbody>
            {analyticalReportsData.map((d, index) => (
              <tr
                key={index}
                className={`text-center transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
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
            ))}

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
