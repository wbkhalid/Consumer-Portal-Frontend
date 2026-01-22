import { useState } from "react";
import PaginationControls from "../../components/table/PaginationControls";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { ManageAppealsData } from "../../hooks/useGetAppeals";

interface AppealsTableProps {
  rowsData: ManageAppealsData[];
}

const AppealTable = ({ rowsData }: AppealsTableProps) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  // const totalPages = Math.ceil(rowsData?.length / pageSize);

  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const paginatedData = rowsData?.slice(startIndex, endIndex);
  return (
    <>
      <div className="relative">
        <div className="h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide relative">
          <table className="min-w-full text-sm mb-10!">
            <thead className="sticky top-0 z-10">
              <tr className="font-semibold bg-white">
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
              {rowsData?.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-150  hover:bg-gray-100`}
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
        {/* <div className="absolute bottom-0 py-1! w-full bg-white border-t border-[#e2e8f0]">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div> */}
      </div>
    </>
  );
};

export default AppealTable;
