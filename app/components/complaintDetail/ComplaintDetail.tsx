import { format } from "date-fns";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import {
  formatDate,
  getUniqueSectionNumbers,
  toLocal,
} from "../../utils/utils";
import { useState } from "react";
import EditSessionDialog from "./EditSessionDialog";
import { Button, Dialog } from "@radix-ui/themes";
import CustomSearchDropdown from "../CustomSearchDropdown";
import useGetAllSections from "../../hooks/useGetAllSections";
import { toast } from "react-toastify";
import { COMPLAINT_API } from "../../APIs";
import apiClient from "../../services/api-client";
import { Edit04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const ComplaintDetail = ({
  complaint,
  onSuccess,
}: {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
  onSuccess: () => void;
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { data: sectionData = [] } = useGetAllSections();
  const [selectedSections, setSelectedSections] = useState<number[]>(
    complaint?.sectionsDetails?.map((s) => s?.id) || [],
  );

  const updateSections = async () => {
    if (!selectedSections.length) {
      toast.error("Please select at least one section");
      return;
    }

    const payload = {
      complaintId: complaint?.id,
      sectionIds: selectedSections,
    };

    try {
      await apiClient.post(`${COMPLAINT_API}/update-sections`, payload);
      toast.success("Sections updated successfully");
      onSuccess();
      setOpenEditDialog(false);
    } catch (err) {
      toast.error("Failed to update sections");
    }
  };

  return (
    <>
      <div className="px-5!">
        <div className="flex justify-between items-center py-2!">
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Complainant Name</p>
            <p className="text-[15px]">
              {complaint?.complainantDetails?.fullName}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Complainant Phone #</p>
            <p className="text-[15px]">
              {complaint?.complainantDetails?.phoneNumber}
            </p>
          </div>
          <div className="flex flex-col gap-0.5 ">
            <p className="text-[#555555] text-sm">Complainant Address</p>
            <p className="text-sm">
              {complaint?.complainantDetails?.address || "-"}
            </p>
          </div>
        </div>

        <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full" />

        <div className="flex justify-between items-center py-2!">
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Nature of Complaint</p>
            <p className="text-[15px]">{complaint?.sectionCategoryName}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Applicable Legal Sections</p>
            <p className="text-[15px]">
              {getUniqueSectionNumbers(complaint?.sectionsDetails)}
            </p>
          </div>
          {/* <div className="flex flex-col gap-0.5 ">
          <p className="text-[#555555] text-sm">Category</p>
          <p className="text-sm">{complaint?.categoryName || "-"}</p>
        </div> */}
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Date of Complaint</p>
            <p className="text-sm">{formatDate(complaint?.createdAt)}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Time of Complaint</p>
            <p className="text-sm">
              {complaint?.createdAt &&
                format(toLocal(complaint?.createdAt), "hh:mm a")}
            </p>
          </div>
        </div>
        <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full" />
        <div className="flex gap-5  py-2!">
          <div className="flex flex-col gap-0.5 flex-1">
            <div className="flex justify-between">
              <p className="text-[#555555] text-sm">Section Description</p>
              <HugeiconsIcon
                icon={Edit04Icon}
                size={14}
                className="text-(--primary) cursor-pointer"
                onClick={() => setOpenEditDialog(true)}
              />
              {/* <p
                className="text-(--primary)! text-sm font-medium cursor-pointer
            hover:underline transition"
                onClick={() => setOpenEditDialog(true)}
              >
                Edit
              </p> */}
            </div>
            <p className="text-sm">
              {complaint?.sectionsDetails?.map((s) => s?.description).join(",")}
            </p>
          </div>
        </div>

        <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full" />
        <div className="py-2!">
          <p className="text-[#555555] text-sm">User Remarks</p>
          <p className="text-sm">{complaint?.remarks || "-"}</p>
        </div>
        {/* {complaint?.assigneeRemarks && (
        <div className="py-2!">
          <p className="text-[#555555] text-sm">Assignee Remarks</p>
          <p className="text-sm">{complaint?.assigneeRemarks}</p>
        </div>
      )} */}
      </div>

      <Dialog.Root open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <Dialog.Content className="max-w-[400px]! p-3!">
          <p className="text-[#1D1C1D] font-bold mb-2!">
            Update Complaint Section
          </p>

          <CustomSearchDropdown
            label="Update Complaint Section"
            isMultiple
            value={selectedSections.map(String)}
            onChange={(val) =>
              setSelectedSections((val as string[]).map(Number))
            }
            options={sectionData.map((sec) => ({
              label: sec.description,
              value: String(sec.id),
            }))}
          />

          <div className="flex justify-between items-center mt-5! gap-2">
            <Dialog.Close>
              <div className="border! border-[#E2E8F0]! text-[#606060] rounded-[13px] py-1.5! px-3.5! cursor-pointer min-w-[150px]! text-[15px]! text-center flex-1">
                Close
              </div>
            </Dialog.Close>

            <Button
              onClick={updateSections}
              className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]! flex-1!"
            >
              Update Section
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      {/* <EditSessionDialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
        }}
        complaintId={complaint?.id ?? 0}
      /> */}
    </>
  );
};

export default ComplaintDetail;
