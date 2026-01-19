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
  icon?: string;
};

type CustomSearchDropdownProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  options: Option[];
  value?: string | number | string[] | null;
  onChange?: (value: string | number | string[]) => void;
  className?: string;
  error?: string;
  fontSize?: string;
  disabled?: boolean;
  onInputChange?: (val: string) => void;
  iconPlacement?: "none" | "menu" | "value" | "both";
  isClearable?: boolean;
  isRegister?: boolean;
  isMultiple?: boolean;
  isHome?: boolean;
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
  isRegister = false,
  isMultiple = false,
  isHome = false,
}) => {
  const selectedOption = isMultiple
    ? options.filter((opt) =>
        (value as string[] | undefined)?.includes(opt.value),
      )
    : options.find((opt) => String(opt.value) === String(value ?? "")) || null;

  // const SingleValueWithIcon: React.FC<SingleValueProps<Option, false>> = (
  //   props
  // ) => {
  //   const { data } = props;
  //   return (
  //     <components.SingleValue {...props}>
  //       <div className="flex items-center gap-2">
  //         {data.icon && (
  //           <Image
  //             src={data.icon}
  //             alt={`${data.label} icon`}
  //             width={18}
  //             height={18}
  //             className="rounded"
  //           />
  //         )}
  //         <span style={{ fontSize }}>{data.label}</span>
  //       </div>
  //     </components.SingleValue>
  //   );
  // };

  const selectComponents: Partial<
    SelectProps<Option, typeof isMultiple, GroupBase<Option>>["components"]
  > = {
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
  };

  const wantMenuIcons = iconPlacement === "menu" || iconPlacement === "both";
  const wantValueIcons = iconPlacement === "value" || iconPlacement === "both";

  return (
    <Box className={`w-full ${className}`}>
      {label && (
        <Text
          as="label"
          htmlFor={name}
          className={`block mb-1! font-semibold ${
            isRegister ? "text-white" : "text-[#2A2A2B]"
          }   text-xs`}
        >
          {label}
        </Text>
      )}

      <Select<Option, typeof isMultiple>
        id={name}
        instanceId={name}
        placeholder={placeholder}
        options={options}
        isDisabled={disabled}
        isMulti={isMultiple}
        value={selectedOption}
        onChange={(selected) => {
          if (isMultiple) {
            onChange?.((selected as Option[]).map((opt) => opt.value));
          } else {
            onChange?.((selected as Option)?.value || "");
          }
        }}
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
            backgroundColor: isHome ? "#F5F6F8" : "#fff",
            borderWidth: 1,
            borderColor: state.isFocused ? "var(--primary)" : "#D1D5DB",
            boxShadow: "none",
            borderRadius: isRegister ? 999 : 8,
            height: isHome ? 26 : 40,
            minHeight: isHome ? 26 : 40,
            overflow: "hidden",
            whiteSpace: "nowrap",
            // overflowY:'auto',
            padding: "0 0.25rem",
            "&:hover": { borderColor: "var(--primary)" },
          }),
          container: (base) => ({
            ...base,
            minWidth: "100%",
          }),
          valueContainer: (base) => ({
            ...base,
            maxHeight: isHome ? 26 : 40,
            overflowY: isMultiple ? "auto" : "hidden",
            flexWrap: "wrap",
            paddingTop: 0,
            paddingBottom: 0,
          }),

          indicatorsContainer: (base) => ({
            ...base,
            height: isHome ? 26 : 40,
          }),

          // multiValue: (base) => ({
          //   ...base,
          //   maxWidth: "100%",
          // }),

          // multiValueLabel: (base) => ({
          //   ...base,
          //   fontSize,
          //   whiteSpace: "nowrap",
          // }),

          menu: (base) => ({
            ...base,
            width: "auto",
            minWidth: "100%",
            whiteSpace: "nowrap",
          }),
          multiValue: () => ({ display: "none" }),
          multiValueLabel: () => ({ display: "none" }),
          multiValueRemove: () => ({ display: "none" }),

          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            pointerEvents: "auto",
          }),
          menuList: (base) => ({
            ...base,
            backgroundColor: "#fff",
            color: "#111111",
            borderRadius: 4,
            padding: "0",
          }),
          singleValue: (base) => ({ ...base, color: "#111111", fontSize }),
          placeholder: (base) => ({
            ...base,
            color: "gray",
            fontSize,
            margin: 0,
          }),
          input: (base) => ({
            ...base,
            color: "#111111",
            lineHeight: "1",
            fontSize,
            padding: 0,
            margin: 0,
          }),
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

      {isMultiple &&
        Array.isArray(selectedOption) &&
        selectedOption.length > 0 && (
          <div className="flex flex-wrap gap-0.5 mt-1!">
            {selectedOption.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center gap-1 px-1! py-0.5! rounded-full bg-(--primary) text-white text-[8px]"
              >
                <span>{opt.label}</span>

                <button
                  type="button"
                  className="ml-0.5! font-bold! hover:opacity-80 cursor-pointer!"
                  onClick={() => {
                    const updatedValues = selectedOption
                      .filter((o) => o.value !== opt.value)
                      .map((o) => o.value);

                    onChange?.(updatedValues);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </Box>
  );
};

export default CustomSearchDropdown;
