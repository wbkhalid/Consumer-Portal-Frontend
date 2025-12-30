"use client";

import { useState, useMemo } from "react";
import { Button, TextField } from "@radix-ui/themes";
import { FiSearch } from "react-icons/fi";
import useGetAllComplains from "../../hooks/useGetAllComplains";
import ComplainsTable from "./ComplainsTable";
import CustomSelect from "../../components/CustomSelect";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import useGetAllDistricts from "../../hooks/useGetAllDistricts";
import CustomDateRangePicker from "../../components/CustomDateRangePicker";
import CustomComplaintDialog from "../../authority-reports/custom-complaint-report/components/CustomComplaintDialog";
import StaffDropdown from "../../components/reuseable-filters/StaffDropdown";
import DistrictWiseDropdown from "../../components/reuseable-filters/DistrictWiseDropdown";
import SectionSelectDropdown from "../../components/reuseable-filters/SectionSelectDropdown";
import SectionCategoryDropdown from "../../components/reuseable-filters/SectionCategoryDropdown";
import DateFilter from "../../components/DateFilter";
import FineFilterDropdown from "../../authority-reports/custom-complaint-report/components/FineFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getRole } from "../../utils/utils";

const ComplainComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
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
    const term = searchTerm.toLowerCase();

    return complainData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [complainData, searchTerm]);

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden  bg-white">
      <div className="flex justify-between items-center px-4! py-2! ">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">Complaints</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {filteredData?.length?.toLocaleString()} Records
          </p>
        </div>

        <div className="flex justify-end items-center gap-2 mb-2!">
          <TextField.Root
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-[220px] rounded-full!"
          >
            <TextField.Slot>
              <FiSearch className="text-gray-500 text-[16px]" />
            </TextField.Slot>
          </TextField.Root>

          <CustomComplaintDialog setRefresh={setRefresh} />
        </div>
      </div>

      <div className="flex justify-end items-center gap-2 mb-2!">
        <StaffDropdown />
        {(role === "Admin" || role === "DG" || role === "Secretary") && (
          <DistrictWiseDropdown />
        )}
        <DateFilter />
        <FineFilterDropdown />
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
      </div>

      {/* Table */}
      <ComplainsTable rowsData={filteredData ?? []} />
    </div>
  );
};

export default ComplainComponent;
