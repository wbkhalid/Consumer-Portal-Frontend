import { Button, Dialog } from "@radix-ui/themes";
import CustomSearchDropdown from "../CustomSearchDropdown";
import useGetAllSections from "../../hooks/useGetAllSections";
import { useState } from "react";
import apiClient from "../../services/api-client";
import { COMPLAINT_API } from "../../APIs";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
  complaintId: number;
}

const EditSessionDialog = ({ open, onClose, complaintId }: Props) => {
  const { data: sectionData = [] } = useGetAllSections();
  const [selectedSection, setSelectedSection] = useState<string>("");

  const updateSection = async () => {
    if (!selectedSection) {
      toast.error("Please select a section");
      return;
    }

    const payload = {
      complaintId,
      sectionIds: [Number(selectedSection)],
    };

    try {
      await apiClient.post(`${COMPLAINT_API}/update-sections`, payload);
      toast.success("Section updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update section");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Content>
        <p className="text-[#1D1C1D] font-bold mb-2!">
          Update Complaint Section
        </p>

        <CustomSearchDropdown
          label="Update Complaint Section"
          value={selectedSection}
          onChange={(val) => setSelectedSection(String(val))}
          isMultiple
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
            onClick={updateSection}
            className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]! flex-1!"
          >
            Update Section
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditSessionDialog;
