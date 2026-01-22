// import { FrequencyReport } from "../../list/page";
import { BaseQuery, DEFAULT_PAGE_SIZE } from "../../../../utils/utils";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { APIResponse } from "../../../../services/api-client";
import { ManageComplainsData } from "../../../../hooks/useGetAllComplains";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SearchFilter from "../../../../components/reuseable-filters/SearchFilter";
import DetailTable from "../../../../components/table/DetailTable";
import { FrequencyReport } from "../../list/page";
export type Query = BaseQuery<ManageComplainsData>;

interface Props {
  params: Promise<{
    myName: string;
  }>;
  searchParams: Promise<Query>;
}

const FrequencyComplaintPage = async ({ searchParams, params }: Props) => {
  const { myName } = await params;
  const query = await searchParams;

  const decodedParam = decodeURIComponent(myName as string);

  const { year, startDate, endDate, page, pageSize, search, orderBy, order } =
    query;

  const myPage = parseInt(page || "1") || 1;
  let myPageSize: number;

  if (pageSize == undefined) myPageSize = DEFAULT_PAGE_SIZE;
  else myPageSize = Number(pageSize);

  // const selectedYear = year || DEFAULT_YEAR;

  console.log(page, page);
  console.log(pageSize, pageSize);
  console.log(search, search);

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/frequency-report";

  const urlParams = new URLSearchParams();

  // urlParams.set("year", year || selectedYear.toString());

  if (startDate) urlParams.set("startDate", startDate);
  if (endDate) urlParams.set("endDate", endDate);

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI);

  const response: APIResponse<FrequencyReport[]> = await res.json();

  console.log(response, "full response");

  let complaintSummary: FrequencyReport[] = response.data;

  const selectedName = complaintSummary?.find((d) => d?.name === decodedParam);

  let data: ManageComplainsData[] = selectedName?.complaints ?? [];

  if (search) {
    const lowerSearch = search.toLowerCase();

    data = data.filter(
      (c) =>
        c.shopName?.toLowerCase().includes(lowerSearch) ||
        c.phoneNumber?.includes(lowerSearch) ||
        c.categoryName?.toLowerCase().includes(lowerSearch) ||
        c.complaintType?.toLowerCase().includes(lowerSearch) ||
        c.status?.toString().includes(lowerSearch),
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },

          {
            label: "Frequency Report",
            href: "/reports/frequency-report/list",
          },
          {
            label: `${decodedParam}`,
          },
        ]}
      />
      <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">{decodedParam} Complains</p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {data?.length?.toLocaleString()} Records
        </p>
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
        </div>
        <DetailTable rowsData={data ?? []} isBreadCrumbs={true} />
      </div>
    </>
  );
};

export default FrequencyComplaintPage;
