import { useSearchParams } from "next/navigation";
import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { AgingReportProp } from "../page";
import DayRangeComponent from "./components/DayRangeComponent";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{
    rangeLabel: string;
  }>;
}

const DayRangePage = async ({ params }: Props) => {
  const { rangeLabel } = await params;

  const cookieStore = await cookies();
  const divisionId = cookieStore.get("divisionId")?.value;

  const decodedDayRange = decodeURIComponent(rangeLabel);

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/aging-report";
  const urlParams = new URLSearchParams();

  if (divisionId !== "0") urlParams.set("divisionId", divisionId ?? "");
  const finalAPI = `${baseURL}?${urlParams.toString()}`;
  console.log("finalAPI call", finalAPI);

  const res = await fetch(finalAPI, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  let data: AgingReportProp[] = response?.data ?? [];

  let selectedRange = data?.find(
    (item) => item?.rangeLabel === decodedDayRange
  );

  if (!selectedRange) {
    return <h1>No data found for {decodedDayRange}</h1>;
  }

  return (
    <div>
      <DayRangeComponent
        data={selectedRange?.dailyBreakdown ?? []}
        rangeLabel={selectedRange.rangeLabel}
      />
    </div>
  );
};
export default DayRangePage;
