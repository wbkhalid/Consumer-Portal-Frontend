import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  id?: number;
  refresh?: boolean;
}

export interface ManageMeetingDetails {
  id: number;
  caseNo: number;
  meetingDate: string;
  meetingTime: string;
  meetingLink_Admin: string | null;
  meetingLink_Client: string;
  meeting_Remarks: string | null;
  ptclMeetingStatus: number;
}

const useGetMeetingDetails = ({ refresh = false, id }: Props = {}) =>
  useData<ManageMeetingDetails>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/complaint-meeting-details?complaintId=${id}`,
  });

export default useGetMeetingDetails;
