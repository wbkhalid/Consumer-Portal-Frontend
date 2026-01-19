import { useState } from "react";
import CustomSearchDropdown from "../CustomSearchDropdown";
import CustomTextArea from "../CustomTextArea";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import apiClient from "../../services/api-client";
import { COMPLAINT_API } from "../../APIs";
import { Button, Dialog } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";

const AssignDetails = ({
  complaint,
  onSuccess,
  onClose,
}: {
  complaint: ManageComplainsData | null;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  const [remarks, setRemarks] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = Cookies.get("userId");
  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const { data: staffData } = useGetAllStaff({
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });
  const handleAssignComplaint = async () => {
    if (!complaint) return;

    if (!remarks || !selectedStaff) {
      toast.warning("Please add remarks and select Assignee");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        complaintId: complaint?.id,
        status: 1,
        previousStaus: 0,
        updatedBy: userId,
        assignedTo: selectedStaff,
        hearingDate: null,
        verdict: 0,
        assigneeRemarks: remarks,
        closingRemarks: "",
        isClosed: false,
        complaintDecisionFiles: [
          {
            filePath: "",
            fileType: 0,
          },
          {
            filePath: "",
            fileType: 1,
          },
        ],
      };

      console.log("📤 Sending payload:", payload);

      const response = await apiClient.post(
        COMPLAINT_API + "/update-status",
        payload
      );
      console.log(response, "response");

      if (response.status === 200) {
        toast.success(
          response?.data?.message || "Complaint assigned successfully."
        );
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error assigning complaint:", error);
      toast.error("Something went wrong while assigning.");
    } finally {
      setLoading(false);
      //   setSelectedComplaint(null);
      //   setIsDialogOpen(false);
      setRemarks("");
      setSelectedStaff("");
    }
  };

  return (
    <div className="px-5! py-4!">
      <p className="text-sm text-[#555555] font-medium mb-2!">
        Assign Complaint
      </p>
      <CustomSearchDropdown
        label="Select Assignee"
        placeholder="Select Assignee"
        value={selectedStaff}
        onChange={(val) => setSelectedStaff(val as string)}
        options={
          staffData?.map((status) => ({
            label: status.fullName,
            value: String(status.userId),
          })) ?? []
        }
      />

      <div className="mt-2!">
        <CustomTextArea
          label="Assignee Remarks"
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center mt-5!">
        <Dialog.Close>
          <div className="border! border-[#E2E8F0]! text-[#606060] rounded-[13px] py-1.5! px-3.5! cursor-pointer min-w-[150px]! text-[15px]! text-center">
            <p> Close</p>
          </div>
        </Dialog.Close>

        <Button
          className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
          disabled={loading}
          onClick={handleAssignComplaint}
        >
          {loading ? "Assigning..." : "Assign"}
        </Button>
      </div>
    </div>
  );
};

export default AssignDetails;
