import { useRef, useState } from "react";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import CustomTextArea from "../CustomTextArea";
import CustomTextField from "../CustomTextField";
import { toast } from "react-toastify";
import {
  canEditable,
  decionsVideos,
  DecisionPhotos,
  uploadFile,
  uploadMultipleFiles,
} from "../../utils/utils";
import { Button, Dialog } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";
import apiClient from "../../services/api-client";
import { COMPLAINT_API } from "../../APIs";
import useGetMeetingVideos from "../../hooks/useGetMeetingVideos";

const submitStatusdata = [
  { value: 4, label: "Decided on Merit" },
  { value: 5, label: "Ex-Parte" },
  { value: 7, label: "Non-Prosecution" },
];

const InterimDetails = ({
  complaint,
  setMediaModal,
  //   onSuccess,
  //   onClose,
}: {
  complaint: ManageComplainsData | null;
  setMediaModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: "image" | "video" | null;
      url: string | null;
    }>
  >;
  //   onSuccess: () => void;
  //   onClose: () => void;
}) => {
  const loginUser = canEditable();
  const { data: meetingVideos } = useGetMeetingVideos({ id: complaint?.id });
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [submittionRemarks, setSubmittionRemarks] = useState("");
  const [fineAmount, setFineAmount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const userId = Cookies.get("userId");

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Optional: Check size for each file
    const tooLarge = Array.from(files).some(
      (file) => file.size > 5 * 1024 * 1024,
    );
    if (tooLarge) {
      toast.warning("All images must be less than 5MB.");
      return;
    }

    // Append new previews to existing previews
    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    try {
      const uploadedFiles = await uploadMultipleFiles(e, "refdocument");
      const urls = uploadedFiles?.map((file: any) => file.fileUrl);
      // Append new uploaded URLs to existing URLs
      setImageUrls((prev) => [...prev, ...urls]);
      console.log("Uploaded URLs:", urls);
    } catch (error) {
      toast.error("Error uploading files.");
      console.error("Upload error:", error);
    }
  };

  const removeImageAt = (index: number) => {
    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1);
    setImageUrls(updatedUrls);

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleHearingComplaint = async () => {
    if (!complaint) return;

    if (!selectedStatus) {
      toast.warning("Please select a status before submitting.");
      return;
    }
    if (!submittionRemarks.trim()) {
      toast.warning("Please enter remarks for the resolved complaint.");
      return;
    }
    if (!imageUrl) {
      toast.warning("Please Uplaod document");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        complaintId: complaint?.id,
        previousStaus: complaint?.status ?? 1,
        status: selectedStatus,
        updatedBy: userId,
        assignedTo: complaint?.assignedTo,
        hearingDate: complaint?.hearingDate,
        verdict: 0,
        fineAmount: fineAmount,
        assigneeRemarks: complaint?.assigneeRemarks,
        closingRemarks: submittionRemarks,
        isClosed: true,
        complaintDecisionFiles: [
          {
            filePath: imageUrl,
            fileType: 0,
          },
          {
            filePath: videoUrl,
            fileType: 1,
          },
        ],
      };

      console.log("📤 Sending payload:", payload);

      const response = await apiClient.post(
        COMPLAINT_API + "/update-status",
        payload,
      );

      if (response.status === 200) {
        toast.success("Complaint Status successfully.");

        // onSuccess();
        // onClose();
      }
    } catch (error) {
      console.error("Error Hearing Date:", error);
      toast.error("Something went wrong while assign Date.");
    } finally {
      setLoading(false);
      // setSelectedComplaint(null);
      // setHearingDate(null);
      // setOpenDialog(false);
      setImageUrl("");
      setVideoUrl("");
      setSelectedStatus(null);
      setSubmittionRemarks("");
      setFineAmount(0);
    }
  };
  return (
    <div className="px-5! py-4!">
      {/* <p className="text-sm text-[#555555] font-medium mb-2.5!">
        Hearing Details(Interim)
      </p> */}
      <div></div>
      <CustomTextArea
        label="Appellate Hearing"
        placeholder="Remarks"
        value={submittionRemarks}
        onChange={(e) => setSubmittionRemarks(e.target.value)}
      />

      <p className="block my-1! text-[#2A2A2B] font-semibold text-xs mt-2!">
        Evidence (CNIC etc.)
      </p>
      <div
        className="flex justify-center flex-wrap gap-3 bg-[#F9FAFB] border border-[#E5E7EB] p-5! rounded-md cursor-pointer mt-1!"
        onClick={() => imageInputRef.current?.click()}
      >
        {imagePreviews.length === 0 ? (
          <div className="flex flex-col items-center">
            <img
              src="/images/complaint-album-gray.png"
              alt="complaint-album-gray"
              className="w-6 h-6"
            />
            <p className="font-semibold text-[#4A5565] text-sm mb-1">
              Upload Interim Documents
            </p>
            <p className="text-xs text-[#545861] font-medium">
              JPG, PNG (Max: 5MB each)
            </p>
          </div>
        ) : (
          imagePreviews.map((preview, i) => (
            <div key={i} className="relative w-16 h-16">
              <img
                src={preview}
                alt={`Uploaded ${i}`}
                className="w-full h-full object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImageAt(i);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
              >
                <RxCross2 size={12} />
              </button>
            </div>
          ))
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          ref={imageInputRef}
          onChange={handleImageChange}
        />
      </div>

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

      {loginUser === complaint?.assignedTo && (
        <div className="flex justify-end items-center my-3!">
          {/* <div className="text-center border! border-[#E2E8F0]! text-[#606060] rounded-[13px] py-1.5! px-3.5! cursor-pointer min-w-[150px]! text-[15px]!">
            <p> Close</p>
          </div> */}

          <Button
            className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
            disabled={loading}
            onClick={handleHearingComplaint}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default InterimDetails;
