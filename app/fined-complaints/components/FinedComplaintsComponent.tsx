"use client";

import { useState } from "react";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import useGetFinedComplaints from "../../hooks/useGetFinedComplaints";
import FinedComplaintTable from "./FinedComplaintTable";

const FinedComplaintsComponent = () => {
  const [refresh, setRefresh] = useState(false);
  const { divisionId, districtId, tehsilId } = useRegionFilters();
  const { data: finedComplaintData } = useGetFinedComplaints({
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });
  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      <div className="flex justify-between items-center px-4! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-[#181D27] font-semibold">Fined Complaints</p>
          <p className="border border-main text-main font-semibold rounded-full px-1! py-0.5! text-xs">
            {finedComplaintData?.length?.toLocaleString()} Records
          </p>
        </div>
      </div>
      <FinedComplaintTable
        rowsData={finedComplaintData ?? []}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default FinedComplaintsComponent;
