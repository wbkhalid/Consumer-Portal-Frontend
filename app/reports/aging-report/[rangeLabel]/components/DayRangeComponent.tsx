"use client";

import { useMemo, useState } from "react";
import DatePicker from "../../../../components/DatePicker";
import { AgingReportDailyBreakdown } from "../../page";
import DayRangeTable from "./DayRangeTable";
import { format, parseISO } from "date-fns";
import { Button } from "@radix-ui/themes";
import { getDateRange } from "../../../../utils/utils";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import SearchFilter from "../../../../components/reuseable-filters/SearchFilter";

import DetailTable from "../../../../components/table/DetailTable";
import { useSearchParams } from "next/navigation";

interface DayRangeComponentProp {
  data: AgingReportDailyBreakdown[];
  rangeLabel: string;
}

const DayRangeComponent = ({ data, rangeLabel }: DayRangeComponentProp) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  let allComplaints = useMemo(() => {
    return data?.flatMap((item) => item?.complaints) ?? [];
  }, [data]);

  if (search) {
    const lowerSearch = search.toLowerCase();

    allComplaints = allComplaints?.filter(
      (c) =>
        c.shopName?.toLowerCase().includes(lowerSearch) ||
        c.phoneNumber?.includes(lowerSearch) ||
        c.categoryName?.toLowerCase().includes(lowerSearch) ||
        c.complaintType?.toLowerCase().includes(lowerSearch) ||
        c.status?.toString().includes(lowerSearch),
    );
  }
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },

          {
            label: "Aging Report",
            href: "/reports/aging-report",
          },
          {
            label: `${rangeLabel} Days`,
          },
        ]}
      />

      <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">Day Range Complaints</p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {allComplaints?.length?.toLocaleString()} Records
        </p>
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          {/* <div className="flex justify-end items-center gap-2">
            <DateFilter />
            <ClearButton />
          </div> */}
        </div>
        <DetailTable rowsData={allComplaints ?? []} isBreadCrumbs={true} />
      </div>
    </>
  );
};

export default DayRangeComponent;
