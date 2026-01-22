import { useRouter } from "next/navigation";
import TableBodyCell from "../../../components/table/TableBodyCell";
import TableHeaderCell from "../../../components/table/TableHeaderCell";
import { AgingReportProp } from "../page";

interface AgingReportTableProps {
  rowsData: AgingReportProp[];
}

const AgingReportTable = ({ rowsData }: AgingReportTableProps) => {
  const router = useRouter();
  const totalComplaints = rowsData?.reduce(
    (sum, item) => sum + (item.numberOfComplaints || 0),
    0,
  );
  return (
    <div className="relative">
      <div className="h-[calc(100vh-120px)] ">
        <div className="mb-10!">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="font-semibold bg-white">
                {["Sr #", "Day Range", "Number of Complaints"]?.map(
                  (header) => (
                    <TableHeaderCell key={header} label={header} />
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {rowsData?.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-150 cursor-pointer! ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                  onClick={() =>
                    router.push(
                      `/reports/aging-report/${encodeURIComponent(
                        item?.rangeLabel,
                      )}`,
                    )
                  }
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell>{item?.dayRange}</TableBodyCell>
                  <TableBodyCell>{item?.numberOfComplaints}</TableBodyCell>
                </tr>
              ))}
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
    </div>
  );
};

export default AgingReportTable;
