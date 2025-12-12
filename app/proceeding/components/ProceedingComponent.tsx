"use client";

import { useState } from "react";
import useGetAllComplains from "../../hooks/useGetAllComplains";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import ProceedingTable from "./ProceedingTable";

const ProceedingComponent = () => {
  const [refresh, setRefresh] = useState(false);
  const { divisionId, districtId, tehsilId } = useRegionFilters();
  const { data: proceedingData } = useGetAllComplains({
    status: 1,
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });
  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      <div className="flex justify-between items-center px-4! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-[#181D27] font-semibold">Proceeding</p>
          <p className="border border-main text-main font-semibold rounded-full px-1! py-0.5! text-xs">
            {proceedingData?.length?.toLocaleString()} Records
          </p>
        </div>
      </div>
      <ProceedingTable
        rowsData={proceedingData ?? []}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default ProceedingComponent;
