import { cookies } from "next/headers";
import { ADMIN_DASHBOARD_API } from "./APIs";
import HomeFilters from "./components/home-components/HomeFilters";
import StatSummary from "./components/home-components/StatSummary";
import FineBarChart from "./components/home-components/FineBarChart";
import ComplaintPieChart from "./components/home-components/ComplaintPieChart";
import SectionPieChart from "./components/home-components/SectionPieChart";
import HomeMap from "./components/home-components/HomeMap";
import HomeHeader from "./components/home-components/HomeHeader";

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
  totalInProgress: number;
  totalDecided: number;
  totalComplaints: number;
  inPendingComplaints: number;
  adrComplaints: number;
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
  remandsCount: number;
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
  totalFineCollected: number;
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

  return (
    <div>
      <HomeHeader data={complainDashboardData} />
      {/* <HomeFilters
        total={complainDashboardData?.totalComplaints}
        downloads={complainDashboardData?.appDownloadsCount}
      /> */}
      <StatSummary data={complainDashboardData} />
      <div className="grid grid-cols-12 gap-2.5 ">
        <FineBarChart />
        <SectionPieChart data={complainDashboardData?.sectionTypeStats} />
        {/* <ComplaintPieChart
          data={complainDashboardData?.complaintBreakdownChart}
        /> */}
      </div>
      <div className="grid grid-cols-12 gap-2.5 mt-2.5!">
        {/* <SectionPieChart data={complainDashboardData?.sectionTypeStats} /> */}
        <HomeMap data={complainDashboardData?.complaintsList} />
      </div>
    </div>
  );
};

export default MainPage;
