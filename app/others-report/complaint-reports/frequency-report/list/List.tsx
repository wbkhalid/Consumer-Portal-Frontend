"use client";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { FrequencyReport } from "./page";
import { BaseQuery, Column } from "../../../../utils/utils";
import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import { useRouter } from "next/navigation";

export type Query = BaseQuery<FrequencyReport>;

interface Props {
  data: FrequencyReport[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}

const List = ({ data, currentPage, pageSize, searchParams }: Props) => {
  const { totalComplaints } = calculateTotals(data);

  const columns = getColumns();
  const router = useRouter();

  return (
    <div className="relative">
      <div className="h-[calc(100vh-220px)] overflow-y-auto relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white text-center">
              <CustomTableHeaderCell label="Sr #" />

              {columns.map((column) => (
                <CustomTableHeaderCell
                  key={column.value}
                  columnValue={column.value}
                  label={column.label}
                  searchParams={searchParams}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.map((d, index) => {
              const serial = (currentPage - 1) * pageSize + index + 1;

              return (
                <tr
                  key={serial}
                  className={`transition-colors duration-150 cursor-pointer! ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                  onClick={() =>
                    router.push(
                      `/others-report/complaint-reports/frequency-report/${encodeURIComponent(
                        d?.name
                      )}/list`
                    )
                  }
                >
                  <TableBodyCell>{serial}</TableBodyCell>
                  <TableBodyCell>{d.name}</TableBodyCell>
                  <TableBodyCell>{d.email}</TableBodyCell>
                  <TableBodyCell>{d.phoneNumber}</TableBodyCell>
                  <TableBodyCell>{d.totalComplaints}</TableBodyCell>
                </tr>
              );
            })}

            {/* ✅ Total Row */}
            <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
              <TableBodyCell colSpan={4} className="text-center">
                Total
              </TableBodyCell>
              <TableBodyCell>{totalComplaints}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;

// strongly typed column list
export const getColumns = (): Column<FrequencyReport>[] => [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Phone #", value: "phoneNumber" },
  { label: "Total Complaints", value: "totalComplaints" },
];

export const calculateTotals = (data: FrequencyReport[]) => {
  // Calculate totals dynamically
  const totalComplaints = data.reduce(
    (sum, item) => sum + (item.totalComplaints || 0),
    0
  );

  return {
    totalComplaints,
  };
};
