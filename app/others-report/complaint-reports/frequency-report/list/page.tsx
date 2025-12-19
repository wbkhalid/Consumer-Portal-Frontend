import { sort } from "fast-sort";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { APIResponse } from "../../../../services/api-client";
import { DEFAULT_PAGE_SIZE, DEFAULT_YEAR } from "../../../../utils/utils";
import List, { Query } from "./List";
import { Suspense } from "react";
import { Spinner } from "@radix-ui/themes";
import YearFilter from "../../../../components/Filters/YearFilter";
import SearchFilter from "../../../../components/Filters/SearchFilter";
import DatesFilter from "../../../../components/Filters/DatesFilter";
import ErrorMessage from "../../../../components/Form/ErrorMessage";
import Pagination from "../../../../components/Form/Pagination";
import DownloadWrapper from "./DownloadWrapper";

export interface FrequencyReport {
  name: string;
  email: string;
  phoneNumber: string;
  totalComplaints: number;
}

interface Props {
  searchParams: Promise<Query>;
}

const FrequencyReportPage = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const { year, startDate, endDate, page, pageSize, search, orderBy, order } =
    query;

  const myPage = parseInt(page || "1") || 1;
  let myPageSize: number;

  if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  else myPageSize = Number(pageSize);

  const selectedYear = year || DEFAULT_YEAR;

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/frequency-report";

  const params = new URLSearchParams();

  params.set("year", year || selectedYear.toString()); // always required

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response: APIResponse<FrequencyReport[]> = await res.json();
  let data: FrequencyReport[] = response.data;

  // **Apply Search Filter**
  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data.filter(
      (d) =>
        d.name.toLowerCase().includes(lowerSearch) ||
        d.email.toString().includes(lowerSearch) ||
        d.phoneNumber.toString().includes(lowerSearch) ||
        d.totalComplaints.toString().includes(lowerSearch)
    );
  }

  // **Pagination Logic**
  const totalCount = data?.length;

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  // Apply pagination using slice()
  const paginatedData = data?.slice(
    (myPage - 1) * myPageSize,
    myPage * myPageSize
  );

  const fileName = "Frequency Report";

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {paginatedData?.length} Records
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Suspense fallback={<Spinner />}>
            <YearFilter />
            <DatesFilter />
            <SearchFilter />
            <DownloadWrapper fileName={fileName} data={data} />
          </Suspense>
        </div>
      </div>
      {/* Table */}
      {response?.responseCode !== 200 ? (
        // API error
        <div className="px-2!">
          <ErrorMessage>{response?.responseMessage}</ErrorMessage>
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
  );
};

export default FrequencyReportPage;
