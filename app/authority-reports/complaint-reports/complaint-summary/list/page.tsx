import { Spinner } from "@radix-ui/themes";
import { sort } from "fast-sort";
import { Suspense } from "react";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import DatesFilter from "../../../../components/Filters/DatesFilter";
import SearchFilter from "../../../../components/Filters/SearchFilter";
import Pagination from "../../../../components/Form/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../../../utils/utils";
import DownloadWrapper from "./DownloadWrapper";
import List, { Query } from "./List";

export interface Complains {
  id: number;
  shopName: string;
  phoneNumber: string;
  address: string;
  billBoardImage: string;
  complaintType: string;
  categoryName: string;
  division: string;
  district: string;
  tehsil: string;
  latitude: number;
  longitude: number;
  sectionCategoryName: string;
  sectionsDetails: {
    name: string;
    description: string;
  }[];
  entryType: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  hearingDate: string;
  remarks: string;
  assigneeRemarks: string;
  assigneeStatus: number;
  closingRemarks: string;
  closedDate: string;
  finedAmount: number;
  listAudio: string[];
  listOfImage: string[];
  listOfVideo: string[];
  decisionFilePaths: {
    filePath: string;
    fileType: number;
  }[];
}

export interface ComplaintSummary {
  districtName: string;
  complaintsFiled: number;
  disposal: number;
  pendingComplaints: number;
  percentageDisposal: number;
  complaints: Complains[];
}

interface Props {
  searchParams: Promise<Query>;
}

const ComplaintSummaryPage = async ({ searchParams }: Props) => {
  const query = await searchParams; // 👈 fix
  const { startDate, endDate, search, orderBy, order } = query;

  // const myPage = parseInt(page || "1") || 1;
  // let myPageSize: number;

  // if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  // else myPageSize = Number(pageSize);

  // console.log(page, page);
  // console.log(pageSize, pageSize);
  // console.log(search, search);

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

  const response = await res.json();

  console.log(response, "full response");

  // Extract only data array
  let data: ComplaintSummary[] = response.data;

  console.log(data, "only data");

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
  // const totalCount = data?.length;

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  // Apply pagination using slice()
  // const paginatedData = data?.slice(
  //   (myPage - 1) * myPageSize,
  //   myPage * myPageSize
  // );

  console.log("data", data);
  // console.log("paginatedData", paginatedData);

  console.log("length:", data?.length);
  // console.log("start:", (myPage - 1) * myPageSize);
  // console.log("end:", myPage * myPageSize);

  const fileName = "Complaint Summary Report";

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white ">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2! flex-wrap gap-2">
        <div className="flex items-center gap-1 flex-wrap">
          <p className="text-(--primary) font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {data?.length} Records
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 flex-wrap">
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
        // currentPage={myPage}
        // pageSize={myPageSize}
        // searchParams={query}
      />
      {/* <Suspense fallback={<Spinner />}>
        <Pagination
          pageSize={myPageSize}
          currentPage={myPage}
          itemCount={totalCount}
        />
      </Suspense> */}
    </div>
  );
};

export default ComplaintSummaryPage;
