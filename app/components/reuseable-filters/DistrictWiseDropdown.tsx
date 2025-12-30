"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomSelect from "../CustomSelect";
import useGetAllDistricts from "../../hooks/useGetAllDistricts";

const DistrictWiseDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: districtData } = useGetAllDistricts();

  const selectedDistrictId = searchParams.get("district") || "";

  const options = [
    { label: "All", value: "All" },
    ...(districtData?.map((district) => ({
      label: district.name,
      value: district.id.toString(),
    })) || []),
  ];

  const handleChange = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "All") {
      params.delete("district");
    } else {
      params.set("district", value.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <CustomSelect
      placeholder="Select District"
      options={options}
      value={selectedDistrictId}
      onChange={handleChange}
      className="text-xs!"
    />
  );
};

export default DistrictWiseDropdown;
