import { COMPLAINT_REPORT_API } from "../../../APIs";
import { DecidedComplaint } from "../list/page";
import MeritComplaintsComponent from "./components/MeritComplaintsComponent";

interface Props {
  params: Promise<{
    meritDistrictComplaints: string;
  }>;
  searchParams: Promise<{
    year?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

const MeritDistrictComplaintPage = async ({ params, searchParams }: Props) => {
  const { meritDistrictComplaints } = await params;
  const { year, startDate, endDate } = await searchParams;

  const decodedDistrict = decodeURIComponent(meritDistrictComplaints);

  const urlParams = new URLSearchParams();

  if (year) urlParams.set("year", year);
  if (startDate) urlParams.set("startDate", startDate);
  if (endDate) urlParams.set("endDate", endDate);

  const baseURL = `${
    process.env.BACKEND_API
  }${COMPLAINT_REPORT_API}/decided-complaint-report?${urlParams.toString()}`;

  const res = await fetch(baseURL, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  const data: DecidedComplaint[] = response?.data ?? [];

  const selectedDistrict = data?.find(
    (item) => item?.districtName === decodedDistrict,
  );

  if (!selectedDistrict) {
    return <h1>No data found for {decodedDistrict}</h1>;
  }

  return (
    <div>
      <MeritComplaintsComponent data={selectedDistrict} />
    </div>
  );
};
export default MeritDistrictComplaintPage;
