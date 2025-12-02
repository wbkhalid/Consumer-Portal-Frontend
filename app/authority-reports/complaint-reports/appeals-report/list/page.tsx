import { COMPLAINT_REPORT_API } from "../../../../APIs";
import AppealsReportTable from "./AppealsReportTable";

export interface AppealReport {
  districtName: string;
  numberOfAppeals: number;
}

const AppealsReportPage = async () => {
  const res = await fetch(
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/appeals-report",
    {
      cache: "no-store",
    }
  );

  const response = await res.json();
  const appealsReportData: AppealReport[] = response.data;
  console.log("response appealsReportData", appealsReportData);
  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">Appeals Report</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {appealsReportData.length} Records
          </p>
        </div>
      </div>
      {/* Table */}
      <AppealsReportTable appealsReportData={appealsReportData} />
    </div>
  );
};

export default AppealsReportPage;
