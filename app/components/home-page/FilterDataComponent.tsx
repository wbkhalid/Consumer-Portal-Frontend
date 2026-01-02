"use client";

import CustomSearchDropdown from "../CustomSearchDropdown";
import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useGetSelectedDivision from "../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../hooks/useGetSelectedTehsil";
import { getRole } from "../../utils/utils";

const FilterDataComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = getRole();
  const cookieDivisionId = Cookies.get("divisionId");
  const cookieDistrictId = Cookies.get("districtId");

  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedTehsil, setSelectedTehsil] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDivision(
      searchParams.get("divisionId") ?? cookieDivisionId ?? null
    );
    setSelectedDistrict(
      searchParams.get("districtId") ?? cookieDistrictId ?? null
    );
    setSelectedTehsil(searchParams.get("tehsilId"));
  }, [searchParams, cookieDivisionId, cookieDistrictId]);

  if (role === "AC") return null;

  const canShowDivision = ["Admin", "DG", "Secretary"].includes(role ?? "");
  const canShowDistrict = ["Admin", "DG", "Secretary", "Commissioner"].includes(
    role ?? ""
  );
  const canShowTehsil = [
    "Admin",
    "DG",
    "Secretary",
    "Commissioner",
    "DC",
    "AD",
  ].includes(role ?? "");

  const { data: divisionData } = useGetSelectedDivision({ id: 1 });

  const { data: districtData } = useGetSelectedDistrict({
    id: selectedDivision ? Number(selectedDivision) : undefined,
  });

  const { data: tehsilData } = useGetSelectedTehsil({
    id: selectedDistrict ? Number(selectedDistrict) : undefined,
  });

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    selectedDivision
      ? params.set("divisionId", selectedDivision)
      : params.delete("divisionId");

    selectedDistrict
      ? params.set("districtId", selectedDistrict)
      : params.delete("districtId");

    selectedTehsil
      ? params.set("tehsilId", selectedTehsil)
      : params.delete("tehsilId");

    router.push(`?${params.toString()}`);
  };

  /* ---------------- CLEAR FILTER ---------------- */
  const handleClearFilter = () => {
    setSelectedDivision(null);
    setSelectedDistrict(null);
    setSelectedTehsil(null);
    router.push(window.location.pathname);
  };

  return (
    <div className="rounded-xl px-4! py-3! bg-white">
      <div className="mb-4! flex justify-between items-center">
        <p className="text-sm font-bold text-[#202224]">Apply Filters</p>

        <Button size="1" variant="soft" onClick={handleClearFilter}>
          Clear Filters
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {canShowDivision && (
          <CustomSearchDropdown
            placeholder="Select Division"
            options={[
              { label: "All Divisions", value: "ALL" },
              ...(divisionData?.map((d) => ({
                label: d.name,
                value: String(d.id),
              })) ?? []),
            ]}
            value={selectedDivision ?? "ALL"}
            onChange={(val) => {
              if (val === "ALL") {
                setSelectedDivision(null);
                setSelectedDistrict(null);
                setSelectedTehsil(null);
              } else {
                setSelectedDivision(String(val));
                setSelectedDistrict(null);
                setSelectedTehsil(null);
              }
            }}
          />
        )}

        {canShowDistrict && (
          <CustomSearchDropdown
            placeholder="Select District"
            options={[
              { label: "All Districts", value: "ALL" },
              ...(districtData?.map((d) => ({
                label: d.name,
                value: String(d.id),
              })) ?? []),
            ]}
            value={selectedDistrict ?? "ALL"}
            onChange={(val) => {
              if (val === "ALL") {
                setSelectedDistrict(null);
                setSelectedTehsil(null);
              } else {
                setSelectedDistrict(String(val));
                setSelectedTehsil(null);
              }
            }}
          />
        )}

        {canShowTehsil && (
          <CustomSearchDropdown
            placeholder="Select Tehsil"
            options={[
              { label: "All Tehsils", value: "ALL" },
              ...(tehsilData?.map((t) => ({
                label: t.name,
                value: String(t.id),
              })) ?? []),
            ]}
            value={selectedTehsil ?? "ALL"}
            onChange={(val) => {
              if (val === "ALL") {
                setSelectedTehsil(null);
              } else {
                setSelectedTehsil(String(val));
              }
            }}
          />
        )}

        <Button
          className="bg-(--primary)! h-9! cursor-pointer!"
          onClick={handleApplyFilter}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterDataComponent;
