"use client";

import { Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { OptionType } from "../Form/CustomSelect";
import { DEFAULT_YEAR } from "../../utils/utils";

const defaultOption = { value: "select", label: "Select Year" };

const yearOptions: OptionType[] = Array.from({ length: 26 }, (_, i) => {
  const year = 2000 + i;
  return { value: year.toString(), label: year.toString() };
});

const YearFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let selectedYear = searchParams.get("year");

  // Set DEFAULT_YEAR if no year exists
  useEffect(() => {
    if (!selectedYear) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("year", DEFAULT_YEAR.toString());
      router.replace(`?${params.toString()}`);
    }
  }, []);

  // const handleYearChange = (newValue: OptionType | null) => {
  //   if (!newValue) return;

  //   router.push(`?year=${newValue.value}`); // update url → triggers server fetch
  // };

  selectedYear = selectedYear || DEFAULT_YEAR.toString();

  const handleYearChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "select") {
      params.delete("year");
    } else {
      params.set("year", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {/* <CustomSelect
          options={[defaultOption, ...yearOptions]}
          id="yearFilter"
          closeMenuOnSelect={true}
          value={yearOptions.find((opt) => opt.value === selectedYear || null)}
          onChangeSingle={handleYearChange}
        /> */}
      <Select.Root
        size="3"
        value={selectedYear}
        onValueChange={handleYearChange}
      >
        <Select.Trigger className="shadow-[0px_0px_0px_1.5px_#EFF0F2]! focus:shadow-[0px_0px_0px_1.5px_#0C8CE9]! text-[#545861]! font-medium! text-[0.875rem]! h-full! py-[9px]! px-3!" />
        <Select.Content>
          <Select.Group>
            {[defaultOption, ...yearOptions].map((d, i) => (
              <Select.Item value={d.value} key={i}>
                {d.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default YearFilter;
