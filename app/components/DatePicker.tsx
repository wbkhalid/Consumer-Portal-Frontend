"use client";
import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Popover } from "@radix-ui/themes";
import { format } from "date-fns";
import { CiCalendar } from "react-icons/ci";

interface DatePickerProps {
  value?: Date | null;
  onSelectDate?: (date: Date) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

const DatePicker = ({
  value,
  onSelectDate,
  placeholder,
  minDate,
  maxDate,
  disabled,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedDate: Date) => {
    onSelectDate?.(selectedDate);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <div
          className={`flex gap-1 items-center justify-center min-w-[100px] px-3! py-1.5! rounded-md! border-[1.2px]
          ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border-[#d8d8d8] text-[#a89f9f] cursor-pointer"
          }`}
          onClick={() => !disabled && setOpen(true)}
        >
          <CiCalendar className="text-lg" />
          <span className="text-xs">
            {value ? format(value, "dd-MM-yyyy") : placeholder || "Select Date"}
          </span>
        </div>
      </Popover.Trigger>

      {!disabled && (
        <Popover.Content
          className="p-0! shadow-md rounded-lg! bg-white"
          sideOffset={5}
        >
          <Calendar
            date={value || new Date()}
            onChange={handleSelect}
            color="#2563eb"
            minDate={minDate}
            maxDate={maxDate}
          />
        </Popover.Content>
      )}
    </Popover.Root>
  );
};

export default DatePicker;
