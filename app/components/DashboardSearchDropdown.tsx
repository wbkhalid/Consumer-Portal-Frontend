"use client";

import React from "react";
import Select, {
  components,
  SingleValueProps,
  DropdownIndicatorProps,
  GroupBase,
  Props as SelectProps,
} from "react-select";
import { Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

export type Option = {
  label: string;
  value: string;
  icon?: string; // optional icon URL
};

type DashboardSearchDropdownProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  options: Option[];
  value?: string | number | null;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
  fontSize?: string;
  disabled?: boolean;
  onInputChange?: (val: string) => void;
  iconPlacement?: "none" | "menu" | "value" | "both";
  isClearable?: boolean;
};

const DropdownIndicator: React.FC<DropdownIndicatorProps<Option, false>> = (
  props
) => {
  return (
    <components.DropdownIndicator {...props}>
      <FiChevronDown
        size={18}
        color="#fff"
        className={`transition-transform duration-200 ${
          props.selectProps.menuIsOpen ? "rotate-180" : ""
        }`}
      />
    </components.DropdownIndicator>
  );
};

const DashboardSearchDropdown: React.FC<DashboardSearchDropdownProps> = ({
  label,
  name,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  className = "",
  error = "",
  fontSize = ".875rem",
  disabled,
  onInputChange,
  iconPlacement = "none",
  isClearable = true,
}) => {
  const selectedOption =
    options?.find((opt) => String(opt.value) === String(value ?? "")) || null;

  // ✅ SingleValue with icon
  const SingleValueWithIcon: React.FC<SingleValueProps<Option, false>> = (
    props
  ) => {
    const { data } = props;
    return (
      <components.SingleValue {...props}>
        <div className="flex items-center gap-2">
          {data.icon && (
            <Image
              src={data.icon}
              alt={`${data.label} icon`}
              width={18}
              height={18}
              className="rounded"
            />
          )}
          <span style={{ fontSize }}>{data.label}</span>
        </div>
      </components.SingleValue>
    );
  };

  const selectComponents: Partial<
    SelectProps<Option, false, GroupBase<Option>>["components"]
  > = {
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
    DropdownIndicator,
  };

  if (iconPlacement === "value" || iconPlacement === "both") {
    selectComponents.SingleValue = SingleValueWithIcon;
  }

  const wantMenuIcons = iconPlacement === "menu" || iconPlacement === "both";
  const wantValueIcons = iconPlacement === "value" || iconPlacement === "both";

  return (
    <Box className={`w-full ${className}`}>
      {label && (
        <Text
          as="label"
          htmlFor={name}
          className="block mb-1! text-white text-xs"
        >
          {label}
        </Text>
      )}

      <Select<Option, false>
        id={name}
        instanceId={name}
        placeholder={placeholder}
        options={options}
        isDisabled={disabled}
        value={selectedOption}
        onChange={(selected) => onChange?.(selected?.value || "")}
        isClearable={isClearable}
        onInputChange={(inputValue, { action }) => {
          if (action === "input-change") onInputChange?.(inputValue);
        }}
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : null
        }
        components={selectComponents}
        formatOptionLabel={
          wantMenuIcons || wantValueIcons
            ? (opt, { context }) => {
                if (context === "menu" && wantMenuIcons) {
                  return (
                    <div className="flex items-center gap-2">
                      {opt.icon && (
                        <Image
                          src={opt.icon}
                          alt={`${opt.label} icon`}
                          width={20}
                          height={20}
                          className="rounded"
                        />
                      )}
                      <span style={{ fontSize }}>{opt.label}</span>
                    </div>
                  );
                }

                if (context === "value" && wantValueIcons) {
                  return <span style={{ fontSize }}>{opt.label}</span>;
                }

                return <span style={{ fontSize }}>{opt.label}</span>;
              }
            : undefined
        }
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "var(--primary)",
            borderWidth: 1,
            borderColor: state.isFocused ? "#1BCEF5" : "#1BCEF5",
            boxShadow: "none",
            borderRadius: 0,
            height: 40,
            minHeight: 40,
            padding: "0",
            "&:hover": { borderColor: "#1BCEF5" },
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            pointerEvents: "auto",
          }),
          menuList: (base) => ({
            ...base,
            backgroundColor: "var(--primary)",
            color: "#fff",
            borderRadius: 0,
            padding: "0 0",
          }),
          singleValue: (base) => ({ ...base, color: "#fff", fontSize }),
          placeholder: (base) => ({ ...base, color: "#fff", fontSize }),
          input: (base) => ({ ...base, color: "#fff", fontSize }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#fff"
              : state.isFocused
              ? "rgba(255, 255, 255, 0.2)"
              : "var(--primary)",
            color: state.isSelected ? "#E61313" : "#fff",
            cursor: "pointer",
            fontSize,
            padding: "4px 8px",
            transition: "all 0.15s ease",
            "&:active": {
              backgroundColor: "#1BCEF5",
              color: "#fff",
            },
          }),
        }}
        classNames={{ control: () => "text-sm" }}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </Box>
  );
};

export default DashboardSearchDropdown;
