import { Spinner } from "@radix-ui/themes";
import { sort } from "fast-sort";
import { Suspense } from "react";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import DatesFilter from "../../../../components/Filters/DatesFilter";
import SectionCategoryFilter from "../../../../components/Filters/SectionCategoryFilter";
import SectionFilter from "../../../../components/Filters/SectionFilter";
import YearFilter from "../../../../components/Filters/YearFilter";
import ErrorMessage from "../../../../components/Form/ErrorMessage";
import Pagination from "../../../../components/Form/Pagination";
import { APIResponse } from "../../../../services/api-client";
import { DEFAULT_PAGE_SIZE, DEFAULT_YEAR } from "../../../../utils/utils";
import DownloadWrapper from "./DownloadWrapper";
import List, { Query } from "./List";
import SearchFilter from "../../../../components/reuseable-filters/SearchFilter";
import SectionSelectDropdown from "../../../../components/reuseable-filters/SectionSelectDropdown";
import SectionCategoryDropdown from "../../../../components/reuseable-filters/SectionCategoryDropdown";
import DateFilter from "../../../../components/DateFilter";
import ClearButton from "../../../../components/ClearButton";

export interface SectionReport {
  districtName: string;
  complaintCount: number;
}

interface Props {
  searchParams: Promise<Query>;
}

const SectionReportPage = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const {
    startDate,
    endDate,
    page,
    pageSize,
    search,
    orderBy,
    order,
    sectionIds,
    sectionCategory,
  } = query;

  const myPage = parseInt(page || "1") || 1;
  let myPageSize: number;

  if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  else myPageSize = Number(pageSize);

  // const selectedYear = year || DEFAULT_YEAR;

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/section-report";

  const params = new URLSearchParams();

  const sectionId = Array.isArray(sectionIds)
    ? sectionIds
    : sectionIds
    ? [sectionIds]
    : [];

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  if (sectionCategory) params.set("sectionCategoryId", sectionCategory);
  sectionId.forEach((id) => params.append("sectionIds", id));

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response: APIResponse<SectionReport[]> = await res.json();
  let data: SectionReport[] = response.data;

  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data.filter(
      (d) =>
        d.districtName.toLowerCase().includes(lowerSearch) ||
        d.complaintCount.toString().includes(lowerSearch)
    );
  }

  const totalCount = data?.length;

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  const paginatedData = data?.slice(
    (myPage - 1) * myPageSize,
    myPage * myPageSize
  );

  const fileName = "Section Report";

  return (
    <>
      <div className="flex justify-between items-center mb-2.5!">
        <div className="flex items-center gap-1">
          <p className="text-[#111827] font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {data?.length} Records
          </p>
        </div>
      </div>
      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <SectionSelectDropdown />
            <SectionCategoryDropdown />
            <DateFilter />
            <ClearButton />
          </div>
        </div>
        {response?.responseCode !== 200 ? (
          <div className="px-2!">
            <ErrorMessage>{response?.responseMessage}</ErrorMessage>
          </div>
        ) : paginatedData && paginatedData.length > 0 ? (
          <List
            data={paginatedData}
            currentPage={myPage}
            pageSize={myPageSize}
            searchParams={query}
          />
        ) : (
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
    </>
  );
};

export default SectionReportPage;
