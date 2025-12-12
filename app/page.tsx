import { cookies } from "next/headers";
import StatSummary from "./components/home-page/StatSummary";
import AreachartComponent from "./components/home-page/AreaChartComponent";
import ComplainFieldChart from "./components/home-page/ComplainFieldChart";
import ComplainTypeChart from "./components/home-page/ComplainTypeChart";
import FilterDataComponent from "./components/home-page/FilterDataComponent";
import ComplainStatusChart from "./components/home-page/ComplainStatusChart";
import ComplainMap from "./components/home-page/ComplainMap";

interface PageProps {
  searchParams: Promise<{
    divisionId?: string;
    districtId?: string;
    tehsilId?: string;
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
  avgResolutionTime: number;
  appDownloadsCount: number;
  appealsCount: number;
  totalFinesCollected: number;
  complaintCategoryStats: ComplaintCategoryStatsType[];
  sectionTypeStats: SectionTypeStatsType[];
  statusStats: StatusStatsType[];
  dailyAverageComplaints: DailyAvergeType[];
  complaintsList: ComplaintsListType[];
}

// export const dynamic = "force-dynamic";

const DashboardPage = async ({ searchParams }: PageProps) => {
  const {
    divisionId: filterDivisionId,
    districtId: filterDistrictId,
    tehsilId: filterTehsilId,
  } = await searchParams;
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value || "";

  console.log(
    filterDivisionId,
    filterDistrictId,
    filterTehsilId,
    "searchParams"
  );

  const cookieDivisionId = cookieStore.get("divisionId")?.value;
  const cookieDistrictId = cookieStore.get("districtId")?.value;
  const cookieTehsilId = cookieStore.get("tehsilId")?.value;

  const params = new URLSearchParams();

  if (role === "Admin" || role === "DG" || role === "Secretary") {
    params.append("divisionId", filterDivisionId || "");
    params.append("districtId", filterDistrictId || "");
    params.append("tehsilId", filterTehsilId || "");
  }

  if (role === "Commissioner") {
    if (filterDistrictId || filterTehsilId) {
      params.append("divisionId", cookieDivisionId || "");
      params.append("districtId", filterDistrictId || "");
      params.append("tehsilId", filterTehsilId || "");
    } else {
      params.append("divisionId", cookieDivisionId || "");
    }
  }

  if (role === "DC" || role === "AD") {
    if (filterTehsilId) {
      params.append("divisionId", cookieDivisionId || "");
      params.append("districtId", cookieDistrictId || "");
      params.append("tehsilId", filterTehsilId || "");
    } else {
      params.append("divisionId", cookieDivisionId || "");
      params.append("districtId", cookieDistrictId || "");
    }
  }

  if (role === "AC") {
    params.append("divisionId", cookieDivisionId || "");
    params.append("districtId", cookieDistrictId || "");
    params.append("tehsilId", cookieTehsilId || "");
  }

  console.log(params, "params");

  const url = `${
    process.env.BACKEND_API
  }/api/AdminDashboard?${params.toString()}`;
  console.log(url, "API URL");

  console.log(url, "url");

  const response = await fetch(url, { cache: "no-store" });
  const complainDashboardData: ComplainDashboardType = await response.json();

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <StatSummary data={complainDashboardData} />
        <AreachartComponent
          data={complainDashboardData?.dailyAverageComplaints}
        />
        <div className="grid grid-cols-2 gap-2">
          <ComplainFieldChart
            data={complainDashboardData?.complaintCategoryStats}
          />
          <ComplainTypeChart data={complainDashboardData?.sectionTypeStats} />
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 xl:col-span-3">
        <FilterDataComponent />
        <ComplainStatusChart data={complainDashboardData?.statusStats} />
        <ComplainMap data={complainDashboardData?.complaintsList} />
      </div>
    </div>
  );
};

export default DashboardPage;
