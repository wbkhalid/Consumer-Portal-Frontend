import AreachartComponent from "./components/home-page/AreaChartComponent";
import ComplainFieldChart from "./components/home-page/ComplainFieldChart";
import ComplainMap from "./components/home-page/ComplainMap";
import ComplainStatusChart from "./components/home-page/ComplainStatusChart";
import ComplainTypeChart from "./components/home-page/ComplainTypeChart";
import FilterDataComponent from "./components/home-page/FilterDataComponent";
import StatSummary from "./components/home-page/StatSummary";

export interface ProductTypeStatType {
  productType: string;
  count: number;
}

export interface ComplaintTypeStatsType {
  complaintType: string;
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

export interface ComplainDashboardType {
  totalComplaints: number;
  inProgressComplaints: number;
  inProcessComplaints: number;
  escalatedComplaints: number;
  superEscalatedComplaints: number;
  resolvedComplaints: number;
  rejectedComplaints: number;
  cancelledComplaints: number;
  productTypeStats: ProductTypeStatType[];
  complaintTypeStats: ComplaintTypeStatsType[];
  statusStats: StatusStatsType[];
  dailyAverageComplaints: DailyAvergeType[];
}

// 10/22/2025

const page = async () => {
  const response = await fetch(
    `${process.env.BACKEND_API}/api/AdminDashboard`,
    {
      cache: "no-store",
    }
  );

  const complainDashboardData: ComplainDashboardType = await response.json();

  console.log(complainDashboardData, "response");

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9 min-h-screen">
        <StatSummary data={complainDashboardData} />
        <AreachartComponent
          data={complainDashboardData?.dailyAverageComplaints}
        />
        <div className="grid grid-cols-2 gap-2">
          <ComplainFieldChart />
          <ComplainTypeChart data={complainDashboardData?.complaintTypeStats} />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 xl:col-span-3">
        <FilterDataComponent />
        <ComplainStatusChart data={complainDashboardData?.statusStats} />
        <ComplainMap />
      </div>
    </div>
  );
};

export default page;
