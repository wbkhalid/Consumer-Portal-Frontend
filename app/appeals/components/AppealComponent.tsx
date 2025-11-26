"use client";
import useGetAppeals from "../../hooks/useGetAppeals";
import AppealTable from "./AppealTable";

const AppealComponent = () => {
  const { data: appealData } = useGetAppeals();
  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden max-h-[calc(100vh-0px)] bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4! py-2! border-b border-[#e2e8f0]">
        {/* Title */}
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">Appeals</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {appealData?.length?.toLocaleString()} Records
          </p>
        </div>
      </div>

      <AppealTable rowsData={appealData ?? []} />
    </div>
  );
};

export default AppealComponent;
