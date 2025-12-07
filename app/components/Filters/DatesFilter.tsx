"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toLocalDateString } from "../../utils/utils";
import { Button } from "@radix-ui/themes";
import CustomCalendar from "../Form/CustomCalender";

const DatesFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialStart = searchParams.get("startDate") || "";
  const initialEnd = searchParams.get("endDate") || "";

  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);

  const handleFilterChange = useCallback(
    (startDate: string, endDate: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      router.push(`?${params.toString()}`);
    },
    [router]
  );

  // Sync state when URL changes (important for back/forward navigation)
  useEffect(() => {
    setStartDate(initialStart);
    setEndDate(initialEnd);
  }, [initialStart, initialEnd]);

  return (
    <>
      <CustomCalendar
        value={startDate}
        placeHolder="Select Start Date"
        maxDate={new Date()}
        onChange={(date) => {
          const local = toLocalDateString(date);
          setStartDate(local);
        }}
      />

      <CustomCalendar
        value={endDate}
        placeHolder="Select End Date"
        maxDate={new Date()}
        onChange={(date) => {
          const local = toLocalDateString(date);
          setEndDate(local);
        }}
      />

      <Button
        className="bg-(--primary)! cursor-pointer! rounded-full!"
        onClick={() => handleFilterChange(startDate, endDate)}
      >
        Filter
      </Button>
    </>
  );
};

export default DatesFilter;
