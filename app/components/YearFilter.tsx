"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomSelect from "./CustomSelect";

interface YearFilterProps {
  queryKey?: string; // query param key, default: "year"
}

const YearFilter = ({ queryKey = "year" }: YearFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [year, setYear] = useState<string>("");

  const updateQueryParam = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(queryKey, value);
    else params.delete(queryKey);

    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const y = searchParams.get(queryKey);
    setYear(y || "");
  }, [searchParams, queryKey]);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `${currentYear - i}`,
    value: `${currentYear - i}`,
  }));

  return (
    <CustomSelect
      placeholder="Select Year"
      options={yearOptions}
      value={year}
      onChange={(val) => {
        setYear(String(val));
        updateQueryParam(String(val));
      }}
    />
  );
};

export default YearFilter;
