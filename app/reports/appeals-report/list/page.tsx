import { sort } from "fast-sort";
import { Suspense } from "react";
import List, { Query } from "./List";
import DownloadWrapper from "./DownloadWrapper";

import { cookies } from "next/headers";
import { COMPLAINT_REPORT_API } from "../../../APIs";
import SearchFilter from "../../../components/reuseable-filters/SearchFilter";
import DateFilter from "../../../components/DateFilter";
import ClearButton from "../../../components/ClearButton";
import { ManageComplainsData } from "../../../hooks/useGetAllComplains";

export interface AppealReport {
  districtName: string;
  numberOfAppeals: number;
  complaints: ManageComplainsData[];
}

interface Props {
  searchParams: Promise<Query>;
}

const AppealsReportPage = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const { year, startDate, endDate, page, pageSize, search, orderBy, order } =
    query;
  const cookieStore = await cookies();
  const divisionId = cookieStore.get("divisionId")?.value;

  const myPage = parseInt(page || "1") || 1;
  let myPageSize: number;

  // if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  // else myPageSize = Number(pageSize);

  // const selectedYear = year || DEFAULT_YEAR;

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/appeals-report";

  const params = new URLSearchParams();

  // params.set("year", year || selectedYear.toString());

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  if (divisionId !== "0") params.set("divisionId", divisionId ?? "");

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response = await res.json();
  let data: AppealReport[] = response?.data;

  // **Apply Search Filter**
  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data?.filter(
      (d) =>
        d.districtName.toLowerCase().includes(lowerSearch) ||
        d.numberOfAppeals.toString().includes(lowerSearch),
    );
  }

  // **Pagination Logic**
  // const totalCount = data?.length;

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  // const paginatedData = data?.slice(
  //   (myPage - 1) * myPageSize,
  //   myPage * myPageSize,
  // );

  const fileName = "Appeals Report";
  return (
    <>
      <div className="flex justify-between items-center mb-2.5!">
        <div className="flex items-center gap-1">
          <p className="text-[#111827] font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {data?.length?.toLocaleString()} Records
          </p>
        </div>
        <DownloadWrapper data={data} fileName={fileName} />
      </div>
      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <DateFilter />
            <ClearButton />
          </div>
        </div>

        <List data={data} searchParams={query} />
        {/* {response?.responseCode !== 200 ? (
          <div className="px-2!">
            <ErrorMessage>{response?.responseMessage}</ErrorMessage>
          </div>
        ) : paginatedData && paginatedData?.length > 0 ? (
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
        </Suspense> */}
      </div>
    </>
  );
};

export default AppealsReportPage;
