import { sort } from "fast-sort";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { DEFAULT_PAGE_SIZE, DEFAULT_YEAR } from "../../../../utils/utils";
import List, { Query } from "./List";
import YearFilter from "../../../../components/Filters/YearFilter";
import { Suspense } from "react";
import Spinner from "../../../../components/Spinner";
import SearchFilter from "../../../../components/Filters/SearchFilter";
import DatesFilter from "../../../../components/Filters/DatesFilter";
import Pagination from "../../../../components/Form/Pagination";
import ErrorMessage from "../../../../components/Form/ErrorMessage";

export interface ComplaintInstitution {
  districtName: string;
  walkIn: number;
  online: number;
  total: number;
}

interface Props {
  searchParams: Promise<Query>;
}

const ComplaintInstitutionPage = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const { year, startDate, endDate, page, pageSize, search, orderBy, order } =
    query;

  const myPage = parseInt(page || "1") || 1;
  let myPageSize: number;

  if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  else myPageSize = Number(pageSize);

  const selectedYear = year || DEFAULT_YEAR;

  const baseURL =
    process.env.BACKEND_API +
    COMPLAINT_REPORT_API +
    "/complaint-institution-report";

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
  let data: ComplaintInstitution[] = response.data;

  // **Apply Search Filter**
  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data.filter(
      (d) =>
        d.districtName.toLowerCase().includes(lowerSearch) ||
        d.walkIn.toString().includes(lowerSearch) ||
        d.online.toString().includes(lowerSearch) ||
        d.total.toString().includes(lowerSearch)
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
          <p className="text-(--primary) font-semibold">
            Complaint Institution Report
          </p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {paginatedData?.length} Records
          </p>
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
              <ErrorMessage>
                Response ({response?.responseCode}) -{" "}
                {response?.responseMessage}
              </ErrorMessage>
            </div>
          ) : paginatedData && paginatedData.length > 0 ? (
            // Normal table data
            <List
              data={paginatedData}
              currentPage={myPage}
              pageSize={myPageSize}
              searchParams={query}
            />
          ) : (
            // No records found
            <p className="px-2!">No records found.</p>
          )}
          <Suspense fallback={<Spinner />}>
            <Pagination
              pageSize={myPageSize}
              currentPage={myPage}
              itemCount={totalCount}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ComplaintInstitutionPage;
