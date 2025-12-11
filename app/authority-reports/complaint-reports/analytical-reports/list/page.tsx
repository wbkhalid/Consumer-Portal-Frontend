import { sort } from "fast-sort";
import { Suspense } from "react";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import DatesFilter from "../../../../components/Filters/DatesFilter";
import SearchFilter from "../../../../components/Filters/SearchFilter";
import YearFilter from "../../../../components/Filters/YearFilter";
import ErrorMessage from "../../../../components/Form/ErrorMessage";
import Spinner from "../../../../components/Spinner";
import { DEFAULT_YEAR } from "../../../../utils/utils";
import List, { Query } from "./List";

export interface AnalyticalReport {
  districtName: string;
  monthlyData: [
    {
      month: string;
      filed: number;
      disposed: number;
    }
  ];
  totalFiled: number;
  grandTotal: number;
  totalDisposed: number;
  percentageDisposal: number;
}

interface Props {
  searchParams: Promise<Query>;
}

const AnalyticalReportsPage = async ({ searchParams }: Props) => {
  const query = await searchParams; // 👈 fix
  const { year, startDate, endDate, search, orderBy, order } = query;

  const selectedYear = year || DEFAULT_YEAR;
  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/analytical-report";

  const params = new URLSearchParams();

  params.set("year", year || selectedYear.toString()); // always required

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response = await res.json();
  let data: AnalyticalReport[] = response.data;

  // **Apply Search Filter**
  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data.filter(
      (d) =>
        d.districtName.toLowerCase().includes(lowerSearch) ||
        d.totalFiled.toString().includes(lowerSearch) ||
        d.totalDisposed.toString().includes(lowerSearch) ||
        d.grandTotal.toString().includes(lowerSearch)
    );
  }

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-(--primary) font-semibold">Analytical Report</p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {data?.length} Records
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-1">
          <Suspense fallback={<Spinner />}>
            <YearFilter />
            <DatesFilter />
            <SearchFilter />
          </Suspense>
        </div>
      </div>
      <div className="relative">
        <div className="h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide relative">
          {/* Table */}
          {response?.responseCode !== 200 ? (
            // API error
            <div className="px-2!">
              <ErrorMessage>{response?.responseMessage}</ErrorMessage>
            </div>
          ) : data && data.length > 0 ? (
            // Normal table data
            <List data={data} searchParams={query} />
          ) : (
            // No records found
            <p className="px-2!">No records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticalReportsPage;
