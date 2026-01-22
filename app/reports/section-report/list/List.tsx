"use client";
import { useRouter } from "next/navigation";
import CustomTableHeaderCell from "../../../components/table/CustomTableHeaderCell";
import TableBodyCell from "../../../components/table/TableBodyCell";
import { BaseQuery, Column } from "../../../utils/utils";
import { SectionReport } from "./page";

export interface Query extends BaseQuery<SectionReport> {
  sectionIds?: string | string[];
  sectionCategory?: string;
}

interface Props {
  data: SectionReport[];
  currentPage: number;
  pageSize: number;
  searchParams: Query;
}

const List = ({ data, currentPage, pageSize, searchParams }: Props) => {
  const { totalComplaints } = calculateTotals(data);
  const router = useRouter();

  const columns = getColumns();

  console.log(searchParams, "..///...search");

  return (
    <div className="relative">
      <div className="h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide relative">
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
              // const serial = (currentPage - 1) * pageSize + index + 1;
              console.log(
                `/others-report/complaint-reports/section-report/${encodeURIComponent(
                  d?.districtName,
                )}${
                  searchParams.toString() ? `?${searchParams.toString()}` : ""
                }`,
              );

              return (
                <tr
                  key={index + 1}
                  className={`transition-colors duration-150  hover:bg-gray-100 cursor-pointer`}
                  onClick={() =>
                    router.push(
                      `/reports/section-report/${encodeURIComponent(
                        d?.districtName,
                      )}${
                        searchParams.toString()
                          ? `?${searchParams.toString()}`
                          : ""
                      }`,
                    )
                  }
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell>{d.districtName}</TableBodyCell>
                  <TableBodyCell>{d.complaintCount}</TableBodyCell>
                </tr>
              );
            })}

            <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
              <TableBodyCell colSpan={2} className="text-center">
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
export const getColumns = (): Column<SectionReport>[] => [
  { label: "Name of District", value: "districtName" },
  { label: "Complains", value: "complaintCount" },
];

export const calculateTotals = (data: SectionReport[]) => {
  // Calculate totals dynamically
  const totalComplaints = data?.reduce(
    (sum, item) => sum + (item?.complaintCount || 0),
    0,
  );

  return {
    totalComplaints,
  };
};
