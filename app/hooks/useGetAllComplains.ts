import useData from "./useData";

interface Props {
  id?: number;
  refresh?: boolean;
}

export interface ManageComplainsData {
  shopName: string;
  phoneNumber: string;
  complaintType: string;
  productType: string;
  sector: string;
  status: number;
  remarks: string;
  listAudio: string[];
  listOfImage: string[];
}

const useGetAllComplains = ({ refresh = false }: Props = {}) =>
  useData<ManageComplainsData>({
    refresh,
    endpoint: `/api/AdminDashboard/ComplaintsList`,
  });

export default useGetAllComplains;
