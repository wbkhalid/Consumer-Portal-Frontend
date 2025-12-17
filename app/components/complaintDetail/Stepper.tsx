"use client";

import { CiShop } from "react-icons/ci";

export interface StepItem {
  id: number;
  label: string;
  icon?: React.ReactNode;
}

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
  steps: StepItem[];
}

const Stepper = ({ step, setStep, steps }: StepperProps) => {
  return (
    <div className="flex items-center gap-4 px-3! py-2!">
      {steps.map((item) => {
        const isActive = item.id === step;

        return (
          <div key={item.id} className="flex items-center gap-2 relative">
            <div
              onClick={() => setStep(item.id)}
              className={`flex items-center gap-1 cursor-pointer text-sm font-medium
                ${isActive ? "text-(--primary)" : ""}
              `}
            >
              {item.icon || <CiShop />}
              {item.label}
            </div>
            {isActive && (
              <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-(--primary) rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
