import { useRef, useState } from "react";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import CustomTextArea from "../CustomTextArea";
import CustomTextField from "../CustomTextField";
import { toast } from "react-toastify";
import { decionsVideos, DecisionPhotos, uploadFile } from "../../utils/utils";
import { Button, Dialog } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";
import apiClient from "../../services/api-client";
import { COMPLAINT_API } from "../../APIs";

const submitStatusdata = [
  { value: 4, label: "Decided on Merit" },
  { value: 5, label: "Ex-Parte" },
  { value: 7, label: "Non-Prosecution" },
];

const ComplaintResolution = ({
  complaint,
  onSuccess,
  onClose,
}: {
  complaint: ManageComplainsData | null;
  onSuccess: () => void;
  onClose: () => void;
}) => {
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected Image:", file);

    if (!file) return;

    // 5MB = 5 * 1024 * 1024
    if (file.size > 5 * 1024 * 1024) {
      toast.warning("Image size must be less than 5MB.");
      return;
    }

    setImagePreview(URL.createObjectURL(file));

    try {
      const fileName = await uploadFile(e, DecisionPhotos);
      setImageUrl(fileName?.data?.fileUrl);
      console.log(fileName?.data?.fileUrl, "file");
    } catch (error) {
      toast.error("Error uploading file.");
      console.error("Upload error:", error);
    }
  };

  const removeImage = () => {
    setImageUrl("");
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";

    video.preload = "metadata";
    video.onloadedmetadata = async () => {
      URL.revokeObjectURL(url);

      const duration = video.duration;
      if (duration > 15 * 60) {
        toast.warning("Video must be less than 15 minutes.");
        return;
      }
      video.src = url;
    };

    setVideoPreview(url);

    try {
      const fileName = await uploadFile(e, decionsVideos);
      setVideoUrl(fileName?.data?.fileUrl);
      console.log(fileName?.data?.fileUrl, "file");
    } catch (error) {
      toast.error("Error uploading file.");
      console.error("Upload error:", error);
    }
  };

  const removeVideo = () => {
    setVideoUrl("");
    setVideoPreview(null);

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
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
        payload
      );

      if (response.status === 200) {
        toast.success("Complaint Status successfully.");

        onSuccess();
        onClose();
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
      <p className="text-sm text-[#555555] font-medium mb-2.5!">
        Submit Final Resolution
      </p>
      <div></div>
      <CustomTextArea
        label="Final Decision & Ruling"
        placeholder="Remarks"
        value={submittionRemarks}
        onChange={(e) => setSubmittionRemarks(e.target.value)}
      />
      <p className="block mb-1! mt-2! text-[#2A2A2B] font-semibold text-xs">
        Resolution Status
      </p>
      <div className="flex gap-3 mb-2!">
        {submitStatusdata?.map((status) => (
          <div
            className={`flex-1 ${
              selectedStatus === status?.value
                ? "bg-[#cce8cc] border border-[#028B02] text-[#028B02]"
                : "bg-[#F9FAFB] border border-[#E5E7EB]"
            }  rounded-[5px] p-2.5! text-center cursor-pointer`}
            key={status?.value}
            onClick={() => setSelectedStatus(status?.value)}
          >
            <p className="text-sm">{status?.label}</p>
          </div>
        ))}
      </div>
      <CustomTextField
        label="Fine"
        placeholder="Fine"
        value={fineAmount}
        onChange={(e) => setFineAmount(Number(e.target.value))}
      />
      <p className="block my-1! text-[#2A2A2B] font-semibold text-xs mt-2!">
        Resolution Evidence
      </p>
      <div
        className="flex justify-center items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] p-5! rounded-md cursor-pointer mt-1! relative"
        onClick={() => !imagePreview && imageInputRef.current?.click()}
      >
        {!imagePreview ? (
          <div className="flex flex-col items-center">
            <img
              src="/images/complaint-album-gray.png"
              alt="complaint-album-gray"
              className="w-6 h-6"
            />
            <p className="font-semibold text-[#4A5565] text-sm mb-1!">
              Upload Case Decision Document
            </p>
            <p className="text-xs text-[#545861] font-medium">
              JPG, PNG (Max: 5MB)
            </p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Uploaded"
              className="w-16 h-16 object-contain"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -top-2 -right-6 bg-red-500 text-white rounded-full p-0.5! cursor-pointer! hover:bg-red-600"
            >
              <RxCross2 size={12} />
            </button>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={imageInputRef}
          onChange={handleImageChange}
        />
      </div>

      <div
        className="flex justify-center items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] p-4! rounded-md cursor-pointer mt-2! relative"
        onClick={() => !videoPreview && videoInputRef.current?.click()}
      >
        {!videoPreview ? (
          <div className="flex flex-col items-center">
            <img
              src="/images/complaint-video-gray.png"
              alt="complaint-video-gray"
              className="w-6 h-6"
            />
            <p className="font-semibold text-[#4A5565] text-sm mb-1!">
              Upload Court Session Video
            </p>
            <p className="text-xs text-[#545861] font-medium">
              MP4, MOV (Max: 15 min)
            </p>
          </div>
        ) : (
          <div className="relative">
            <video
              src={videoPreview}
              controls
              className="w-16 h-16 object-contain"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeVideo();
              }}
              className="absolute -top-2 -right-6 bg-red-500 text-white rounded-full p-0.5! cursor-pointer  hover:bg-red-600"
            >
              <RxCross2 size={12} />
            </button>
          </div>
        )}

        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={videoInputRef}
          onChange={handleVideoChange}
        />
      </div>

      <div className="flex justify-between items-center my-3!">
        <Dialog.Close>
          <div className="text-center border! border-[#E2E8F0]! text-[#606060] rounded-[13px] py-1.5! px-3.5! cursor-pointer min-w-[150px]! text-[15px]!">
            <p> Close</p>
          </div>
        </Dialog.Close>

        <Button
          className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
          disabled={loading}
          onClick={handleHearingComplaint}
        >
          {loading ? "Resolving..." : "Set Resolved Status"}
        </Button>
      </div>
    </div>
  );
};

export default ComplaintResolution;
