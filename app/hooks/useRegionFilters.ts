"use client";

import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export const useRegionFilters = () => {
  const searchParams = useSearchParams();

  const isValid = (v: string | undefined | null): v is string =>
    v !== null && v !== undefined && v !== "" && v !== "0";

  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  const getValue = (cookieKey: string, queryKey: string) => {
    const cookieValue = Cookies.get(cookieKey);
    if (isValid(cookieValue)) return cookieValue;

    const queryValue = searchParams.get(queryKey);
    return isValid(queryValue) ? queryValue : "";
  };

  const divisionId = getValue("divisionId", "divisionId");
  const districtId = getValue("districtId", "districtId");
  const tehsilId = getValue("tehsilId", "tehsilId");

  return { divisionId, districtId, tehsilId, startDate, endDate };
};
