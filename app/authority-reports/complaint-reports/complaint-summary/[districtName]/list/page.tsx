import { Spinner } from "@radix-ui/themes";
import { sort } from "fast-sort";
import { Suspense } from "react";
import { COMPLAINT_REPORT_API } from "../../../../../APIs";
import DatesFilter from "../../../../../components/Filters/DatesFilter";
import SearchFilter from "../../../../../components/Filters/SearchFilter";
import Pagination from "../../../../../components/Form/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../../../../utils/utils";
import DownloadWrapper from "./DownloadWrapper";
import List, { Query } from "./List";
import { Complains, ComplaintSummary } from "../../list/page";

interface Props {
  params: Promise<{
    districtName: string;
  }>;
  searchParams: Promise<Query>;
}

const DistrictComplaintPage = async ({ searchParams, params }: Props) => {
  const { districtName } = await params;
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

  const urlParams = new URLSearchParams();

  if (startDate) urlParams.set("startDate", startDate);
  if (endDate) urlParams.set("endDate", endDate);

  const finalAPI = `${baseURL}?${urlParams.toString()}`;
  console.log("finalAPI call", finalAPI);

  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  console.log(response, "full response");

  // Extract only data array
  let complaintSummary: ComplaintSummary[] = response.data;

  // Find selected district
  const selectedDistrict = complaintSummary.find(
    (d) => d.districtName === districtName
  );

  // Extract only complaints
  let data: Complains[] = selectedDistrict?.complaints ?? [];

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

  const fileName = `${districtName} Complains`;

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {paginatedData.length} Records
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Suspense fallback={<Spinner />}>
            <DatesFilter />
            <SearchFilter />
            <DownloadWrapper fileName={fileName} data={data} />
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

export default DistrictComplaintPage;
