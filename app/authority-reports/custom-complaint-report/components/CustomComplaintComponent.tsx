"use client";

import CustomComplaintTable from "./CustomComplaintTable";
import useGetCustomComplaints from "../../../hooks/useGetCustomComplaints";
import { useRegionFilters } from "../../../hooks/useRegionFilters";
import { useState } from "react";
import FineFilter from "./FineFilter";
import { Button } from "@radix-ui/themes";
import DownloadWrapper from "./DownloadWrapper";
import CustomComplaintDialog from "./CustomComplaintDialog";
import DateFilter from "../../../components/DateFilter";
import SectionSelectDropdown from "../../../components/reuseable-filters/SectionSelectDropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SectionCategoryDropdown from "../../../components/reuseable-filters/SectionCategoryDropdown";
import StaffDropdown from "../../../components/reuseable-filters/StaffDropdown";
import DistrictWiseDropdown from "../../../components/reuseable-filters/DistrictWiseDropdown";
import { getRole } from "../../../utils/utils";

const CustomComplaintComponent = () => {
  const [refresh, setRefresh] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const sectionIds = searchParams.getAll("section");
  const sectionCategory = searchParams.get("sectionCategory");
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
    section: sectionIds.length ? sectionIds : undefined,
    sectionCategory: sectionCategory || undefined,
    assignedTo: assigneeAuthority || undefined,
  });
  const role = getRole();

  const fileName = "Custom Complaint Report";
  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {customComplaintData?.length.toLocaleString()} Records
          </p>
        </div>

        <CustomComplaintDialog setRefresh={setRefresh} />
      </div>
      <div className="flex justify-end items-center gap-2 mb-2!">
        <StaffDropdown />
        {(role === "Admin" || role === "DG" || role === "Secretary") && (
          <DistrictWiseDropdown />
        )}
        <SectionSelectDropdown />
        <SectionCategoryDropdown />
        <DateFilter />
        <FineFilter />
        <Button
          size="2"
          variant="soft"
          className="text-sm! cursor-pointer! font-bold!"
          onClick={() => {
            router.push(pathname);
          }}
        >
          Clear Filters
        </Button>
        <DownloadWrapper fileName={fileName} data={customComplaintData} />
      </div>
      <CustomComplaintTable rowsData={customComplaintData} />
    </div>
  );
};

export default CustomComplaintComponent;
