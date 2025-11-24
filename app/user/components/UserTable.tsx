"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import PaginationControls from "../../components/table/PaginationControls";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { FaEye } from "react-icons/fa";
import { formatDate, statusData } from "../../utils/utils";
import { Dialog } from "@radix-ui/themes";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import DeleteDialog from "../../components/DeleteDialog";

interface UserTableProps {
  rowsData: ManageComplainsData[];
}

const PAGE_SIZE = 10;

const UserTable = ({ rowsData }: UserTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(true);

  const headers = [
    { label: "Id", sortable: "id" },
    { label: "Name", sortable: "name" },
    { label: "Role", sortable: "role" },
    { label: "Phone #" },
    { label: "CNIC" },
    { label: "Division", sortable: "division" },
    { label: "District", sortable: "district" },
    { label: "Tehsil", sortable: "tehsil" },
    { label: "Action" },
  ];

  // Sort handler
  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return rowsData;

    const { key, direction } = sortConfig;
    return [...rowsData].sort((a, b) => {
      let aValue = "";
      let bValue = "";

      if (key === "sectionName") {
        aValue = a.sectionsDetails?.map((s) => s.name).join(", ") ?? "";
        bValue = b.sectionsDetails?.map((s) => s.name).join(", ") ?? "";
      } else if (key === "sectionDescription") {
        aValue = a.sectionsDetails?.map((s) => s.description).join(", ") ?? "";
        bValue = b.sectionsDetails?.map((s) => s.description).join(", ") ?? "";
      } else {
        aValue = String(a[key as keyof ManageComplainsData] ?? "");
        bValue = String(b[key as keyof ManageComplainsData] ?? "");
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rowsData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return sortedData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedData, currentPage]);

  const handleDelete = () => {};

  return (
    <div className="relative">
      <div className="h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm mb-10!">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="font-semibold">
              {headers?.map((header) => (
                <TableHeaderCell
                  key={header?.label}
                  label={header?.label}
                  sortable={header?.sortable}
                  onSort={
                    header.sortable
                      ? () => handleSort(header.sortable!)
                      : undefined
                  }
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData?.map((item, index) => (
              <tr
                key={item?.id}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{item?.id}</TableBodyCell>
                <TableBodyCell className="whitespace-nowrap">
                  {formatDate(item?.createdAt)}
                </TableBodyCell>
                <TableBodyCell>{item?.shopName}</TableBodyCell>
                <TableBodyCell>{item?.phoneNumber}</TableBodyCell>
                <TableBodyCell>{item?.complaintType}</TableBodyCell>
                <TableBodyCell>{item?.categoryName}</TableBodyCell>
                <TableBodyCell>{item?.sectionCategoryName}</TableBodyCell>
                <TableBodyCell>
                  {item?.sectionsDetails?.map((s) => s?.name).join(", ")}
                </TableBodyCell>
                <TableBodyCell>
                  {item?.sectionsDetails?.map((s) => s?.description).join(", ")}
                </TableBodyCell>
                <TableBodyCell className="whitespace-nowrap">
                  {statusData?.find((s) => s?.id === item?.status)?.label ||
                    "-"}
                </TableBodyCell>
                <TableBodyCell className="min-w-[200px]">
                  {item?.remarks
                    ? item?.remarks?.slice(0, 50) +
                      (item?.remarks?.length > 50 ? "..." : "")
                    : ""}
                </TableBodyCell>
                <TableBodyCell>
                  {item?.entryType === 0 ? (
                    <div className="bg-[#c8d3dd] rounded-full px-2! py-0.5! w-fit text-(--primary)">
                      Online
                    </div>
                  ) : (
                    <div className="bg-[#faefbb] rounded-full px-2! py-0.5! w-fit text-(--warning)">
                      Manual
                    </div>
                  )}
                </TableBodyCell>
                <TableBodyCell>
                  {!item?.listAudio || item?.listAudio?.length === 0 ? (
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
                  {!item?.listOfImage || item?.listOfImage?.length === 0 ? (
                    <div className="bg-[#efcdcd] rounded-full px-2! py-0.5! w-fit text-(--error)">
                      No
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      {item?.listOfImage?.map((imgUrl, i) => (
                        <div
                          key={i}
                          className="relative w-6 h-6 rounded-sm overflow-hidden border border-[#e2e8f0]"
                        >
                          <Image
                            src={imgUrl}
                            alt={`attachment-${i}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </TableBodyCell>

                <TableBodyCell>
                  <div className="flex items-center gap-2">
                    <FiEdit3 />
                    <RiDeleteBin6Line />
                  </div>
                </TableBodyCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-0 py-1! w-full bg-white border-t border-[#e2e8f0]">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        message="User Will be permanently deleted from the system."
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UserTable;
