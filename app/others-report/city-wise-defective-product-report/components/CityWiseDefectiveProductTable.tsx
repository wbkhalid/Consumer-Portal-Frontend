"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const CityWiseDefectiveProductTable = () => {
  const rowsData = {
    title: "Faulty Service - City Wise Report",
    items: [
      { name: "Lahore", underProceeding: 25, disposedOf: 40 },
      { name: "Karachi", underProceeding: 30, disposedOf: 50 },
      { name: "Islamabad", underProceeding: 18, disposedOf: 32 },
      { name: "Faisalabad", underProceeding: 20, disposedOf: 36 },
      { name: "Multan", underProceeding: 15, disposedOf: 28 },
      { name: "Rawalpindi", underProceeding: 22, disposedOf: 35 },
      { name: "Peshawar", underProceeding: 19, disposedOf: 30 },
      { name: "Quetta", underProceeding: 12, disposedOf: 22 },
      { name: "Sialkot", underProceeding: 10, disposedOf: 20 },
      { name: "Hyderabad", underProceeding: 14, disposedOf: 24 },
      { name: "Bahawalpur", underProceeding: 11, disposedOf: 19 },
      { name: "Gujranwala", underProceeding: 16, disposedOf: 25 },
      { name: "Sukkur", underProceeding: 13, disposedOf: 21 },
      { name: "Abbottabad", underProceeding: 9, disposedOf: 16 },
      { name: "Sargodha", underProceeding: 17, disposedOf: 26 },
    ],
  };

  const rows = rowsData.items.map((item) => ({
    ...item,
    all: item.underProceeding + item.disposedOf,
  }));

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {[
                "Sr #",
                "District",
                "Under Proceeding",
                "Disposed Of",
                "All",
              ].map((header) => (
                <TableHeaderCell key={header} label={header} />
              ))}
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
                <TableBodyCell>{item.underProceeding}</TableBodyCell>
                <TableBodyCell>{item.disposedOf}</TableBodyCell>
                <TableBodyCell>{item.all}</TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CityWiseDefectiveProductTable;
