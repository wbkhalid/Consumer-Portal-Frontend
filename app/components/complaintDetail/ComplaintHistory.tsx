import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import useGetComplaintHistory from "../../hooks/useGetComplaintHistory";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import { formatTimeOnly, LongFormatDate } from "../../utils/utils";

const ComplaintHistory = ({
  complaint,
}: {
  complaint: ManageComplainsData | null;
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

  console.log(staffData, "..//..//");

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
      <div className="flex flex-col gap-2.5">
        {complaintHistoryData?.map((history) => (
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] px-3! py-1! rounded-[5px]">
            <div className="flex justify-between items-center">
              <p>
                {staffData?.find((u) => u.userId === history?.assignedTo)
                  ?.fullName || "-"}
              </p>
              <p className="text-sm">{LongFormatDate(history?.changedAt)}</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <p className="text-[#4A5565]">Admin</p>
              <p className="text-sm">{formatTimeOnly(history?.changedAt)}</p>
            </div>
            {history?.reason && (
              <p className="text-[#4A5565] text-sm mt-2!">
                Reason:{history?.reason}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintHistory;
