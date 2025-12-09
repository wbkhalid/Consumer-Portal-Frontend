import { Popover, TextField } from "@radix-ui/themes";
import { forwardRef, useRef, useState } from "react";
import { Calendar, CalendarProps } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { MdOutlineDateRange } from "react-icons/md";
import { fromLocalDateString, getFormattedDate } from "../../utils/utils";
import CustomRadixInput from "./CustomRadixInput";

interface Props extends Omit<CalendarProps, "date" | "onChange"> {
  value?: string | Date | null;
  onChange: (date: Date) => void;
  placeHolder?: string;
}

const CustomCalendar = forwardRef<HTMLDivElement, Props>(
  ({ value, onChange, placeHolder = "Select", ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [isOpen, setOpen] = useState(false);

    // ✅ FIX: Handle undefined in parseValue
    const parseValue = (val: string | Date | null | undefined): Date | null => {
      if (!val) return null; // This handles null, undefined, and empty string
      if (val instanceof Date) return val;

      // If it's a YYYY-MM-DD string, create date at local midnight
      if (typeof val === "string") {
        return fromLocalDateString(val);
      }

      return null;
    };

    const selectedDate = parseValue(value);

    const handleClose = () => {
      setOpen(false);
      console.log("close");
    };

    return (
      <>
        <Popover.Root open={isOpen} onOpenChange={setOpen}>
          <Popover.Trigger>
            <CustomRadixInput
              ref={inputRef}
              type="text"
              readOnly
              placeholder={placeHolder}
              value={selectedDate ? getFormattedDate(selectedDate) : ""}
            >
              <TextField.Slot
                className="rounded-tr-[0.438rem]! rounded-br-[0.438rem]! bg-white/80!"
                side="right"
              >
                <MdOutlineDateRange style={{ color: "#545861" }} />
              </TextField.Slot>
            </CustomRadixInput>
          </Popover.Trigger>
          <Popover.Content size="1" className="pt-0!" width="360px">
            <Calendar
              date={selectedDate || new Date()}
              onChange={(date) => {
                onChange(date);
                handleClose();
              }}
              {...rest}
            />
          </Popover.Content>
        </Popover.Root>
      </>
    );
  }
);

CustomCalendar.displayName = "CustomCalendar";

export default CustomCalendar;
