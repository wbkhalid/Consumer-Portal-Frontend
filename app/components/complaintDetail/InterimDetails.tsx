import { useRef, useState } from "react";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import CustomTextArea from "../CustomTextArea";
import { toast } from "react-toastify";
import {
  canEditable,
  formatDate,
  getRole,
  toLocal,
  uploadMultipleFiles,
} from "../../utils/utils";
import { Button } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";
import apiClient from "../../services/api-client";
import { COMPLAINT_API } from "../../APIs";
import useGetMeetingVideos from "../../hooks/useGetMeetingVideos";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";

const InterimDetails = ({
  complaint,
  setMediaModal,
  onSuccess,
  fromAppeal = false,
}: {
  complaint: ManageComplainsData | null;
  setMediaModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: "image" | "video" | null;
      url: string | null;
    }>
  >;
  onSuccess: () => void;
  fromAppeal: boolean;
}) => {
  const loginUser = canEditable();
  const role = getRole();

  const isDGorSecretary = role === "DG" || role === "SECRETARY";

  const canShowResolveButton = fromAppeal
    ? isDGorSecretary
    : loginUser === complaint?.assignedTo;
  const { data: meetingVideos } = useGetMeetingVideos({ id: complaint?.id });
  const [interimRemarks, setInterimRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const tooLarge = Array.from(files).some(
      (file) => file.size > 5 * 1024 * 1024,
    );
    if (tooLarge) {
      toast.warning("All images must be less than 5MB.");
      return;
    }

    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    try {
      const uploadedFiles = await uploadMultipleFiles(e, "refdocument");
      const urls = uploadedFiles?.map((file: any) => file.fileUrl);
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

    try {
      setLoading(true);

      const payload = {
        complaintId: complaint?.id,
        interimRemarks: interimRemarks,
        createdBy: loginUser,
        createdAt: new Date().toISOString(),
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

        onSuccess();
      }
    } catch (error) {
      console.error("Error Hearing Date:", error);
      toast.error("Something went wrong while assign Date.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-5! py-4! ">
      <CustomTextArea
        label="Order Sheet"
        placeholder="Type..."
        value={interimRemarks}
        onChange={(e) => setInterimRemarks(e.target.value)}
      />

      <p className="my-1! text-[#2A2A2B] font-semibold text-xs mt-2!">
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
            <p className="font-semibold text-[#4A5565] text-sm mb-1">Upload</p>
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

      {canShowResolveButton && (
        <div className="flex justify-end items-center my-3!">
          <Button
            className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
            disabled={loading}
            onClick={handleInterimComplaint}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      )}
      {((complaint?.interimDetails?.length ?? 0) > 0 ||
        (meetingVideos?.length ?? 0) > 0) && (
        <div
          onClick={() => setIsAccordionOpen((p) => !p)}
          className="mt-5! flex justify-between items-center border border-[rgba(29,28,29,0.13)]  rounded-xl px-4! py-3! cursor-pointer bg-[#F9FAFB]"
        >
          <p className="text-sm font-semibold">Previous Record</p>
          <span className={`text-xs ${isAccordionOpen ? "rotate-180" : ""}`}>
            <HugeiconsIcon icon={ArrowDown01Icon} />
          </span>
        </div>
      )}

      <div
        className={`
    overflow-hidden transition-all duration-300 ease-in-out
    ${isAccordionOpen ? "max-h-fit opacity-100 mt-3!" : "max-h-0 opacity-0"}
  `}
      >
        <div className="space-y-4">
          {complaint?.interimDetails
            ?.slice()
            ?.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
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

          <div>
            <p className="text-sm font-medium mb-2!">Meeting Recordings</p>

            {meetingVideos?.length ? (
              <div className="flex flex-wrap gap-2">
                {meetingVideos.map((v, i) => (
                  <div key={i} className="mb-5!">
                    <div
                      className="w-[90px] h-[90px] border border-[rgba(29,28,29,0.13)] rounded-xl overflow-hidden cursor-pointer"
                      onClick={() =>
                        setMediaModal({
                          open: true,
                          type: "video",
                          url: v.videoRecordingLink,
                        })
                      }
                    >
                      <video
                        src={v.videoRecordingLink}
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div></div>
                    <p className="text-xs text-center mt-1!">
                      {formatDate(v.createdAt)}
                    </p>
                    <p className="text-xs text-center text-gray-500">
                      {new Date(v?.createdAt).toLocaleTimeString("en-PK", {
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
                No meeting recordings
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterimDetails;
