import Link from "next/link";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit04Icon } from "@hugeicons/core-free-icons";
import CustomSearchDropdown from "../CustomSearchDropdown";
import useGetAllTehsil from "../../hooks/useGetAllTehsil";
import useGetSelectedTehsil from "../../hooks/useGetSelectedTehsil";
import { COMPLAINT_API } from "../../APIs";
import apiClient from "../../services/api-client";
import { toast } from "react-toastify";
import { canEditable } from "../../utils/utils";

const LocationDetail = ({
  complaint,
  onSuccess,
}: {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
  onSuccess: () => void;
}) => {
  const loginUser = canEditable();
  const [openEditTehsil, setOpenEditTehsil] = useState(false);
  const [selectedTehsil, setSelectedTehsil] = useState<number>(
    complaint?.tehsil?.id ?? 0,
  );
  const { data: selectedTehsilData } = useGetSelectedTehsil({
    id: complaint?.district?.id,
  });

  const updateTehsil = async () => {
    const payload = {
      complaintId: complaint?.id,
      divisionId: complaint?.division?.id,
      districtId: complaint?.district?.id,
      tehsilId: selectedTehsil,
    };

    try {
      const response = await apiClient.post(
        `${COMPLAINT_API}/update-origin-details`,
        payload,
      );

      toast.success(response?.data?.message);
      onSuccess();
      setOpenEditTehsil(false);
    } catch (err) {
      toast.error("Failed to update sections");
    }
  };

  const mapSrc = `https://www.google.com/maps?q=${complaint?.latitude},${complaint?.longitude}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps?q=${complaint?.latitude},${complaint?.longitude}&z=15`;
  return (
    <>
      <div className="px-5! py-3!">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Respondent Phone #</p>
            <p className="text-[#000000] text-sm">{complaint?.phoneNumber}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Division</p>
            <p className="text-[#000000] text-sm">
              {complaint?.division?.name}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">District</p>
            <p className="text-[#000000] text-sm">
              {complaint?.district?.name}
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1.5 items-center">
              <p className="text-[#555555] text-sm">Tehsil</p>
              {loginUser === complaint?.assignedTo && (
                <HugeiconsIcon
                  icon={Edit04Icon}
                  size={14}
                  className="text-[#555555] cursor-pointer"
                  onClick={() => setOpenEditTehsil(true)}
                />
              )}
            </div>
            <p className="text-[#000000] text-sm">{complaint?.tehsil?.name}</p>
          </div>
          {/* <div className="flex flex-col gap-0.5">
            <p className="text-[#555555] text-sm">Lat Lon</p>
            <p className="text-[#000000] text-sm">{`${complaint?.latitude?.toFixed(
              2,
            )}-${complaint?.longitude?.toFixed(2)}`}</p>
          </div> */}
        </div>

        <div className="bg-[rgba(29,28,29,0.13)] h-px w-full my-2!" />
        <p className="text-[#555555] text-sm mb-1!">Location of Complaint</p>
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

      <Dialog.Root open={openEditTehsil} onOpenChange={setOpenEditTehsil}>
        <Dialog.Content className="max-w-[400px]! p-3!">
          <p className="text-[#1D1C1D] font-bold mb-2!">Update Tehsil</p>

          <CustomSearchDropdown
            label="Update Tehsil"
            value={selectedTehsil}
            onChange={(val) => setSelectedTehsil(Number(val))}
            options={selectedTehsilData?.map((tehsil) => ({
              label: tehsil?.name,
              value: String(tehsil?.id),
            }))}
          />

          <div className="flex justify-between items-center mt-5! gap-2">
            <Dialog.Close>
              <div className="border! border-[#E2E8F0]! text-[#606060] rounded-[13px] py-1.5! px-3.5! cursor-pointer min-w-[150px]! text-[15px]! text-center flex-1">
                Close
              </div>
            </Dialog.Close>

            <Button
              onClick={updateTehsil}
              className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]! flex-1!"
            >
              Update Tehsil
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default LocationDetail;
