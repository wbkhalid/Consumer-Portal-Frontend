import React, { useState } from "react";
import CustomTextField from "../CustomTextField";
import { Button, Dialog } from "@radix-ui/themes";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import apiClient from "../../services/api-client";
import { ADMIN_DASHBOARD_API, COMPLAINT_API } from "../../APIs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { canEditable, copyToClipboard } from "../../utils/utils";

interface MediaDetailsProps {
  complaint: ManageComplainsData | ManageCustomComplainsData | null;
  onSuccess: () => void;
}

const SendUserDetails = ({ complaint, onSuccess }: MediaDetailsProps) => {
  const loginUser = canEditable();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const mapLink = `https://www.google.com/maps?q=${complaint?.latitude},${complaint?.longitude}`;

  const copyComplaintDetails = async () => {
    const textToCopy = `
Complaint ID: ${complaint?.caseNo ?? ""}
Respondent Phone No: ${complaint?.phoneNumber ?? ""}
Address: ${complaint?.address ?? ""}
Google Map: https://www.google.com/maps?q=${complaint?.latitude},${complaint?.longitude}
  `.trim();

    await copyToClipboard(textToCopy);
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
      {/* <CustomTextField
        label="Phone Number"
        placeholder="03001234567"
        value={phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPhoneNumber(e.target.value)
        }
      /> */}

      <div className="mt-2!">
        <p className="text-sm">
          <span className="font-semibold">Complaint Case No:</span>
          {complaint?.caseNo}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Respondent Phone No:</span>
          {complaint?.phoneNumber}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Address:</span>
          {complaint?.address}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Google Map:</span>
          {mapLink}
        </p>
      </div>

      {loginUser === complaint?.assignedTo && (
        <div className="flex justify-end items-center mt-5!">
          {/* <Dialog.Close>
            <div className="border! border-[#E2E8F0]! text-[#606060] rounded-[13px] py-1.5! px-3.5! cursor-pointer min-w-[150px]! text-[15px]! text-center">
              <p>Close</p>
            </div>
          </Dialog.Close> */}

          <div className="flex gap-1">
            <Button
              className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
              onClick={copyComplaintDetails}
            >
              Copy Details
            </Button>
            {/* <Button
              className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
              disabled={loading}
              onClick={updatePhoneNumber}
            >
              Send Details
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SendUserDetails;
