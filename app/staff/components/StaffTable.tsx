"use client";

import { useState, useMemo } from "react";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteDialog from "../../components/DeleteDialog";
import { ManageStaffData } from "../../hooks/useGetAllStaff";
import { AUTH_API } from "../../APIs";
import axios from "axios";
import { toast } from "react-toastify";
import PaginationControls from "../../components/table/PaginationControls";

interface StaffTableProps {
  rowsData: ManageStaffData[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const StaffTable = ({ rowsData, setRefresh }: StaffTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const headers = [
    { label: "Id" },
    { label: "Name", sortable: "fullName" },
    { label: "Authority", sortable: "roles" },
    { label: "Phone #" },
    { label: "Division", sortable: "division" },
    { label: "District", sortable: "district" },
    { label: "Tehsil", sortable: "tehsil" },
    { label: "Action" },
  ];

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
    let sortableData = [...rowsData];

    if (sortConfig) {
      sortableData.sort((a, b) => {
        const key = sortConfig.key as keyof ManageStaffData;

        const valA = a[key];
        const valB = b[key];

        const aValue = Array.isArray(valA)
          ? valA.join(", ")
          : valA?.toString() ?? "";
        const bValue = Array.isArray(valB)
          ? valB.join(", ")
          : valB?.toString() ?? "";

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortableData;
  }, [rowsData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(rowsData.length / pageSize);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await axios.delete(`${AUTH_API}/delete-user/${selectedId}`);
      setRefresh((prev) => !prev);
      toast.success("Staff User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete Staff User.");
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <div className="relative flex flex-col h-[calc(100vh-170px)]">
        <div className="flex-1 overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="font-semibold">
                {headers.map((header) => (
                  <TableHeaderCell
                    key={header.label}
                    label={header.label}
                    sortable={header.sortable}
                    onSort={() =>
                      header.sortable && handleSort(header.sortable)
                    }
                  />
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData?.map((item, index) => (
                <tr key={item?.userId} className="hover:bg-gray-100">
                  <TableBodyCell>
                    {(currentPage - 1) * pageSize + index + 1}
                  </TableBodyCell>
                  <TableBodyCell>{item.fullName}</TableBodyCell>
                  <TableBodyCell>
                    {item.roles?.map((role) => role).join(", ")}
                  </TableBodyCell>
                  <TableBodyCell>{item.phoneNumber}</TableBodyCell>
                  <TableBodyCell>{item.division}</TableBodyCell>
                  <TableBodyCell>{item.district}</TableBodyCell>
                  <TableBodyCell>{item.tehsil}</TableBodyCell>

                  <TableBodyCell>
                    <RiDeleteBin6Line
                      className="text-lg text-(--error) cursor-pointer"
                      onClick={() => {
                        setSelectedId(item.userId);
                        setIsDeleteDialogOpen(true);
                      }}
                    />
                  </TableBodyCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="shrink-0 py-1! bg-white border-t border-[#e2e8f0]">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          message="User will be permanently deleted from the system."
          onConfirm={handleDelete}
        />
      </div>
    </>
  );
};

export default StaffTable;
