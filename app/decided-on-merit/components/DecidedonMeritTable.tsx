import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { formatDate, getDaysOld } from "../../utils/utils";
import { useMemo, useState } from "react";
import PaginationControls from "../../components/table/PaginationControls";
import { Dialog } from "@radix-ui/themes";
import DecidedonMeritDialog from "./DecidedonMeritDialog";

interface DecidedonMeritTableProps {
  rowsData: ManageComplainsData[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const DecidedonMeritTable = ({
  rowsData,
  setRefresh,
}: DecidedonMeritTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);

  const headers = [
    { label: "Id", sortable: "id" },
    { label: "Date" },
    { label: "Days Old" },
    { label: "Shop Name" },
    { label: "Phone #" },
    { label: "Complaint Type", sortable: "complaintType" },
    { label: "Category", sortable: "categoryName" },
    { label: "Nature of Complaint", sortable: "sectionCategoryName" },
    { label: "Section Name", sortable: "sectionName" },
    { label: "Section Description", sortable: "sectionDescription" },
    { label: "Fine" },
    { label: "Remarks" },
    { label: "Assignee Remarks" },
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
    <>
      <div className="relative">
        <div className="h-[calc(100vh-120px)] overflow-auto">
          <div className="overflow-scroll mb-10!">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="font-semibold bg-white">
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
                    key={index}
                    className={`transition-colors duration-150  cursor-pointer! ${
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
                    <TableBodyCell>{getDaysOld(item?.createdAt)}</TableBodyCell>
                    <TableBodyCell>{item?.shopName}</TableBodyCell>
                    <TableBodyCell className="whitespace-nowrap">
                      {item?.phoneNumber}
                    </TableBodyCell>
                    <TableBodyCell className="whitespace-nowrap">
                      {item?.complaintType}
                    </TableBodyCell>
                    <TableBodyCell className="whitespace-nowrap">
                      {item?.categoryName}
                    </TableBodyCell>
                    <TableBodyCell className="whitespace-nowrap">
                      {item?.sectionCategoryName}
                    </TableBodyCell>
                    <TableBodyCell>
                      {item?.sectionsDetails
                        ?.map((section) => section?.name)
                        .join(", ")}
                    </TableBodyCell>
                    <TableBodyCell>
                      {item?.sectionsDetails
                        ?.map((section) => section?.description)
                        .join(", ")}
                    </TableBodyCell>
                    <TableBodyCell>
                      {item?.fineAmount?.toLocaleString() ?? 0}
                    </TableBodyCell>
                    <TableBodyCell>
                      {item?.remarks
                        ? item?.remarks?.slice(0, 50) +
                          (item?.remarks?.length > 50 ? "..." : "")
                        : ""}
                    </TableBodyCell>
                    <TableBodyCell>
                      {item?.assigneeRemarks
                        ? item?.assigneeRemarks?.slice(0, 50) +
                          (item?.assigneeRemarks?.length > 50 ? "..." : "")
                        : ""}
                    </TableBodyCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {paginatedData?.length >= pageSize && (
          <div className="absolute bottom-0 py-1! w-full bg-white border-t border-[#e2e8f0]">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        )}
      </div>

      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Content className="p-0! lg:max-w-[700px]! max-h-[80vh]">
          <DecidedonMeritDialog selectedComplaint={selectedComplaint} />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default DecidedonMeritTable;
