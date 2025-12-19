"use client";
import Image from "next/image";
import CustomTableHeaderCell from "../../../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../../../components/table/TableBodyCell";
import { BaseQuery, Column } from "../../../../../utils/utils";
import { Complains } from "../../list/page";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

export type Query = BaseQuery<Complains>;

interface Props {
  data: Complains[];
  paginatedData: Complains[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}

const List = ({
  data,
  paginatedData,
  currentPage,
  pageSize,
  searchParams,
}: Props) => {
  // const { totalFiled, totalDisposal, totalPending, totalPercentage } =
  //   calculateTotals(data);

  const columns = getColumns();

  return (
    <div className="relative">
      <div className="h-[calc(100vh-175px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
              <CustomTableHeaderCell label="Sr. No." />
              {columns.map((column, i) => (
                <CustomTableHeaderCell
                  key={i}
                  columnValue={column.value}
                  label={column.label}
                  searchParams={searchParams}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData?.map((d, index) => {
              const serial = (currentPage - 1) * pageSize + index + 1;

              return (
                <tr
                  key={serial}
                  className={`transition-colors duration-150  cursor-pointer!${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{serial}</TableBodyCell>
                  <TableBodyCell>{d.shopName}</TableBodyCell>
                  <TableBodyCell>{d.phoneNumber}</TableBodyCell>
                  <TableBodyCell>{d.address}</TableBodyCell>
                  <TableBodyCell>
                    <div className="flex gap-2">
                      {d.billBoardImage && d.billBoardImage.length > 0 && (
                        <Image
                          src={d.billBoardImage}
                          alt="Bill Board Image"
                          width={30}
                          height={30}
                          className="rounded-full w-7.5 h-7.5"
                        />
                      )}
                    </div>
                  </TableBodyCell>
                  <TableBodyCell>{d.complaintType}</TableBodyCell>
                  <TableBodyCell>{d.categoryName}</TableBodyCell>
                  <TableBodyCell>{d.sectionCategoryName}</TableBodyCell>
                  <TableBodyCell>
                    <div className="flex flex-col gap-2">
                      {d.sectionsDetails?.map((s, index) => (
                        <div
                          key={index}
                          className="border-b pb-1 last:border-0"
                        >
                          <div className="font-medium text-nowrap">
                            ({s.name}) -{" "}
                          </div>
                          <div className="text-gray-600 text-xs text-nowrap underline-offset-0">
                            {s.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableBodyCell>
                  <TableBodyCell>{d.remarks}</TableBodyCell>
                  <TableBodyCell>{d.assigneeRemarks}</TableBodyCell>
                  <TableBodyCell>{d.assigneeStatus}</TableBodyCell>
                  <TableBodyCell>{d.closingRemarks}</TableBodyCell>
                  <TableBodyCell>{d.finedAmount}</TableBodyCell>
                  <TableBodyCell>
                    <div className="flex gap-2">
                      {d.listAudio?.map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                    </div>
                  </TableBodyCell>
                  <TableBodyCell>
                    <div className="flex gap-2">
                      {d.listOfImage?.map((d, i) => (
                        <Image
                          key={i}
                          src={d}
                          alt="Bill Board Image"
                          width={30}
                          height={30}
                          className="rounded-full w-7.5 h-7.5"
                        />
                      ))}
                    </div>
                  </TableBodyCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;

// strongly typed column list
export const getColumns = (): Column<Complains>[] => [
  { label: "Shop Name", value: "shopName" },
  { label: "Phone #", value: "phoneNumber" },
  { label: "Address", value: "address" },
  { label: "Bill Board Image", value: "billBoardImage" },
  { label: "Complaint Type", value: "complaintType" },
  { label: "Category Name", value: "categoryName" },
  { label: "Section Category Name", value: "sectionCategoryName" },
  {
    label: "Section Details",
    render: (row) => (
      <div className="flex flex-col gap-2">
        {row.sectionsDetails?.map((s, index) => (
          <div key={index} className="border-b pb-1 last:border-0">
            <div className="font-medium">{s.name} - </div>
            <div className="text-gray-600 text-xs">{s.description}</div>
          </div>
        ))}
      </div>
    ),
  },
  { label: "Remarks", value: "remarks" },
  { label: "Assignee Remarks", value: "assigneeRemarks" },
  { label: "Assignee Status", value: "assigneeStatus" },
  { label: "Closing Remarks", value: "closingRemarks" },
  { label: "Fined Amount", value: "finedAmount" },
  { label: "List Audio", value: "listAudio" },
  { label: "List of Image", value: "listOfImage" },
];

// export const calculateTotals = (data: Complains[]) => {
//   const totalFiled = data.reduce(
//     (sum, item) => sum + (item.complaintsFiled || 0),
//     0
//   );
//   const totalDisposal = data.reduce(
//     (sum, item) => sum + (item.disposal || 0),
//     0
//   );
//   const totalPending = data.reduce(
//     (sum, item) => sum + (item.pendingComplaints || 0),
//     0
//   );

//   const totalPercentage =
//     data.length > 0
//       ? data.reduce((sum, item) => sum + (item.percentageDisposal || 0), 0) /
//         data.length
//       : 0;

//   return {
//     totalFiled,
//     totalDisposal,
//     totalPending,
//     totalPercentage: Number(totalPercentage.toFixed(2)),
//   };
// };
