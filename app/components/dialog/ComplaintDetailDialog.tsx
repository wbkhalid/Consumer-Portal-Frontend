"use client";

import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import DetailHeader from "../complaintDetail/DetailHeader";
import Stepper from "../complaintDetail/Stepper";
import LocationDetail from "../complaintDetail/LocationDetail";
import { useState } from "react";
import ComplaintDetail from "../complaintDetail/ComplaintDetail";
import MediaDetails from "../complaintDetail/MediaDetails";
import { DETAIL_STEPS } from "../complaintDetail/StepperOptions";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import FullScreenMediaModal from "./FullScreenMediaModal";

const ComplaintDetailDialog = ({
  selectedComplaint,
}: {
  selectedComplaint: ManageComplainsData | null | ManageCustomComplainsData;
}) => {
  const [step, setStep] = useState(1);
  const [mediaModal, setMediaModal] = useState<{
    open: boolean;
    type: "image" | "video" | null;
    url: string | null;
  }>({ open: false, type: null, url: null });
  if (!selectedComplaint) return null;

  return (
    <>
      <DetailHeader complaint={selectedComplaint} />
      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />
      <Stepper step={step} setStep={setStep} steps={DETAIL_STEPS} />
      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />

      <div className="overflow-y-auto max-h-[65vh]!">
        {step === 1 && <LocationDetail complaint={selectedComplaint} />}
        {step === 2 && <ComplaintDetail complaint={selectedComplaint} />}
        {step === 3 && (
          <MediaDetails
            complaint={selectedComplaint}
            setMediaModal={setMediaModal}
          />
        )}
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

export default ComplaintDetailDialog;
