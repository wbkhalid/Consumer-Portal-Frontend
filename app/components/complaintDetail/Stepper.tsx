"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";

type HugeIcon = (typeof Icons)[keyof typeof Icons];

export interface StepItem {
  id: number;
  label: string;
  iconImage?: HugeIcon;
}

interface StepperProps {
  step: number;
  setStep: (step: number) => void;
  IsInProcess?: boolean;
  steps: StepItem[];
}

const Stepper = ({ step, setStep, steps, IsInProcess }: StepperProps) => {
  return (
    <div
      className={`flex ${
        IsInProcess ? "justify-between" : "justify-start"
      } items-center gap-3 px-3! py-2!`}
    >
      {steps.map((item) => {
        const isActive = item.id === step;

        return (
          <div key={item.id} className="flex items-center gap-1 relative">
            <div
              onClick={() => setStep(item.id)}
              className={`flex items-center gap-1 cursor-pointer font-medium
                ${isActive ? "text-(--primary)" : ""}
              `}
            >
              {item.iconImage && (
                <HugeiconsIcon icon={item.iconImage} size={18} />
              )}
              <p className="text-xs">{item.label}</p>
            </div>

            {isActive && (
              <span className="absolute left-0 -bottom-2! w-full h-0.5 bg-(--primary) rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
