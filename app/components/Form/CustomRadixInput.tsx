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
          "rounded-[0.438rem]! py-2.5! px-3! h-[41px]!",
          "text-[#545861]! font-medium! text-[0.875rem]!",
          "shadow-[0px_0px_0px_1.5px_#EFF0F2]! focus:shadow-[0px_0px_0px_1.5px_#0C8CE9]!",
          "transition-shadow! duration-300! outline-none! border-0!",
          "[&_input::placeholder]:text-[#80889E]! [&_input::placeholder]:font-medium! [&_input::placeholder]:text-sm! [&_input::placeholder]:opacity-100!",
          className
        )}
        style={style}
      />
    );
  }
);

CustomRadixInput.displayName = "CustomRadixInput";
export default CustomRadixInput;
