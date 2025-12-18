import React from "react";
import { Box, Text, TextArea } from "@radix-ui/themes";

type CustomTextAreaProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  required?: boolean;
  rows?: number;
  error?: string;
};

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  rows = 1,
  error,
  ...rest
}) => {
  return (
    <Box>
      {label && (
        <Text
          as="label"
          htmlFor={name}
          className="block mb-1! text-[#2A2A2B] font-semibold text-xs"
        >
          {label}
        </Text>
      )}
      <TextArea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        resize="vertical"
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full max-h-20! rounded-md border border-[#EFF0F2] focus:border-(--priamry)! bg-theme focus:outline-none shadow-none! resize-none ${className}`}
        {...rest}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </Box>
  );
};

export default CustomTextArea;
