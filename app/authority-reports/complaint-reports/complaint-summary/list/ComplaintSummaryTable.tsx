"use client";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { ComplaintSummary } from "./page";

const ComplaintSummaryTable = ({
  complaintSummaryData,
}: {
  complaintSummaryData: ComplaintSummary[];
}) => {
  // Calculate totals dynamically
  const totalFiled = complaintSummaryData.reduce(
    (sum, item) => sum + (item.complaintsFiled || 0),
    0
  );

  const totalDisposal = complaintSummaryData.reduce(
    (sum, item) => sum + (item.disposal || 0),
    0
  );

  const totalPending = complaintSummaryData?.reduce(
    (sum, item) => sum + (item.pendingComplaints || 0),
    0
  );

  const totalPercentage =
    complaintSummaryData && complaintSummaryData.length > 0
      ? (
          complaintSummaryData.reduce(
            (sum, item) => sum + (item.percentageDisposal || 0),
            0
          ) / complaintSummaryData.length
        ).toFixed(2)
      : 0;

  const headers = [
    "Sr #",
    "Name of District",
    "Complaints Filed",
    "Disposal",
    "Percentage of Disposal (%)",
    "Pending Complaints",
  ];

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
            {complaintSummaryData?.map((d, index) => (
              <tr
                key={index}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{d.districtName}</TableBodyCell>
                <TableBodyCell>{d.complaintsFiled}</TableBodyCell>
                <TableBodyCell>{d.disposal}</TableBodyCell>
                <TableBodyCell>{d.percentageDisposal}%</TableBodyCell>
                <TableBodyCell>{d.pendingComplaints}</TableBodyCell>
              </tr>
            ))}

            {/* ✅ Total Row */}
            <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
                Total
              </TableBodyCell>
              <TableBodyCell>{totalFiled}</TableBodyCell>
              <TableBodyCell>{totalDisposal}</TableBodyCell>
              <TableBodyCell>{totalPercentage}%</TableBodyCell>
              <TableBodyCell>{totalPending}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintSummaryTable;
