"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const ComplaintInstitutionTable = () => {
  // 🧩 Dummy data
  const rowsData = [
    { name: "Lahore", walkIn: 25, online: 40 },
    { name: "Karachi", walkIn: 30, online: 50 },
    { name: "Islamabad", walkIn: 18, online: 32 },
    { name: "Faisalabad", walkIn: 20, online: 36 },
    { name: "Multan", walkIn: 15, online: 28 },
    { name: "Rawalpindi", walkIn: 22, online: 35 },
    { name: "Peshawar", walkIn: 19, online: 30 },
    { name: "Quetta", walkIn: 12, online: 22 },
    { name: "Sialkot", walkIn: 10, online: 20 },
    { name: "Hyderabad", walkIn: 14, online: 24 },
    { name: "Bahawalpur", walkIn: 11, online: 19 },
    { name: "Gujranwala", walkIn: 16, online: 25 },
    { name: "Sukkur", walkIn: 13, online: 21 },
    { name: "Abbottabad", walkIn: 9, online: 16 },
    { name: "Sargodha", walkIn: 17, online: 26 },
  ];

  // 🧮 Add "total" dynamically
  const rows = rowsData.map((item) => ({
    ...item,
    total: item.walkIn + item.online,
  }));

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "District", "Walk In", "Online", "Total"].map(
                (header) => (
                  <TableHeaderCell key={header} label={header} />
                )
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{item.name}</TableBodyCell>
                <TableBodyCell>{item.walkIn}</TableBodyCell>
                <TableBodyCell>{item.online}</TableBodyCell>
                <TableBodyCell>{item.total}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintInstitutionTable;
