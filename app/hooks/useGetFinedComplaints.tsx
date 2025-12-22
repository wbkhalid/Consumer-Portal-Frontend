import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  divisionId?: number | string;
  districtId?: number | string;
  tehsilId?: number | string;
  refresh?: boolean;
}

export interface ManageFinedComplaintsData {
  id: number;
  shopName: string;
  phoneNumber: string;
  address: string;
  finedAmount: number;
  status: number;
  finedDate: string;
}

const useGetFinedComplaints = ({
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

  return useData<ManageFinedComplaintsData>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/fined-complaints${
      queryString ? `?${queryString}` : ""
    }`,
  });
};

export default useGetFinedComplaints;
