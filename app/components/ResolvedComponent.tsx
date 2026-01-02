"use client";

import { useMemo, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRegionFilters } from "../hooks/useRegionFilters";
import { getRole } from "../utils/utils";
import useGetAllComplains from "../hooks/useGetAllComplains";
import SearchFilter from "./reuseable-filters/SearchFilter";
import StaffDropdown from "./reuseable-filters/StaffDropdown";
import DistrictWiseDropdown from "./reuseable-filters/DistrictWiseDropdown";
import DateFilter from "./DateFilter";
import ResolvedTable from "./table/ResolvedTable";

interface ResolvedListProps {
  title: string;
  status: number;
}

const ResolvedComponent = ({ title, status }: ResolvedListProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const assigneeAuthority = searchParams.get("assignedTo");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const districtParam = searchParams.get("district");
  const { divisionId, districtId, tehsilId } = useRegionFilters();
  const role = getRole();
  const { data: decidedonMeritData } = useGetAllComplains({
    status,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    divisionId,
    districtId: districtParam || districtId,
    tehsilId,
    assignedTo: assigneeAuthority || undefined,
  });

  const filteredData = useMemo(() => {
    if (!decidedonMeritData) return [];
    const term = search.toLowerCase();

    return decidedonMeritData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [decidedonMeritData, search]);
  return (
    <>
      <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">{title}</p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {filteredData?.length?.toLocaleString()} Records
        </p>
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <StaffDropdown />
            {(role === "Admin" || role === "DG" || role === "Secretary") && (
              <DistrictWiseDropdown />
            )}
            <DateFilter />

            <button
              className="text-sm! cursor-pointer! font-bold! text-[#BD4E42] border border-[#D96F64] py-1! px-3! rounded-lg!"
              onClick={() => {
                router.push(pathname);
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <ResolvedTable rowsData={filteredData ?? []} />
      </div>
    </>
  );
};

export default ResolvedComponent;
