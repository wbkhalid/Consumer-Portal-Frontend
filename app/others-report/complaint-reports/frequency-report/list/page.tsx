import { sort } from "fast-sort";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { APIResponse } from "../../../../services/api-client";
import { DEFAULT_PAGE_SIZE, DEFAULT_YEAR } from "../../../../utils/utils";
import List, { Query } from "./List";
import { Suspense } from "react";
import { Spinner } from "@radix-ui/themes";
import YearFilter from "../../../../components/Filters/YearFilter";
import DatesFilter from "../../../../components/Filters/DatesFilter";
import ErrorMessage from "../../../../components/Form/ErrorMessage";
import Pagination from "../../../../components/Form/Pagination";
import DownloadWrapper from "./DownloadWrapper";
import { ManageComplainsData } from "../../../../hooks/useGetAllComplains";
import SearchFilter from "../../../../components/reuseable-filters/SearchFilter";
import DateFilter from "../../../../components/DateFilter";
import ClearButton from "../../../../components/ClearButton";

export interface FrequencyReport {
  name: string;
  email: string;
  phoneNumber: string;
  totalComplaints: number;
  complaints: ManageComplainsData[];
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

  // const selectedYear = year || DEFAULT_YEAR;

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/frequency-report";

  const params = new URLSearchParams();

  // params.set("year", year || selectedYear.toString());

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
    data = data?.filter(
      (d) =>
        d.name.toLowerCase().includes(lowerSearch) ||
        d.email.toString().includes(lowerSearch) ||
        d.phoneNumber.toString().includes(lowerSearch) ||
        d.totalComplaints.toString().includes(lowerSearch),
    );
  }

  // **Pagination Logic**
  // const totalCount = data?.length;

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  // Apply pagination using slice()
  // const paginatedData = data?.slice(
  //   (myPage - 1) * myPageSize,
  //   myPage * myPageSize
  // );

  const fileName = "Frequency Report";

  return (
    <>
      <div className="flex justify-between items-center mb-2.5!">
        <div className="flex items-center gap-1">
          <p className="text-[#111827] font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {data?.length?.toLocaleString()} Records
          </p>
        </div>
        <DownloadWrapper fileName={fileName} data={data} />
      </div>
      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <DateFilter />
            <ClearButton />
          </div>
        </div>
        {response?.responseCode !== 200 ? (
          <div className="px-2!">
            <ErrorMessage>{response?.responseMessage}</ErrorMessage>
          </div>
        ) : data && data?.length > 0 ? (
          <List
            data={data}
            currentPage={myPage}
            pageSize={myPageSize}
            searchParams={query}
          />
        ) : (
          <p className="px-2!">No records found.</p>
        )}
        {/* <Suspense fallback={<Spinner />}>
          <Pagination
            pageSize={myPageSize}
            currentPage={myPage}
            itemCount={totalCount}
          />
        </Suspense> */}
      </div>
    </>
  );
};

export default FrequencyReportPage;
