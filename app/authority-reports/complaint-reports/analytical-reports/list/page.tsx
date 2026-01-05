import { sort } from "fast-sort";
import { Suspense } from "react";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import DatesFilter from "../../../../components/Filters/DatesFilter";
import YearFilter from "../../../../components/Filters/YearFilter";
import ErrorMessage from "../../../../components/Form/ErrorMessage";
import Spinner from "../../../../components/Spinner";
import { DEFAULT_YEAR } from "../../../../utils/utils";
import List, { Query } from "./List";
import DownloadWrapper from "./DownloadWrapper";
import ClearButton from "../../../../components/ClearButton";
import DateFilter from "../../../../components/DateFilter";
import SearchFilter from "../../../../components/reuseable-filters/SearchFilter";

export interface AnalyticalReport {
  districtName: string;
  monthlyData: [
    {
      month: string;
      filed: number;
      disposed: number;
    }
  ];
  totalFiled: number;
  grandTotal: number;
  totalDisposed: number;
  percentageDisposal: number;
}

interface Props {
  searchParams: Promise<Query>;
}

const AnalyticalReportsPage = async ({ searchParams }: Props) => {
  const query = await searchParams; // 👈 fix
  const { year, startDate, endDate, search, orderBy, order } = query;

  const selectedYear = year || DEFAULT_YEAR;
  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/analytical-report";

  const params = new URLSearchParams();

  params.set("year", year || selectedYear.toString()); // always required

  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  const finalAPI = `${baseURL}?${params.toString()}`;
  console.log("finalAPI call", finalAPI);
  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response = await res.json();
  let data: AnalyticalReport[] = response.data;

  // **Apply Search Filter**
  if (search) {
    const lowerSearch = search.toLowerCase();
    data = data.filter(
      (d) =>
        d.districtName.toLowerCase().includes(lowerSearch) ||
        d.totalFiled.toString().includes(lowerSearch) ||
        d.totalDisposed.toString().includes(lowerSearch) ||
        d.grandTotal.toString().includes(lowerSearch)
    );
  }

  if (orderBy && order) {
    data = sort(data)[order]((item) => item[orderBy]);
  }

  const fileName = "Analytical Report";

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

        {response?.responseCode !== 200 ? (
          <div className="px-2!">
            <ErrorMessage>{response?.responseMessage}</ErrorMessage>
          </div>
        ) : data && data.length > 0 ? (
          <List data={data} searchParams={query} />
        ) : (
          <p className="px-2!">No records found.</p>
        )}
      </div>
    </>
  );
};

export default AnalyticalReportsPage;
