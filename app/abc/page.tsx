import { cookies } from "next/headers";
import ComplaintPieChart from "./components/ComplaintPieChart";
import FineBarChart from "./components/FineBarChart";
import HomeFilters from "./components/HomeFilters";
import HomeMap from "./components/HomeMap";
import SectionPieChart from "./components/SectionPieChart";
import StatSummary from "./components/StatSummary";
import { ADMIN_DASHBOARD_API } from "../APIs";

interface PageProps {
  searchParams: Promise<{
    divisionId?: string;
    districtId?: string;
    tehsilId?: string;
    period?: string;
  }>;
}

export interface ComplaintCategoryStatsType {
  complaintCategory: string;
  count: number;
}

export interface SectionTypeStatsType {
  sectionName: string;
  count: number;
}

export interface StatusStatsType {
  status: string;
  count: number;
}

export interface DailyAvergeType {
  date: string;
  pendingCount: number;
  inProcessCount: number;
  resolvedCount: number;
  rejectedCount: number;
}

export interface ComplaintsListType {
  complaintId: number;
  title: string;
  address: string;
  lattitude: number;
  longitude: number;
}

export interface ComplaintsGrowthPercentages {
  totalComplaints: number;
  pendingComplaints: number;
  inProceedingComplaints: number;
  escalatedComplaints: number;
  superEscalatedComplaints: number;
  decidedOnMeritComplaints: number;
  exParteComplaints: number;
  withdrawnComplaints: number;
  nonProsecutedComplaints: number;
  appealsComplaints: number;
  redHotComplaints: number;
  avgResolutionTime: number;
}

export interface ComplaintBreakdownChart {
  totalComplaints: number;
  resolvedComlaints: number;
  appealedComplaints: number;
}

export interface ComplainDashboardType {
  totalComplaints: number;
  inPendingComplaints: number;
  inProceedingComplaints: number;
  escalatedComplaints: number;
  superEscalatedComplaints: number;
  decidedOnMeritComplaints: number;
  exParteComplaints: number;
  withdrawnComplaints: number;
  nonProsecutedComplaints: number;
  redHotComplaintsCount: number;
  avgResolutionTime: number;
  appDownloadsCount: number;
  appealsCount: number;
  totalFinesCollected: number;
  complaintCategoryStats: ComplaintCategoryStatsType[];
  sectionTypeStats: SectionTypeStatsType[];
  statusStats: StatusStatsType[];
  dailyAverageComplaints: DailyAvergeType[];
  complaintsList: ComplaintsListType[];
  complaintsGrowthPercentages: ComplaintsGrowthPercentages;
  complaintBreakdownChart: ComplaintBreakdownChart;
}

export interface FineInsightType {
  label: string;
  totalFine: number;
}

export interface FineInsightApiResponse {
  responseCode: number;
  responseMessage: string;
  data: FineInsightType[];
}

const MainPage = async ({ searchParams }: PageProps) => {
  const {
    divisionId: filterDivisionId,
    districtId: filterDistrictId,
    tehsilId: filterTehsilId,
    period = "3",
  } = await searchParams;
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value || "";

  const cookieDivisionId = cookieStore.get("divisionId")?.value;
  const cookieDistrictId = cookieStore.get("districtId")?.value;
  const cookieTehsilId = cookieStore.get("tehsilId")?.value;

  const baseParams = new URLSearchParams();

  if (role === "Admin" || role === "DG" || role === "Secretary") {
    baseParams.append("divisionId", filterDivisionId || "");
    baseParams.append("districtId", filterDistrictId || "");
    baseParams.append("tehsilId", filterTehsilId || "");
  }

  if (role === "Commissioner") {
    if (filterDistrictId || filterTehsilId) {
      baseParams.append("divisionId", cookieDivisionId || "");
      baseParams.append("districtId", filterDistrictId || "");
      baseParams.append("tehsilId", filterTehsilId || "");
    } else {
      baseParams.append("divisionId", cookieDivisionId || "");
    }
  }

  if (role === "DC" || role === "AD") {
    if (filterTehsilId) {
      baseParams.append("divisionId", cookieDivisionId || "");
      baseParams.append("districtId", cookieDistrictId || "");
      baseParams.append("tehsilId", filterTehsilId || "");
    } else {
      baseParams.append("divisionId", cookieDivisionId || "");
      baseParams.append("districtId", cookieDistrictId || "");
    }
  }

  if (role === "AC") {
    baseParams.append("divisionId", cookieDivisionId || "");
    baseParams.append("districtId", cookieDistrictId || "");
    baseParams.append("tehsilId", cookieTehsilId || "");
  }
  const fineParams = new URLSearchParams(baseParams);
  fineParams.set("period", period);

  console.log(baseParams, "baseParams");

  const url = `${
    process.env.BACKEND_API
  }${ADMIN_DASHBOARD_API}?${baseParams.toString()}`;
  console.log(url, "API URL");

  const response = await fetch(url, { cache: "no-store" });
  const complainDashboardData: ComplainDashboardType = await response.json();

  const fineUrl = `${
    process.env.BACKEND_API
  }${ADMIN_DASHBOARD_API}/financial-insight?${fineParams.toString()}`;

  console.log(fineUrl, "fineUrl");

  const fineResponse = await fetch(fineUrl, { cache: "no-store" });
  const fineDashboardData: FineInsightApiResponse = await fineResponse.json();

  console.log(fineDashboardData, "fineDashbpardData");

  return (
    <div>
      <HomeFilters />
      <StatSummary data={complainDashboardData} />
      <div className="grid grid-cols-12 gap-2.5 ">
        <FineBarChart data={fineDashboardData?.data ?? []} />
        <ComplaintPieChart
          data={complainDashboardData?.complaintBreakdownChart}
        />
      </div>
      <div className="grid grid-cols-12 gap-2.5 mt-2.5!">
        <SectionPieChart data={complainDashboardData?.sectionTypeStats} />
        <HomeMap data={complainDashboardData?.complaintsList} />
      </div>
    </div>
  );
};

export default MainPage;
