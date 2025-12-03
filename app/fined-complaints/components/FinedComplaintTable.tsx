import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { formatDate } from "../../utils/utils";
import { useMemo, useState } from "react";
import PaginationControls from "../../components/table/PaginationControls";
import { ManageFinedComplaintsData } from "../../hooks/useGetFinedComplaints";

interface FinedComplaintTableProps {
  rowsData: ManageFinedComplaintsData[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const FinedComplaintTable = ({
  rowsData,
  setRefresh,
}: FinedComplaintTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const headers = [
    { label: "Id", sortable: "complaintId" },
    { label: "Shop Name" },
    { label: "Phone #" },
    { label: "Address" },
    { label: "Fined Amount", sortable: "finedAmount" },
    { label: "Fined Date", sortable: "finedDate" },
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
      const aValue = a[key as keyof ManageFinedComplaintsData];
      const bValue = b[key as keyof ManageFinedComplaintsData];

      // --- Numeric sorting (complaintId, finedAmount) ---
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // --- Date sorting ---
      const aDate = new Date(aValue as any).getTime();
      const bDate = new Date(bValue as any).getTime();

      if (!isNaN(aDate) && !isNaN(bDate)) {
        return direction === "asc" ? aDate - bDate : bDate - aDate;
      }

      const aString = String(aValue ?? "");
      const bString = String(bValue ?? "");

      if (aString < bString) return direction === "asc" ? -1 : 1;
      if (aString > bString) return direction === "asc" ? 1 : -1;
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
        <div className="h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide relative">
          <table className="min-w-full text-sm mb-10!">
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
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{item?.complaintId}</TableBodyCell>

                  <TableBodyCell className="whitespace-nowrap">
                    {item?.shopName}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.phoneNumber}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.address}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.finedAmount.toLocaleString()}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {formatDate(item?.finedDate)}
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
      </div>
    </>
  );
};

export default FinedComplaintTable;
