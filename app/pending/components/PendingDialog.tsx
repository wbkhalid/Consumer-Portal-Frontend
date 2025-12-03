import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { useState } from "react";
import { ManageStaffData } from "../../hooks/useGetAllStaff";
import { Button, Dialog } from "@radix-ui/themes";
import Image from "next/image";
import { formatDate } from "../../utils/utils";
import CustomTextArea from "../../components/CustomTextArea";
import CustomSearchDropdown from "../../components/CustomSearchDropdown";
import { getMediaUrl } from "../../utils/mediaUrl";

interface PendingDialogType {
  selectedComplaint: ManageComplainsData | null;
  setSelectedComplaint: (value: ManageComplainsData | null) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  remarks: string;
  setRemarks: (value: string) => void;
  selectedStaff: string;
  setSelectedStaff: (value: string) => void;
  loading: boolean;
  handleAssignComplaint: () => void;
  staffData: ManageStaffData[];
  setLoading: (value: boolean) => void;
}

const PendingDialog = ({
  selectedComplaint,
  setSelectedComplaint,
  isDialogOpen,
  setIsDialogOpen,
  remarks,
  setRemarks,
  selectedStaff,
  setSelectedStaff,
  loading,
  handleAssignComplaint,
  staffData,
  setLoading,
}: PendingDialogType) => {
  const [dialogStep, setDialogStep] = useState(1);

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setLoading(false);
          setSelectedComplaint(null);
          setDialogStep(1);
          setRemarks("");
          setSelectedStaff("");
        }
      }}
    >
      <Dialog.Content className={`px-0!  lg:max-w-[700px]!`}>
        {dialogStep === 1 && selectedComplaint && (
          <div className="px-4! max-h-[70vh]! overflow-hidden!">
            <div className="flex  gap-2 items-center">
              <div className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-200">
                <Image
                  src={selectedComplaint?.billBoardImage}
                  alt="Shop Banner"
                  fill
                  className="object-fit"
                />
              </div>

              <div className="flex flex-col gap-0">
                <p className="font-bold">{selectedComplaint?.shopName}</p>
                <p className="text-xs">
                  {formatDate(selectedComplaint?.createdAt)}
                </p>
              </div>
            </div>

            <div className=" max-h-[52vh] overflow-scroll!">
              <div className="flex justify-between items-center mt-4!">
                <div className="flex flex-col ">
                  <p className="text-xs text-[#555555]">Phone No</p>
                  <p className="text-sm">{selectedComplaint?.phoneNumber}</p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-xs text-[#555555]">Section Category</p>
                  <p className="text-sm">
                    {selectedComplaint?.sectionCategoryName}
                  </p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-xs text-[#555555]">Section</p>
                  <p className="text-sm">
                    {selectedComplaint?.sectionsDetails
                      ?.map((section) => section?.name)
                      .join(", ")}
                  </p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-xs text-[#555555]">Category</p>
                  <p className="text-sm">{selectedComplaint?.categoryName}</p>
                </div>
              </div>
              <div className="border-b border-gray-200! my-2!" />
              <div className="flex flex-col flex-1">
                <p className="text-xs text-[#555555]">Address</p>
                <p className="text-sm">
                  {"Shop # 21 university Road Rehman PLaza Sargondha"}
                </p>
              </div>

              <div className="border-b border-gray-200! my-2!" />

              <div className="flex flex-col gap-2">
                <p className="text-sm">{selectedComplaint?.remarks}</p>

                <div className="border-b border-gray-200! my-2!" />
                <div className="flex gap-2">
                  {/* ✅ Updated: Audio Section with dynamic URL */}
                  <div className="flex flex-col gap-1! flex-1">
                    <p className="text-xs text-[#555555]">Audio Files</p>
                    {selectedComplaint?.listAudio &&
                    selectedComplaint.listAudio.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {selectedComplaint.listAudio.map((audioUrl, index) => (
                          <audio
                            key={index}
                            controls
                            className="w-full sm:w-60 rounded-md border border-(--primary)"
                          >
                            {/* ✅ Using getMediaUrl instead of hardcoded IP */}
                            <source
                              src={getMediaUrl(audioUrl)}
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        No audio files available.
                      </p>
                    )}
                  </div>

                  {/* ✅ Updated: Images Section with dynamic URL */}
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-xs text-[#555555]">Images</p>
                    {selectedComplaint?.listOfImage &&
                    selectedComplaint.listOfImage.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {selectedComplaint.listOfImage.map((imgUrl, index) => (
                          <div
                            key={index}
                            className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200"
                          >
                            {/* ✅ Using getMediaUrl for list images */}
                            <Image
                              src={getMediaUrl(imgUrl)}
                              alt={`Complaint image ${index + 1}`}
                              fill
                              className="object-fit"
                              unoptimized // Add this if still having issues
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        No images available.
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-b border-gray-200! my-2!" />
                <CustomSearchDropdown
                  label="Select Assignee"
                  placeholder="Select Assignee"
                  value={selectedStaff}
                  onChange={(val) => setSelectedStaff(val)}
                  options={
                    staffData?.map((status) => ({
                      label: status?.roles[0],
                      value: status?.userId,
                    })) ?? []
                  }
                />
                <CustomTextArea
                  label="Remarks"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2! mb-2!">
              <Button
                variant="outline"
                className="text-(--primary)! outline! outline-(--primary)! shadow-none! cursor-pointer! hover:text-white! hover:bg-(--primary)! text-[12px]!"
                style={{ outlineWidth: "1px" }}
                onClick={() => {
                  setSelectedComplaint(null);
                  setDialogStep(1);
                  setIsDialogOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                className="cursor-pointer! hover:opacity-85! text-white!"
                disabled={loading}
                onClick={handleAssignComplaint}
              >
                {loading ? "Assigning..." : "Assign Complaint"}
              </Button>
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PendingDialog;
