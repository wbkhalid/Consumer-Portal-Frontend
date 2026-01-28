import { format } from "date-fns";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import useGetMeetingVideos from "../../hooks/useGetMeetingVideos";
import {
  formatDate,
  statusData,
  toLocal,
  toLocalDateString,
} from "../../utils/utils";

interface MediaDetailsProps {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
  setMediaModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: "image" | "video" | null;
      url: string | null;
    }>
  >;
}
const ResolvedDetail = ({ complaint, setMediaModal }: MediaDetailsProps) => {
  const { data: meetingVideos } = useGetMeetingVideos({ id: complaint?.id });
  const decisionImages =
    complaint?.decisionFilePaths?.filter((f) => f.fileType === 0) ?? [];

  const decisionVideos =
    complaint?.decisionFilePaths?.filter((f) => f.fileType === 1) ?? [];

  console.log(meetingVideos, "....///...");

  return (
    <div className="px-5! py-2.5!">
      {/* <div className="py-2!">
        <p className="text-[#555555] text-sm">Final Remarks</p>
        <p className="text-sm">{complaint?.closingRemarks}</p>
      </div> */}

      <div className="flex justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Fined Amount</p>
          <p className="text-[15px]">
            {complaint?.finedAmount?.toLocaleString()}
            <span className="text-xs font-semibold"> (PKR)</span>
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Resolved Status</p>
          <p className="text-[15px]">
            {
              statusData?.find((status) => status?.id === complaint?.status)
                ?.label
            }
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Resolved Date</p>
          <p className="text-[15px]">{formatDate(complaint?.closedDate)}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Resolved Time</p>
          <p className="text-[15px]">
            {complaint?.closedDate &&
              format(toLocal(complaint.closedDate), "hh:mm a")}
          </p>
        </div>
      </div>

      <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full my-1!" />

      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#555555]">Decision Orders</p>

        <div>
          {complaint?.decisionFilePaths &&
          complaint?.decisionFilePaths?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {decisionImages &&
                decisionImages?.length > 0 &&
                decisionImages?.map((file, i) => (
                  <div
                    key={`img-${i}`}
                    className="w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
                    onClick={() =>
                      setMediaModal({
                        open: true,
                        type: "image",
                        url: file.filePath,
                      })
                    }
                  >
                    <img
                      src={file.filePath}
                      alt={`decision-img-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

              {decisionVideos &&
                decisionVideos?.length > 0 &&
                decisionVideos?.map((file, i) => (
                  <div
                    key={`vid-${i}`}
                    className="relative w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
                    onClick={() =>
                      setMediaModal({
                        open: true,
                        type: "video",
                        url: file.filePath,
                      })
                    }
                  >
                    <video
                      src={file.filePath}
                      className="w-full h-full object-cover"
                      muted
                    />
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No media available.</p>
          )}
        </div>
      </div>

      <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full my-1!" />

      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#555555]">Meeting Videos</p>

        <div>
          {meetingVideos && meetingVideos?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {meetingVideos &&
                meetingVideos?.length > 0 &&
                meetingVideos?.map((file, i) => (
                  <div
                    key={`vid-${i}`}
                    className="relative w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
                    onClick={() =>
                      setMediaModal({
                        open: true,
                        type: "video",
                        url: file?.videoRecordingLink,
                      })
                    }
                  >
                    <video
                      src={file?.videoRecordingLink}
                      // poster="/logo.png"
                      className="w-full h-full object-cover"
                      muted
                    />
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No media available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResolvedDetail;
