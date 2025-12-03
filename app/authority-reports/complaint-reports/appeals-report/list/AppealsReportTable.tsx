"use client";

import TableBodyCell from "../../../../components/table/TableBodyCell";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import { AppealReport } from "./page";

const AppealsReportTable = ({
  appealsReportData,
}: {
  appealsReportData: AppealReport[];
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

  const totalAppeals = appealsReportData.reduce(
    (sum, item) => sum + (item.numberOfAppeals || 0),
    0
  );
  const headers = ["Sr #", "Name of District", "Appeals"];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm border-separate border-spacing-0 border border-[#E9EAEB]">
          {/* ===== Table Header ===== */}
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white text-center">
              {headers.map((header) => (
                <TableHeaderCell key={header} label={header} />
              ))}
            </tr>
          </thead>

          {/* ===== Table Body ===== */}
          <tbody>
            {appealsReportData.map((d, index) => (
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
                <TableBodyCell className="whitespace-nowrap">
                  {d.numberOfAppeals}
                </TableBodyCell>
              </tr>
            ))}

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
