import { useRef, useState } from "react";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import CustomTextArea from "../CustomTextArea";
import CustomTextField from "../CustomTextField";
import { toast } from "react-toastify";
import {
  canEditable,
  decionsVideos,
  DecisionPhotos,
  formatDate,
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
  const [interimRemarks, setInterimRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

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

  const handleInterimComplaint = async () => {
    if (!complaint) return;

    if (!interimRemarks.trim()) {
      toast.warning("Please enter remarks for the  complaint.");
      return;
    }
    if (imageUrls?.length === 0) {
      toast.warning("Please Uplaod document");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        complaintId: complaint?.id,
        interimRemarks: interimRemarks,
        createdBy: loginUser,
        interimOrderFilesPath: imageUrls?.map((url) => ({
          filePath: url,
          fileType: 0,
        })),
      };

      console.log("Sending payload:", payload);

      const response = await apiClient.post(
        COMPLAINT_API + "/add-interim-details",
        payload,
      );

      console.log(response, "response");

      if (response.status === 200) {
        toast.success(
          response?.data?.message || "Interim details added successfully.",
        );

        // onSuccess();
        // onClose();
      }
    } catch (error) {
      console.error("Error Hearing Date:", error);
      toast.error("Something went wrong while assign Date.");
    } finally {
      setLoading(false);
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
        value={interimRemarks}
        onChange={(e) => setInterimRemarks(e.target.value)}
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
        <p className="text-sm font-medium text-[#555555]">
          Previous Interim Details
        </p>
        <div>
          {complaint?.interimDetails?.map((interim, i) => (
            <div>
              <p>
                <span>Interim Remarks:</span>
                {interim?.interimRemarks}
              </p>
              <div className="flex flex-wrap gap-2">
                {interim?.interimOrderFilesPath?.map((imgDetail) => (
                  <div
                    key={i}
                    className="w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
                    onClick={() =>
                      setMediaModal({
                        open: true,
                        type: "image",
                        url: imgDetail?.filePath,
                      })
                    }
                  >
                    <img
                      src={imgDetail?.filePath}
                      alt={`file-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#555555]">Meeting Videos</p>

        <div>
          {meetingVideos && meetingVideos?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {meetingVideos &&
                meetingVideos?.length > 0 &&
                meetingVideos?.map((file, i) => (
                  <div>
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
                    <p className="text-xs">
                      {formatDate(file?.createdAt)}{" "}
                      <span>
                        {" "}
                        {new Date(file?.createdAt).toLocaleTimeString("en-Pk", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>{" "}
                    </p>
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
            onClick={handleInterimComplaint}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default InterimDetails;
