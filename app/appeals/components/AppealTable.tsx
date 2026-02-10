import { useState } from "react";
import PaginationControls from "../../components/table/PaginationControls";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { ManageAppealsData } from "../../hooks/useGetAppeals";
import {
  formatComplaintId,
  formatDate,
  getRole,
  getUniqueSectionNumbers,
} from "../../utils/utils";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import { Dialog } from "@radix-ui/themes";
import ComplaintDetailDialog from "../../components/dialog/ComplaintDetailDialog";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import AppealDialog from "./AppealDialog";

interface AppealsTableProps {
  rowsData: ManageAppealsData[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const headers = [
  { label: "Sr #" },
  { label: "Complaint ID", sortable: "id" },
  { label: "Appeal Date", sortable: "date" },
  { label: "Appeal Reason", sortable: "reason" },
  { label: "Assignee To", sortable: "assigneeTo" },
  { label: "Shop Name" },
  { label: "Shop Phone No" },
  { label: "Section Name", sortable: "sectionName" },
  { label: "Nature of Complaint" },
  { label: "Remarks" },
  { label: "Assignee Remarks" },
];

const AppealTable = ({ rowsData, setRefresh }: AppealsTableProps) => {
  const role = getRole();
  const { data: staffData } = useGetAllStaff();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const isAllowed = role === "Secretary" || role === "DG";
  return (
    <>
      <div className="relative">
        <div className="h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide relative">
          <table className="min-w-full text-sm mb-10!">
            <thead className="sticky top-0 z-10">
              <tr className="font-semibold bg-white">
                {headers.map((header) => (
                  <TableHeaderCell
                    key={header.label}
                    label={header.label}
                    sortable={header.sortable}
                    // onSort={() =>
                    //   header.sortable && handleSort(header.sortable)
                    // }
                  />
                ))}
              </tr>
            </thead>

            <tbody>
              {rowsData?.map((item, index) => (
                <tr
                  key={item?.appealId}
                  className={
                    isAllowed ? "cursor-pointer hover:bg-gray-100" : ""
                  }
                  onClick={
                    isAllowed
                      ? () => {
                          setSelectedComplaint(item?.complaintDetails);
                          setOpenDialog(true);
                        }
                      : undefined
                  }
                >
                  <TableBodyCell className="font-semibold">
                    {index + 1}
                  </TableBodyCell>
                  <TableBodyCell className="font-semibold">
                    {item?.complaintDetails?.caseNo}
                  </TableBodyCell>

                  <TableBodyCell>{formatDate(item?.createdAt)}</TableBodyCell>
                  <TableBodyCell>
                    {item?.appealReason
                      ? item?.appealReason?.slice(0, 20) +
                        (item?.appealReason?.length > 20 ? "..." : "")
                      : ""}
                  </TableBodyCell>
                  <TableBodyCell>
                    {staffData?.find(
                      (u) => u.userId === item?.complaintDetails?.assignedTo,
                    )?.fullName || "-"}
                  </TableBodyCell>

                  <TableBodyCell>
                    {item?.complaintDetails?.shopName
                      ? item?.complaintDetails?.shopName?.slice(0, 20) +
                        (item?.complaintDetails?.shopName?.length > 20
                          ? "..."
                          : "")
                      : ""}
                  </TableBodyCell>

                  <TableBodyCell>
                    {item?.complaintDetails?.phoneNumber}
                  </TableBodyCell>

                  {/* <TableBodyCell>
                    {item?.complaintDetails?.sectionCategoryName}
                  </TableBodyCell> */}

                  <TableBodyCell>
                    {getUniqueSectionNumbers(
                      item?.complaintDetails?.sectionsDetails,
                    )}
                  </TableBodyCell>

                  <TableBodyCell>
                    {item?.complaintDetails?.sectionsDetails
                      ?.map((s) => s?.description)
                      .join(",")}
                  </TableBodyCell>
                  {/* 
                  <TableBodyCell>
                    {item?.complaintDetails?.categoryName}
                  </TableBodyCell> */}

                  <TableBodyCell className="whitespace-nowrap">
                    {item?.complaintDetails?.remarks
                      ? item?.complaintDetails?.remarks?.slice(0, 20) +
                        (item?.complaintDetails?.remarks?.length > 20
                          ? "..."
                          : "")
                      : "-"}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.complaintDetails?.assigneeRemarks
                      ? item?.complaintDetails?.assigneeRemarks?.slice(0, 20) +
                        (item?.complaintDetails?.assigneeRemarks?.length > 20
                          ? "..."
                          : "")
                      : "-"}
                  </TableBodyCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
          <Dialog.Content
            className="p-0! lg:max-w-[90%]! max-h-[80vh]! overflow-hidden!"
            onInteractOutside={(event) => event.preventDefault()}
          >
            <AppealDialog
              selectedComplaint={selectedComplaint}
              onClose={() => {
                setOpenDialog(false);
                setRefresh((prev) => !prev);
              }}
              onSuccess={() => {
                setOpenDialog(false);
                setRefresh((prev) => !prev);
              }}
            />
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  );
};

export default AppealTable;
