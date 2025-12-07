import { Popover, TextField } from "@radix-ui/themes";
import { forwardRef, useEffect, useRef, useState } from "react";
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
    const [showCalendar, setShowCalendar] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

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

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          popupRef.current &&
          !popupRef.current.contains(e.target as Node) &&
          !inputRef.current?.contains(e.target as Node)
        ) {
          setShowCalendar(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <>
        <Popover.Root>
          <Popover.Trigger>
            <CustomRadixInput
              ref={inputRef}
              type="text"
              readOnly
              placeholder={placeHolder}
              value={selectedDate ? getFormattedDate(selectedDate) : ""}
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <TextField.Slot
                side="right"
                onClick={() => setShowCalendar(!showCalendar)}
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
                setShowCalendar(false);
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
