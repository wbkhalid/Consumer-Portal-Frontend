import AreachartComponent from "./components/home-page/AreaChartComponent";
import ComplainFieldChart from "./components/home-page/ComplainFieldChart";
import ComplainMap from "./components/home-page/ComplainMap";
import ComplainStatusChart from "./components/home-page/ComplainStatusChart";
import ComplainTypeChart from "./components/home-page/ComplainTypeChart";
import FilterDataComponent from "./components/home-page/FilterDataComponent";
import StatSummary from "./components/home-page/StatSummary";
import DashboardMap from "./dashboard/components/DashboardMap";

interface PageProps {
  searchParams: Promise<{ districtId?: string; status?: string }>;
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
  expartyComplaints: number;
  withdrawnComplaints: number;
  nonProsecutedComplaints: number;
  avgResolutionTime: number;
  complaintCategoryStats: ComplaintCategoryStatsType[];
  sectionTypeStats: SectionTypeStatsType[];
  statusStats: StatusStatsType[];
  dailyAverageComplaints: DailyAvergeType[];
  complaintsList: ComplaintsListType[];
}

const page = async ({ searchParams }: PageProps) => {
  const { districtId, status } = await searchParams;

  const query = new URLSearchParams();
  if (districtId) query.append("districtId", districtId);
  if (status) query.append("status", status);

  const url = `${process.env.BACKEND_API}/api/AdminDashboard${
    query.toString() ? `?${query.toString()}` : ""
  }`;

  const response = await fetch(url, { cache: "no-store" });
  const complainDashboardData: ComplainDashboardType = await response.json();

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9 min-h-screen">
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

export default page;
