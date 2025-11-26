"use client";

import CustomSearchDropdown from "../CustomSearchDropdown";
import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import useGetSelectedDivision from "../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../hooks/useGetSelectedTehsil";

const FilterDataComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = Cookies.get("role");
  const cookieDivisionId = Cookies.get("divisionId");
  const cookieDistrictId = Cookies.get("districtId");
  const cookietehsilId = Cookies.get("tehsilId");

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

  const [selectedDivision, setSelectedDivision] = useState<string | null>(
    canShowDistrict ? cookieDivisionId || null : searchParams.get("divisionId")
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
    canShowTehsil ? cookieDistrictId || null : searchParams.get("districtId")
  );
  const [selectedTehsil, setSelectedTehsil] = useState<string | null>(
    searchParams.get("tehsilId")
  );

  const { data: divisionData } = useGetSelectedDivision({ id: 1 });
  const { data: districtData } = useGetSelectedDistrict({
    id: selectedDivision ? Number(selectedDivision) : undefined,
  });
  const { data: tehsilData } = useGetSelectedTehsil({
    id: selectedDistrict ? Number(selectedDistrict) : undefined,
  });

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (selectedDivision) params.set("divisionId", selectedDivision);
    if (selectedDistrict) params.set("districtId", selectedDistrict);
    if (selectedTehsil) params.set("tehsilId", selectedTehsil);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="rounded-xl px-4! py-3! bg-white">
      <p className="text-sm text-[#202224] font-bold mb-4!">Apply Filters</p>

      <div className="flex flex-col! gap-2">
        {canShowDivision && (
          <CustomSearchDropdown
            placeholder="Select Division"
            options={[
              { label: "All Divisions", value: "" },
              ...(divisionData?.map((division) => ({
                label: division?.name,
                value: String(division?.id),
              })) ?? []),
            ]}
            value={selectedDivision ?? ""}
            onChange={(val) => {
              setSelectedDivision(val);
              setSelectedDistrict(null);
              setSelectedTehsil(null);
            }}
          />
        )}

        {canShowDistrict && (
          <CustomSearchDropdown
            placeholder="Select District"
            options={[
              { label: "All Districts", value: "" },
              ...(districtData?.map((district) => ({
                label: district?.name,
                value: String(district?.id),
              })) ?? []),
            ]}
            value={selectedDistrict ?? ""}
            onChange={(val) => {
              setSelectedDistrict(val);
              setSelectedTehsil(null);
            }}
          />
        )}

        {canShowTehsil && (
          <CustomSearchDropdown
            placeholder="Select Tehsil"
            options={[
              { label: "All Tehsils", value: "" },
              ...(tehsilData?.map((tehsil) => ({
                label: tehsil?.name,
                value: String(tehsil?.id),
              })) ?? []),
            ]}
            value={selectedTehsil ?? ""}
            onChange={(val) => setSelectedTehsil(val)}
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
