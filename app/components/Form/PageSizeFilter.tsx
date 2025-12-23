import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GroupBase, StylesConfig } from "react-select";
import { OptionType } from "./CustomSelect";

export const defaultOption = { value: "10", label: "Select" };

const rowCountOptions: OptionType[] = [10, 20, 30, 40, 50].map((d) => {
  return {
    value: d.toString(),
    label: d.toString(),
  };
});

const PageSizeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageSize, setPageSize] = useState<string>("10");

  const handlePageSizeChange = (value: string) => {
    setPageSize(value);

    const params = new URLSearchParams(searchParams);
    params.set("pageSize", value);

    router.push("?" + params.toString(), { scroll: true });
  };

  useEffect(() => {
    handlePageSizeChange("10");
  }, []);

  return (
    <>
      <Select.Root value={pageSize} onValueChange={handlePageSizeChange}>
        <Select.Trigger
          className={`w-full text-xs! min-w-[100px] max-w-[150px]! rounded-full! hover:border-(--priamry)!  text-white `}
        />
        <Select.Content className="w-[93%] ml-[6%] overflow-auto">
          {rowCountOptions.map((opt) => (
            <Select.Item
              key={opt.value}
              value={opt.value}
              className="text-xs! py-0.5! leading-none! truncate whitespace-nowrap"
            >
              {opt.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {/* <CustomSelect
            menuPlacement="top"
            isClearable={false}
            options={rowCountOptions}
            isSearchable={false}
            closeMenuOnSelect={true}
            singleSelectStyles={paginationSelectStyles}
            value={selectedOption}
            onChangeSingle={(
              newValue: SingleValue<{ value: string; label: string }>
            ) => {
              if (newValue) {
                handlePageSizeChange(newValue.value);
                setSelectedOption({
                  label: newValue.label,
                  value: newValue.value,
                });
              }
            }}
          /> */}
    </>
  );
};

export default PageSizeFilter;

// Custom Single Select Style
export const paginationSelectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "8px", // Narrower scrollbar
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#22a3bd",
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#108fa8",
    },
    fontWeight: 600,
    borderRadius: 20,
    background: "#fff",
    border: "none",
    boxShadow: "0 0 0 1.5px #1C6BA6",
    paddingLeft: "7px",
    paddingRight: "6px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#545861", // ✅ selected value text
    fontSize: "16px",
    fontWeight: 600,
    padding: 0,
    margin: 0,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: 0,
    background: "#1C6BA6",
    border: "1.35px solid #1C6BA6",
    overflow: "hidden",
    borderRadius: "20px",
    marginLeft: "5px",
    color: state.isFocused ? "#fff" : "rgba(255,255,255,0.9)",
    width: "21px",
    height: "21px",
    "&:hover": {
      color: "#fff", // hover border color
    },
  }),

  indicatorSeparator: (base) => ({
    ...base,
    display: "none", // remove vertical line if needed
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 4,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    padding: "4px 8px",
    borderRadius: 14,
    border: 0,
    boxShadow: "0px 0px 7px 3px rgba(0,0,0,0.1)",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#C2E7E4" // selected background color
      : state.isFocused
      ? "#E4EDEC" // hover background color
      : "white",
    color: "#333",
    fontSize: "14px",
    padding: "10px",
    borderRadius: 7,
  }),
  // Styles for the dropdown menu list (this is where scrollbar lives)
  menuList: (base) => ({
    ...base,
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#22a3bd",
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#108fa8",
    },
  }),
};
