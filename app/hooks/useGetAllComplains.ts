import useData from "./useData";

interface Props {
  status?: number | string;
  divisionId?: number | string;
  districtId?: number | string;
  tehsilId?: number | string;
  refresh?: boolean;
}

export interface SectionsDetails {
  name: string;
  description: string;
}

export interface ManageComplainsData {
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

const useGetAllComplains = ({
  refresh = false,
  divisionId,
  districtId,
  tehsilId,
  status,
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

  const queryString = params.toString();

  return useData<ManageComplainsData>({
    refresh,
    endpoint: `/api/AdminDashboard/ComplaintsList${
      queryString ? `?${queryString}` : ""
    }`,
  });
};

export default useGetAllComplains;
