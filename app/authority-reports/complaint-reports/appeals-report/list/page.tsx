import { sort } from "fast-sort";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { DEFAULT_PAGE_SIZE, DEFAULT_YEAR } from "../../../../utils/utils";
import AppealsReportTable, { Query } from "./AppealsReportTable";
import { Suspense } from "react";
import Spinner from "../../../../components/Spinner";
import Pagination from "../../../../components/Form/Pagination";
import YearFilter from "../../../../components/Filters/YearFilter";
import SearchFilter from "../../../../components/Filters/SearchFilter";
import DatesFilter from "../../../../components/Filters/DatesFilter";

export interface AppealReport {
  districtName: string;
  numberOfAppeals: number;
}

interface Props {
  searchParams: Promise<Query>;
}

const AppealsReportPage = async ({ searchParams }: Props) => {
  const query = await searchParams; // 👈 fix
  const { year, startDate, endDate, page, pageSize, search, orderBy, order } =
    query;

  const myPage = parseInt(page || "1") || 1;
  let myPageSize: number;

  if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  else myPageSize = Number(pageSize);

  const selectedYear = year || DEFAULT_YEAR;

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/appeals-report";

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
  let data: AppealReport[] = response.data;
  // **Apply Search Filter**
  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data.filter(
      (d) =>
        d.districtName.toLowerCase().includes(lowerSearch) ||
        d.numberOfAppeals.toString().includes(lowerSearch)
    );
  }

  // **Pagination Logic**
  const totalCount = data.length;

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  // Apply pagination using slice()
  const paginatedData = data.slice(
    (myPage - 1) * myPageSize,
    myPage * myPageSize
  );

  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">Appeals Report</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {paginatedData.length} Records
          </p>
        </div>
        <div className="flex items-center justify-end gap-1">
          <YearFilter />
          <Suspense fallback={<Spinner />}>
            <SearchFilter />
          </Suspense>
          <DatesFilter />
        </div>
      </div>
      {/* Table */}
      <AppealsReportTable
        data={paginatedData}
        currentPage={myPage}
        pageSize={myPageSize}
        searchParams={query}
      />
      <Suspense fallback={<Spinner />}>
        <Pagination
          pageSize={myPageSize}
          currentPage={myPage}
          itemCount={totalCount}
        />
      </Suspense>
    </div>
  );
};

export default AppealsReportPage;
