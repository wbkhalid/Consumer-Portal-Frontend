import { ManageComplainsData } from "../../hooks/useGetAllComplains";

interface MediaDetailsProps {
  complaint: ManageComplainsData | null;
  setMediaModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: "image" | "video" | null;
      url: string | null;
    }>
  >;
}
const ResolvedDetail = ({ complaint, setMediaModal }: MediaDetailsProps) => {
  const decisionImages =
    complaint?.decisionFilePaths?.filter((f) => f.fileType === 0) ?? [];

  const decisionVideos =
    complaint?.decisionFilePaths?.filter((f) => f.fileType === 1) ?? [];

  return (
    <div className="px-5! py-2.5!">
      <div className="py-2!">
        <p className="text-[#555555] text-sm">Final Remarks</p>
        <p className="text-sm">{complaint?.closingRemarks}</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-[#555555]">Files</p>

        <div>
          {complaint?.decisionFilePaths &&
          complaint.decisionFilePaths.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {decisionImages.map((file, i) => (
                <div
                  key={`img-${i}`}
                  className="w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
                  onClick={() =>
                    setMediaModal({
                      open: true,
                      type: "image",
                      url: file.filePath,
                    })
                  }
                >
                  <img
                    src={file.filePath}
                    alt={`decision-img-${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {decisionVideos.map((file, i) => (
                <div
                  key={`vid-${i}`}
                  className="relative w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
                  onClick={() =>
                    setMediaModal({
                      open: true,
                      type: "video",
                      url: file.filePath,
                    })
                  }
                >
                  <video
                    src={file.filePath}
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
    </div>
  );
};

export default ResolvedDetail;
