import { COMPLAINT_REPORT_API } from "../../../../APIs";
import ComplaintSummaryTable from "./ComplaintSummaryTable";

export interface ComplaintSummary {
  districtName: string;
  complaintsFiled: number;
  disposal: number;
  pendingComplaints: number;
  percentageDisposal: number;
}

const ComplaintSummaryPage = async () => {
  const res = await fetch(
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/complaint-summary",
    {
      cache: "no-store",
    }
  );

  const complaintSummaryData: ComplaintSummary[] = await res.json();
  console.log("response complaintSummaryData", complaintSummaryData);
  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">
            Complaint Summary Report
          </p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {complaintSummaryData.length} Records
          </p>
        </div>
      </div>
      {/* Table */}
      <ComplaintSummaryTable complaintSummaryData={complaintSummaryData} />
    </div>
  );
};

export default ComplaintSummaryPage;
