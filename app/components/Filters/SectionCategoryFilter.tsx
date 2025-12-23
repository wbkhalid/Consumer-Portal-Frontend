"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useGetSectionCategory from "../../hooks/useGetSectionCategory";
import { OptionType } from "../Form/CustomSelect";

const defaultOption = { value: "select", label: "Select Section Category" };

const SectionCategoryFilter = () => {
  const { data } = useGetSectionCategory();
  const [sectionCategoryOptions, setsectionCategoryOptions] =
    useState<OptionType[]>();
  console.log("section category data", data);

  useEffect(() => {
    if (data) {
      const sectionCategoryOptions: OptionType[] = data.map((d) => {
        return {
          value: String(d.id),
          label: d.name,
        };
      });

      console.log("sectionCategoryOptions", sectionCategoryOptions);
      if (sectionCategoryOptions)
        setsectionCategoryOptions(sectionCategoryOptions);
    }
  }, [data]);

  const router = useRouter();
  const searchParams = useSearchParams();

  let selectedItem = searchParams.get("sectionCategory");

  // Set DEFAULT_YEAR if no year exists
  useEffect(() => {
    if (!selectedItem) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sectionCategory", defaultOption.value);
      router.replace(`?${params.toString()}`);
    }
  }, []);

  // const handleChange = (newValue: OptionType | null) => {
  //   if (!newValue) return;

  //   router.push(`?section=${newValue.value}`); // update url → triggers server fetch
  // };

  selectedItem = selectedItem || defaultOption.value;

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "select") {
      params.delete("sectionCategory");
    } else {
      params.set("sectionCategory", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {/* <CustomSelect
          options={[defaultOption, ...yearOptions]}
          id="SectionCategoryFilter"
          closeMenuOnSelect={true}
          value={yearOptions.find((opt) => opt.value === selectedItem || null)}
          onChangeSingle={handleChange}
        /> */}
      {sectionCategoryOptions && sectionCategoryOptions.length > 0 && (
        <Select.Root size="3" value={selectedItem} onValueChange={handleChange}>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {[defaultOption, ...sectionCategoryOptions].map((d, i) => (
                <Select.Item value={d.value} key={i}>
                  {d.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
    </>
  );
};

export default SectionCategoryFilter;
