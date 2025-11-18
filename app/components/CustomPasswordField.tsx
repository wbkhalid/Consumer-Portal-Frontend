"use client";
import React, { useState } from "react";
import { Box, Text, TextField } from "@radix-ui/themes";
import { LuEyeClosed } from "react-icons/lu";
import { GiBoltEye } from "react-icons/gi";
import { MdOutlinePassword } from "react-icons/md";

interface CustomPasswordFieldProps {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
  pattern?: string;
}

const CustomPasswordField: React.FC<CustomPasswordFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  error,
  maxLength,
  pattern,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box>
      {label && (
        <Text
          as="label"
          htmlFor={name}
          className="block mb-1! text-white  text-sm"
        >
          {label}
        </Text>
      )}
      <Box className="relative">
        <TextField.Root
          id={name}
          name={name}
          size="3"
          type={showPassword ? "tel" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          pattern={pattern}
          className={`h-20 w-full! pr-10 rounded-full! border border-transparent bg-white focus:outline-none ${className}`}
          {...rest}
        >
          <TextField.Slot>
            <MdOutlinePassword height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Box
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={handleTogglePassword}
        >
          {showPassword ? <GiBoltEye /> : <LuEyeClosed />}
        </Box>
      </Box>
      {error && (
        <Text as="p" className="text-red-600 text-xs mt-1">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default CustomPasswordField;
