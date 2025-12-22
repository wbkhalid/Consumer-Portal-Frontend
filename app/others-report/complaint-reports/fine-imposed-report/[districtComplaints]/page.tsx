import { COMPLAINT_REPORT_API } from "../../../../APIs";
import { FineImposedProp } from "../page";
import DistrictComplaintComponent from "./components/DistrictComplaintComponent";

interface Props {
  params: Promise<{
    districtComplaints: string;
  }>;
}

const DistrictComplaintPage = async ({ params }: Props) => {
  const { districtComplaints } = await params;

  const decodedDistrict = decodeURIComponent(districtComplaints);
  const baseURL = `${
    process.env.BACKEND_API
  }${COMPLAINT_REPORT_API}/fine-imposed-report${params ? `?${params}` : ""}`;

  const res = await fetch(baseURL, {
    next: { revalidate: 10 },
  });

  const response = await res.json();

  const data: FineImposedProp[] = response?.data ?? [];

  const selectedDistrict = data?.find(
    (item) => item?.districtName === decodedDistrict
  );

  if (!selectedDistrict) {
    return <h1>No data found for {decodedDistrict}</h1>;
  }

  return (
    <div>
      <DistrictComplaintComponent data={selectedDistrict} />
    </div>
  );
};
export default DistrictComplaintPage;
