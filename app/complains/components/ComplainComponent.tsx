"use client";

import { useState, useMemo } from "react";
import useGetAllComplains from "../../hooks/useGetAllComplains";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import CustomComplaintDialog from "../../authority-reports/custom-complaint-report/components/CustomComplaintDialog";
import StaffDropdown from "../../components/reuseable-filters/StaffDropdown";
import DateFilter from "../../components/DateFilter";
import FineFilterDropdown from "../../authority-reports/custom-complaint-report/components/FineFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchFilter from "../../components/reuseable-filters/SearchFilter";
import { getRole } from "../../utils/utils";
import DistrictWiseDropdown from "../../components/reuseable-filters/DistrictWiseDropdown";
import DetailTable from "../../components/table/DetailTable";
import ClearButton from "../../components/ClearButton";

const ComplainComponent = () => {
  const [refresh, setRefresh] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const assigneeAuthority = searchParams.get("assignedTo");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const minFine = Number(searchParams.get("minFineAmount"));
  const maxFine = Number(searchParams.get("maxFineAmount"));
  const districtParam = searchParams.get("district");
  const { divisionId, districtId, tehsilId } = useRegionFilters();
  const role = getRole();
  const { data: complainData } = useGetAllComplains({
    refresh,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    minFineAmount: minFine || undefined,
    maxFineAmount: maxFine || undefined,
    divisionId,
    districtId: districtParam || districtId,
    tehsilId,
    assignedTo: assigneeAuthority || undefined,
  });

  const filteredData = useMemo(() => {
    if (!complainData) return [];
    const term = search.toLowerCase();

    return complainData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [complainData, search]);

  return (
    <>
      <div className="flex justify-between items-center mb-2.5!">
        <div className="flex items-center gap-1">
          <p className="text-[#111827] font-semibold">Total Complaints</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {filteredData?.length?.toLocaleString()} Records
          </p>
        </div>
        <CustomComplaintDialog setRefresh={setRefresh} />
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
            <FineFilterDropdown />
            <ClearButton />
          </div>
        </div>
        <DetailTable rowsData={filteredData ?? []} />
      </div>
    </>
  );
};

export default ComplainComponent;
