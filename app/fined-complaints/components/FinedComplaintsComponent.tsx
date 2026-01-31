"use client";

import { useRegionFilters } from "../../hooks/useRegionFilters";
import useGetFinedComplaints from "../../hooks/useGetFinedComplaints";
import FinedComplaintTable from "./FinedComplaintTable";
import SearchFilter from "../../components/reuseable-filters/SearchFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import FineFilterDropdown from "../../reports/custom-complaint-report/components/FineFilter";
import PageHeader from "../../components/PageHeader";

const FinedComplaintsComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const minFine = Number(searchParams.get("minFineAmount"));
  const maxFine = Number(searchParams.get("maxFineAmount"));
  const { divisionId, districtId, tehsilId } = useRegionFilters();
  const { data: finedComplaintData } = useGetFinedComplaints({
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
    minFineAmount: minFine || undefined,
    maxFineAmount: maxFine || undefined,
  });

  const filteredData = useMemo(() => {
    if (!finedComplaintData) return [];
    const term = search.toLowerCase();

    return finedComplaintData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term),
      ),
    );
  }, [finedComplaintData, search]);
  return (
    <>
      {/* <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">Fined Complaints</p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {filteredData?.length?.toLocaleString()} Records
        </p>
      </div> */}
      <PageHeader title="Fined Complaints" count={filteredData?.length} />

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <FineFilterDropdown />
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
        <FinedComplaintTable rowsData={filteredData ?? []} />
      </div>
    </>
  );
};

export default FinedComplaintsComponent;
