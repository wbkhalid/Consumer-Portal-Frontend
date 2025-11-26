import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageStaffData {
  userId: string;
  fullName: string;
  cnic: string;
  phoneNumber: string;
  division: string;
  district: string;
  tehsil: string;
  roles: string[];
}

const useGetAllStaff = ({ refresh = false }: Props = {}) =>
  useData<ManageStaffData>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/member-users`,
  });

export default useGetAllStaff;
