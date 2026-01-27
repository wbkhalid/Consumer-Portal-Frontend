import React, { useState } from "react";
import CustomTextField from "../CustomTextField";
import { Button, Dialog } from "@radix-ui/themes";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import apiClient from "../../services/api-client";
import { ADMIN_DASHBOARD_API, COMPLAINT_API } from "../../APIs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface MediaDetailsProps {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
  onSuccess: () => void;
}

const SendUserDetails = ({ complaint, onSuccess }: MediaDetailsProps) => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

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
        `${ADMIN_DASHBOARD_API}/send-complaint-details`,
        payload,
      );

      toast.success(
        response.data.responseMessage || "Send details successfully",
      );
      onSuccess();
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error sending details:", error);
      toast.error("Failed to send details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5! py-3!">
      <CustomTextField
        label="Phone Number"
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

        <Button
          className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
          disabled={loading}
          onClick={updatePhoneNumber}
        >
          Send Details
        </Button>
      </div>
    </div>
  );
};

export default SendUserDetails;
