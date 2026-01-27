import { ADMIN_DASHBOARD_API } from "../APIs";
import useData from "./useData";

interface Props {
  id?: number;
  refresh?: boolean;
}

export interface ManageMeetingVideos {
  id: number;
  caseNo: number;
  videoRecordingLink: string;
  createdAt: string;
  updatedAt: string;
}

const useGetMeetingVideos = ({ refresh = false, id }: Props = {}) =>
  useData<ManageMeetingVideos>({
    refresh,
    endpoint: `${ADMIN_DASHBOARD_API}/meeting-recording/by-complaintId/${id}`,
  });

export default useGetMeetingVideos;
