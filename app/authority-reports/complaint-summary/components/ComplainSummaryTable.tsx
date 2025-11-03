"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const ComplaintSummaryTable = () => {
  const rowsData = [
    { id: 1, district: "Lahore", filed: 120, disposal: 100, pending: 20 },
    { id: 2, district: "Karachi", filed: 150, disposal: 130, pending: 20 },
    { id: 3, district: "Islamabad", filed: 80, disposal: 70, pending: 10 },
    { id: 4, district: "Rawalpindi", filed: 95, disposal: 75, pending: 20 },
    { id: 5, district: "Faisalabad", filed: 110, disposal: 90, pending: 20 },
    { id: 6, district: "Multan", filed: 90, disposal: 70, pending: 20 },
    { id: 7, district: "Gujranwala", filed: 105, disposal: 85, pending: 20 },
    { id: 8, district: "Sialkot", filed: 88, disposal: 72, pending: 16 },
    { id: 9, district: "Hyderabad", filed: 75, disposal: 58, pending: 17 },
    { id: 10, district: "Quetta", filed: 65, disposal: 48, pending: 17 },
    { id: 11, district: "Peshawar", filed: 92, disposal: 78, pending: 14 },
    { id: 12, district: "Bahawalpur", filed: 70, disposal: 55, pending: 15 },
    { id: 13, district: "Sargodha", filed: 80, disposal: 60, pending: 20 },
    { id: 14, district: "Sukkur", filed: 68, disposal: 54, pending: 14 },
    { id: 15, district: "Abbottabad", filed: 55, disposal: 42, pending: 13 },
  ];

  // Calculate totals dynamically
  const totalFiled = rowsData.reduce((sum, r) => sum + r.filed, 0);
  const totalDisposal = rowsData.reduce((sum, r) => sum + r.disposal, 0);
  const totalPending = rowsData.reduce((sum, r) => sum + r.pending, 0);
  const totalPercentage = ((totalDisposal / totalFiled) * 100).toFixed(1) + "%";

  const headers = [
    "Sr #",
    "Name of District",
    "Complaints Filed",
    "Disposal",
    "%age of Disposal",
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
            {rowsData.map((item, index) => {
              const percentage =
                ((item.disposal / item.filed) * 100).toFixed(1) + "%";
              return (
                <tr
                  key={item.id}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell>{item.district}</TableBodyCell>
                  <TableBodyCell>{item.filed}</TableBodyCell>
                  <TableBodyCell>{item.disposal}</TableBodyCell>
                  <TableBodyCell>{percentage}</TableBodyCell>
                  <TableBodyCell>{item.pending}</TableBodyCell>
                </tr>
              );
            })}

            {/* ✅ Total Row */}
            <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
                Total
              </TableBodyCell>
              <TableBodyCell>{totalFiled}</TableBodyCell>
              <TableBodyCell>{totalDisposal}</TableBodyCell>
              <TableBodyCell>{totalPercentage}</TableBodyCell>
              <TableBodyCell>{totalPending}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintSummaryTable;
