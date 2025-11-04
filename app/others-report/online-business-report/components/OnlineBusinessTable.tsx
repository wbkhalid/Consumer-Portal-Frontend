import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const OnlineBusinessTable = () => {
  // 🧩 Dummy data
  const rowsData = [
    { name: "Lahore Authority", complaints: 25 },
    { name: "Karachi Authority", complaints: 30 },
    { name: "Islamabad Authority", complaints: 18 },
    { name: "Faisalabad Authority", complaints: 20 },
    { name: "Multan Authority", complaints: 15 },
    { name: "Rawalpindi Authority", complaints: 22 },
    { name: "Peshawar Authority", complaints: 19 },
    { name: "Quetta Authority", complaints: 12 },
    { name: "Sialkot Authority", complaints: 10 },
    { name: "Hyderabad Authority", complaints: 14 },
    { name: "Bahawalpur Authority", complaints: 11 },
    { name: "Gujranwala Authority", complaints: 16 },
    { name: "Sukkur Authority", complaints: 13 },
    { name: "Abbottabad Authority", complaints: 9 },
    { name: "Sargodha Authority", complaints: 17 },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "Authority", "Total Complaints"]?.map((header) => (
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

export default OnlineBusinessTable;
