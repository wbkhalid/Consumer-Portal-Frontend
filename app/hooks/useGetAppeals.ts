import { COMPLAINT_APPEALS_API } from "../APIs";
import useData from "./useData";
import { ManageComplainsData } from "./useGetAllComplains";

interface Props {
  divisionId?: number | string;
  districtId?: number | string;
  tehsilId?: number | string;
  refresh?: boolean;
}

export interface ManageAppealsData {
  appealId: number;
  appealReason: string;
  appealStatus: number;
  createdAt: string;
  complaintDetails: ManageComplainsData;
}

const useGetAppeals = ({
  refresh = false,
  divisionId,
  districtId,
  tehsilId,
}: Props = {}) => {
  const params = new URLSearchParams();

  if (divisionId !== undefined && divisionId !== "" && divisionId !== "0")
    params.append("divisionId", String(divisionId));
  if (districtId !== undefined && districtId !== "" && districtId !== "0")
    params.append("districtId", String(districtId));
  if (tehsilId !== undefined && tehsilId !== "" && tehsilId !== "0")
    params.append("tehsilId", String(tehsilId));

  const queryString = params.toString();

  return useData<ManageAppealsData>({
    refresh,
    endpoint: `${COMPLAINT_APPEALS_API}/ComplaintAppealsList${
      queryString ? `?${queryString}` : ""
    }`,
  });
};

export default useGetAppeals;
