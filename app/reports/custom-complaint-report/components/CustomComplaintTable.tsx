"use client";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";

import { formatDate, statusData } from "../../../utils/utils";
import PaginationControls from "../../../components/table/PaginationControls";
import { useMemo, useState } from "react";
import { ManageComplainsData } from "../../../hooks/useGetAllComplains";

interface CustomComplaintProp {
  rowsData: ManageComplainsData[];
}

const CustomComplaintTable = ({ rowsData }: CustomComplaintProp) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const headers = [
    { label: "Id", sortable: "id" },
    { label: "Date" },
    { label: "Shop Name" },
    { label: "Phone #" },
    { label: "Complaint Type", sortable: "complaintType" },
    { label: "Category", sortable: "categoryName" },
    { label: "Section Category Name", sortable: "sectionCategoryName" },
    { label: "Section Name", sortable: "sectionName" },
    { label: "Section Description", sortable: "sectionDescription" },
    { label: "Status" },
    { label: "Remarks" },
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

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className="relative">
      <div className="h-[calc(100vh-160px)] overflow-auto">
        <div className="overflow-scroll mb-10!">
          <table className="min-w-full text-sm">
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
              {paginatedData?.map((item, index) => {
                return (
                  <tr
                    key={item?.id}
                    className={`transition-colors duration-150 cursor-pointer ${
                      index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                    } hover:bg-gray-100`}
                    onClick={() => {
                      setSelectedComplaint(item);
                      setOpenDialog(true);
                    }}
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
                      {item?.sectionsDetails
                        ?.map((s) => s?.description)
                        .join(", ")}
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="absolute bottom-0 py-1! w-full bg-white  border-t border-[#e2e8f0]">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default CustomComplaintTable;

export const getColumns = (): string[] => [
  "Complaint #",
  "Shop Name",
  "Phone #",
  "Complaint Date",
  "Address",
  "Complaint Type",
  "Section Category",
  "Nature of Complaint",
  "Sections",
];
