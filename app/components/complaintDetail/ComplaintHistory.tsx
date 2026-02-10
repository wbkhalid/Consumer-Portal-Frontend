import { format } from "date-fns";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import useGetComplaintHistory from "../../hooks/useGetComplaintHistory";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import {
  formatDate,
  formatTimeOnly,
  LongFormatDate,
  statusData,
  toLocal,
} from "../../utils/utils";
import useGetMeetingVideos from "../../hooks/useGetMeetingVideos";

interface HistoryProps {
  complaint: ManageComplainsData | null;
  setMediaModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: "image" | "video" | null;
      url: string | null;
    }>
  >;
}

const ComplaintHistory = ({ complaint, setMediaModal }: HistoryProps) => {
  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const { data: staffData } = useGetAllStaff({
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });
  const { data: complaintHistoryData } = useGetComplaintHistory({
    id: complaint?.id,
  });

  const { data: meetingVideos } = useGetMeetingVideos({ id: complaint?.id });
  const decisionImages =
    complaint?.decisionFilePaths?.filter((f) => f.fileType === 0) ?? [];

  const decisionVideos =
    complaint?.decisionFilePaths?.filter((f) => f.fileType === 1) ?? [];

  console.log(staffData, "staffData");
  console.log(complaintHistoryData, "complaintHistoryData");

  return (
    <div className="px-5! py-4!">
      {/* <div className="py-2!">
        <p className="text-[#555555] text-sm">Final Remarks</p>
        <p className="text-sm">{complaint?.closingRemarks}</p>
      </div> */}

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-1! rounded-[5px]! mb-2!">
        <div className="flex justify-between mt-2!">
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Fine Imposed</p>
            <p className="text-[15px]">
              {complaint?.finedAmount?.toLocaleString()}
              <span className="text-xs font-semibold"> (PKR)</span>
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Complaint Status</p>
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
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-1! rounded-[5px]! mb-2!">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-[#555555]">Appeal Order</p>

          {complaint?.appealDecisionDetails?.map((appeal, index) => (
            <div key={index} className="mb-3!">
              <p className="text-sm mt-1!">
                <span className="font-semibold">Date: </span>
                {formatDate(appeal?.decisionDate)}
              </p>

              <p className="text-sm mt-1!">
                <span className="font-semibold">Order: </span>
                {appeal?.decisionRemarks}
              </p>

              <div className="mt-2!">
                {appeal?.decisionFilePaths &&
                appeal.decisionFilePaths.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {appeal.decisionFilePaths.map((file, i) => (
                      <div
                        key={`appeal-img-${index}-${i}`}
                        className="w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
                        onClick={() =>
                          setMediaModal({
                            open: true,
                            type: file.fileType === 1 ? "video" : "image",
                            url: file.filePath,
                          })
                        }
                      >
                        {file.fileType === 1 ? (
                          <video
                            src={file.filePath}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={file.filePath}
                            alt={`appeal-img-${i}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    No media available.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-1! rounded-[5px]!">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-[#555555]">Final Order</p>

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
              <p className="text-xs text-gray-400 italic">
                No media available.
              </p>
            )}
          </div>
        </div>

        {/* <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full my-1!" />

        <div className="flex justify-between mt-2!">
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Fine Imposed</p>
            <p className="text-[15px]">
              {complaint?.finedAmount?.toLocaleString()}
              <span className="text-xs font-semibold"> (PKR)</span>
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Complaint Status</p>
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
        </div> */}
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-1! rounded-[5px]! mt-2!">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-[#555555]">Meeting Videos</p>

          <div>
            {meetingVideos && meetingVideos?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {meetingVideos &&
                  meetingVideos?.length > 0 &&
                  meetingVideos?.map((file, i) => (
                    <div key={i} className="mb-5!">
                      <div
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
                      <p className="text-xs text-center mt-1!">
                        {formatDate(file?.createdAt)}
                      </p>
                      <p className="text-xs text-center text-gray-500">
                        {new Date(file?.createdAt).toLocaleTimeString("en-PK", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No media available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full my-1!" /> */}

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-1! rounded-[5px]! mt-2!">
        <p className="text-sm text-[#555555] font-medium mb-1!">
          Interim Details
        </p>
        {complaint?.interimDetails
          ?.slice()
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          ?.map((i, idx) => (
            <div
              key={idx}
              className="border border-[rgba(29,28,29,0.13)] rounded-xl bg-white p-4! shadow-xs mb-2!"
            >
              <p className="text-sm font-semibold">
                {formatDate(i.createdAt)}
                {"-"}
                <span className="text-xs text-gray-500">
                  {/* {new Date(i.createdAt).toLocaleTimeString("en-PK", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })} */}
                  {i?.createdAt && format(toLocal(i?.createdAt), "hh:mm a")}
                </span>
              </p>

              <p className="text-sm mt-1!">
                <span className="font-semibold">Order Sheet: </span>
                {i.interimRemarks}
              </p>

              {i?.interimOrderFilesPath?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2!">
                  {i?.interimOrderFilesPath.map((img, j) => (
                    <div
                      key={j}
                      className="w-20 h-20 border border-[rgba(29,28,29,0.13)] rounded-lg overflow-hidden cursor-pointer"
                      onClick={() =>
                        setMediaModal({
                          open: true,
                          type: "image",
                          url: img.filePath,
                        })
                      }
                    >
                      <img
                        src={img.filePath}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-1! rounded-[5px]! mt-2!">
        <p className="text-sm text-[#555555] font-medium mb-2!">
          Complaint History
        </p>

        {complaintHistoryData?.length !== 0 ? (
          <div className="flex flex-col gap-2.5">
            {complaintHistoryData?.map((history) => (
              <div className="bg-white border border-[#E5E7EB] px-3! py-1! rounded-[5px]">
                {history?.fromStatus === 8 && history?.toStatus === 0 ? (
                  <div className="flex justify-between items-center">
                    {history?.reason && (
                      <p className="text-[#4A5565] text-xs mt-2!">
                        {history?.reason}
                      </p>
                    )}
                    <p className="text-xs">
                      {LongFormatDate(history?.changedAt)} -
                      {format(toLocal(history?.changedAt), "hh:mm a")}
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      className={`flex ${[1, 2, 3, 12].includes(history?.toStatus) ? "justify-between" : "justify-end"} items-center text-xs`}
                    >
                      {[1, 2, 3, 12].includes(history?.toStatus) && (
                        <p className="text-[#4A5565]">
                          Assigned To :
                          {staffData?.find(
                            (u) => u?.userId === history?.assignedTo,
                          )?.fullName || "-"}
                        </p>
                      )}

                      <p className="text-sm">
                        {statusData?.find((s) => s?.id === history?.toStatus)
                          ?.label || "-"}
                      </p>
                    </div>
                    <div
                      className={`flex ${[1, 2, 3, 12].includes(history?.toStatus) ? "justify-between" : "justify-end"}  items-center text-xs`}
                    >
                      {[1, 2, 3, 12].includes(history?.toStatus) && (
                        <p className="text-[#4A5565]">
                          Assigned By :{" "}
                          {staffData?.find(
                            (u) => u?.userId === history?.changedBy,
                          )?.fullName || "-"}
                        </p>
                      )}
                      <p className="text-xs">
                        {LongFormatDate(history?.changedAt)} -
                        {format(toLocal(history?.changedAt), "hh:mm a")}
                      </p>
                    </div>
                    {history?.reason && (
                      <p className="text-[#4A5565] text-xs mt-2!">
                        Order:{history?.reason}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 italic">No history available.</p>
        )}
      </div>
    </div>
  );
};

export default ComplaintHistory;
