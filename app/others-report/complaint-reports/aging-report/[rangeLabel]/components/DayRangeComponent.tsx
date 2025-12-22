"use client";

import { useMemo, useState } from "react";
import DatePicker from "../../../../../components/DatePicker";
import { ManageComplainsData } from "../../../../../hooks/useGetAllComplains";
import { AgingReportDailyBreakdown } from "../../page";
import DayRangeTable from "./DayRangeTable";
import { format, parseISO } from "date-fns";
import { Button } from "@radix-ui/themes";
import { getDateRange } from "../../../../../utils/utils";
import Breadcrumbs from "../../../../../components/Breadcrumbs";

interface DayRangeComponentProp {
  data: AgingReportDailyBreakdown[];
  rangeLabel: string;
}

const DayRangeComponent = ({ data, rangeLabel }: DayRangeComponentProp) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { minDate, maxDate } = getDateRange(rangeLabel);

  const filteredComplaints = useMemo(() => {
    if (!selectedDate) {
      return data?.flatMap((day) => day?.complaints);
    }

    const selected = format(selectedDate, "yyyy-MM-dd");

    const dayData = data?.find((day) => {
      const backendDate = format(parseISO(day?.date), "yyyy-MM-dd");

      return backendDate === selected;
    });

    return dayData?.complaints ?? [];
  }, [data, selectedDate]);

  return (
    <div>
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },

            {
              label: "Aging Report",
              href: "/others-report/complaint-reports/aging-report",
            },
            {
              label: `${rangeLabel} Days`,
            },
          ]}
        />

        <div className="flex justify-between items-center px-4! py-2!">
          <div className="flex items-center gap-1">
            <p className="text-(--primary) font-semibold">
              Day Range Complaints
            </p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {filteredComplaints?.length?.toLocaleString()} Records
            </p>
          </div>
          <div className="flex gap-3 items-center">
            {/* <DatePicker
              onSelectDate={(date) => setSelectedDate(date)}
              placeholder="Filter by date"
            /> */}
            <DatePicker
              onSelectDate={(date) => setSelectedDate(date)}
              placeholder="Filter by date"
              minDate={minDate}
              maxDate={maxDate}
            />
            <Button
              variant="ghost"
              onClick={() => setSelectedDate(null)}
              className="cursor-pointer!"
            >
              Clear
            </Button>
          </div>
        </div>
        <DayRangeTable rowsData={filteredComplaints ?? []} />
      </div>
    </div>
  );
};

export default DayRangeComponent;
