"use client";

import React from "react";
import Select, {
  components,
  SingleValueProps,
  GroupBase,
  Props as SelectProps,
} from "react-select";
import { Box, Text } from "@radix-ui/themes";
import Image from "next/image";

export type Option = {
  label: string;
  value: string;
  icon?: string; // optional icon URL
};

type CustomSearchDropdownProps = {
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

const CustomSearchDropdown: React.FC<CustomSearchDropdownProps> = ({
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

  // SingleValue with icon (for selected area/control)
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

  // --- Strongly typed custom components ---
  const selectComponents: Partial<
    SelectProps<Option, false, GroupBase<Option>>["components"]
  > = {
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
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
          className="block mb-1 text-[#2A2A2B] font-semibold text-sm"
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
            backgroundColor: "#fff",
            borderWidth: 1.5,
            borderColor: state.isFocused ? "var(--primary)" : "#EFF0F2",
            boxShadow: "none",
            borderRadius: 6,
            height: 40,
            minHeight: 40,
            padding: "0 0.25rem",
            "&:hover": { borderColor: "var(--primary)" },
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            pointerEvents: "auto",
          }),
          menuList: (base) => ({
            ...base,
            backgroundColor: "#fff",
            color: "#111111",
            borderRadius: 6,
            padding: "4px 0",
          }),
          singleValue: (base) => ({ ...base, color: "#111111", fontSize }),
          placeholder: (base) => ({ ...base, color: "gray", fontSize }),
          input: (base) => ({ ...base, color: "#111111", fontSize }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "var(--primary)"
              : state.isFocused
              ? "var(--primary)"
              : "#fff",
            color:
              state.isSelected || state.isFocused ? "#fff" : "var(--primary)",
            cursor: "pointer",
            fontSize,
            padding: "8px",
            transition: "all 0.15s ease",
            "&:active": {
              backgroundColor: "var(--primary)",
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

export default CustomSearchDropdown;
