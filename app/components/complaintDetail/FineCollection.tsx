import { Button, Spinner } from "@radix-ui/themes";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import CustomTextField from "../CustomTextField";
import DatePicker from "../DatePicker";
import { canEditable } from "../../utils/utils";
import { useState } from "react";
import { COMPLAINT_API } from "../../APIs";
import apiClient from "../../services/api-client";
import { toast } from "react-toastify";

interface FineCollectionProp {
  complaint: ManageComplainsData | null;
  onSuccess: () => void;
}

const FineCollection = ({ complaint, onSuccess }: FineCollectionProp) => {
  const loginUser = canEditable();
  const [fineDate, setFineDate] = useState<Date | null>(
    complaint?.fineCollectionDate
      ? new Date(complaint.fineCollectionDate)
      : null,
  );

  const [loading, setLoading] = useState(false);

  const addFineAmount = async () => {
    if (!fineDate) {
      toast.warning("Please Date Select First");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        complaintId: complaint?.id,
        fineCollectionDate: fineDate?.toISOString(),
      };

      console.log(payload, "payload");

      const response = await apiClient.post(
        `${COMPLAINT_API}/update-fine-collection-date`,
        payload,
      );

      console.log(response, "response123");
      onSuccess();
      toast.success(
        response?.data?.message || "Meeting links sent successfully",
      );
    } catch (error) {
      console.error("Error sending meeting links", error);
      toast.error("Failed to send meeting links");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5! py-4! flex flex-col gap-1.5">
      <div>
        <p className={`block mb-1! text-[#2A2A2B] font-semibold text-xs`}>
          Collection Date
        </p>
        <DatePicker
          placeholder="Date"
          value={fineDate}
          onSelectDate={(date) => setFineDate(date)}
        />
      </div>

      <CustomTextField
        label="Fine Imposed"
        placeholder="Fine"
        type="number"
        value={complaint?.finedAmount}
        readOnly
      />

      {complaint?.fineCollectionDate === null ? (
        <>
          {loginUser === complaint?.assignedTo && (
            <div className="flex justify-end items-center my-3!">
              <Button
                className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
                disabled={loading}
                onClick={addFineAmount}
              >
                {loading ? <Spinner /> : "Submit"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-red-600 font-semibold">
          Fine already collected
        </p>
      )}
    </div>
  );
};

export default FineCollection;
