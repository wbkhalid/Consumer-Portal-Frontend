import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const RatioTable = () => {
  const rowsData = [
    {
      description: "Cases Related to Court",
      totalComplaints: 744,
      femalesComplaint: 64,
    },
    {
      description: "Complaints Related to Authority",
      totalComplaints: 522,
      femalesComplaint: 180,
    },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "Discription", "Total", "Females", "%"]?.map(
                (header) => (
                  <TableHeaderCell key={header} label={header} />
                )
              )}
            </tr>
          </thead>

          <tbody>
            {rowsData.map((item, index) => {
              const percentage = (
                (item?.femalesComplaint / item.totalComplaints) *
                100
              ).toFixed(2);
              return (
                <tr
                  key={index}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell>{item.description}</TableBodyCell>
                  <TableBodyCell>{item.totalComplaints}</TableBodyCell>
                  <TableBodyCell>{item.femalesComplaint}</TableBodyCell>
                  <TableBodyCell>{percentage}</TableBodyCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatioTable;
