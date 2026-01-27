"use client";

import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import DetailHeader from "../complaintDetail/DetailHeader";
import Stepper from "../complaintDetail/Stepper";
import LocationDetail from "../complaintDetail/LocationDetail";
import { useState } from "react";
import ComplaintDetail from "../complaintDetail/ComplaintDetail";
import MediaDetails from "../complaintDetail/MediaDetails";
import {
  DETAIL_STEPS,
  PENDING_STEPS,
  PROCEEDING_STEPS,
  RESOLVED_STEPS,
} from "../complaintDetail/StepperOptions";
import { ManageCustomComplainsData } from "../../hooks/useGetCustomComplaints";
import FullScreenMediaModal from "./FullScreenMediaModal";
import ComplaintHistory from "../complaintDetail/ComplaintHistory";
import AssignDetails from "../complaintDetail/AssignDetails";
import HearingProcess from "../complaintDetail/HearingProcess";
import ComplaintResolution from "../complaintDetail/ComplaintResolution";
import ResolvedDetail from "../complaintDetail/ResolvedDetail";
import UpdatePhoneNumber from "../complaintDetail/UpdatePhoneNumber";
import SendUserDetails from "../complaintDetail/SendUserDetails";

const ComplaintDetailDialog = ({
  selectedComplaint,
  onClose,
  onSuccess,
}: {
  selectedComplaint: ManageComplainsData | null | ManageCustomComplainsData;
  onClose: () => void;
  onSuccess: () => void;
  setRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [step, setStep] = useState(1);
  const [mediaModal, setMediaModal] = useState<{
    open: boolean;
    type: "image" | "video" | null;
    url: string | null;
  }>({ open: false, type: null, url: null });
  if (!selectedComplaint) return null;

  const STATUS_STEP_MAP: Record<number, typeof DETAIL_STEPS> = {
    0: PENDING_STEPS,
    1: PROCEEDING_STEPS,
    2: PROCEEDING_STEPS,
    3: PROCEEDING_STEPS,
    4: RESOLVED_STEPS,
    5: RESOLVED_STEPS,
    7: RESOLVED_STEPS,
  };

  return (
    <>
      <DetailHeader complaint={selectedComplaint} />
      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />
      <Stepper
        step={step}
        setStep={setStep}
        steps={STATUS_STEP_MAP[selectedComplaint?.status ?? -1] ?? DETAIL_STEPS}
      />

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
        {step === 4 && <ComplaintHistory complaint={selectedComplaint} />}
        {step === 5 && (
          <AssignDetails
            complaint={selectedComplaint}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        )}
        {step === 6 && <HearingProcess complaint={selectedComplaint} />}
        {step === 7 && (
          <ComplaintResolution
            complaint={selectedComplaint}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        )}

        {step === 8 && (
          <ResolvedDetail
            complaint={selectedComplaint}
            setMediaModal={setMediaModal}
          />
        )}
        {step === 9 && (
          <UpdatePhoneNumber
            complaint={selectedComplaint}
            onSuccess={onSuccess}
            // setRefresh={setRefresh}
          />
        )}

        {step === 10 && (
          <SendUserDetails
            complaint={selectedComplaint}
            onSuccess={onSuccess}
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
