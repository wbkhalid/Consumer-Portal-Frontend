"use client";

import { Button, ButtonProps } from "@radix-ui/themes";
import React from "react";

type CustomDashboardButtonProps = ButtonProps & {
  text: string;
};

const CustomDashboardButton: React.FC<CustomDashboardButtonProps> = ({
  text,
  className = "",
  ...rest
}) => {
  return (
    <Button
      className={`rounded-none! cursor-pointer! p-2! hover:opacity-80! bg-[#002344]! text-white! min-w-[200px]! ${className}`}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomDashboardButton;
