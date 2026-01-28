import React, { useState } from "react";
import CustomTextField from "../CustomTextField";
import { Button, Dialog } from "@radix-ui/themes";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import apiClient from "../../services/api-client";
import { ADMIN_DASHBOARD_API, COMPLAINT_API } from "../../APIs";
import { toast } from "react-toastify";
import { warn } from "console";
import { useRouter } from "next/navigation";

interface MediaDetailsProps {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
  onSuccess: () => void;
  // setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdatePhoneNumber = ({ complaint, onSuccess }: MediaDetailsProps) => {
  const [phoneNumber, setPhoneNumber] = useState(complaint?.phoneNumber || "");
  const [loading, setLoading] = useState(false);
  const [noticeLoading, setNoticeLoading] = useState(false);

  const sendNotice = async () => {
    if (!complaint?.phoneNumber) {
      toast.warning("Please update  phone number first");
      return;
    }
    setNoticeLoading(true);
    try {
      const payload = {
        complaintId: complaint?.id,
        phoneNumber: phoneNumber,
      };

      console.log(payload, "payload");

      const response = await apiClient.post(
        `${ADMIN_DASHBOARD_API}/send-notice-to-shopkeeper`,
        payload,
      );

      toast.success(response.data.message || "Notice sent successfully");
      // onSuccess();
      // setRefresh?.((prev) => !prev);

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error sending notice", error);
      toast.error("Failed to sent notice");
    } finally {
      setNoticeLoading(false);
    }
  };

  const updatePhoneNumber = async () => {
    if (!phoneNumber) {
      toast.warning("Please enter a phone number");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        complaintId: complaint?.id,
        phoneNumber: phoneNumber,
      };

      console.log(payload, "payload");

      const response = await apiClient.post(
        `${COMPLAINT_API}/update-shop-phone`,
        payload,
      );

      toast.success(
        response.data.message || "Phone number updated successfully",
      );
      onSuccess();
      // setRefresh?.((prev) => !prev);

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error updating phone number", error);
      toast.error("Failed to update phone number");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5! py-3!">
      <CustomTextField
        label="Update Shop Phone Number"
        placeholder="03001234567"
        value={phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhoneNumber(e.target.value)
        }
      />

      <div className="flex justify-between items-center mt-5!">
        <Dialog.Close>
          <div className="border! border-[#E2E8F0]! text-[#606060] rounded-[13px] py-1.5! px-3.5! cursor-pointer min-w-[150px]! text-[15px]! text-center">
            <p>Close</p>
          </div>
        </Dialog.Close>
        <div className="flex gap-1">
          <Button
            className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
            disabled={noticeLoading}
            onClick={sendNotice}
          >
            Send Notice
          </Button>
          <Button
            className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
            disabled={loading}
            onClick={updatePhoneNumber}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePhoneNumber;
