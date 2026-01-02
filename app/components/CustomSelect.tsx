import React from "react";
import { Box, Text, Select } from "@radix-ui/themes";

type Option = {
  label: string;
  value: string | number | undefined;
};

type CustomSelectProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
  isRegister?: boolean;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  className = "",
  disabled = false,
  error,
  isRegister,
  ...rest
}) => {
  return (
    <Box>
      {label && (
        <Text
          as="label"
          htmlFor={name}
          className={`block mb-1! ${
            isRegister ? "text-white" : "text-[#2A2A2B]"
          } font-semibold text-xs`}
        >
          {label}
        </Text>
      )}
      <Select.Root
        value={value !== undefined ? String(value) : ""}
        onValueChange={(val) => {
          if (disabled) return;
          const matchedOption = options.find(
            (opt) => String(opt.value) === val
          );
          onChange?.(matchedOption?.value ?? val);
        }}
        open={disabled ? false : undefined}
      >
        <Select.Trigger
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
          className={`w-full text-xs! min-w-[100px] max-w-[150px]!   ${
            isRegister ? "rounded-full!" : "rounded-lg!"
          } hover:border-(--priamry)! ${className}`}
        />
        <Select.Content className="w-[93%] ml-[6%] overflow-auto">
          {options.map((opt) => (
            <Select.Item
              value={String(opt.value)}
              className="text-xs! py-0.5! leading-none! truncate whitespace-nowrap cursor-pointer!"
            >
              {opt.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {error && <Text className="text-red-500 text-xs block">{error}</Text>}
    </Box>
  );
};

export default CustomSelect;
