"use client";

import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import DetailHeader from "../../components/complaintDetail/DetailHeader";
import Stepper from "../../components/complaintDetail/Stepper";
import LocationDetail from "../../components/complaintDetail/LocationDetail";
import { useState } from "react";

const ComplaintDialog = ({}: {
  selectedComplaint: ManageComplainsData | null;
}) => {
  const [step, setStep] = useState(1);
  return (
    <>
      <DetailHeader />
      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />
      <Stepper step={step} setStep={setStep} />
      <div className="bg-[rgba(29,28,29,0.13)] h-px w-full" />
      {step === 1 && <LocationDetail />}
      {step === 2 && <div>Complaint Details Component</div>}
      {step === 3 && <div>Evidence & Media Component</div>}
      {step === 4 && <div>Assign Component</div>}
    </>
  );
};

export default ComplaintDialog;
