"use client";
import { TextField } from "@radix-ui/themes";
import { forwardRef } from "react";
import clsx from "clsx";

// Use Root's prop type so there are no conflicts
type RadixRootProps = React.ComponentPropsWithoutRef<typeof TextField.Root>;

const CustomRadixInput = forwardRef<HTMLInputElement, RadixRootProps>(
  ({ className, style, ...rest }, ref) => {
    return (
      <TextField.Root
        ref={ref}
        {...rest} // allowed props (placeholder, value, onChange, etc.)
        className={clsx(
          "bg-white/80!",
          "overflow-hidden!",
          "[&_input]:bg-white/80! read-only:[&_input]:bg-white/80!",
          "rounded-[0.438rem]! p-0! [&_input]:py-2.5! [&_input]:px-3! h-[43px]!",
          "text-[#545861]! font-medium! text-[0.875rem]!",
          "shadow-[0px_0px_0px_1.5px_#EFF0F2]! focus:shadow-[0px_0px_0px_1.5px_#0C8CE9]!",
          "[&_input]:transition-shadow! [&_input]:duration-300! [&_input]:outline-none! [&_input]:border-0!",
          "[&_input::placeholder]:text-[#80889E]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-sm! [&_input::placeholder]:[&_input]:opacity-100!",
          className
        )}
        style={style}
      />
    );
  }
);

CustomRadixInput.displayName = "CustomRadixInput";
export default CustomRadixInput;
