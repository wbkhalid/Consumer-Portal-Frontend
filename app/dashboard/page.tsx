import DashboardFieldChart from "./components/DashboardFieldChart";
import DashboardMap from "./components/DashboardMap";
import DashboardStatusChart from "./components/DashboardStatusChart";
import DashboardStatSummary from "./components/DashboardStatSummary";
import DashboardAreaChart from "./components/DashboardAreaChart";
import DashboardTypeChart from "./components/DashboardTypeChart";
import DashboardFilter from "./components/DashboardFilter";

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
  phoneNumber: string;
  category: string;
  lattitude: number;
  longitude: number;
  createdAt: string;
  sections: string[];
  sectionCategories: string[];
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
    <>
      <div className="-m-2! bg-(--dashboard-primary-bg) ">
        <div className="grid grid-cols-12 gap-2 p-2!">
          <div className="col-span-12 md:col-span-3 h-[80vh] overflow-y-scroll flex flex-col gap-2 scrollbar-hide ">
            <DashboardFilter />
            <DashboardStatusChart data={complainDashboardData?.statusStats} />
            <DashboardFieldChart
              data={complainDashboardData?.complaintCategoryStats}
            />
          </div>
          <div className="col-span-12 md:col-span-6 h-[80vh]">
            <DashboardMap data={complainDashboardData?.complaintsList} />
          </div>
          <div className="col-span-12 md:col-span-3 h-[80vh] overflow-y-scroll scrollbar-hide ">
            <DashboardStatSummary data={complainDashboardData} />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 p-2! pt-0!">
          <div className="col-span-12 md:col-span-8">
            <DashboardAreaChart
              data={complainDashboardData?.dailyAverageComplaints}
            />
          </div>
          <div className="col-span-12 md:col-span-4 ">
            <DashboardTypeChart
              data={complainDashboardData?.sectionTypeStats}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
