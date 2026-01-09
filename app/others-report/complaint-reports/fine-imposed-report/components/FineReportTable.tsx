import { useRouter, useSearchParams } from "next/navigation";
import TableBodyCell from "../../../../components/table/TableBodyCell";
import TableHeaderCell from "../../../../components/table/TableHeaderCell";
import { FineImposedProp } from "../page";

interface FineReportTableProps {
  rowsData: FineImposedProp[];
}

const FineReportTable = ({ rowsData }: FineReportTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalComplaints = rowsData?.reduce(
    (sum, item) => sum + (item?.complaints || 0),
    0
  );

  const totalFineImposed = rowsData?.reduce(
    (sum, item) => sum + (item?.fineImposed || 0),
    0
  );
  return (
    <div className="relative">
      <div className="h-[calc(100vh-175px)] overflow-y-auto">
        <div className="mb-10!">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="font-semibold bg-white">
                {[
                  "Sr. No",
                  "Name of District",
                  "Complaints",
                  "Fine Imposed",
                ]?.map((header) => (
                  <TableHeaderCell key={header} label={header} />
                ))}
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
                      `/others-report/complaint-reports/fine-imposed-report/${encodeURIComponent(
                        item?.districtName
                      )}${
                        searchParams.toString()
                          ? `?${searchParams.toString()}`
                          : ""
                      }`
                    )
                  }
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell>{item?.districtName}</TableBodyCell>
                  <TableBodyCell>{item?.complaints}</TableBodyCell>
                  <TableBodyCell>{item?.fineImposed}</TableBodyCell>
                </tr>
              ))}
              <tr className="font-semibold bg-[#f1f1f1] text-[#013769] sticky bottom-0">
                <TableBodyCell colSpan={2} className="text-center">
                  Total
                </TableBodyCell>
                <TableBodyCell>{totalComplaints}</TableBodyCell>
                <TableBodyCell>{totalFineImposed}</TableBodyCell>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FineReportTable;
