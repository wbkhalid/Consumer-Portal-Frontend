import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const AgingTable = () => {
  const rowsData = [
    { dayRange: "1 - 30 Days", complaints: 25 },
    { dayRange: "31 - 60 Days", complaints: 30 },
    { dayRange: "61 - 120 Days", complaints: 18 },
    { dayRange: "121 - 180 Days", complaints: 20 },
    { dayRange: "181 Days Above", complaints: 20 },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "Day Range", "No of Complaints"]?.map((header) => (
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
                <TableBodyCell>{item.dayRange}</TableBodyCell>
                <TableBodyCell>{item.complaints}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgingTable;
