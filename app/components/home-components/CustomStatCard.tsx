"use client";
import Image from "next/image";

interface CustomStatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode | string;
  iconBg: string;
  percentage?: number;
  percentageBg?: string;
  percentageText?: string;
}

const CustomStatCard = ({
  title,
  value,
  icon,
  iconBg,
  percentage,
  percentageBg,
  percentageText,
}: CustomStatCardProps) => {
  return (
    <div className="rounded-2xl px-6! py-5! bg-white border border-[#E5E7EB]">
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
        <div
          className={`${percentageBg} rounded-3xl py-0.5! px-3! flex items-center`}
        >
          <p className={`${percentageText} text-xs font-medium`}>
            {percentage?.toFixed(2)}
          </p>
        </div>
      </div>
      <p className="text-[#182236] font-bold text-xl my-2!">
        {value?.toLocaleString()}
      </p>
      <p className="text-[#969799] font-semibold text-[10px] xl:text-[12px] uppercase">
        {title}
      </p>
    </div>
  );
};

export default CustomStatCard;
