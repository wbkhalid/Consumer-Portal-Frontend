"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useGetAllSections from "../../hooks/useGetAllSections";
import { OptionType } from "../Form/CustomSelect";

const defaultOption = { value: "select", label: "Select Section" };

const SectionFilter = () => {
  const { data } = useGetAllSections();
  const [sectionOptions, setsectionOptions] = useState<OptionType[]>();
  console.log("section data", data);

  // useEffect(() => {
  //   if (data) {
  //     const sectionOptions: OptionType[] = data.map((d) => {
  //       return {
  //         value: String(d.id),
  //         label: d.name,
  //       };
  //     });
  //     if (sectionOptions) setsectionOptions(sectionOptions);
  //   }
  // }, [data]);

  useEffect(() => {
    if (!data) return;

    const grouped = data.reduce<Record<string, number[]>>((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(Number(item.id));
      return acc;
    }, {});

    const sectionOptions: OptionType[] = Object.entries(grouped).map(
      ([name, ids]) => ({
        label: name,
        value: ids.toString(), // number[]
      })
    );

    console.log("sectionOptions", sectionOptions);

    if (sectionOptions) setsectionOptions(sectionOptions);
  }, [data]);

  const router = useRouter();
  const searchParams = useSearchParams();

  let selectedItem = searchParams.get("section");

  // Set DEFAULT_YEAR if no year exists
  useEffect(() => {
    if (!selectedItem) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("section", defaultOption.value);
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
      params.delete("section");
    } else {
      params.set("section", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {/* <CustomSelect
          options={[defaultOption, ...yearOptions]}
          id="SectionFilter"
          closeMenuOnSelect={true}
          value={yearOptions.find((opt) => opt.value === selectedItem || null)}
          onChangeSingle={handleChange}
        /> */}
      {sectionOptions && sectionOptions.length > 0 && (
        <Select.Root size="3" value={selectedItem} onValueChange={handleChange}>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {[defaultOption, ...sectionOptions].map((d, i) => (
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

export default SectionFilter;
