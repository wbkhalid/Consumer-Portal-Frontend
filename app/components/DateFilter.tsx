"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "./DatePicker";

interface DateFilterProps {
  startKey?: string;
  endKey?: string;
}

const DateFilter = ({
  startKey = "startDate",
  endKey = "endDate",
}: DateFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const updateQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const sd = searchParams.get(startKey);
    const ed = searchParams.get(endKey);

    setStartDate(sd ? new Date(sd) : null);
    setEndDate(ed ? new Date(ed) : null);
  }, [searchParams, startKey, endKey]);

  const formatDateForQuery = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <div className="flex gap-1 items-center">
      <DatePicker
        placeholder="Start Date"
        value={startDate}
        onSelectDate={(date) => {
          setStartDate(date);
          setEndDate(null);

          updateQueryParams({
            [startKey]: date ? formatDateForQuery(date) : null,
            [endKey]: null,
          });
        }}
      />

      <DatePicker
        placeholder="End Date"
        value={endDate}
        minDate={startDate || undefined}
        disabled={!startDate}
        onSelectDate={(date) => {
          setEndDate(date);

          updateQueryParams({
            [endKey]: date ? formatDateForQuery(date) : null,
          });
        }}
      />
    </div>
  );
};

export default DateFilter;
