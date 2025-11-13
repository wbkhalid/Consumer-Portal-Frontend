import React from "react";
import { Box, Text, TextField } from "@radix-ui/themes";

type DashboardTextFieldProps = {
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

const DashboardTextField: React.FC<DashboardTextFieldProps> = ({
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
          className="block mb-1 text-white font-semibold text-sm"
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
        className={`w-full rounded-none! border border-[#1BCEF5]! focus:border-[#1BCEF5]! bg-(--primary)! focus:outline-none shadow-none! text-white!  [&_.rt-TextFieldInput::placeholder]:text-white! ${className}`}
        style={
          {
            "--text-field-focus-color": "#1BCEF5",
          } as React.CSSProperties
        }
        {...rest}
      >
        {endAdornment && (
          <TextField.Slot
            side="right"
            className="text-white! placeholder:text-[#E61313]!"
          >
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

export default DashboardTextField;
