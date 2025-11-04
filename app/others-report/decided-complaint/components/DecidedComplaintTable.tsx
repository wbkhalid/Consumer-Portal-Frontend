"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const DecidedComplaintTable = () => {
  const rowsData = [
    { name: "Lahore", totalComplaints: 25, avgDays: 40 },
    { name: "Karachi", totalComplaints: 30, avgDays: 50 },
    { name: "Islamabad", totalComplaints: 18, avgDays: 32 },
    { name: "Faisalabad", totalComplaints: 20, avgDays: 36 },
    { name: "Multan", totalComplaints: 15, avgDays: 28 },
    { name: "Rawalpindi", totalComplaints: 22, avgDays: 35 },
    { name: "Peshawar", totalComplaints: 19, avgDays: 30 },
    { name: "Quetta", totalComplaints: 12, avgDays: 22 },
    { name: "Sialkot", totalComplaints: 10, avgDays: 20 },
    { name: "Hyderabad", totalComplaints: 14, avgDays: 24 },
    { name: "Bahawalpur", totalComplaints: 11, avgDays: 19 },
    { name: "Gujranwala", totalComplaints: 16, avgDays: 25 },
    { name: "Sukkur", totalComplaints: 13, avgDays: 21 },
    { name: "Abbottabad", totalComplaints: 9, avgDays: 16 },
    { name: "Sargodha", totalComplaints: 17, avgDays: 26 },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "District", "Total Complaints", "Avg Days"]?.map(
                (header) => (
                  <TableHeaderCell key={header} label={header} />
                )
              )}
            </tr>
          </thead>

          <tbody>
            {rowsData.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{item.name}</TableBodyCell>
                <TableBodyCell>{item.totalComplaints}</TableBodyCell>
                <TableBodyCell>{item.avgDays}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DecidedComplaintTable;
