"use client";

import CustomSearchDropdown, { Option } from "../CustomSearchDropdown";
import { Button } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useGetAllDistricts from "../../hooks/useGetAllDistricts";

const FilterDataComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: districtData } = useGetAllDistricts();

  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(
    searchParams.get("districtId")
  );
  // const [selectedStatus, setSelectedStatus] = useState<string | null>(
  //   searchParams.get("status")
  // );

  // const statusOptions: Option[] = [
  //   { label: "Pending", value: "0" },
  //   { label: "Proceeding", value: "1" },
  //   { label: "Escalation", value: "2" },
  //   { label: "Super Escalation", value: "3" },
  //   { label: "Decided on Merit", value: "4" },
  //   { label: "Ex-Party", value: "5" },
  //   { label: "Withdraw", value: "6" },
  //   { label: "Non Prosecution", value: "7" },
  // ];

  const handleApplyFilter = () => {
    const params = new URLSearchParams();

    if (selectedDistrict) params.set("districtId", selectedDistrict);
    // if (selectedStatus) params.set("status", selectedStatus);

    // push to same route with updated query params
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="rounded-xl px-4! py-3! bg-white">
      <p className="text-sm text-[#202224] font-bold mb-4!">Apply Filters</p>

      <div className="flex flex-col! gap-2">
        <CustomSearchDropdown
          placeholder="Select District"
          options={
            districtData?.map((district) => ({
              label: district?.name,
              value: String(district?.id),
            })) ?? []
          }
          value={selectedDistrict ?? ""}
          onChange={(val) => setSelectedDistrict(val)}
        />

        {/* <CustomSearchDropdown
          placeholder="Status"
          options={statusOptions}
          value={selectedStatus ?? ""}
          onChange={(val) => setSelectedStatus(val)}
        /> */}

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
