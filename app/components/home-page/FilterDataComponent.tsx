"use client";

import CustomSearchDropdown, { Option } from "../CustomSearchDropdown";
import { Button } from "@radix-ui/themes";
import CustomTextField from "../CustomTextField";
import { useRouter } from "next/navigation";

const FilterDataComponent = () => {
  const router = useRouter();
  const districtOptions: Option[] = [
    { label: "Lahore", value: "lahore" },
    { label: "Karachi", value: "karachi" },
    { label: "Islamabad", value: "islamabad" },
  ];

  const complainTypeOptions: Option[] = [
    { label: "Water Supply", value: "water" },
    { label: "Electricity", value: "electricity" },
    { label: "Road Maintenance", value: "road" },
  ];

  const statusOptions: Option[] = [
    { label: "Resolved", value: "resolved" },
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Escalated", value: "escalated" },
  ];

  return (
    <div className="rounded-xl px-4! py-3! bg-white ">
      <p className="text-sm text-[#202224] font-bold mb-4!">Apply Filters</p>

      <div className="flex flex-col! gap-2">
        <CustomTextField placeholder="Complain ID" />

        <CustomSearchDropdown
          placeholder="Select District"
          options={districtOptions}
        />

        <CustomSearchDropdown
          placeholder="Complain Type"
          options={complainTypeOptions}
        />

        <CustomSearchDropdown placeholder="Status" options={statusOptions} />
        <Button
          className="bg-(--primary)! h-9!"
          onClick={() => router.push("/meeting")}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default FilterDataComponent;
