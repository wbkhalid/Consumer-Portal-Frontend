import { useState } from "react";
import PaginationControls from "../../components/table/PaginationControls";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { ManageAppealsData } from "../../hooks/useGetAppeals";

interface AppealsTableProps {
  rowsData: ManageAppealsData[];
}

const PAGE_SIZE = 20;

const AppealTable = ({ rowsData }: AppealsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(rowsData?.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginationData = rowsData?.slice(startIndex, endIndex);
  return (
    <div className="relative">
      <div className="h-[calc(100vh-110px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm mb-10!">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="font-semibold">
              {[
                "Appeal Id",
                "Compalint Id",
                "Shop Name",
                "Phone #",
                "Reason",
              ]?.map((header) => (
                <TableHeaderCell key={header} label={header} />
              ))}
            </tr>
          </thead>

          <tbody>
            {paginationData?.map((item, index) => (
              <tr
                key={item?.appealId}
                className={`transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                } hover:bg-gray-100`}
              >
                <TableBodyCell>{item?.appealId}</TableBodyCell>
                <TableBodyCell>{item?.complaintId}</TableBodyCell>
                <TableBodyCell>{item?.shopName}</TableBodyCell>
                <TableBodyCell>{item?.phoneNumber}</TableBodyCell>
                <TableBodyCell>{item?.appealReason}</TableBodyCell>
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
    </div>
  );
};

export default AppealTable;
