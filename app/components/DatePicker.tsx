"use client";
import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Popover } from "@radix-ui/themes";
import { format } from "date-fns";
import { CiCalendar } from "react-icons/ci";

interface DatePickerProps {
  onSelectDate?: (date: Date) => void;
  initialDate?: Date | null;
}

const DatePicker = ({ onSelectDate, initialDate }: DatePickerProps) => {
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
          className="flex gap-1 items-center cursor-pointer border border-[#E2E8F0] py-2! rounded-md min-w-[150px] justify-center"
          onClick={() => setOpen(true)}
        >
          <CiCalendar className="text-lg text-gray-600" />
          <span className="text-sm text-gray-700">
            {date ? format(date, "dd-MM-yyyy") : "Select Date"}
          </span>
        </div>
      </Popover.Trigger>

      <Popover.Content
        className="p-0! border-none shadow-md rounded-lg bg-white"
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
