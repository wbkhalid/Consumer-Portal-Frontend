import useData from "./useData";

interface Props {
  status?: number | string;
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

const useGetAllComplains = ({ refresh = false, status }: Props = {}) =>
  useData<ManageComplainsData>({
    refresh,
    endpoint: `/api/AdminDashboard/ComplaintsList${
      status !== undefined ? `?status=${status}` : ""
    }`,
  });

export default useGetAllComplains;
