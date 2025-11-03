"use client";
import TableBodyCell from "../../../components/table/TableBodyCell";
import TableHeaderCell from "../../../components/table/TableHeaderCell";

const DefectiveProductTable = () => {
  const rowsData = [
    {
      title: "Electronics",
      count: 102,
      items: [
        { name: "Generator", complains: 6 },
        { name: "Television", complains: 12 },
        { name: "Air Conditioner", complains: 9 },
        { name: "Refrigerator", complains: 8 },
        { name: "Microwave Oven", complains: 4 },
      ],
    },
    {
      title: "Home Appliances",
      count: 87,
      items: [
        { name: "Washing Machine", complains: 10 },
        { name: "Vacuum Cleaner", complains: 5 },
        { name: "Iron", complains: 7 },
        { name: "Ceiling Fan", complains: 9 },
        { name: "Heater", complains: 6 },
      ],
    },
    {
      title: "Clothing",
      count: 80,
      items: [
        { name: "Men’s Wear", complains: 7 },
        { name: "Women’s Wear", complains: 9 },
        { name: "Kids’ Wear", complains: 5 },
        { name: "Shoes", complains: 4 },
        { name: "Accessories", complains: 6 },
      ],
    },
    {
      title: "Utilities",
      count: 49,
      items: [
        { name: "Electricity", complains: 12 },
        { name: "Water Supply", complains: 9 },
        { name: "Gas", complains: 8 },
        { name: "Internet", complains: 10 },
        { name: "Telephone", complains: 5 },
      ],
    },
  ];

  const complainsCount = rowsData?.reduce((acc, item) => acc + item?.count, 0);

  return (
    <div className="relative">
      <div className="h-[calc(100vh-128px)] overflow-y-auto scrollbar-hide relative space-y-8">
        <p className="font-bold text-(--primary) mt-2! pl-1!">
          {"All Complains Count"}
        </p>
        {/* 🔹 Main Table */}
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              {["Sr #", "Title", "Count"].map((header) => (
                <TableHeaderCell key={header} label={header} />
              ))}
            </tr>
          </thead>

          <tbody>
            {rowsData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell>{item?.title}</TableBodyCell>
                  <TableBodyCell>{item?.count}</TableBodyCell>
                </tr>
              );
            })}
            <tr className="bg-white">
              <TableBodyCell colSpan={2} className="font-bold text-center!">
                Total
              </TableBodyCell>
              <TableBodyCell colSpan={2} className="font-bold">
                {complainsCount}
              </TableBodyCell>
            </tr>
          </tbody>
        </table>

        {/* 🔹 Items Table (sub-table for each category) */}
        {rowsData.map((category, catIndex) => {
          const totalComplains = category?.items?.reduce(
            (acc, item) => acc + item?.complains,
            0
          );
          return (
            <div key={catIndex}>
              <p className="font-bold text-(--primary) mt-2! pl-1!">
                {category.title}
              </p>
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="font-semibold bg-white">
                    {["Sr #", "Item Name", "Complaints Filed"].map((header) => (
                      <TableHeaderCell key={header} label={header} />
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {category.items.map((item, index) => (
                    <tr
                      key={index}
                      className={`transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <TableBodyCell>{index + 1}</TableBodyCell>
                      <TableBodyCell>{item?.name}</TableBodyCell>
                      <TableBodyCell>{item?.complains}</TableBodyCell>
                    </tr>
                  ))}

                  <tr className="bg-white">
                    <TableBodyCell
                      colSpan={2}
                      className="font-bold text-center!"
                    >
                      Total
                    </TableBodyCell>
                    <TableBodyCell className="font-bold">
                      {totalComplains}
                    </TableBodyCell>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DefectiveProductTable;
