"use client";

import React from "react";
import TableBodyCell from "../../../components/table/TableBodyCell";
import TableHeaderCell from "../../../components/table/TableHeaderCell";

const AnalyticalReportTable = () => {
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

  // 🧩 Dummy data (10 authorities)
  const rowsData = [
    { id: 1, authority: "Lahore District", filed: 230, disposed: 210 },
    { id: 2, authority: "Karachi District", filed: 300, disposed: 280 },
    { id: 3, authority: "Islamabad District", filed: 180, disposed: 150 },
    { id: 4, authority: "Faisalabad District", filed: 220, disposed: 200 },
    { id: 5, authority: "Multan District", filed: 190, disposed: 160 },
    { id: 6, authority: "Rawalpindi District", filed: 240, disposed: 220 },
    { id: 7, authority: "Peshawar District", filed: 170, disposed: 150 },
    { id: 8, authority: "Quetta District", filed: 130, disposed: 100 },
    { id: 9, authority: "Hyderabad District", filed: 160, disposed: 130 },
    { id: 10, authority: "Sialkot District", filed: 200, disposed: 170 },
    { id: 11, authority: "Multan District", filed: 190, disposed: 160 },
    { id: 12, authority: "Rawalpindi District", filed: 240, disposed: 220 },
    { id: 13, authority: "Peshawar District", filed: 170, disposed: 150 },
    { id: 14, authority: "Quetta District", filed: 130, disposed: 100 },
    { id: 15, authority: "Hyderabad District", filed: 160, disposed: 130 },
  ];

  // Generate random monthly dummy data for each authority
  const getMonthlyData = () =>
    months.reduce((acc, month) => {
      acc[month] = {
        filed: Math.floor(Math.random() * 30) + 10,
        disposed: Math.floor(Math.random() * 25) + 5,
      };
      return acc;
    }, {} as Record<string, { filed: number; disposed: number }>);

  const rows = rowsData.map((item) => ({
    ...item,
    monthsData: getMonthlyData(),
  }));

  // Calculate totals for last row
  const totalRow = {
    filed2025: rows.reduce(
      (sum, row) =>
        sum +
        Object.values(row.monthsData).reduce((mSum, m) => mSum + m.filed, 0),
      0
    ),
    disposed2025: rows.reduce(
      (sum, row) =>
        sum +
        Object.values(row.monthsData).reduce((mSum, m) => mSum + m.disposed, 0),
      0
    ),
  };

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm border-separate border-spacing-0 border border-[#E9EAEB]">
          {/* ===== Table Header ===== */}
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white text-center">
              <TableHeaderCell label={"Sr"} rowSpan={2} />
              <TableHeaderCell label={"Name of Authority"} rowSpan={2} />

              {months.map((month) => (
                <TableHeaderCell
                  label={`${month} Complaints`}
                  colSpan={2}
                  className="border-l border-[#E9EAEB] whitespace-normal!"
                />
              ))}

              <TableHeaderCell label={"Complaints Filed 2025"} rowSpan={2} />
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
            {rows.map((row, index) => {
              const totalFiled = Object.values(row.monthsData).reduce(
                (sum, m) => sum + m.filed,
                0
              );
              const totalDisposed = Object.values(row.monthsData).reduce(
                (sum, m) => sum + m.disposed,
                0
              );
              const percent =
                totalFiled > 0
                  ? ((totalDisposed / totalFiled) * 100).toFixed(1)
                  : "0";

              return (
                <tr
                  key={row.id}
                  className={`text-center transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {row.authority}
                  </TableBodyCell>

                  {months.map((month) => (
                    <React.Fragment key={`${row.id}-${month}`}>
                      <TableBodyCell className="px-2!">
                        {row.monthsData[month].filed}
                      </TableBodyCell>
                      <TableBodyCell className="px-2!">
                        {row.monthsData[month].disposed}
                      </TableBodyCell>
                    </React.Fragment>
                  ))}

                  <TableBodyCell>{totalFiled}</TableBodyCell>
                  <TableBodyCell>{totalFiled + totalDisposed}</TableBodyCell>
                  <TableBodyCell>{totalDisposed}</TableBodyCell>
                  <TableBodyCell>{percent}%</TableBodyCell>
                </tr>
              );
            })}

            {/* ===== TOTAL ROW ===== */}
            <tr className="font-semibold bg-[#f1f1f1] text-center sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
                Total
              </TableBodyCell>

              {months.map((month) => (
                <React.Fragment key={`${month}-total`}>
                  <TableBodyCell>
                    {rows
                      .reduce(
                        (sum, row) => sum + row.monthsData[month].filed,
                        0
                      )
                      .toLocaleString()}
                  </TableBodyCell>
                  <TableBodyCell className="border border-[#E9EAEB] px-4! py-2!">
                    {rows
                      .reduce(
                        (sum, row) => sum + row.monthsData[month].disposed,
                        0
                      )
                      .toLocaleString()}
                  </TableBodyCell>
                </React.Fragment>
              ))}

              <TableBodyCell>
                {totalRow.filed2025.toLocaleString()}
              </TableBodyCell>
              <TableBodyCell>
                {(totalRow.filed2025 + totalRow.disposed2025).toLocaleString()}
              </TableBodyCell>
              <TableBodyCell>
                {totalRow.disposed2025.toLocaleString()}
              </TableBodyCell>
              <TableBodyCell>
                {((totalRow.disposed2025 / totalRow.filed2025) * 100).toFixed(
                  1
                )}
                %
              </TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticalReportTable;
