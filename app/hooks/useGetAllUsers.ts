import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  refresh?: boolean;
}

export interface ManageUsersData {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  cnic: string;
  phoneNumber: string;
  address: string | null;
  provinceId: number | null;
  divisionId: number | null;
  districtId: number | null;
  tehsilId: number | null;
  houseNo: string | null;
  streetNo: string | null;
  landMark: string | null;
  profilePicture: string;
  cnicFrontPath: string;
  cnicBackPath: string;
  faceTemplatePath: string;
  isCnicVerified: boolean;
  isFaceVerified: boolean;
  createdAt: string;
  updatedAt: string | null;
  otp: number;
}

const useGetAllUsers = ({ refresh = false }: Props = {}) => {
  return useData<ManageUsersData>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/all-users`,
  });
};

export default useGetAllUsers;
