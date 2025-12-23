import { Spinner } from "@radix-ui/themes";
import { sort } from "fast-sort";
import Link from "next/link";
import { Suspense } from "react";
import { LuChevronRight } from "react-icons/lu";
import { COMPLAINT_REPORT_API } from "../../../../../APIs";
import DatesFilter from "../../../../../components/Filters/DatesFilter";
import SearchFilter from "../../../../../components/Filters/SearchFilter";
import Pagination from "../../../../../components/Form/Pagination";
import { DEFAULT_PAGE_SIZE, DEFAULT_YEAR } from "../../../../../utils/utils";
import List, { Query } from "./List";
import { Complains } from "../../../../../authority-reports/complaint-reports/complaint-summary/list/page";
import { APIResponse } from "../../../../../services/api-client";
import { FrequencyReport } from "../../list/page";
import YearFilter from "../../../../../components/Filters/YearFilter";

interface Props {
  params: Promise<{
    myName: string;
  }>;
  searchParams: Promise<Query>;
}

const FrequencyComplaintPage = async ({ searchParams, params }: Props) => {
  const { myName } = await params;
  const query = await searchParams; // 👈 fix

  const decodedParam = decodeURIComponent(myName as string);

  const { year, startDate, endDate, page, pageSize, search, orderBy, order } =
    query;

  const myPage = parseInt(page || "1") || 1;
  let myPageSize: number;

  if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  else myPageSize = Number(pageSize);

  const selectedYear = year || DEFAULT_YEAR;

  console.log(page, page);
  console.log(pageSize, pageSize);
  console.log(search, search);

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/frequency-report";

  const urlParams = new URLSearchParams();

  urlParams.set("year", year || selectedYear.toString()); // always required

  if (startDate) urlParams.set("startDate", startDate);
  if (endDate) urlParams.set("endDate", endDate);

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response: APIResponse<FrequencyReport[]> = await res.json();

  console.log(response, "full response");

  // Extract only data array
  let complaintSummary: FrequencyReport[] = response.data;

  // Find selected name
  const selectedName = complaintSummary.find((d) => d.name === decodedParam);

  // Extract only complaints
  let data: Complains[] = selectedName?.complaints ?? [];

  // **Apply Search Filter**
  if (search) {
    const lowerSearch = search.toLowerCase();

    data = data.filter(
      (c) =>
        c.shopName?.toLowerCase().includes(lowerSearch) ||
        c.phoneNumber?.includes(lowerSearch) ||
        c.categoryName?.toLowerCase().includes(lowerSearch) ||
        c.complaintType?.toLowerCase().includes(lowerSearch) ||
        c.status?.toString().includes(lowerSearch)
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

  const fileName = `${decodedParam} Complains`;

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      {/* Header Section */}
      <div className="flex items-center gap-1 p-2! flex-wrap">
        <Link className="text-(--primary) font-medium hover:underline" href="/">
          Home
        </Link>
        <LuChevronRight className="text-(--primary)" />
        <Link
          className="text-(--primary) font-medium hover:underline"
          href="/others-report/complaint-reports/frequency-report/list"
        >
          Frequency Report
        </Link>
        <LuChevronRight className="text-(--primary)" />
        <span className="text-(--primary)">{decodedParam}</span>
      </div>
      <div className="flex justify-between items-center px-2! py-2! flex-wrap gap-2">
        <div className="flex items-center gap-1 flex-wrap">
          <p className="text-(--primary) font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {paginatedData.length} Records
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 flex-wrap">
          <Suspense fallback={<Spinner />}>
            <YearFilter />
            <DatesFilter />
            <SearchFilter />
          </Suspense>
        </div>
      </div>

      {/* Table */}
      <List
        data={data}
        paginatedData={paginatedData}
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

export default FrequencyComplaintPage;
