import { cookies } from "next/headers";
import { BaseQuery } from "../../../../utils/utils";
import { ManageComplainsData } from "../../../../hooks/useGetAllComplains";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { ComplaintSummary } from "../../list/page";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SearchFilter from "../../../../components/reuseable-filters/SearchFilter";
import DateFilter from "../../../../components/DateFilter";
import ClearButton from "../../../../components/ClearButton";
import DetailTable from "../../../../components/table/DetailTable";

export type Query = BaseQuery<ManageComplainsData>;
interface Props {
  params: Promise<{
    districtName: string;
  }>;
  searchParams: Promise<Query>;
}

const DistrictComplaintPage = async ({ searchParams, params }: Props) => {
  const { districtName } = await params;
  const query = await searchParams;
  const cookieStore = await cookies();
  const divisionId = cookieStore.get("divisionId")?.value;

  const { startDate, endDate, search } = query;

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/complaint-summary";

  const urlParams = new URLSearchParams();

  if (startDate) urlParams.set("startDate", startDate);
  if (endDate) urlParams.set("endDate", endDate);
  if (divisionId && divisionId !== "0") urlParams.set("divisionId", divisionId);

  const finalAPI = `${baseURL}?${urlParams.toString()}`;
  console.log("finalAPI call", finalAPI);

  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  console.log(response, "full response");

  let complaintSummary: ComplaintSummary[] = response.data;

  const selectedDistrict = complaintSummary?.find(
    (d) => d?.districtName === districtName,
  );

  let data: ManageComplainsData[] = selectedDistrict?.complaints ?? [];

  console.log(data, "..///....//...//");

  if (search) {
    const lowerSearch = search.toLowerCase();

    data = data?.filter(
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
            label: "Complaint Summary Report",
            href: "/reports/complaint-summary/list",
          },
          {
            label: `${districtName}`,
          },
        ]}
      />

      <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">
          {districtName} Complaints
        </p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {data?.length?.toLocaleString()} Records
        </p>
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <DateFilter />
            <ClearButton />
          </div>
        </div>
        <DetailTable rowsData={data ?? []} isBreadCrumbs={true} />
      </div>
    </>
  );
};

export default DistrictComplaintPage;
