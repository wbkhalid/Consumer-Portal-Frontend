import { COMPLAINT_REPORT_API } from "../../APIs";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import FineReportComponent from "./components/FineReportComponent";

interface PageProps {
  searchParams: Promise<{
    year?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export interface FineImposedProp {
  districtName: string;
  complaints: number;
  fineImposed: number;
  complaintDetails: ManageComplainsData[];
}

const FineReportPage = async ({ searchParams }: PageProps) => {
  const { year, startDate, endDate } = await searchParams;

  const params = new URLSearchParams();

  params.append("year", year || "");
  params.append("startDate", startDate || "");
  params.append("endDate", endDate || "");

  const baseURL = `${
    process.env.BACKEND_API
  }${COMPLAINT_REPORT_API}/fine-imposed-report${params ? `?${params}` : ""}`;

  const res = await fetch(baseURL);

  const response = await res.json();

  const finedReportData: FineImposedProp[] = response?.data;

  console.log(finedReportData, "..//...//");

  return (
    <div>
      <FineReportComponent data={finedReportData} />
    </div>
  );
};

export default FineReportPage;
