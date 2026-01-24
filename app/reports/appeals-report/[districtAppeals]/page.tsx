import { COMPLAINT_REPORT_API } from "../../../APIs";
import { AppealReport } from "../list/page";
import DistrictAppealComponent from "./components/DistrictAppealComponent";

interface Props {
  params: Promise<{
    districtAppeals: string;
  }>;
  searchParams: Promise<{
    year?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

const DistrictAppealPage = async ({ params, searchParams }: Props) => {
  const { districtAppeals } = await params;
  const { year, startDate, endDate } = await searchParams;

  const decodedDistrict = decodeURIComponent(districtAppeals);

  const urlParams = new URLSearchParams();

  if (year) urlParams.set("year", year);
  if (startDate) urlParams.set("startDate", startDate);
  if (endDate) urlParams.set("endDate", endDate);

  const baseURL = `${
    process.env.BACKEND_API
  }${COMPLAINT_REPORT_API}/appeals-report?${urlParams.toString()}`;

  const res = await fetch(baseURL, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  const data: AppealReport[] = response?.data ?? [];

  const selectedDistrict = data?.find(
    (item) => item?.districtName === decodedDistrict,
  );

  if (!selectedDistrict) {
    return <h1>No data found for {decodedDistrict}</h1>;
  }

  return (
    <div>
      <DistrictAppealComponent data={selectedDistrict} />
    </div>
  );
};
export default DistrictAppealPage;
