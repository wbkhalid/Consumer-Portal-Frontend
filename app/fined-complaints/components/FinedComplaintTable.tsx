"use client";

import { useState, useMemo } from "react";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import PaginationControls from "../../components/table/PaginationControls";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { formatComplaintId } from "../../utils/utils";
import { Dialog } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { sort } from "fast-sort";
import ComplaintDetailDialog from "../../components/dialog/ComplaintDetailDialog";

type SortKey = "id" | "finedAmount";

interface DetailTableProps {
  rowsData: ManageComplainsData[];
}

const DetailTable = ({ rowsData }: DetailTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const sortBy = (searchParams.get("sortBy") as SortKey) || "";
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "asc";

  const headers: { label: string; sortable?: SortKey }[] = [
    { label: "Complaint Id", sortable: "id" },
    { label: "Shop Name" },
    { label: "Phone #" },
    { label: "Address" },
    { label: "Fined Amount", sortable: "finedAmount" },
  ];

  const handleSort = (field: SortKey) => {
    const nextOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", field);
    params.set("sortOrder", nextOrder);
    router.push(`?${params.toString()}`);
  };

  const sortedData = useMemo(() => {
    if (!sortBy) return rowsData;

    if (sortBy === "id") {
      return sortOrder === "asc"
        ? sort(rowsData).asc((i) => i.id)
        : sort(rowsData).desc((i) => i.id);
    }

    if (sortBy === "finedAmount") {
      return sortOrder === "asc"
        ? sort(rowsData).asc((i) => i.finedAmount ?? 0)
        : sort(rowsData).desc((i) => i.finedAmount ?? 0);
    }

    return rowsData;
  }, [rowsData, sortBy, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(rowsData.length / pageSize);

  return (
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
                  onSort={() => header.sortable && handleSort(header.sortable)}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer! hover:bg-gray-100"
                onClick={() => {
                  setSelectedComplaint(item);
                  setOpenDialog(true);
                }}
              >
                <TableBodyCell className="font-semibold">
                  {formatComplaintId(item.id, item.entryType, item.createdAt)}
                </TableBodyCell>

                <TableBodyCell>
                  {item.shopName
                    ? item.shopName.slice(0, 20) +
                      (item.shopName.length > 20 ? "..." : "")
                    : "-"}
                </TableBodyCell>

                <TableBodyCell>{item.phoneNumber || "-"}</TableBodyCell>

                <TableBodyCell>{item.address || "-"}</TableBodyCell>

                <TableBodyCell>{item.finedAmount ?? 0}</TableBodyCell>
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

      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Content className="p-0! lg:max-w-[700px]! max-h-[80vh]! overflow-hidden!">
          <ComplaintDetailDialog selectedComplaint={selectedComplaint} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default DetailTable;
