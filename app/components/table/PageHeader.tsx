"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import Select from "react-select";

interface Option {
  label: string;
  value: string | number;
}

interface PageHeaderProps {
  title: string;
  recordCount?: number;
  searchValue?: string | number | null;
  onSearchChange?: (value: string | number | null) => void;
  searchOptions?: Option[];
  buttonLabel?: string;
  onButtonClick?: () => void;
  searchPlaceholder?: string;
  hideSearch?: boolean;
  hideButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  recordCount,
  searchValue,
  onSearchChange,
  searchOptions = [],
  buttonLabel = "Add New",
  onButtonClick,
  searchPlaceholder = "Search...",
  hideSearch = false,
  hideButton = false,
}) => {
  return (
    <div className="flex justify-between items-center p-2">
      {/* Title and Record Count */}
      <div className="flex items-center gap-1">
        <p className="text-[#181D27] font-semibold">{title}</p>
        {recordCount !== undefined && (
          <p className="border border-main text-main font-semibold rounded-full px-1 py-[2px] text-xs">
            {recordCount.toLocaleString()} Records
          </p>
        )}
      </div>

      {/* Search (React-Select) and Button */}
      <div className="flex gap-3 items-center">
        {!hideSearch && (
          <div className="w-[200px]">
            <Select
              options={searchOptions}
              value={
                searchOptions.find((opt) => opt.value === searchValue) || null
              }
              onChange={(selected) => onSearchChange?.(selected?.value ?? null)}
              placeholder={searchPlaceholder}
              isClearable
              isSearchable
              classNamePrefix="react-select"
              menuPortalTarget={
                typeof window !== "undefined" ? document.body : null
              }
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused
                    ? "var(--color-main)"
                    : "#EFF0F2",
                  boxShadow: "none",
                  "&:hover": { borderColor: "var(--color-main)" },
                  outline: "none",
                  borderRadius: "0.5rem",
                  minHeight: "35px",
                  height: "35px",
                  fontSize: "13px",
                  padding: "0 4px",
                  zIndex: 9999,
                }),
                menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                menu: (base) => ({ ...base, zIndex: 99999 }),
                valueContainer: (base) => ({
                  ...base,
                  padding: "0 4px",
                }),
                indicatorsContainer: (base) => ({
                  ...base,
                  padding: "0 4px",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#3A3A3A",
                  fontSize: "11px",
                }),
                option: (base, state) => ({
                  ...base,
                  fontSize: "11px",
                  padding: "6px 10px",
                  backgroundColor: state.isSelected
                    ? "var(--color-main)"
                    : state.isFocused
                    ? "var(--color-main)"
                    : "#fff",
                  color:
                    state.isSelected || state.isFocused
                      ? "#fff"
                      : "var(--color-main)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  "&:active": {
                    backgroundColor: "var(--color-main)",
                    color: "#fff",
                  },
                }),
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#008ECC",
                  primary25: "rgba(0,142,204,0.1)",
                },
              })}
            />
          </div>
        )}

        {!hideButton && (
          <Button
            className="!bg-main !cursor-pointer !rounded-lg !h-[35px] !text-sm"
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
