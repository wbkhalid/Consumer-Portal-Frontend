"use client";
import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { ManageComplainsData } from "../hooks/useGetAllComplains";
import { formatDate } from "../utils/utils";
import DatePicker from "./DatePicker";
import CustomTextArea from "./CustomTextArea";
import CustomSearchDropdown from "./CustomSearchDropdown";

interface ComplaintDetailsDialogProps {
  selectedComplaint: ManageComplainsData;
  onCancel: () => void;
  onAction?: () => void;
  actionLabel?: string;
  loading?: boolean;

  /** Conditional sections */
  showMeetingButton?: boolean;
  showDatePicker?: boolean;
  showRemarks?: boolean;
  showSelectAd?: boolean;

  remarks?: string;
  setRemarks?: (value: string) => void;
  directorOptions?: { label: string; value: string }[];
  onSelectDate?: (date: Date) => void;
}

const ComplaintDetailsDialog = ({
  selectedComplaint,
  onCancel,
  onAction,
  actionLabel = "Submit",
  loading = false,
  showMeetingButton = false,
  showDatePicker = false,
  showRemarks = false,
  showSelectAd = false,
  remarks,
  setRemarks,
  directorOptions = [],
  onSelectDate,
}: ComplaintDetailsDialogProps) => {
  if (!selectedComplaint) return null;

  return (
    <div className="px-4! max-h-[70vh]! overflow-hidden!">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
            src="/images/dummy-image1.png"
            alt="Shop Banner"
            width={36}
            height={36}
            className="rounded-xs"
          />
          <div className="flex flex-col gap-0">
            <p className="font-bold text-lg">{selectedComplaint?.shopName}</p>
            <p className="text-sm">
              {formatDate(selectedComplaint?.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {showMeetingButton && (
            <div className="flex gap-1 border border-[#E2E8F0] p-2! rounded-md text-[#606060] cursor-pointer!">
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
          )}

          {showDatePicker && (
            <div className="w-fit">
              <DatePicker
                initialDate={
                  selectedComplaint?.hearingDate
                    ? new Date(selectedComplaint.hearingDate)
                    : null
                }
                onSelectDate={onSelectDate}
              />
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-h-[55vh] overflow-scroll!">
        <div className="flex justify-between items-center mt-4!">
          <div className="flex flex-col">
            <p className="text-xs text-[#555555]">Phone No</p>
            <p className="text-sm">{selectedComplaint?.phoneNumber}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-[#555555]">Section Category</p>
            <p className="text-sm">{selectedComplaint?.sectionCategoryName}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-[#555555]">Section</p>
            <p className="text-sm">
              {selectedComplaint?.sectionsDetails
                ?.map((s: any) => s?.name)
                .join(", ")}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-[#555555]">Category</p>
            <p className="text-sm">{selectedComplaint?.categoryName}</p>
          </div>
        </div>

        <div className="border-b border-gray-200! my-2!" />

        <div className="flex flex-col flex-1">
          <p className="text-xs text-[#555555]">Address</p>
          <p className="text-sm">
            "Shop # 21 University Road Rehman Plaza Sargodha"
          </p>
        </div>

        <div className="border-b border-gray-200! my-2!" />

        <div className="flex flex-col gap-2">
          <p className="text-sm">{selectedComplaint?.remarks}</p>

          <div className="border-b border-gray-200! my-2!" />

          {/* Audio & Images */}
          <div className="flex gap-2">
            {/* Audio */}
            <div className="flex flex-col gap-1! flex-1">
              <p className="text-xs text-[#555555]">Audio Files</p>
              {selectedComplaint?.listAudio?.length ? (
                <div className="flex flex-wrap gap-3">
                  {selectedComplaint.listAudio.map((url: string, i: number) => (
                    <audio
                      key={i}
                      controls
                      className="w-full sm:w-60 rounded-md border border-(--primary)"
                    >
                      <source
                        src={`http://103.226.216.18:151${url}`}
                        type="audio/mpeg"
                      />
                    </audio>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No audio files available.
                </p>
              )}
            </div>

            {/* Images */}
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-xs text-[#555555]">Images</p>
              {selectedComplaint?.listOfImage?.length ? (
                <div className="flex flex-wrap gap-3">
                  {selectedComplaint.listOfImage.map(
                    (url: string, i: number) => (
                      <div
                        key={i}
                        className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200"
                      >
                        <Image
                          src={url}
                          alt={`Complaint image ${i + 1}`}
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
            </div>
          </div>

          {/* Optional sections */}
          {showRemarks && setRemarks && (
            <CustomTextArea
              label="Remarks"
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          )}

          {showSelectAd && (
            <CustomSearchDropdown
              label="Select AD"
              placeholder="Select AD"
              options={directorOptions}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2! mb-2!">
        <Button
          variant="outline"
          className="text-(--primary)! outline! outline-(--primary)! shadow-none! hover:text-white! hover:bg-(--primary)! text-[12px]!"
          style={{ outlineWidth: "1px" }}
          onClick={onCancel}
        >
          Cancel
        </Button>

        {onAction && (
          <Button
            className="bg-(--primary)! cursor-pointer! hover:opacity-85!"
            disabled={loading}
            onClick={onAction}
          >
            {loading ? "Loading..." : actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetailsDialog;
