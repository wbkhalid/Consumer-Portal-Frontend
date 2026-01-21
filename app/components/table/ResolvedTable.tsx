"use client";

import { useState, useMemo } from "react";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import PaginationControls from "../../components/table/PaginationControls";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import {
  formatComplaintId,
  formatDate,
  getDaysOld,
  getUniqueSectionNumbers,
  statusData,
} from "../../utils/utils";
import { Dialog } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { sort } from "fast-sort";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import ResolvedDialog from "../dialog/ResolvedDialog";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";

interface ResolvedTableProps {
  rowsData: ManageComplainsData[] | ManageCustomComplainsData[];
  isBreadCrumbs?: boolean;
}

const ResolvedTable = ({ rowsData, isBreadCrumbs }: ResolvedTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  // const [pageSize, setPageSize] = useState(10);
  const { data: staffData } = useGetAllStaff();

  const sortBy = searchParams.get("sortBy") || "";
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "asc";

  const headers = [
    { label: "Sr #" },
    { label: "Complaint ID", sortable: "id" },
    { label: "Date", sortable: "date" },
    { label: "Assignee To", sortable: "assigneeTo" },
    { label: "Shop Name" },
    { label: "Shop Phone No" },
    { label: "Nature of Complaint", sortable: "complaintType" },
    { label: "Section Name", sortable: "sectionName" },
    { label: "Section Description" },
    { label: "Category", sortable: "categoryName" },
    { label: "Remarks" },
    { label: "Assignee Remarks" },
    { label: "Final Remarks" },
    { label: "Type", sortable: "type" },
    { label: "Evidence" },
  ];

  const sortFieldMapping: Record<
    string,
    (item: ManageComplainsData | ManageCustomComplainsData) => string | number
  > = {
    id: (i) => i.id,
    date: (i) => new Date(i.createdAt).getTime(),
    assigneeTo: (i) =>
      staffData?.find((u) => u.userId === i.assignedTo)?.fullName || "",
    complaintType: (i) => i.complaintType,
    sectionName: (i) =>
      i.sectionsDetails
        ?.map((s) => s.name?.replace(/SECTION\s*/i, "").trim())
        .filter(Boolean)
        .join(","),
    sectionDescription: (i) =>
      i.sectionsDetails?.map((s) => s.description).join(","),
    categoryName: (i) => i.categoryName,
    status: (i) => statusData.find((s) => s.id === i.status)?.label || "",
    type: (i) => (i.entryType === 0 ? "Online" : "Manual"),
  };

  const handleSort = (field: string) => {
    const nextOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", field);
    params.set("sortOrder", nextOrder);
    router.push(`?${params.toString()}`);
  };

  const sortedData = useMemo(() => {
    if (!sortBy) {
      return sort(rowsData).desc((i) => i.id);
    }

    const getField = sortFieldMapping[sortBy];
    if (!getField) return rowsData;

    return sortOrder === "asc"
      ? sort(rowsData).asc(getField)
      : sort(rowsData).desc(getField);
  }, [rowsData, sortBy, sortOrder]);

  // const paginatedData = useMemo(() => {
  //   const start = (currentPage - 1) * pageSize;
  //   return sortedData?.slice(start, start + pageSize);
  // }, [sortedData, currentPage, pageSize]);

  // const totalPages = Math.ceil(rowsData?.length / pageSize);

  return (
    <div
      className={`relative flex flex-col  ${
        isBreadCrumbs ? "h-[calc(100vh-190px)]" : "h-[calc(100vh-165px)]"
      } `}
    >
      <div className="flex-1 overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="font-semibold">
              {headers.map((header) => (
                <TableHeaderCell
                  key={header.label}
                  label={header.label}
                  sortable={header.sortable}
                  onSort={() => header.sortable && handleSort(header.sortable)}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {sortedData?.map((item, index) => (
              <tr
                key={item?.id}
                className="cursor-pointer! hover:bg-gray-100"
                onClick={() => {
                  setSelectedComplaint(item);
                  setOpenDialog(true);
                }}
              >
                <TableBodyCell className="font-semibold">
                  {index + 1}
                </TableBodyCell>
                <TableBodyCell className="font-semibold">
                  {formatComplaintId(
                    item?.id,
                    item?.entryType,
                    item?.createdAt,
                  )}
                </TableBodyCell>

                <TableBodyCell>{formatDate(item?.createdAt)}</TableBodyCell>
                <TableBodyCell>
                  {staffData?.find((u) => u.userId === item.assignedTo)
                    ?.fullName || "-"}
                </TableBodyCell>

                <TableBodyCell>
                  {item?.shopName
                    ? item?.shopName?.slice(0, 20) +
                      (item?.shopName?.length > 20 ? "..." : "")
                    : ""}
                </TableBodyCell>

                <TableBodyCell>{item?.phoneNumber}</TableBodyCell>

                <TableBodyCell>{item?.sectionCategoryName}</TableBodyCell>

                <TableBodyCell>
                  {getUniqueSectionNumbers(item?.sectionsDetails)}
                </TableBodyCell>

                <TableBodyCell>
                  {item?.sectionsDetails?.map((s) => s?.description).join(",")}
                </TableBodyCell>

                <TableBodyCell>{item?.categoryName}</TableBodyCell>

                <TableBodyCell className="whitespace-nowrap">
                  {item?.remarks
                    ? item?.remarks?.slice(0, 20) +
                      (item?.remarks?.length > 20 ? "..." : "")
                    : ""}
                </TableBodyCell>
                <TableBodyCell className="whitespace-nowrap">
                  {item?.assigneeRemarks
                    ? item?.assigneeRemarks?.slice(0, 20) +
                      (item?.assigneeRemarks?.length > 20 ? "..." : "")
                    : ""}
                </TableBodyCell>
                <TableBodyCell className="whitespace-nowrap">
                  {item?.closingRemarks
                    ? item?.closingRemarks?.slice(0, 20) +
                      (item?.closingRemarks?.length > 20 ? "..." : "")
                    : ""}
                </TableBodyCell>

                <TableBodyCell>
                  {item?.entryType === 0 ? (
                    <div className="bg-[#c8d3dd] rounded-full px-2! py-0.5! w-fit text-(--primary)">
                      Online
                    </div>
                  ) : (
                    <div className="bg-[#f2cccc] rounded-full px-2! py-0.5! w-fit text-[#BD0000]">
                      Manual
                    </div>
                  )}
                </TableBodyCell>

                <TableBodyCell>
                  {!item?.listOfImage || item?.listOfImage?.length === 0 ? (
                    <p className="text-[#535862] text-sm">-</p>
                  ) : (
                    <p className="text-[#535862] text-sm">Attached</p>
                  )}
                </TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="shrink-0 py-1! bg-white border-t border-[#e2e8f0]">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div> */}

      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Content className="p-0! lg:max-w-[700px]! max-h-[80vh]">
          <ResolvedDialog selectedComplaint={selectedComplaint} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default ResolvedTable;
