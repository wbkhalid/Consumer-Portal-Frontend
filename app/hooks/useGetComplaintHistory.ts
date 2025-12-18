import { COMPLAINT_API } from "../APIs";
import useData from "./useData";

interface Props {
  id?: number;
  refresh?: boolean;
}

export interface ManageSelectedComplaintHistory {
  id: number;
  complaintId: number;
  fromStatus: number;
  toStatus: number;
  changedBy: string;
  assignedTo: string;
  changedAt: string;
  reason: string;
}

const useGetComplaintHistory = ({ refresh = false, id }: Props = {}) =>
  useData<ManageSelectedComplaintHistory>({
    refresh,
    endpoint: `${COMPLAINT_API}/complaint-status-history/${id}`,
  });

export default useGetComplaintHistory;
