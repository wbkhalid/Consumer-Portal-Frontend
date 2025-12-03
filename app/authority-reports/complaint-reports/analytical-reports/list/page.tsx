import { COMPLAINT_REPORT_API } from "../../../../APIs";
import AnalyticalReportsTable from "./AnalyticalReportsTable";
import AnalyticalReportYearFilter from "./AnalyticalReportYearFilter";

export interface AnalyticalReport {
  districtName: string;
  monthlyData: [
    {
      month: string;
      filed: number;
      disposed: number;
    }
  ];
  totalFiled: number;
  grandTotal: number;
  totalDisposed: number;
  percentageDisposal: number;
}

interface Props {
  searchParams: Promise<{
    year: string;
  }>;
}

const AnalyticalReportsPage = async ({ searchParams }: Props) => {
  const { year } = await searchParams;

  const selectedYear = year || 2025;
  console.log(
    process.env.BACKEND_API +
      COMPLAINT_REPORT_API +
      `/analytical-report?year=${year || selectedYear}`
  );
  const res = await fetch(
    process.env.BACKEND_API +
      COMPLAINT_REPORT_API +
      `/analytical-report?year=${year || selectedYear}`,
    {
      cache: "no-store",
    }
  );

  const response = await res.json();
  const analyticalReportsData: AnalyticalReport[] = response.data;
  console.log("response analyticalReportsData", analyticalReportsData);

  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-(--primary) font-semibold">Analytical Report</p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {analyticalReportsData?.length} Records
            </p>
          </div>
        </div>
        <div className="ps-2">
          <AnalyticalReportYearFilter />
        </div>
      </div>
      {/* Table */}
      <AnalyticalReportsTable analyticalReportsData={analyticalReportsData} />
    </div>
  );
};

export default AnalyticalReportsPage;
