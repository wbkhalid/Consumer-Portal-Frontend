import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  refresh?: boolean;
  divisionId?: number | string;
  districtId?: number | string;
  tehsilId?: number | string;
}

export interface ManageStaffData {
  userId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  division: string;
  district: string;
  tehsil: string;
  roles: string[];
}

const useGetAllStaff = ({
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

  return useData<ManageStaffData>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/member-users?${queryString.toString()}`,
  });
};

export default useGetAllStaff;
