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
  isRegister?: boolean;
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
  isRegister = false,
  onBlur,
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
        className={`w-full  ${
          isRegister ? "rounded-full!" : "rounded-lg!"
        } hover:border-(--priamry)!   text-white ${className}`}
        // style={
        //   {
        //     "--text-field-focus-color": "#fff",
        //   } as React.CSSProperties
        // }
        {...rest}
      >
        {/* End adornment slot */}
        {endAdornment && (
          <TextField.Slot side="left" className="text-white">
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
