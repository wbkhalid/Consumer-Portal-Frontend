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

  let filteredData = appealData;

  if (search && appealData) {
    const lowerSearch = search.toLowerCase();

    filteredData = appealData.filter((d) => {
      return (
        d.appealReason?.toLowerCase().includes(lowerSearch) ||
        d.appealId?.toString().includes(lowerSearch) ||
        d.createdAt?.toLowerCase().includes(lowerSearch) ||
        d.complaintDetails?.id?.toString().includes(lowerSearch) ||
        d.complaintDetails?.shopName?.toLowerCase().includes(lowerSearch) ||
        d.complaintDetails?.phoneNumber?.toString().includes(lowerSearch) ||
        d.complaintDetails?.remarks?.toLowerCase().includes(lowerSearch) ||
        d.complaintDetails?.assigneeRemarks
          ?.toLowerCase()
          .includes(lowerSearch) ||
        d.complaintDetails?.categoryName?.toLowerCase().includes(lowerSearch) ||
        d.complaintDetails?.sectionCategoryName
          ?.toLowerCase()
          .includes(lowerSearch) ||
        d.complaintDetails?.assignedTo?.toString().includes(lowerSearch) ||
        d.complaintDetails?.sectionsDetails?.some(
          (s) =>
            s?.name?.toString().includes(lowerSearch) ||
            s?.description?.toLowerCase().includes(lowerSearch),
        )
      );
    });
  }

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
