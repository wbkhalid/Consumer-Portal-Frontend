"use client";
import useGetAppeals from "../../hooks/useGetAppeals";
import AppealTable from "./AppealTable";

const AppealComponent = () => {
  const { data: appealData } = useGetAppeals();
  return (
    <>
      <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">Appeals</p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {appealData?.length?.toLocaleString()} Records
        </p>
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <AppealTable rowsData={appealData ?? []} />
      </div>
    </>
  );
};

export default AppealComponent;
