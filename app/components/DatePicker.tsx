"use client";
import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Popover } from "@radix-ui/themes";
import { format } from "date-fns";
import { CiCalendar } from "react-icons/ci";
import { Placeholder } from "react-select/animated";

interface DatePickerProps {
  placeholder?: string;
  onSelectDate?: (date: Date) => void;
  initialDate?: Date | null;
}

const DatePicker = ({
  onSelectDate,
  initialDate,
  placeholder,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(initialDate || null);
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    onSelectDate?.(selectedDate);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <div
          className="flex gap-1 items-center cursor-pointer bg-white border-[1.2px] border-[#cccccd] px-3! py-1.5! rounded-md min-w-[100px] justify-center"
          onClick={() => setOpen(true)}
        >
          <CiCalendar className="text-lg text-gray-600" />
          <span className="text-xs text-gray-700">
            {date ? format(date, "dd-MM-yyyy") : placeholder || "Select Date"}
          </span>
        </div>
      </Popover.Trigger>

      <Popover.Content
        className="p-0! shadow-md rounded-lg bg-white"
        sideOffset={5}
      >
        <Calendar
          date={date || new Date()}
          onChange={handleSelect}
          color="#2563eb"
        />
      </Popover.Content>
    </Popover.Root>
  );
};

export default DatePicker;
