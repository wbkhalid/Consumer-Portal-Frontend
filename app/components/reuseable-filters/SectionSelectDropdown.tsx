"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useGetAllSections from "../../hooks/useGetAllSections";

const SectionSelectDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: sectionData } = useGetAllSections();

  const groupedSections = sectionData?.reduce<Record<string, number[]>>(
    (acc, item) => {
      if (!acc[item.name]) acc[item.name] = [];
      acc[item.name].push(item.id);
      return acc;
    },
    {}
  );

  const sectionNames = Object.keys(groupedSections || {});

  const sectionParams = searchParams.getAll("sectionIds");
  const selectedSectionName = sectionParams.length
    ? Object.entries(groupedSections).find(([name, ids]) =>
        ids.some((id) => sectionParams.includes(id.toString()))
      )?.[0] || ""
    : "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "ALL") {
      params.delete("sectionIds");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    const ids = groupedSections[value];

    params.delete("sectionIds");
    ids.forEach((id) => params.append("sectionIds", id.toString()));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select.Root value={selectedSectionName} onValueChange={handleChange}>
      <Select.Trigger
        placeholder="Select Section"
        className="w-full text-xs! min-w-[100px]! rounded-lg! hover:border-(--priamry)! text-white"
      />

      <Select.Content className="w-[93%] ml-[6%] overflow-auto">
        <Select.Group>
          <Select.Item
            value="ALL"
            className="text-xs! py-0.5! leading-none! truncate whitespace-nowrap cursor-pointer!"
          >
            All
          </Select.Item>

          {sectionNames?.map((section) => (
            <Select.Item
              key={section}
              value={section}
              className="text-xs! py-0.5! leading-none! truncate whitespace-nowrap cursor-pointer!"
            >
              {section}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SectionSelectDropdown;
