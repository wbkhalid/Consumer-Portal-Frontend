"use client";
import Image from "next/image";

interface CustomStatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode | string;
  iconBg: string;
  percentage?: string | number;
  percentageBg?: string;
  percentageText?: string;
  spanText?: string;
}

const CustomStatCard = ({
  title,
  value,
  icon,
  iconBg,
  percentage,
  percentageBg,
  percentageText,
  spanText,
}: CustomStatCardProps) => {
  return (
    <div className="rounded-2xl p-4! bg-white border border-[#E5E7EB]">
      <div className="flex justify-between items-start">
        <div
          className={`${iconBg} w-12 h-12 rounded-[10px] flex items-center justify-center text-white`}
        >
          <Image
            src={`/icons/${icon}`}
            alt={`${icon} icon`}
            width={24}
            height={24}
          />
        </div>
        <div className={`${percentageBg} rounded-3xl py-0.5! px-2! w-fit `}>
          <p className={`${percentageText} text-[11px] font-medium`}>
            {percentage}
          </p>
        </div>
      </div>
      <p className="text-[#182236] font-bold text-xl my-2!">
        {value?.toLocaleString()}
      </p>
      <p className="text-[#969799] font-semibold text-[10px] xl:text-[12px] uppercase">
        {title} {spanText && <span className="text-[8px]">({spanText})</span>}
      </p>
    </div>
  );
};

export default CustomStatCard;
