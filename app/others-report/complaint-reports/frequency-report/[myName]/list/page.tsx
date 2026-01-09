import { COMPLAINT_REPORT_API } from "../../../../../APIs";
import { DEFAULT_PAGE_SIZE, DEFAULT_YEAR } from "../../../../../utils/utils";
import { Query } from "./List";
import { APIResponse } from "../../../../../services/api-client";
import { FrequencyReport } from "../../list/page";
import DetailTable from "../../../../../components/table/DetailTable";
import { ManageComplainsData } from "../../../../../hooks/useGetAllComplains";
import SearchFilter from "../../../../../components/reuseable-filters/SearchFilter";
import Breadcrumbs from "../../../../../components/Breadcrumbs";

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
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

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
        c.status?.toString().includes(lowerSearch)
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },

          {
            label: "Frequency Report",
            href: "/others-report/complaint-reports/frequency-report/list",
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
          {/* <div className="flex justify-end items-center gap-2">
            <DateFilter />

            <ClearButton />
          </div> */}
        </div>
        <DetailTable rowsData={data ?? []} isBreadCrumbs={true} />
      </div>

      {/* <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
        <div className="flex items-center gap-1 p-2! flex-wrap">
          <Link
            className="text-(--primary) font-medium hover:underline"
            href="/"
          >
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
      </div> */}
    </>
  );
};

export default FrequencyComplaintPage;
