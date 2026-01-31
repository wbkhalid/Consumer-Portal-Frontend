import { useState } from "react";
import PaginationControls from "../../components/table/PaginationControls";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { ManageUsersData } from "../../hooks/useGetAllUsers";

interface UserTableProps {
  rowsData: ManageUsersData[];
}

const UserTable = ({ rowsData }: UserTableProps) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  // const totalPages = Math.ceil(rowsData?.length / pageSize);

  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const paginationData = rowsData?.slice(startIndex, endIndex);

  return (
    <div className="relative">
      <div className="h-[calc(100vh-105px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="font-semibold">
              {["Sr. #", "Name", "Email", "CNIC", "Phone #", "Address"]?.map(
                (header) => (
                  <TableHeaderCell key={header} label={header} />
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {rowsData?.map((item, index) => (
              <tr
                key={item?.id}
                className={`transition-colors duration-150  hover:bg-gray-100`}
              >
                <TableBodyCell>{index + 1}</TableBodyCell>
                <TableBodyCell>{item?.fullName}</TableBodyCell>
                <TableBodyCell>{item?.email}</TableBodyCell>
                <TableBodyCell>{item?.cnic}</TableBodyCell>
                <TableBodyCell>{item?.phoneNumber}</TableBodyCell>
                <TableBodyCell>{item?.address || "—"}</TableBodyCell>
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
  );
};

export default UserTable;
