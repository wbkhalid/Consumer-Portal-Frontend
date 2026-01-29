"use client";

import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useGetSelectedDivision from "../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../hooks/useGetSelectedTehsil";
import { getRole } from "../../utils/utils";
import CustomSearchDropdown from "../../components/CustomSearchDropdown";
import { IoIosTrendingUp } from "react-icons/io";
import Link from "next/link";
import { DownloadSquare01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface Props {
  total: number;
  downloads: number;
}

const HomeFilters = ({ total, downloads }: Props) => {
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
      searchParams.get("divisionId") ?? cookieDivisionId ?? null,
    );
    setSelectedDistrict(
      searchParams.get("districtId") ?? cookieDistrictId ?? null,
    );
    setSelectedTehsil(searchParams.get("tehsilId"));
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
    <div className="flex justify-between items-center bg-white border-b border-b-[#E4E6EA] -mx-2! -mt-2! py-2.5! px-7!">
      <div className="flex gap-3">
        <p
          className="text-[#969799] font-semibold text-[10px] xl:text-sm uppercase bg-[#F5F6F8]! border border-[#D1D5DB] py-1! px-2! rounded-lg cursor-pointer"
          onClick={() =>
            router.push(
              `/complains${searchParams.toString() ? `?${searchParams.toString()}` : ""}`,
            )
          }
        >
          Total Complaints:{" "}
          <span className="text-[#182236] font-bold text-sm">{total}</span>
        </p>
        {/* <p className="text-[#969799] font-semibold text-[10px] xl:text-sm uppercase">
          <IoIosTrendingUp className="text-green-400" />
          <span className="text-[#182236] font-bold text-sm">
            {days?.toFixed(0)}
          </span>
        </p> */}
      </div>

      <div className=" flex gap-3  items-center">
        <div className="flex gap-2">
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
            className="bg-(--primary) text-white cursor-pointer py-1! px-3! rounded-lg! text-xs  font-semibold hover:opacity-90"
            onClick={handleApplyFilter}
          >
            Apply Filters
          </button>
          <button
            className="border border-[#D96F64] text-[#D96F64] cursor-pointer py-1! px-3! rounded-lg! text-xs  font-semibold hover:opacity-90"
            onClick={handleClearFilter}
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div className="flex items-center gap-0.5 shadow-lg px-2! py-1! rounded-sm">
        <HugeiconsIcon icon={DownloadSquare01Icon} size={20} />
        <div>
          <p className="text-[#182236] font-bold  text-[10px] text-center">
            {downloads}
          </p>
          <p className="text-[#969799] font-semibold text-[10px]">Downloads</p>
        </div>
      </div>
    </div>
  );
};

export default HomeFilters;
