import Link from "next/link";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";

const LocationDetail = ({
  complaint,
}: {
  complaint: ManageComplainsData | null;
}) => {
  const lat = 31.52;
  const lng = 74.35;

  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps?q=${lat},${lng}&z=15`;
  return (
    <div className="px-5!">
      <div className="flex justify-between items-center mt-2!">
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Phone No</p>
          <p className="text-[#000000] text-sm">{complaint?.phoneNumber}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Division</p>
          <p className="text-[#000000] text-sm">Sargodha</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">District</p>
          <p className="text-[#000000] text-sm">Sargodha</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Tehsil</p>
          <p className="text-[#000000] text-sm">Sargodha</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[#555555] text-sm">Lat Lon</p>
          <p className="text-[#000000] text-sm">31.52-74.35</p>
        </div>
      </div>

      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full my-2!" />
      <p className="text-[#555555] text-sm mb-1!">Map</p>
      <div className="w-full h-[200px] rounded-lg overflow-hidden border border-[#CBD5E1] ">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
          allowFullScreen
        />
      </div>
      <Link
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-(--primary) font-medium text-sm hover:underline cursor-pointer pb-2!"
      >
        Open in Google maps
      </Link>
    </div>
  );
};

export default LocationDetail;
