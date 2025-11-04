"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const FineImposedTable = () => {
  const rowsData = [
    { name: "Lahore", complaints: 25, fineImposed: 1240 },
    { name: "Karachi", complaints: 30, fineImposed: 1550 },
    { name: "Islamabad", complaints: 18, fineImposed: 3122 },
    { name: "Faisalabad", complaints: 20, fineImposed: 7636 },
    { name: "Multan", complaints: 15, fineImposed: 2890 },
    { name: "Rawalpindi", complaints: 22, fineImposed: 3985 },
    { name: "Peshawar", complaints: 19, fineImposed: 3000 },
    { name: "Quetta", complaints: 12, fineImposed: 2200 },
    { name: "Sialkot", complaints: 10, fineImposed: 2000 },
    { name: "Hyderabad", complaints: 14, fineImposed: 2400 },
    { name: "Bahawalpur", complaints: 11, fineImposed: 1900 },
    { name: "Gujranwala", complaints: 16, fineImposed: 2500 },
    { name: "Sukkur", complaints: 13, fineImposed: 2100 },
    { name: "Abbottabad", complaints: 9, fineImposed: 1600 },
    { name: "Sargodha", complaints: 17, fineImposed: 2600 },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "District", "Complaints", "Fine Imposed"].map(
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
                <TableBodyCell>{item.complaints}</TableBodyCell>
                <TableBodyCell>{item.fineImposed}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FineImposedTable;
