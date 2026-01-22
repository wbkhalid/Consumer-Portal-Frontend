import { COMPLAINT_REPORT_API } from "../../APIs";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import AgingReportComponent from "./components/AgingReportComponent";

export interface AgingReportDailyBreakdown {
  date: string;
  complaintCount: number;
  complaints: ManageComplainsData[];
}

export interface AgingReportProp {
  dayRange: string;
  rangeLabel: string;
  numberOfComplaints: number;
  dailyBreakdown: AgingReportDailyBreakdown[];
}

const AgingReportPage = async () => {
  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/aging-report";

  const res = await fetch(baseURL, {
    cache: "no-store",
  });

  const response = await res.json();

  return (
    <div>
      <AgingReportComponent data={response?.data} />
    </div>
  );
};

export default AgingReportPage;
