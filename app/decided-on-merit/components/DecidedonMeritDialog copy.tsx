"use client";

import FullScreenMediaModal from "../../components/dialog/FullScreenMediaModal";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { formatDate } from "../../utils/utils";
import { useState } from "react";

const DecidedonMeritDialog = ({
  selectedComplaint,
}: {
  selectedComplaint: ManageComplainsData | null;
}) => {
  const [mediaModal, setMediaModal] = useState<{
    open: boolean;
    type: "image" | "video" | null;
    url: string | null;
  }>({ open: false, type: null, url: null });
  if (!selectedComplaint) return null;

  const images = selectedComplaint?.listOfImage?.filter((url) =>
    url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );

  const videos = selectedComplaint?.listOfImage?.filter((url) =>
    url.match(/\.(mp4|mov|avi|mkv)$/i)
  );

  return (
    <>
      <div className=" max-h-[70vh] overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div
              className="w-12 h-12 rounded-sm overflow-hidden border border-[#e2e8f0] cursor-pointer!"
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
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-0">
              <p className="font-bold text-lg">{selectedComplaint?.shopName}</p>
              <p className="text-sm">
                {formatDate(selectedComplaint?.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[55vh] overflow-y-auto mt-2! space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Detail label="Phone No" value={selectedComplaint?.phoneNumber} />
            <Detail
              label="Section Category"
              value={selectedComplaint?.sectionCategoryName}
            />
            <Detail
              label="Section"
              value={selectedComplaint.sectionsDetails
                ?.map((s) => s.name)
                .join(", ")}
            />
            <Detail label="Category" value={selectedComplaint.categoryName} />
          </div>

          <div className="border-t border-gray-200 my-2!" />

          <Detail
            label="Remarks"
            value={
              selectedComplaint?.remarks ? selectedComplaint?.remarks : "-"
            }
          />
          <div className="border-t border-gray-200 my-2!" />

          <Detail
            label="Assignee Remarks"
            value={
              selectedComplaint?.assigneeRemarks
                ? selectedComplaint?.assigneeRemarks
                : "-"
            }
          />
          <div className="border-t border-gray-200 my-2!" />

          <Detail
            label="Final Remarks"
            value={
              selectedComplaint?.closingRemarks
                ? selectedComplaint?.closingRemarks
                : "-"
            }
          />

          <div className="border-t border-gray-200 my-2!" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#555555] mb-1!">Audio Files</p>
              {selectedComplaint.listAudio?.length ? (
                selectedComplaint.listAudio.map((url, i) => (
                  <audio key={i} controls className="w-full mb-2! rounded">
                    <source
                      src={`http://103.226.216.18:151${url}`}
                      type="audio/mpeg"
                    />
                  </audio>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic">No audio files.</p>
              )}
            </div>

            <div>
              <p className="text-xs text-[#555555] mb-1!">Media</p>
              {selectedComplaint.listOfImage?.length ? (
                <div className="flex gap-1">
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
                        // fill
                        className="object-cover"
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
      <FullScreenMediaModal
        open={mediaModal.open}
        onOpenChange={(v) => setMediaModal({ open: v, type: null, url: null })}
        type={mediaModal.type}
        url={mediaModal.url}
      />
    </>
  );
};

const Detail = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex flex-col">
    <p className="text-xs text-[#555555]">{label}</p>
    <p className="text-sm wrap-break-word">{value || "-"}</p>
  </div>
);

export default DecidedonMeritDialog;
