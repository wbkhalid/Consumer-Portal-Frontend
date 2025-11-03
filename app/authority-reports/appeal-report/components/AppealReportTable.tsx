"use client";

import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

const AppealReportTable = () => {
  const headers = ["Sr #", "Name of District", "No of Appeals"];

  // 🧩 Dummy Data (15 Districts)
  const rowsData = [
    { district: "Lahore", appeals: 320 },
    { district: "Karachi", appeals: 410 },
    { district: "Islamabad", appeals: 180 },
    { district: "Faisalabad", appeals: 270 },
    { district: "Multan", appeals: 220 },
    { district: "Rawalpindi", appeals: 310 },
    { district: "Peshawar", appeals: 260 },
    { district: "Quetta", appeals: 190 },
    { district: "Hyderabad", appeals: 230 },
    { district: "Sialkot", appeals: 200 },
    { district: "Gujranwala", appeals: 250 },
    { district: "Bahawalpur", appeals: 180 },
    { district: "Sukkur", appeals: 210 },
    { district: "Mardan", appeals: 160 },
    { district: "Abbottabad", appeals: 140 },
  ];

  // 🧮 Total Appeals
  const totalAppeals = rowsData.reduce((sum, r) => sum + r.appeals, 0);

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm border border-[#E9EAEB] border-collapse">
          {/* ===== Table Header ===== */}
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="font-semibold text-[#292D32] text-center">
              {headers.map((header) => (
                <TableHeaderCell key={header} label={header} />
              ))}
            </tr>
          </thead>

          {/* ===== Table Body ===== */}
          <tbody>
            {rowsData.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors duration-150 text-center ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{item.district}</TableBodyCell>
                <TableBodyCell>{item.appeals}</TableBodyCell>
              </tr>
            ))}

            {/* ===== TOTAL ROW ===== */}
            <tr className="font-semibold bg-[#f1f1f1] text-center sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center!">
                Total
              </TableBodyCell>
              <TableBodyCell>{totalAppeals.toLocaleString()}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppealReportTable;
