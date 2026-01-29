"use client";

import useGetCustomComplaints from "../../../hooks/useGetCustomComplaints";
import { useRegionFilters } from "../../../hooks/useRegionFilters";
import { useMemo, useState } from "react";
import CustomComplaintDialog from "./CustomComplaintDialog";
import DateFilter from "../../../components/DateFilter";
import SectionSelectDropdown from "../../../components/reuseable-filters/SectionSelectDropdown";
import { useSearchParams } from "next/navigation";
import SectionCategoryDropdown from "../../../components/reuseable-filters/SectionCategoryDropdown";
import StaffDropdown from "../../../components/reuseable-filters/StaffDropdown";
import DistrictWiseDropdown from "../../../components/reuseable-filters/DistrictWiseDropdown";
import { getRole } from "../../../utils/utils";
import FineFilterDropdown from "./FineFilter";
import SearchFilter from "../../../components/reuseable-filters/SearchFilter";
import DetailTable from "../../../components/table/DetailTable";
import ClearButton from "../../../components/ClearButton";

const CustomComplaintComponent = () => {
  const [refresh, setRefresh] = useState(false);
  const searchParams = useSearchParams();

  const sectionIds = searchParams.getAll("sectionIds");
  const sectionCategory = searchParams.get("sectionCategory");
  const search = searchParams.get("search") ?? "";
  const assigneeAuthority = searchParams.get("assignedTo");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const minFine = Number(searchParams.get("minFineAmount"));
  const maxFine = Number(searchParams.get("maxFineAmount"));
  const districtParam = searchParams.get("district");
  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const { data: customComplaintData } = useGetCustomComplaints({
    refresh,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    minFineAmount: minFine || undefined,
    maxFineAmount: maxFine || undefined,
    divisionId,
    districtId: districtParam || districtId,
    tehsilId,
    sectionIds: sectionIds?.length ? sectionIds : undefined,
    sectionCategory: sectionCategory || undefined,
    assignedTo: assigneeAuthority || undefined,
  });
  const role = getRole();
  const filteredData = useMemo(() => {
    if (!customComplaintData) return [];
    const term = search.toLowerCase();

    return customComplaintData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }, [customComplaintData, search]);
  return (
    <>
      <div className="flex justify-between items-center mb-2.5!">
        <div className="flex items-center gap-1">
          <p className="text-[#111827] font-semibold">Custom Complaints</p>
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
            <SectionSelectDropdown />
            <SectionCategoryDropdown />
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

export default CustomComplaintComponent;
