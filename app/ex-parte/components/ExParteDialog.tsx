"use client";

import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import DetailHeader from "../../components/complaintDetail/DetailHeader";
import Stepper from "../../components/complaintDetail/Stepper";
import LocationDetail from "../../components/complaintDetail/LocationDetail";
import { useState } from "react";
import ComplaintDetail from "../../components/complaintDetail/ComplaintDetail";
import MediaDetails from "../../components/complaintDetail/MediaDetails";
import FullScreenMediaModal from "../../components/dialog/FullScreenMediaModal";
import { RESOLVED_STEPS } from "../../components/complaintDetail/StepperOptions";
import ResolvedDetail from "../../components/complaintDetail/ResolvedDetail";

const ExParteDialog = ({
  selectedComplaint,
}: {
  selectedComplaint: ManageComplainsData | null;
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
      <Stepper step={step} setStep={setStep} steps={RESOLVED_STEPS} />

      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />

      {step === 1 && <LocationDetail complaint={selectedComplaint} />}
      {step === 2 && <ComplaintDetail complaint={selectedComplaint} />}
      {step === 3 && (
        <MediaDetails
          complaint={selectedComplaint}
          setMediaModal={setMediaModal}
        />
      )}
      {step === 4 && (
        <ResolvedDetail
          complaint={selectedComplaint}
          setMediaModal={setMediaModal}
        />
      )}

      <FullScreenMediaModal
        open={mediaModal.open}
        onOpenChange={(v) => setMediaModal({ open: v, type: null, url: null })}
        type={mediaModal.type}
        url={mediaModal.url}
      />
    </>
  );
};

export default ExParteDialog;
