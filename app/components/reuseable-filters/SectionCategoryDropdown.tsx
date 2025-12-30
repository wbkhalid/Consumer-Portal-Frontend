"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useGetSectionCategory from "../../hooks/useGetSectionCategory";
import CustomSelect from "../../components/CustomSelect";

const SectionCategoryDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: sectionCategoryData } = useGetSectionCategory();

  const selectedSectionCategoryId =
    searchParams.get("sectionCategory") || "ALL";

  const options = [
    { label: "All", value: "ALL" },
    ...(sectionCategoryData?.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    })) || []),
  ];

  const handleChange = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "ALL") {
      params.delete("sectionCategory");
    } else {
      params.set("sectionCategory", value.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const currentValue =
    selectedSectionCategoryId === "ALL" ? "" : selectedSectionCategoryId;

  return (
    <CustomSelect
      placeholder="Select Section Category"
      options={options}
      value={currentValue}
      onChange={handleChange}
      className="text-xs!"
    />
  );
};

export default SectionCategoryDropdown;
