import { Button, Dialog } from "@radix-ui/themes";

import { BsArrowUpRightSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaRegPenToSquare } from "react-icons/fa6";
import Image from "next/image";
import {
  decionsVideos,
  DecisionPhotos,
  formatDate,
  uploadFile,
} from "../../utils/utils";
import apiClient from "../../services/api-client";
import { COMPLAINT_API } from "../../APIs";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";

import { MdOutlineFileDownload, MdUploadFile } from "react-icons/md";
import { generateComplaintPDF } from "../../utils/generateComplainPdf";
import Cookies from "js-cookie";
import CustomSearchDropdown, {
  Option,
} from "../../components/CustomSearchDropdown";
import CustomTextField from "../../components/CustomTextField";
import CustomTextArea from "../../components/CustomTextArea";
import FullScreenMediaModal from "../../complains/components/FullScreenMediaModal";

interface ProceedingDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  selectedComplaint: ManageComplainsData | null;
  setSelectedComplaint: (value: ManageComplainsData | null) => void;
  dialogStep: 1 | 2;
  setDialogStep: (step: 1 | 2) => void;
  hearingDate: Date | null;
  setHearingDate: (date: Date | null) => void;
  isResolved: boolean;
  setIsResolved: (v: boolean) => void;
  selectedStatus: number | null;
  setSelectedStatus: (v: number | null) => void;
  submittionRemarks: string;
  setSubmittionRemarks: (v: string) => void;
  imageUrl: string;
  setImageUrl: (v: string) => void;
  videoUrl: string;
  setVideoUrl: (v: string) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  handleHearingComplaint: () => void;
  setFineAmount: (v: number) => void;
  fineAmount: number;
}

const ProceedingDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedComplaint,
  setSelectedComplaint,
  dialogStep,
  setDialogStep,
  hearingDate,
  setHearingDate,
  isResolved,
  setIsResolved,
  selectedStatus,
  setSelectedStatus,
  submittionRemarks,
  setSubmittionRemarks,
  imageUrl,
  setImageUrl,
  videoUrl,
  setVideoUrl,
  loading,
  setLoading,
  handleHearingComplaint,
  setFineAmount,
  fineAmount,
}: ProceedingDialogProps) => {
  const router = useRouter();

  const [mediaModal, setMediaModal] = useState<{
    open: boolean;
    type: "image" | "video" | null;
    url: string | null;
  }>({ open: false, type: null, url: null });
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const images = selectedComplaint?.listOfImage?.filter((url) =>
    url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );

  const videos = selectedComplaint?.listOfImage?.filter((url) =>
    url.match(/\.(mp4|mov|avi|mkv)$/i)
  );

  const submitStatusdata: Option[] = [
    { value: "4", label: "Decided on Merit" },
    { value: "5", label: "Ex-Parte" },
    { value: "7", label: "Non-Prosecution" },
  ];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected Image:", file);

    if (!file) return;

    // 5MB = 5 * 1024 * 1024
    if (file.size > 5 * 1024 * 1024) {
      toast.warning("Image size must be less than 5MB.");
      return;
    }

    try {
      const fileName = await uploadFile(e, DecisionPhotos);
      setImageUrl(fileName?.data?.fileUrl);
      console.log(fileName?.data?.fileUrl, "file");
    } catch (error) {
      toast.error("Error uploading file.");
      console.error("Upload error:", error);
    }
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const video = document.createElement("video");

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

    try {
      const fileName = await uploadFile(e, decionsVideos);
      setVideoUrl(fileName?.data?.fileUrl);
      console.log(fileName?.data?.fileUrl, "file");
    } catch (error) {
      toast.error("Error uploading file.");
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <Dialog.Root
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedComplaint(null);
            setHearingDate(null);
            setDialogStep(1);
            setIsResolved(false);
            setImageUrl("");
            setVideoUrl("");
            setSelectedStatus(null);
            setSubmittionRemarks("");
            setFineAmount(0);
            setIsDialogOpen(false);
          }
        }}
      >
        <Dialog.Content
          className={`px-0!  lg:max-w-[700px]!
        `}
        >
          {dialogStep === 1 && selectedComplaint && (
            <div className="px-4! max-h-[70vh]! overflow-hidden!">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  {/* <div className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-200">
                  <Image
                    src={selectedComplaint?.billBoardImage}
                    alt={`Complaint image`}
                    fill
                    className="object-fit"
                  />
                </div> */}

                  <div
                    className=" w-10 h-10 rounded-md overflow-hidden border border-gray-200"
                    onClick={() =>
                      setMediaModal({
                        open: true,
                        type: "image",
                        url: selectedComplaint?.billBoardImage,
                      })
                    }
                  >
                    <img
                      src={selectedComplaint?.billBoardImage}
                      alt="Shop Banner"
                      className="object-fit h-full w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-0">
                    <p className="font-bold text-lg">
                      {selectedComplaint?.shopName}
                    </p>
                    <p className="text-sm">
                      {formatDate(selectedComplaint?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={() => router.push("/meeting")}
                    className="flex gap-1 border border-[#E2E8F0] p-2! rounded-md  text-[#606060] cursor-pointer!"
                  >
                    <div className="bg-(--primary) w-4 h-4 rounded-md flex justify-center items-center">
                      <Image
                        src="/meet/video.png"
                        alt="video"
                        width={10}
                        height={5}
                      />
                    </div>
                    <p className="text-xs">Create Meeting</p>
                  </div>
                  <div className="w-fit">
                    <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-md p-2! cursor-pointer! hover:border-(--primary) transition">
                      <input
                        type="datetime-local"
                        aria-label="Hearing date"
                        className="outline-none bg-transparent text-[#606060] w-full cursor-pointer text-xs"
                        value={
                          hearingDate
                            ? format(hearingDate, "yyyy-MM-dd'T'HH:mm")
                            : ""
                        }
                        min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                        onChange={(e) =>
                          setHearingDate(parseISO(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" max-h-[55vh] overflow-scroll!">
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
                <div className=" flex justify-between items-center gap-3">
                  <div className="flex flex-col">
                    <p className="text-xs text-[#555555]">Address</p>
                    <p className="text-sm">{selectedComplaint?.address}</p>
                  </div>
                </div>
                <div className="border-b border-gray-200! my-2!" />

                <div className="flex flex-col gap-2">
                  <p className="text-sm">{selectedComplaint?.remarks}</p>

                  <div className="border-b border-gray-200! my-2!" />
                  <div className="flex gap-2">
                    {/* Audio Section */}
                    <div className="flex flex-col gap-1! flex-1">
                      <p className="text-xs text-[#555555]">Audio Files</p>
                      {selectedComplaint?.listAudio &&
                      selectedComplaint.listAudio.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {selectedComplaint.listAudio.map(
                            (audioUrl, index) => (
                              <audio
                                key={index}
                                controls
                                className="w-full sm:w-60 rounded-md border border-(--primary)"
                              >
                                <source
                                  src={`http://103.226.216.18:151${audioUrl}`}
                                  type="audio/mpeg"
                                />
                                Your browser does not support the audio element.
                              </audio>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No audio files available.
                        </p>
                      )}
                    </div>

                    {/* Images Section */}
                    <div className="flex-1">
                      <p className="text-xs text-[#555555] mb-1!">Media</p>
                      {selectedComplaint.listOfImage?.length ? (
                        <div className="flex gap-1">
                          {/* Images */}
                          {images?.map((imgUrl, i) => (
                            <div
                              key={i}
                              className="w-16 h-16 rounded-sm overflow-hidden border border-[#e2e8f0]"
                              onClick={() =>
                                setMediaModal({
                                  open: true,
                                  type: "image",
                                  url: imgUrl,
                                })
                              }
                            >
                              <img
                                src={imgUrl}
                                alt={imgUrl}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}

                          {videos?.map((videoUrl, i) => (
                            <div
                              key={i}
                              className="relative w-16 h-16 rounded-sm overflow-hidden border border-[#e2e8f0]"
                              onClick={() =>
                                setMediaModal({
                                  open: true,
                                  type: "video",
                                  url: videoUrl,
                                })
                              }
                            >
                              <video
                                key={`vid-${i}`}
                                src={videoUrl}
                                className=" object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No media available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2! mb-2!">
                <Button
                  variant="outline"
                  className="text-(--primary)! outline! outline-(--primary)! shadow-none! cursor-pointer! hover:text-white! hover:bg-(--primary)! text-[12px]!"
                  style={{ outlineWidth: "1px" }}
                  onClick={() => {
                    setSelectedComplaint(null);
                    setHearingDate(null);
                    setDialogStep(1);
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className="bg-(--primary)! cursor-pointer! hover:opacity-85! text-white!"
                  disabled={loading}
                  onClick={handleHearingComplaint}
                >
                  {loading ? "Hearing..." : "Set Hearing Date"}
                </Button>
              </div>
            </div>
          )}

          {dialogStep === 2 && selectedComplaint && (
            <div className="px-4! max-h-[70vh]! overflow-hidden!">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  {/* <div className="relative w-10 h-10 rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={selectedComplaint?.billBoardImage}
                      alt={`Complaint image`}
                      fill
                      className="object-fit"
                    />
                  </div> */}
                  <div
                    className=" w-10 h-10 rounded-md overflow-hidden border border-gray-200"
                    onClick={() =>
                      setMediaModal({
                        open: true,
                        type: "image",
                        url: selectedComplaint?.billBoardImage,
                      })
                    }
                  >
                    <img
                      src={selectedComplaint?.billBoardImage}
                      alt="Shop Banner"
                      className="object-fit h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="font-bold text-lg">
                      {selectedComplaint?.shopName}
                    </p>
                    <p className="text-sm">
                      {formatDate(selectedComplaint?.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => router.push("/meeting")}
                    className="flex gap-1 border border-[#E2E8F0] p-2! rounded-md  text-[#606060] cursor-pointer!"
                  >
                    <div className="bg-(--primary) w-4 h-4 rounded-md flex justify-center items-center">
                      <Image
                        src="/meet/video.png"
                        alt="video"
                        width={10}
                        height={5}
                      />
                    </div>
                    <p className="text-xs">Create Meeting</p>
                  </div>

                  <div className="w-fit">
                    <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-md p-2! ">
                      <input
                        type="datetime-local"
                        aria-label="Hearing date"
                        disabled
                        className="outline-none bg-transparent text-[#606060] w-full text-xs"
                        value={
                          selectedComplaint.hearingDate
                            ? format(
                                new Date(selectedComplaint.hearingDate),
                                "yyyy-MM-dd'T'HH:mm"
                              )
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" max-h-[50vh] overflow-scroll!">
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
                <div className=" flex justify-between items-center gap-3">
                  <div className="flex flex-col flex-1">
                    <p className="text-xs text-[#555555]">Address</p>
                    <p className="text-sm">{selectedComplaint?.address}</p>
                  </div>
                </div>
                <div className="border-b border-gray-200! my-2!" />

                <div className="flex flex-col gap-2">
                  <p className="text-sm">{selectedComplaint?.remarks}</p>

                  <div className="border-b border-gray-200! my-2!" />
                  <div className="flex gap-2">
                    {/* Audio Section */}
                    <div className="flex flex-col gap-1! flex-1">
                      <p className="text-xs text-[#555555]">Audio Files</p>
                      {selectedComplaint?.listAudio &&
                      selectedComplaint.listAudio.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {selectedComplaint.listAudio.map(
                            (audioUrl, index) => (
                              <audio
                                key={index}
                                controls
                                className="w-full sm:w-60 rounded-md border border-(--primary)"
                              >
                                <source
                                  src={`http://103.226.216.18:151${audioUrl}`}
                                  type="audio/mpeg"
                                />
                                Your browser does not support the audio element.
                              </audio>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No audio files available.
                        </p>
                      )}
                    </div>

                    {/* Images Section */}
                    {/* <div className="flex flex-col gap-1 flex-1">
                      <p className="text-xs text-[#555555]">Images</p>
                      {selectedComplaint?.listOfImage &&
                      selectedComplaint.listOfImage.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {selectedComplaint.listOfImage.map(
                            (imgUrl, index) => (
                              <div
                                key={index}
                                className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200"
                              >
                                <Image
                                  src={imgUrl}
                                  alt={`Complaint image ${index + 1}`}
                                  fill
                                  className="object-fit"
                                />
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No images available.
                        </p>
                      )}
                    </div> */}

                    <div className="flex-1">
                      <p className="text-xs text-[#555555] mb-1!">Media</p>
                      {selectedComplaint.listOfImage?.length ? (
                        <div className="flex gap-1">
                          {/* Images */}
                          {images?.map((imgUrl, i) => (
                            <div
                              key={i}
                              className="w-16 h-16 rounded-sm overflow-hidden border border-[#e2e8f0]"
                              onClick={() =>
                                setMediaModal({
                                  open: true,
                                  type: "image",
                                  url: imgUrl,
                                })
                              }
                            >
                              <img
                                src={imgUrl}
                                alt={imgUrl}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}

                          {videos?.map((videoUrl, i) => (
                            <div
                              key={i}
                              className="relative w-16 h-16 rounded-sm overflow-hidden border border-[#e2e8f0]"
                              onClick={() =>
                                setMediaModal({
                                  open: true,
                                  type: "video",
                                  url: videoUrl,
                                })
                              }
                            >
                              <video
                                key={`vid-${i}`}
                                src={videoUrl}
                                className=" object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">
                          No media available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200! my-2!" />
                <CustomTextArea
                  label="Remarks"
                  placeholder="Remarks"
                  value={submittionRemarks}
                  onChange={(e) => setSubmittionRemarks(e.target.value)}
                />
                <CustomSearchDropdown
                  label="Select Status"
                  placeholder="Select Status"
                  value={selectedStatus}
                  onChange={(val) => setSelectedStatus(Number(val))}
                  options={
                    submitStatusdata?.map((status) => ({
                      label: status.label,
                      value: String(status.value),
                    })) ?? []
                  }
                />

                <CustomTextField
                  label="Fine"
                  placeholder="Fine"
                  value={fineAmount}
                  onChange={(e) => setFineAmount(Number(e.target.value))}
                />

                <div
                  className="flex justify-center items-center gap-3 border border-[#E2E8F0] p-4! rounded-md cursor-pointer mt-1!"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <div className="bg-black/10 rounded-full p-2!">
                    <MdUploadFile className="text-(--primary) text-xl" />
                  </div>

                  <div className="flex flex-col text-xs">
                    <p className="font-bold">
                      {imageUrl
                        ? "Document Uploaded"
                        : "Upload Case Decision Document"}
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG (Max: 5MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageInputRef}
                    onChange={handleImageChange}
                  />
                </div>

                <div
                  className="flex justify-center items-center gap-3 border border-[#E2E8F0] p-4! rounded-md cursor-pointer mt-1!"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <div className="bg-black/10 rounded-full p-2!">
                    <MdUploadFile className="text-(--primary) text-xl" />
                  </div>

                  <div className="flex flex-col text-xs">
                    <p className="font-bold">
                      {" "}
                      {videoUrl
                        ? "Video Uploaded"
                        : "Upload Court Session Video"}
                    </p>
                    <p className="text-xs text-gray-500">
                      MP4, MOV (Max: 15 min)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    ref={videoInputRef}
                    onChange={handleVideoChange}
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
                    setHearingDate(null);
                    setDialogStep(1);
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className="bg-(--primary)! cursor-pointer! hover:opacity-85! text-white!"
                  disabled={loading}
                  onClick={handleHearingComplaint}
                >
                  {loading ? "Resolving..." : "Set Resolved Status"}
                </Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Root>

      <FullScreenMediaModal
        open={mediaModal.open}
        onOpenChange={(v) => setMediaModal({ open: v, type: null, url: null })}
        type={mediaModal.type}
        url={mediaModal.url}
      />
    </>
  );
};

export default ProceedingDialog;
