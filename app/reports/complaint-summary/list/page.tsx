import { sort } from "fast-sort";
import DownloadWrapper from "./DownloadWrapper";
import List, { Query } from "./List";
import { cookies } from "next/headers";
import { ManageComplainsData } from "../../../hooks/useGetAllComplains";
import { COMPLAINT_REPORT_API } from "../../../APIs";
import SearchFilter from "../../../components/reuseable-filters/SearchFilter";
import DateFilter from "../../../components/DateFilter";
import ClearButton from "../../../components/ClearButton";
import PageHeader from "../../../components/PageHeader";
// import { cookies } from "next/headers";

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
  complaints: ManageComplainsData[];
}

interface Props {
  searchParams: Promise<Query>;
}

const ComplaintSummaryPage = async ({ searchParams }: Props) => {
  const query = await searchParams;
  const { startDate, endDate, search, orderBy, order } = query;
  const cookieStore = await cookies();
  const divisionId = cookieStore.get("divisionId")?.value;

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/complaint-summary";

  const params = new URLSearchParams();

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  if (divisionId !== "0") params.set("divisionId", divisionId ?? "");

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  console.log(response, "full response");

  let data: ComplaintSummary[] = response.data;

  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data?.filter(
      (d) =>
        d.districtName.toLowerCase().includes(lowerSearch) ||
        d.complaintsFiled.toString().includes(lowerSearch) ||
        d.disposal.toString().includes(lowerSearch) ||
        d.percentageDisposal.toString().includes(lowerSearch) ||
        d.pendingComplaints.toString().includes(lowerSearch),
    );
  }

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-2.5!">
        {/* <div className="flex items-center gap-1 ">
          <p className="text-[#111827] font-semibold">
            Complaint Summary Report
          </p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {data?.length?.toLocaleString()} Records
          </p>
        </div> */}
        <PageHeader title=" Complaint Summary Report" count={data?.length} />
        <DownloadWrapper fileName={" Complaint Summary Report"} data={data} />
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <DateFilter />
            <ClearButton />
          </div>
        </div>
        <List data={data ?? []} />
      </div>
    </>
  );
};

export default ComplaintSummaryPage;
