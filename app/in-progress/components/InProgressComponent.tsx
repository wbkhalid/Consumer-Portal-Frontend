"use client";
import useGetAllComplains from "../../hooks/useGetAllComplains";
import InprogressTable from "./InProgressTable";

const InProgressComponent = () => {
  const { data: complainData } = useGetAllComplains();
  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      <div className="flex justify-between items-center px-4! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-[#181D27] font-semibold">In Progress</p>
          <p className="border border-main text-main font-semibold rounded-full px-1! py-0.5! text-xs">
            7 Records
          </p>
        </div>
      </div>
      <InprogressTable />
    </div>
  );
};

export default InProgressComponent;
