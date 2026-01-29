import { format } from "date-fns";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import useGetComplaintHistory from "../../hooks/useGetComplaintHistory";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import {
  formatTimeOnly,
  LongFormatDate,
  statusData,
  toLocal,
} from "../../utils/utils";

const ComplaintHistory = ({
  complaint,
}: {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
}) => {
  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const { data: staffData } = useGetAllStaff({
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });
  const { data: complaintHistoryData } = useGetComplaintHistory({
    id: complaint?.id,
  });

  console.log(staffData, "staffData");
  console.log(complaintHistoryData, "complaintHistoryData");

  return (
    <div className="px-5! py-4!">
      <div className="flex justify-between items-center mb-3!">
        <p className="text-sm text-[#555555] font-medium ">
          Remarks & Status History
        </p>
        <p className="text-sm text-[#555555] font-medium border border-[#E2E8F0] px-2.5! py-0.5! rounded-full">
          {complaintHistoryData?.length} Records
        </p>
      </div>

      {complaintHistoryData?.length !== 0 ? (
        <div className="flex flex-col gap-2.5">
          {complaintHistoryData?.map((history) => (
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] px-3! py-1! rounded-[5px]">
              {history?.fromStatus === 8 && history?.toStatus === 0 ? (
                <>
                  <p className="text-xs">
                    {LongFormatDate(history?.changedAt)} -
                    {format(toLocal(history?.changedAt), "hh:mm a")}
                  </p>
                  {history?.reason && (
                    <p className="text-[#4A5565] text-xs mt-2!">
                      {history?.reason}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-[#4A5565]">
                      Assigned To :
                      {staffData?.find((u) => u?.userId === history?.assignedTo)
                        ?.fullName || "-"}
                    </p>
                    <p className="text-sm">
                      {/* {statusData?.find((s) => s?.id === history?.fromStatus)
                        ?.label || "-"}{" "}
                      to{" "} */}
                      {statusData?.find((s) => s?.id === history?.toStatus)
                        ?.label || "-"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-[#4A5565]">
                      Assigned By :{" "}
                      {staffData?.find((u) => u?.userId === history?.changedBy)
                        ?.fullName || "-"}
                    </p>
                    <p className="text-xs">
                      {LongFormatDate(history?.changedAt)} -
                      {format(toLocal(history?.changedAt), "hh:mm a")}
                    </p>
                  </div>
                  {history?.reason && (
                    <p className="text-[#4A5565] text-xs mt-2!">
                      Reason:{history?.reason}
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
  );
};

export default ComplaintHistory;
