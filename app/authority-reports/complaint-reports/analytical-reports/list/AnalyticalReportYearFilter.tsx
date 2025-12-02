"use client";

import { Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CustomSelect, {
  defaultOption,
  OptionType,
} from "../../../../components/Form/CustomSelect";

const yearOptions: OptionType[] = [{ year: "2024" }, { year: "2025" }].map(
  (year) => {
    return {
      value: year.year,
      label: year.year,
    };
  }
);

const AnalyticalReportYearFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedYear = searchParams.get("year") || ""; // current value from URL

  const handleYearChange = (newValue: OptionType | null) => {
    if (!newValue) return;

    router.push(`?year=${newValue.value}`); // update url → triggers server fetch
  };

  useEffect(() => {
    // If no year is present in the URL → set default year
    if (!selectedYear) {
      router.push(`?year=${yearOptions[1].value}`); // default = 2025
    }
  }, [selectedYear, router]);

  return (
    <>
      <label className="flex items-center gap-1">
        <Text className="text-xs! font-semibold! text-[#2A2A2B]!">
          Select Year:
        </Text>
        <CustomSelect
          options={[defaultOption, ...yearOptions]}
          id="attributeType"
          closeMenuOnSelect={true}
          value={yearOptions.find((opt) => opt.value === selectedYear || null)}
          onChangeSingle={handleYearChange}
        />
      </label>
    </>
  );
};

export default AnalyticalReportYearFilter;
