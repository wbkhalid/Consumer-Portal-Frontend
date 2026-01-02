"use client";

import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import DetailHeader from "../../components/complaintDetail/DetailHeader";
import Stepper from "../../components/complaintDetail/Stepper";
import LocationDetail from "../../components/complaintDetail/LocationDetail";
import { useState } from "react";
import ComplaintDetail from "../../components/complaintDetail/ComplaintDetail";
import MediaDetails from "../../components/complaintDetail/MediaDetails";
import { PROCEEDING_STEPS } from "../../components/complaintDetail/StepperOptions";
import AssignDetails from "../../components/complaintDetail/AssignDetails";
import FullScreenMediaModal from "../../components/dialog/FullScreenMediaModal";
import ComplaintHistory from "../../components/complaintDetail/ComplaintHistory";
import ComplaintResolution from "../../components/complaintDetail/ComplaintResolution";
import HearingProcess from "../../components/complaintDetail/HearingProcess";

const EscalationDialog = ({
  selectedComplaint,
  onClose,
  onSuccess,
}: {
  selectedComplaint: ManageComplainsData | null;
  onClose: () => void;
  onSuccess: () => void;
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
      <Stepper
        step={step}
        setStep={setStep}
        steps={PROCEEDING_STEPS}
        IsInProcess={true}
      />
      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />
      <div className="max-h-[65vh]! overflow-y-auto!">
        {step === 1 && <LocationDetail complaint={selectedComplaint} />}
        {step === 2 && <ComplaintDetail complaint={selectedComplaint} />}
        {step === 3 && (
          <MediaDetails
            complaint={selectedComplaint}
            setMediaModal={setMediaModal}
          />
        )}
        {step === 4 && <ComplaintHistory complaint={selectedComplaint} />}
        {step === 5 && <HearingProcess complaint={selectedComplaint} />}
        {step === 6 && (
          <ComplaintResolution
            complaint={selectedComplaint}
            onSuccess={onSuccess}
            onClose={onClose}
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

export default EscalationDialog;
