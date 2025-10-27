import React from "react";
import { Box, Text, TextField } from "@radix-ui/themes";

type CustomTextFieldProps = {
  label?: string;
  name?: string;
  size?: "1" | "2" | "3";
  placeholder?: string;
  type?: React.ComponentProps<typeof TextField.Root>["type"];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  error?: string;
  readOnly?: boolean;
  endAdornment?: React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  size = "3",
  onChange,
  className = "",
  required = false,
  error,
  readOnly = false,
  endAdornment,
  onBlur,
  ...rest
}) => {
  return (
    <Box>
      {label && (
        <Text
          as="label"
          htmlFor={name}
          className="block mb-1 text-[#2A2A2B] font-semibold text-sm"
        >
          {label}
        </Text>
      )}

      <TextField.Root
        id={name}
        name={name}
        type={type}
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        onBlur={onBlur}
        className={`w-full rounded-md border border-[#e5e6e8] hover:border-(--priamry)! bg-theme focus:outline-none shadow-none! ${className}`}
        style={
          {
            "--text-field-focus-color": "#013769",
          } as React.CSSProperties
        }
        {...rest}
      >
        {/* End adornment slot */}
        {endAdornment && (
          <TextField.Slot side="right" className="text-gray-500">
            {endAdornment}
          </TextField.Slot>
        )}
      </TextField.Root>

      {error && (
        <Text as="p" className="text-red-600 text-xs mt-1">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default CustomTextField;
