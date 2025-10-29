import useData from "./useData";

interface Props {
  status?: number | string;
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

const useGetAllComplains = ({ refresh = false, status }: Props = {}) =>
  useData<ManageComplainsData>({
    refresh,
    endpoint: `/api/AdminDashboard/ComplaintsList${
      status !== undefined ? `?status=${status}` : ""
    }`,
  });

export default useGetAllComplains;
