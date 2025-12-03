import { COMPLAINT_REPORT_API } from "../../../../APIs";
import ComplaintInstitutionTable from "./List";

export interface ComplaintInstitution {
  districtName: string;
  walkIn: number;
  online: number;
  total: number;
}

const ComplaintInstitutionPage = async () => {
  const res = await fetch(
    process.env.BACKEND_API +
      COMPLAINT_REPORT_API +
      "/decided-complaint-report",
    {
      cache: "no-store",
    }
  );

  const response = await res.json();
  const data: ComplaintInstitution[] = response.data;
  console.log("response data", data);

  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">
            Complaint Summary Report
          </p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {data.length} Records
          </p>
        </div>
      </div>
      {/* Table */}
      <ComplaintInstitutionTable data={data} />
    </div>
  );
};

export default ComplaintInstitutionPage;
