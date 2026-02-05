"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useGetSelectedDivision from "../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../hooks/useGetSelectedTehsil";
import { getRole } from "../../utils/utils";
import CustomSearchDropdown from "../../components/CustomSearchDropdown";
import { FilterIcon, Search02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = getRole();
  const cookieDivisionId = Cookies.get("divisionId");
  const cookieDistrictId = Cookies.get("districtId");

  const normalizeParam = (val: string | null | undefined) => {
    if (!val || val === "0") return null;
    return val;
  };

  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedTehsil, setSelectedTehsil] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDivision(
      normalizeParam(searchParams.get("divisionId")) ??
        normalizeParam(cookieDivisionId),
    );

    setSelectedDistrict(
      normalizeParam(searchParams.get("districtId")) ??
        normalizeParam(cookieDistrictId),
    );

    setSelectedTehsil(normalizeParam(searchParams.get("tehsilId")));
  }, [searchParams, cookieDivisionId, cookieDistrictId]);

  if (role === "AC") return null;

  const canShowDivision = ["Admin", "DG", "Secretary"].includes(role ?? "");
  const canShowDistrict = ["Admin", "DG", "Secretary", "Commissioner"].includes(
    role ?? "",
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

  const handleClearFilter = () => {
    setSelectedDivision(null);
    setSelectedDistrict(null);
    setSelectedTehsil(null);
    router.push(window.location.pathname);
  };
  return (
    <div className="flex justify-end items-center gap-2.5 rounded-xl border border-[rgba(255,255,255,0.8)] py-2.5! px-7! shadow-[inset_0px_0px_4px_rgba(0,0,0,0.05)] mt-2.5! w-fit">
      <div className="flex gap-2">
        {/* <div className="flex gap-2 items-center">
            <HugeiconsIcon icon={FilterIcon} color="#90A1B9" size={16} />
            <p className="text-[#62748E] font-bold text-[10px] uppercase tracking-widest">
              Filter
            </p>
            <div className="bg-[#62748E] w-px h-4" />
          </div> */}
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
            value={selectedDivision}
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
            isHome={true}
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
            value={selectedDistrict}
            onChange={(val) => {
              if (val === "ALL") {
                setSelectedDistrict(null);
                setSelectedTehsil(null);
              } else {
                setSelectedDistrict(String(val));
                setSelectedTehsil(null);
              }
            }}
            isHome={true}
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
            value={selectedTehsil}
            onChange={(val) => {
              if (val === "ALL") {
                setSelectedTehsil(null);
              } else {
                setSelectedTehsil(String(val));
              }
            }}
            isHome={true}
          />
        )}
      </div>
      <div className="flex gap-1 items-center">
        <button
          className="bg-(--primary) flex gap-1.5 text-white cursor-pointer py-1! px-3! rounded-xl! text-xs  font-semibold hover:opacity-90 uppercase tracking-widest"
          onClick={handleApplyFilter}
        >
          {/* <HugeiconsIcon icon={Search02Icon} size={18} /> */}
          Apply Filter
        </button>

        <div
          className="border-[0.6px] border-[rgba(226,232,240,0.8)] rounded-lg p-1! cursor-pointer"
          onClick={handleClearFilter}
        >
          <Image
            src="/icons/refresh.png"
            alt="refresh"
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeFilters;
