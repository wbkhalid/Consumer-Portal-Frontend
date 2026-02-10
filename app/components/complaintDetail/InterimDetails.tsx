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
import { ArrowDown01Icon, Download03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import jsPDF from "jspdf";

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

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  };

  const downloadInterimPDF = async (complaint: ManageComplainsData | null) => {
    if (!complaint) return;

    const doc = new jsPDF("p", "mm", "a4");

    // Margins
    let y = 20;

    // Header

    const logo = await loadImage("/logo.jpeg");
    const imgY = 10;
    const imgH = 20;
    const centerY = imgY + imgH / 2;
    const textY = centerY + 5;

    // Left logo
    doc.addImage(logo, "JPEG", 15, imgY, 20, 20);

    // Right logo
    // doc.addImage(logo, "JPEG", 175, imgY, 20, 20);

    // Center text
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("INTERIM ORDER SHEET", 105, textY, { align: "center" });

    y += 15;
    doc.setFontSize(10);

    // Complaint Info Table (manual)
    doc.rect(15, y, 180, 20);
    doc.line(75, y, 75, y + 20);
    doc.line(135, y, 135, y + 20);

    doc.text("Complaint Name", 18, y + 6);
    doc.text("v/s", 100, y + 10);
    doc.text("Respondent Name", 138, y + 6);

    doc.setFont("helvetica", "normal");

    doc.text(complaint?.complainantDetails?.fullName || "-", 18, y + 14);
    doc.text(complaint?.shopName || "-", 138, y + 14);

    y += 30;

    // Complaint Number & Nature
    doc.setFont("helvetica", "bold");
    doc.text("Complaint No:", 15, y);

    // Value (NORMAL) – thora aage se start
    doc.setFont("helvetica", "normal");
    doc.text(complaint?.caseNo || "-", 45, y);

    y += 6;
    // Label
    doc.setFont("helvetica", "bold");
    doc.text("Nature of Complaint:", 15, y);

    doc.setFont("helvetica", "normal");

    const natureText =
      complaint?.sectionsDetails?.map((s) => s?.description).join(", ") || "-";

    const wrappedText = doc.splitTextToSize(natureText, 140);

    doc.text(wrappedText, 55, y);

    y += wrappedText.length * 6;

    y += 12;

    complaint?.interimDetails
      ?.slice()
      ?.sort((a, b) => (b.id || 0) - (a.id || 0))
      ?.forEach((item, index) => {
        doc.setFont("helvetica", "bold");
        doc.text(
          `ORDER / ${formatDate(item?.createdAt)} - ${format(
            toLocal(item?.createdAt),
            "hh:mm a",
          )}`,
          15,
          y,
        );

        y += 6;
        // Present label
        doc.setFont("helvetica", "bold");
        doc.text("Present:", 15, y);

        // Wrapped present parties text
        doc.setFont("helvetica", "normal");
        const presentText = item?.presentPartiesName || "-";
        const wrappedPresent = doc.splitTextToSize(presentText, 170);

        wrappedPresent.forEach((line: string) => {
          doc.text(line, 30, y);
          y += 4;
        });

        y += 6;

        doc.setFont("helvetica", "normal");

        doc.setFont("helvetica", "normal");

        const wrappedRemarks = doc.splitTextToSize(
          item.interimRemarks || "-",
          185,
        );

        doc.text(wrappedRemarks, 15, y);
        y += wrappedRemarks.length * 6 + 6;

        doc.setFont("helvetica", "bold");
        doc.text("Announced:", 15, y);
        const announcedWidth = doc.getTextWidth("Announced:");
        doc.line(15, y + 2, 15 + announcedWidth, y + 2);

        y += 6;
        doc.setFont("helvetica", "bold");
        const dateText = `${formatDate(item?.createdAt)} - ${format(
          toLocal(item?.createdAt),
          "hh:mm a",
        )}`;
        doc.text(dateText, 15, y);
        const dateWidth = doc.getTextWidth(dateText);
        doc.line(15, y + 2, 15 + dateWidth, y + 2);

        // y += 8;
        doc.text(
          "(Authority under Punjab Consumer Protection Act, 2005)",
          60,
          y,
        );
        y += 12;

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      });

    doc.save(`Interim_Order_${complaint?.caseNo}.pdf`);
  };

  const isDGorSecretary = role === "DG" || role === "SECRETARY";

  const canShowResolveButton = fromAppeal
    ? isDGorSecretary
    : loginUser === complaint?.assignedTo;
  const { data: meetingVideos } = useGetMeetingVideos({ id: complaint?.id });
  const [interimRemarks, setInterimRemarks] = useState("");
  const [presentParties, setPresentParties] = useState("");
  const [loading, setLoading] = useState(false);
  const evidenceInputRef = useRef<HTMLInputElement>(null);
  const cnicInputRef = useRef<HTMLInputElement>(null);

  const [evidenceUrls, setEvidenceUrls] = useState<string[]>([]);
  const [evidencePreviews, setEvidencePreviews] = useState<string[]>([]);

  const [cnicUrls, setCnicUrls] = useState<string[]>([]);
  const [cnicPreviews, setCnicPreviews] = useState<string[]>([]);

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleEvidenceChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files?.length) return;

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setEvidencePreviews((prev) => [...prev, ...previews]);

    try {
      const uploadedFiles = await uploadMultipleFiles(e, "refdocument");
      const urls = uploadedFiles?.map((f: any) => f.fileUrl);
      setEvidenceUrls((prev) => [...prev, ...urls]);
    } catch {
      toast.error("Evidence upload failed");
    }
  };

  const handleCNICChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setCnicPreviews((prev) => [...prev, ...previews]);

    try {
      const uploadedFiles = await uploadMultipleFiles(e, "interimcnic");
      const urls = uploadedFiles?.map((f: any) => f.fileUrl);
      setCnicUrls((prev) => [...prev, ...urls]);
    } catch {
      toast.error("CNIC upload failed");
    }
  };

  const removeEvidenceAt = (index: number) => {
    setEvidenceUrls((prev) => prev.filter((_, i) => i !== index));
    setEvidencePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeCNICAt = (index: number) => {
    setCnicUrls((prev) => prev.filter((_, i) => i !== index));
    setCnicPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInterimComplaint = async () => {
    if (!complaint) return;

    if (!interimRemarks.trim()) {
      toast.warning("Please enter remarks for the  complaint.");
      return;
    }
    if (!presentParties.trim()) {
      toast.warning("Please enter presenet parties for the  complaint.");
      return;
    }
    if (!presentParties.trim()) {
      toast.warning("Please enter presenet parties for the  complaint.");
      return;
    }

    if (cnicUrls.length === 0) {
      toast.warning("Please upload CNIC evidence.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        complaintId: complaint.id,
        interimRemarks,
        presentPartiesName: presentParties,
        createdBy: loginUser,
        createdAt: new Date().toISOString(),

        interimOrderFilesPath: evidenceUrls.map((url) => ({
          filePath: url,
          fileType: 0,
        })),

        presentPartiesCNIC: cnicUrls.map((url) => ({
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
      <div className="flex justify-between mb-1!">
        <p className="text-[#2A2A2B] font-semibold text-sm ">Interim Details</p>
        {canShowResolveButton && (
          <div
            className="h-full! flex gap-1 items-center bg-white border border-[#D5D7DA] rounded-lg px-2! py-1! text-[#414651] font-bold text-xs cursor-pointer"
            onClick={() => downloadInterimPDF(complaint)}
          >
            Download Interim
            <HugeiconsIcon icon={Download03Icon} size={14} color="#414651" />
          </div>
        )}
      </div>

      <CustomTextArea
        label="Present Parties"
        placeholder="Type..."
        value={presentParties}
        onChange={(e) => setPresentParties(e.target.value)}
      />
      <div className="mb-1!" />
      <CustomTextArea
        label="Order Sheet"
        placeholder="Type..."
        value={interimRemarks}
        onChange={(e) => setInterimRemarks(e.target.value)}
      />

      <p className="my-1! text-[#2A2A2B] font-semibold text-xs mt-2!">CNIC</p>
      <div
        className="flex justify-center flex-wrap gap-3 bg-[#F9FAFB] border border-[#E5E7EB] p-5! rounded-md cursor-pointer mt-1!"
        onClick={() => cnicInputRef.current?.click()}
      >
        {cnicPreviews.length === 0 ? (
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
          cnicPreviews.map((preview, i) => (
            <div key={i} className="relative w-16 h-16">
              <img
                src={preview}
                alt={`Uploaded ${i}`}
                className="w-full h-full object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCNICAt(i);
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
          ref={cnicInputRef}
          onChange={handleCNICChange}
        />
      </div>

      <p className="my-1! text-[#2A2A2B] font-semibold text-xs mt-2!">
        Evidence
      </p>
      <div
        className="flex justify-center flex-wrap gap-3 bg-[#F9FAFB] border border-[#E5E7EB] p-5! rounded-md cursor-pointer mt-1!"
        onClick={() => evidenceInputRef.current?.click()}
      >
        {evidencePreviews.length === 0 ? (
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
          evidencePreviews.map((preview, i) => (
            <div key={i} className="relative w-16 h-16">
              <img
                src={preview}
                alt={`Uploaded ${i}`}
                className="w-full h-full object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeEvidenceAt(i);
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
          ref={evidenceInputRef}
          onChange={handleEvidenceChange}
        />
      </div>

      {canShowResolveButton && (
        <div className="flex justify-end items-center gap-2 my-3!">
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
                    {i?.createdAt && format(toLocal(i?.createdAt), "hh:mm a")}
                  </span>
                </p>

                <p className="text-sm mt-1!">
                  <span className="font-semibold">Present Parties: </span>
                  {i?.presentPartiesName}
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
