"use client";
import { useMemo } from "react";
import ClearButton from "../../components/ClearButton";
import SearchFilter from "../../components/reuseable-filters/SearchFilter";
import useGetAppeals from "../../hooks/useGetAppeals";
import AppealTable from "./AppealTable";
import { useSearchParams } from "next/navigation";

const AppealComponent = () => {
  const { data: appealData } = useGetAppeals();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const filteredData = useMemo(() => {
    if (!appealData) return [];
    const term = search.toLowerCase();

    return appealData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }, [appealData, search]);
  return (
    <>
      <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">Appeals</p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {filteredData?.length?.toLocaleString()} Records
        </p>
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          {/* <div className="flex justify-end items-center gap-2">
            <ClearButton />
          </div> */}
        </div>
        <AppealTable rowsData={filteredData ?? []} />
      </div>
    </>
  );
};

export default AppealComponent;
