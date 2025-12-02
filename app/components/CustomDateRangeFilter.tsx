"use client";

import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRangePicker, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CustomDateRangeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<Range[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    const start = selection.startDate
      ? format(selection.startDate, "yyyy-MM-dd")
      : "";
    const end = selection.endDate
      ? format(selection.endDate, "yyyy-MM-dd")
      : "";

    // Copy existing params
    const params = new URLSearchParams(searchParams.toString());

    // Update only date params
    if (start) params.set("startDate", start);
    else params.delete("startDate");

    if (end) params.set("endDate", end);
    else params.delete("endDate");

    router.push(`?${params.toString()}`);
    setState([selection]);
  };

  // const clearDateSelection = () => {
  //   setState([
  //     {
  //       startDate: undefined,
  //       endDate: undefined,
  //       key: "selection",
  //     },
  //   ]);

  //   const params = new URLSearchParams(searchParams.toString());

  //   // Remove only date params, keep others
  //   params.delete("fromDate");
  //   params.delete("toDate");

  //   router.push(`?${params.toString()}`);
  // };

  return (
    <div className="">
      <DateRangePicker
        className="shadow-sm bg-theme text-sm w-full!"
        rangeColors={["var(--accent-9)"]}
        ranges={state}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        maxDate={new Date()}
        dateDisplayFormat="dd/MM/yyyy"
        direction="horizontal"
        months={2}
      />

      {/* <Button
        color="red"
        size="2"
        variant="soft"
        className="!cursor-pointer !w-fit"
        onClick={clearDateSelection}
      >
        Clear Dates
      </Button> */}
    </div>
  );
};

export default CustomDateRangeFilter;
