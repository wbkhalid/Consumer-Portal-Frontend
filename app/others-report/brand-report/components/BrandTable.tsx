import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const BrandTable = () => {
  // 🧩 Dummy data
  const rowsData = [
    { name: "Lahore", complaints: 25 },
    { name: "Karachi", complaints: 30 },
    { name: "Islamabad", complaints: 18 },
    { name: "Faisalabad", complaints: 20 },
    { name: "Multan", complaints: 15 },
    { name: "Rawalpindi", complaints: 22 },
    { name: "Peshawar", complaints: 19 },
    { name: "Quetta", complaints: 12 },
    { name: "Sialkot", complaints: 10 },
    { name: "Hyderabad", complaints: 14 },
    { name: "Bahawalpur", complaints: 11 },
    { name: "Gujranwala", complaints: 16 },
    { name: "Sukkur", complaints: 13 },
    { name: "Abbottabad", complaints: 9 },
    { name: "Sargodha", complaints: 17 },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "District", "Total Complaints"]?.map((header) => (
                <TableHeaderCell key={header} label={header} />
              ))}
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
                <TableBodyCell>{item.complaints}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandTable;
