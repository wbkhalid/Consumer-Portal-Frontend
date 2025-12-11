import { Spinner } from "@radix-ui/themes";
import { sort } from "fast-sort";
import { Suspense } from "react";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import DatesFilter from "../../../../components/Filters/DatesFilter";
import SearchFilter from "../../../../components/Filters/SearchFilter";
import Pagination from "../../../../components/Form/Pagination";
import { DEFAULT_PAGE_SIZE, exportDataToExcel } from "../../../../utils/utils";
import DownloadWrapper from "./DownloadWrapper";
import List, { Query } from "./List";

export interface ComplaintSummary {
  districtName: string;
  complaintsFiled: number;
  disposal: number;
  pendingComplaints: number;
  percentageDisposal: number;
}

interface Props {
  searchParams: Promise<Query>;
}

const ComplaintSummaryPage = async ({ searchParams }: Props) => {
  const query = await searchParams; // 👈 fix
  const { startDate, endDate, page, pageSize, search, orderBy, order } = query;

  const myPage = parseInt(page || "1") || 1;
  let myPageSize: number;

  if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  else myPageSize = Number(pageSize);

  console.log(page, page);
  console.log(pageSize, pageSize);
  console.log(search, search);

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/complaint-summary";

  const params = new URLSearchParams();

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  let data: ComplaintSummary[] = await res.json();

  // **Apply Search Filter**
  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data.filter(
      (d) =>
        d.districtName.toLowerCase().includes(lowerSearch) ||
        d.complaintsFiled.toString().includes(lowerSearch) ||
        d.disposal.toString().includes(lowerSearch) ||
        d.percentageDisposal.toString().includes(lowerSearch) ||
        d.pendingComplaints.toString().includes(lowerSearch)
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

  console.log("data", data);
  console.log("paginatedData", paginatedData);

  console.log("length:", data.length);
  console.log("start:", (myPage - 1) * myPageSize);
  console.log("end:", myPage * myPageSize);

  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">
            Complaint Summary Report
          </p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {paginatedData.length} Records
          </p>
        </div>
        <div className="flex items-center justify-end gap-1">
          <Suspense fallback={<Spinner />}>
            <DownloadWrapper data={data} />
            <DatesFilter />
            <SearchFilter />
          </Suspense>
        </div>
      </div>
      <div className="relative">
        <div className="h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide relative">
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
      </div>
    </div>
  );
};

export default ComplaintSummaryPage;
