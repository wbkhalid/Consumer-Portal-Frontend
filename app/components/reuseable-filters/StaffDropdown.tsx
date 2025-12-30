"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomSelect from "../../components/CustomSelect";
import useGetAllStaff, { ManageStaffData } from "../../hooks/useGetAllStaff";
import { useRegionFilters } from "../../hooks/useRegionFilters";

const StaffDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const { data: staffData } = useGetAllStaff({
    divisionId,
    districtId,
    tehsilId,
  });

  const selectedStaffId = searchParams.get("assignedTo") || "ALL";

  const options = [
    { label: "All", value: "ALL" },
    ...(staffData?.map((staff: ManageStaffData) => ({
      label: staff.fullName,
      value: staff.userId,
    })) || []),
  ];

  const handleChange = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "ALL") {
      params.delete("assignedTo");
    } else {
      params.set("assignedTo", value.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const currentValue = selectedStaffId === "ALL" ? "" : selectedStaffId;

  return (
    <CustomSelect
      placeholder="Select Authority"
      options={options}
      value={currentValue}
      onChange={handleChange}
      className="text-xs!"
    />
  );
};

export default StaffDropdown;
