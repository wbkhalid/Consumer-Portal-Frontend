import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  divisionId?: number | string;
  districtId?: number | string;
  tehsilId?: number | string;
  refresh?: boolean;
  year?: string;
  startDate?: string;
  endDate?: string;
}

export interface SectionsDetails {
  name: string;
  description: string;
}

export interface ManageCustomComplainsData {
  id: number;
  shopName: string;
  phoneNumber: string;
  complaintType: string;
  categoryName: string;
  address: string;
  billBoardImage: string;
  sectionCategoryName: string;
  sectionsDetails: SectionsDetails[];
  entryType: number;
  status: number;
  remarks: string | null;
  hearingDate: string | null;
  assigneeRemarks: string | null;
  listAudio: string[];
  listOfImage: string[];
  createdAt: string;
}

const useGetCustomComplaints = ({
  refresh = false,
  divisionId,
  districtId,
  tehsilId,
  year,
  startDate,
  endDate,
}: Props = {}) => {
  const params = new URLSearchParams();

  if (divisionId !== undefined && divisionId !== "" && divisionId !== "0")
    params.append("divisionId", String(divisionId));
  if (districtId !== undefined && districtId !== "" && districtId !== "0")
    params.append("districtId", String(districtId));
  if (tehsilId !== undefined && tehsilId !== "" && tehsilId !== "0")
    params.append("tehsilId", String(tehsilId));
  if (year !== undefined && year !== "" && year !== "0")
    params.append("year", String(year));
  if (startDate !== undefined && startDate !== "" && startDate !== "0")
    params.append("startDate", String(startDate));
  if (endDate !== undefined && endDate !== "" && endDate !== "0")
    params.append("endDate", String(endDate));

  const queryString = params.toString();

  return useData<ManageCustomComplainsData>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/custom-complaints${
      queryString ? `?${queryString}` : ""
    }`,
  });
};

export default useGetCustomComplaints;
