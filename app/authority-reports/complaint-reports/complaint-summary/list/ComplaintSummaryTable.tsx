import CustomTableHeaderCell from "../../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import { ComplaintSummary } from "./page";

export interface Query {
  year?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
  search?: string;
  orderBy?: keyof ComplaintSummary;
  order?: "asc" | "desc";
}

interface Props {
  data: ComplaintSummary[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}
const ComplaintSummaryTable = ({
  data,
  currentPage,
  pageSize,
  searchParams,
}: Props) => {
  const totalFiled = data.reduce(
    (sum, item) => sum + (item.complaintsFiled || 0),
    0
  );

  const totalDisposal = data.reduce(
    (sum, item) => sum + (item.disposal || 0),
    0
  );

  const totalPending = data?.reduce(
    (sum, item) => sum + (item.pendingComplaints || 0),
    0
  );

  const totalPercentage =
    data && data.length > 0
      ? (
          data.reduce((sum, item) => sum + (item.percentageDisposal || 0), 0) /
          data.length
        ).toFixed(2)
      : 0;

  const columns: {
    label: string;
    value: keyof ComplaintSummary;
    className?: string;
  }[] = [
    { label: "Name of District", value: "districtName" },
    { label: "Complaints Filed", value: "complaintsFiled" },
    { label: "Disposal", value: "disposal" },
    { label: "Percentage of Disposal (%)", value: "percentageDisposal" },
    { label: "Pending Complaints", value: "pendingComplaints" },
  ];

  return (
    <div className="relative">
      <div className="h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide relative">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="font-semibold bg-white">
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
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{serial}</TableBodyCell>
                  <TableBodyCell>{d.districtName}</TableBodyCell>
                  <TableBodyCell>{d.complaintsFiled}</TableBodyCell>
                  <TableBodyCell>{d.disposal}</TableBodyCell>
                  <TableBodyCell>{d.percentageDisposal}%</TableBodyCell>
                  <TableBodyCell>{d.pendingComplaints}</TableBodyCell>
                </tr>
              );
            })}

            {/* ✅ Total Row */}
            <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
                Total
              </TableBodyCell>
              <TableBodyCell>{totalFiled}</TableBodyCell>
              <TableBodyCell>{totalDisposal}</TableBodyCell>
              <TableBodyCell>{totalPercentage}%</TableBodyCell>
              <TableBodyCell>{totalPending}</TableBodyCell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintSummaryTable;
