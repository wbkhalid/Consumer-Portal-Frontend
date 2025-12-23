import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  refresh?: boolean;
  phoneNumber?: number | string;
}

export interface ManageRegisterUserData {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  cnic: string;
  phoneNumber: string;
  address: string;
  provinceId: number;
  divisionId: number;
  districtId: number;
  tehsilId: number;
  houseNo: string;
  streetNo: string;
  landMark: string;
  profilePicture: string;
  cnicFrontPath: string;
  cnicBackPath: string;
  faceTemplatePath: string;
  isCnicVerified: true;
  isFaceVerified: true;
  createdAt: string;
  updatedAt: string;
  deviceId: string;
  deviceType: number;
  otp: number;
}

const useSearchRegisterUser = ({
  refresh = false,
  phoneNumber,
}: Props = {}) => {
  const params = new URLSearchParams();

  if (phoneNumber !== undefined && phoneNumber !== "" && phoneNumber !== "0")
    params.append("phoneNumber", String(phoneNumber));

  const queryString = params.toString();

  return useData<ManageRegisterUserData>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/search-member?${queryString.toString()}`,
  });
};

export default useSearchRegisterUser;
