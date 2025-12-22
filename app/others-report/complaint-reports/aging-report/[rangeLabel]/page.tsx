import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { AgingReportProp } from "../page";
import DayRangeComponent from "./components/DayRangeComponent";

interface Props {
  params: Promise<{
    rangeLabel: string;
  }>;
}

const DayRangePage = async ({ params }: Props) => {
  const { rangeLabel } = await params;

  const decodedDayRange = decodeURIComponent(rangeLabel);

  const baseURL =
    process.env.BACKEND_API + COMPLAINT_REPORT_API + "/aging-report";

  const res = await fetch(baseURL, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  const data: AgingReportProp[] = response?.data ?? [];

  const selectedRange = data?.find(
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
