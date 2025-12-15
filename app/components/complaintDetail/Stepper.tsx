"use client";

import clsx from "clsx";
import { CiShop } from "react-icons/ci";

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
}

const steps = [
  { id: 1, label: "Shop Info" },
  { id: 2, label: "Complaint Details" },
  { id: 3, label: "Evidence and Media" },
  { id: 4, label: "Assign" },
];

const Stepper = ({ step, setStep }: StepperProps) => {
  return (
    <div className="flex items-center gap-2  px-3! py-2!">
      {steps.map((item, index) => {
        const isActive = item.id === step;

        return (
          <div key={item.id} className="flex items-center gap-1">
            <div
              className={`flex gap-1 items-center cursor-pointer  ${
                isActive ? "text-(--primary)" : "text-[#606060]"
              } `}
              onClick={() => setStep(item?.id)}
            >
              <CiShop /> <p className="text-sm font-medium ">{item?.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
