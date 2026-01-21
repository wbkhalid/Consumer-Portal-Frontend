import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { SectionReport } from "../list/page";
import DistrictSectionComplaintComponet from "./components/DistrictSectionComplaintComponet";
// import { FineImposedProp } from "../page";
// import DistrictComplaintComponent from "./components/DistrictComplaintComponent";

interface Props {
  params: Promise<{
    districtSection: string;
  }>;
  searchParams: Promise<{
    year?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

const DistrictSectionComplaintPage = async ({
  params,
  searchParams,
}: Props) => {
  const { districtSection } = await params;
  const { year, startDate, endDate } = await searchParams;

  const decodedDistrict = decodeURIComponent(districtSection);

  const urlParams = new URLSearchParams();

  if (year) urlParams.set("year", year);
  if (startDate) urlParams.set("startDate", startDate);
  if (endDate) urlParams.set("endDate", endDate);

  const baseURL = `${
    process.env.BACKEND_API
  }${COMPLAINT_REPORT_API}/section-report?${urlParams.toString()}`;

  const res = await fetch(baseURL, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  const data: SectionReport[] = response?.data ?? [];

  const selectedDistrict = data?.find(
    (item) => item?.districtName === decodedDistrict,
  );

  if (!selectedDistrict) {
    return <h1>No data found for {decodedDistrict}</h1>;
  }

  return (
    <div>
      <DistrictSectionComplaintComponet data={selectedDistrict} />
    </div>
  );
};
export default DistrictSectionComplaintPage;
