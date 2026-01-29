import { HugeiconsIcon } from "@hugeicons/react";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import {
  Album02Icon,
  Image02Icon,
  MusicNote03Icon,
  VideoReplayIcon,
} from "@hugeicons/core-free-icons";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";

interface MediaDetailsProps {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
  setMediaModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      type: "image" | "video" | null;
      url: string | null;
    }>
  >;
}

const MediaDetails = ({ complaint, setMediaModal }: MediaDetailsProps) => {
  const images = complaint?.listOfImage?.filter((url) =>
    url.match(/\.(jpg|jpeg|png|gif|webp)$/i),
  );

  const videos = complaint?.listOfImage?.filter((url) =>
    url.match(/\.(mp4|mov|avi|mkv)$/i),
  );
  return (
    <div className="px-5! py-2.5!">
      <div className="bg-[#F0FDF4] border border-[#B9F8CF] rounded-md p-2.5!">
        <p className="text-(--primary) font-medium">Evidence Summary</p>
        <div className="flex justify-center items-center gap-11 my-2.5!">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-[#155DFC] flex justify-center items-center">
              {/* <img src="/images/complaint-image.png" alt="feature Image" /> */}
              <HugeiconsIcon icon={Image02Icon} color="#ffffff" />
            </div>
            <p className="text-[#4A5565] font-medium text-sm">
              Shop Image :{complaint?.billBoardImage?.length ? 1 : 0}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-[#9810FA] flex justify-center items-center">
              {/* <img src="/images/complaint-music.png" alt="Audio Files" /> */}
              <HugeiconsIcon icon={MusicNote03Icon} color="#ffffff" />
            </div>
            <p className="text-[#4A5565] font-medium text-sm">
              Audio Files :{complaint?.listAudio?.length}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-[#028B02] flex justify-center items-center">
              {/* <img src="/images/complaint-album.png" alt="Album" /> */}
              <HugeiconsIcon icon={Album02Icon} color="#ffffff" />
            </div>
            <p className="text-[#4A5565] font-medium text-sm">
              Photos :{images?.length}
            </p>
          </div>
          {/* <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-[#BD0000] flex justify-center items-center">
              <img src="/images/complaint-video.png" alt="feature Image" />
              <HugeiconsIcon icon={VideoReplayIcon} color="#ffffff" />
            </div>
            <p className="text-[#4A5565] font-medium text-sm">
              Videos :{videos?.length}
            </p>
          </div> */}
        </div>
      </div>

      {/* <div className="bg-[rgba(29,28,29,0.13)] h-px w-full my-2!" /> */}
      <div className="bg-[rgba(29,28,29,0.13)] h-[0.5px] w-full my-2!" />

      <div className="flex gap-5 mb-4!">
        {/* Featured Evidence */}
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-[#555555] font-medium">Shop Image</p>

          {complaint?.billBoardImage ? (
            <div
              className="w-[150px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
              onClick={() =>
                setMediaModal({
                  open: true,
                  type: "image",
                  url: complaint?.billBoardImage,
                })
              }
            >
              <img
                src={complaint?.billBoardImage}
                alt="Feature Image"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No image available.</p>
          )}
        </div>

        {/* Files */}
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-[#555555]">Files</p>

          <div>
            {complaint?.listOfImage?.length ? (
              <div className="flex flex-wrap gap-2">
                {images?.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
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
                      alt={`file-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Videos */}
                {/* {videos?.map((videoUrl, i) => (
                  <div
                    key={`vid-${i}`}
                    className="relative w-[90px] h-[90px] rounded-xl border border-[#CBD5E1] overflow-hidden bg-[#F8FAFC] cursor-pointer!"
                    onClick={() =>
                      setMediaModal({
                        open: true,
                        type: "video",
                        url: videoUrl,
                      })
                    }
                  >
                    <video
                      src={videoUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))} */}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">
                No media available.
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-[#555555] font-medium">Audio</p>
        {complaint?.listAudio?.length ? (
          complaint?.listAudio?.map((url, i) => (
            <audio key={i} controls className="w-full mb-2! rounded">
              <source src={`${url}`} type="audio/mpeg" />
            </audio>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic">No audio files.</p>
        )}
      </div>
    </div>
  );
};

export default MediaDetails;
