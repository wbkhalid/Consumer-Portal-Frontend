import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  status?: number | string;
  divisionId?: number | string;
  districtId?: number | string;
  tehsilId?: number | string;
  refresh?: boolean;
  startDate?: string;
  endDate?: string;
  assignedTo?: string;
  minFineAmount?: number;
  maxFineAmount?: number;
}

export interface SectionsDetails {
  name: string;
  description: string;
}

export interface DecisionFilePaths {
  filePath: string;
  fileType: number;
}

export interface ManageComplainsData {
  id: number;
  shopName: string;
  phoneNumber: string;
  complaintType: string;
  categoryName: string;
  address: string;
  division: string;
  district: string;
  tehsil: string;
  latitude: number;
  longitude: number;
  billBoardImage: string;
  sectionCategoryName: string;
  sectionsDetails: SectionsDetails[];
  entryType: number;
  status: number;
  finedAmount: number;
  remarks: string | null;
  hearingDate: string | null;
  assigneeRemarks: string | null;
  closingRemarks: string | null;
  assignedTo: string | null;
  listAudio: string[];
  listOfImage: string[];
  createdAt: string;
  decisionFilePaths: DecisionFilePaths[];
}

const useGetAllComplains = ({
  refresh = false,
  divisionId,
  districtId,
  tehsilId,
  startDate,
  endDate,
  status,

  assignedTo,
  minFineAmount,
  maxFineAmount,
}: Props = {}) => {
  const params = new URLSearchParams();

  if (divisionId !== undefined && divisionId !== "" && divisionId !== "0")
    params.append("divisionId", String(divisionId));
  if (districtId !== undefined && districtId !== "" && districtId !== "0")
    params.append("districtId", String(districtId));
  if (tehsilId !== undefined && tehsilId !== "" && tehsilId !== "0")
    params.append("tehsilId", String(tehsilId));
  if (status !== undefined && status !== "" && status !== "0")
    params.append("status", String(status));
  if (startDate !== undefined && startDate !== "" && startDate !== "0")
    params.append("startDate", String(startDate));
  if (endDate !== undefined && endDate !== "" && endDate !== "0")
    params.append("endDate", String(endDate));
  if (assignedTo !== undefined && assignedTo !== "" && assignedTo !== "0")
    params.append("assignedTo", String(assignedTo));
  if (minFineAmount !== undefined)
    params.append("minFineAmount", String(minFineAmount));

  if (maxFineAmount !== undefined)
    params.append("maxFineAmount", String(maxFineAmount));

  const queryString = params.toString();

  return useData<ManageComplainsData>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/ComplaintsList${
      queryString ? `?${queryString}` : ""
    }`,
  });
};

export default useGetAllComplains;
