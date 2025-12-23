"use client";
import Image from "next/image";
import CustomTableHeaderCell from "../../../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../../../components/table/TableBodyCell";
import { BaseQuery, Column } from "../../../../../utils/utils";
import { Dialog } from "@radix-ui/themes";
import { useState } from "react";
import ComplaintDialog from "../../../../../complains/components/ComplaintDialog";
import { Complains } from "../../../../../authority-reports/complaint-reports/complaint-summary/list/page";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complains>();

  return (
    <>
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

                const images = d?.listOfImage?.filter((url) =>
                  url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
                );

                const videos = d?.listOfImage?.filter((url) =>
                  url.match(/\.(mp4|mov|avi|mkv)$/i)
                );

                return (
                  <tr
                    key={serial}
                    className={`transition-colors duration-150  cursor-pointer!${
                      index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                    } hover:bg-gray-100`}
                    onClick={() => {
                      setSelectedComplaint(d);
                      setOpenDialog(true);
                    }}
                  >
                    <TableBodyCell>{serial}</TableBodyCell>
                    <TableBodyCell>{d.shopName}</TableBodyCell>
                    <TableBodyCell>{d.phoneNumber}</TableBodyCell>
                    <TableBodyCell>{d.address}</TableBodyCell>
                    <TableBodyCell>
                      <div className="flex gap-2">
                        {d.billBoardImage && d.billBoardImage.length > 0 && (
                          <div className="w-6 h-6 rounded-sm overflow-hidden border border-[#e2e8f0]">
                            <Image
                              src={d.billBoardImage}
                              alt="Bill Board Image"
                              width={24}
                              height={24}
                              className="object-cover w-full h-full"
                            />
                          </div>
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
                      {!d.listAudio || d.listAudio?.length === 0 ? (
                        <div className="bg-[#efcdcd] rounded-full px-2! py-0.5! w-fit text-(--error)">
                          No
                        </div>
                      ) : (
                        <div className="bg-[#c8d3dd] rounded-full px-2! py-0.5! w-fit text-(--primary)">
                          Yes
                        </div>
                      )}
                    </TableBodyCell>
                    <TableBodyCell>
                      {!d.listOfImage || d.listOfImage.length === 0 ? (
                        <div className="bg-[#efcdcd] rounded-full px-2! py-0.5! w-fit text-(--error)">
                          No
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          {images?.map((imgUrl, i) => (
                            <div
                              key={imgUrl}
                              className="w-6 h-6 rounded-sm overflow-hidden border border-[#e2e8f0]"
                            >
                              <Image
                                src={imgUrl}
                                alt={imgUrl}
                                width={24}
                                height={24}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}

                          {videos?.map((videoUrl, i) => (
                            <div
                              key={i}
                              className="relative w-6 h-6 rounded-sm overflow-hidden border border-[#e2e8f0]"
                            >
                              <video
                                src={videoUrl}
                                className="w-6 h-6 rounded-sm border border-[#e2e8f0] object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </TableBodyCell>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Content className="p-0! lg:max-w-[700px]! max-h-[80vh]! overflow-hidden!">
          {selectedComplaint && (
            <ComplaintDialog selectedComplaint={selectedComplaint} />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default List;

// strongly typed column list
export const getColumns = (): Column<Complains>[] => [
  { label: "Shop", value: "shopName" },
  { label: "Phone #", value: "phoneNumber" },
  { label: "Address", value: "address" },
  { label: "Bill Board" },
  { label: "Complaint Type", value: "complaintType" },
  { label: "Category", value: "categoryName" },
  { label: "Section Category", value: "sectionCategoryName" },
  {
    label: "Section Details",
  },
  { label: "Remarks", value: "remarks" },
  { label: "Assignee Remarks", value: "assigneeRemarks" },
  { label: "Assignee Status", value: "assigneeStatus" },
  { label: "Closing Remarks", value: "closingRemarks" },
  { label: "Fined Amount", value: "finedAmount" },
  { label: "List of Audios", value: "listAudio" },
  { label: "List of Images", value: "listOfImage" },
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
