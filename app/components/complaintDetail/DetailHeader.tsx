import { Dialog } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import { formatComplaintId } from "../../utils/utils";

const DetailHeader = ({
  complaint,
}: {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
}) => {
  return (
    <div className="flex justify-between items-center px-5! py-2.5!">
      <div className="flex flex-col">
        <p className="text-[#1D1C1D] font-bold">
          {formatComplaintId(
            complaint?.id,
            complaint?.entryType,
            complaint?.createdAt
          )}
        </p>
        <p className="text-[#1D1C1D] text-sm">{complaint?.shopName}</p>
      </div>
      <Dialog.Close>
        <div className="flex gap-0.5 items-center border! border-[#E2E8F0]! text-[#606060] rounded-[13px] px-2! py-1.5! cursor-pointer">
          <RxCross2 />
          <p className="text-sm"> Close</p>
        </div>
      </Dialog.Close>
    </div>
  );
};

export default DetailHeader;
