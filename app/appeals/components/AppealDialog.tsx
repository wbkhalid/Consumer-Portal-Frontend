"use client";

import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { useState } from "react";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import { ManageAppealsData } from "../../hooks/useGetAppeals";
import DetailHeader from "../../components/complaintDetail/DetailHeader";
import Stepper from "../../components/complaintDetail/Stepper";
import { APPEAL_STEPS } from "../../components/complaintDetail/StepperOptions";
import LocationDetail from "../../components/complaintDetail/LocationDetail";
import ComplaintDetail from "../../components/complaintDetail/ComplaintDetail";
import MediaDetails from "../../components/complaintDetail/MediaDetails";
import ComplaintHistory from "../../components/complaintDetail/ComplaintHistory";
import HearingProcess from "../../components/complaintDetail/HearingProcess";
import ComplaintResolution from "../../components/complaintDetail/ComplaintResolution";
import ResolvedDetail from "../../components/complaintDetail/ResolvedDetail";
import SendUserDetails from "../../components/complaintDetail/SendUserDetails";
import FullScreenMediaModal from "../../components/dialog/FullScreenMediaModal";
import InterimDetails from "../../components/complaintDetail/InterimDetails";

const AppealDialog = ({
  selectedComplaint,
  onClose,
  onSuccess,
}: {
  selectedComplaint: ManageComplainsData | ManageCustomComplainsData | null;
  onClose: () => void;
  onSuccess: () => void;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  fromAppeal?: boolean;
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
      <DetailHeader complaint={selectedComplaint} onClose={onClose} />
      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />
      <Stepper step={step} setStep={setStep} steps={APPEAL_STEPS} />

      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />

      <div className="overflow-y-auto max-h-[65vh]!">
        {step === 1 && (
          <LocationDetail complaint={selectedComplaint} onSuccess={onSuccess} />
        )}
        {step === 2 && (
          <ComplaintDetail
            complaint={selectedComplaint}
            onSuccess={onSuccess}
          />
        )}
        {step === 3 && (
          <MediaDetails
            complaint={selectedComplaint}
            setMediaModal={setMediaModal}
          />
        )}
        {step === 4 && (
          <ComplaintHistory
            complaint={selectedComplaint}
            setMediaModal={setMediaModal}
          />
        )}

        {step === 5 && (
          <HearingProcess complaint={selectedComplaint} fromAppeal={true} />
        )}
        {step === 6 && (
          <ComplaintResolution
            complaint={selectedComplaint}
            onSuccess={onSuccess}
            onClose={onClose}
            fromAppeal={true}
          />
        )}

        {step === 7 && (
          <ResolvedDetail
            complaint={selectedComplaint}
            setMediaModal={setMediaModal}
          />
        )}

        {step === 8 && (
          <SendUserDetails
            complaint={selectedComplaint}
            onSuccess={onSuccess}
          />
        )}

        {step === 11 && (
          <InterimDetails
            complaint={selectedComplaint}
            setMediaModal={setMediaModal}
            onSuccess={onSuccess}
            fromAppeal={true}
            // setMediaModal={setMediaModal}
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

export default AppealDialog;
