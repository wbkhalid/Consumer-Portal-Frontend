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

interface ComplainsTableProps {
  rowsData: ManageComplainsData[];
}

const ComplainsTable = ({ rowsData }: ComplainsTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pageSize, setPageSize] = useState(10);

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
    { label: "Type" },
    { label: "Audio Attach" },
    { label: "Files" },
    { label: "View" },
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
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className="relative">
      <div className="h-[calc(100vh-120px)] overflow-x-auto relative">
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
                  <FaEye
                    className="text-lg text-(--primary) cursor-pointer"
                    onClick={() => {
                      setSelectedComplaint(item);
                      setOpenDialog(true);
                    }}
                  />
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
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>

      {/* 🔵 Dialog */}
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Content className="px-0 lg:max-w-[700px]!">
          {selectedComplaint && (
            <div className=" max-h-[70vh] overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/images/dummy-image1.png"
                    alt="Shop Banner"
                    width={36}
                    height={36}
                    className="rounded-xs"
                  />
                  <div className="flex flex-col gap-0">
                    <p className="font-bold text-lg">
                      {selectedComplaint.shopName}
                    </p>
                    <p className="text-sm">
                      {formatDate(selectedComplaint.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-h-[55vh] overflow-y-auto mt-2! space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Detail
                    label="Phone No"
                    value={selectedComplaint.phoneNumber}
                  />
                  <Detail
                    label="Section Category"
                    value={selectedComplaint.sectionCategoryName}
                  />
                  <Detail
                    label="Section"
                    value={selectedComplaint.sectionsDetails
                      ?.map((s) => s.name)
                      .join(", ")}
                  />
                  <Detail
                    label="Category"
                    value={selectedComplaint.categoryName}
                  />
                </div>

                <div className="border-t border-gray-200 my-2!" />

                <Detail
                  label="Remarks"
                  value={
                    selectedComplaint?.remarks
                      ? selectedComplaint?.remarks
                      : "-"
                  }
                />

                <div className="border-t border-gray-200 my-2!" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#555555] mb-1!">Audio Files</p>
                    {selectedComplaint.listAudio?.length ? (
                      selectedComplaint.listAudio.map((url, i) => (
                        <audio
                          key={i}
                          controls
                          className="w-full mb-2! rounded"
                        >
                          <source
                            src={`http://103.226.216.18:151${url}`}
                            type="audio/mpeg"
                          />
                        </audio>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        No audio files.
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-[#555555] mb-1!">Images</p>
                    {selectedComplaint.listOfImage?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedComplaint.listOfImage.map((url, i) => (
                          <div
                            key={i}
                            className="relative w-16 h-16 rounded-md overflow-hidden border"
                          >
                            <Image
                              src={url}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        No images available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

const Detail = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex flex-col">
    <p className="text-xs text-[#555555]">{label}</p>
    <p className="text-sm wrap-break-word">{value || "-"}</p>
  </div>
);

export default ComplainsTable;
