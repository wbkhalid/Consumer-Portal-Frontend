"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toLocalDateString } from "../../utils/utils";
import CustomCalendar from "../Form/CustomCalender";

const DatesFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialStart = searchParams.get("startDate") || "";
  const initialEnd = searchParams.get("endDate") || "";

  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);

  const handleFilterChange = useCallback(
    (start: string, end: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (start) params.set("startDate", start);
      else params.delete("startDate");

      if (end) params.set("endDate", end);
      else params.delete("endDate");

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Keep state synced with URL
  useEffect(() => {
    setStartDate(initialStart);
    setEndDate(initialEnd);
  }, [initialStart, initialEnd]);

  return (
    <>
      {/* Start Date */}
      <CustomCalendar
        value={startDate}
        placeHolder="Select Start Date"
        maxDate={new Date()}
        onChange={(date) => {
          const formatted = toLocalDateString(date);
          setStartDate(formatted);
          handleFilterChange(formatted, endDate); // 🔥 auto-trigger
        }}
      />

      {/* End Date */}
      <CustomCalendar
        value={endDate}
        placeHolder="Select End Date"
        maxDate={new Date()}
        onChange={(date) => {
          const formatted = toLocalDateString(date);
          setEndDate(formatted);
          handleFilterChange(startDate, formatted); // 🔥 auto-trigger
        }}
      />
    </>
  );
};

export default DatesFilter;
