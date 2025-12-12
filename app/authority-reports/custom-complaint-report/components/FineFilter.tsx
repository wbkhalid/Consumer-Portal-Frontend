import { Popover, Slider } from "@radix-ui/themes";
import { useState } from "react";
import CustomTextField from "../../../components/CustomTextField";

const FineFilter = ({
  minFine,
  maxFine,
  onChange,
}: {
  minFine?: number;
  maxFine?: number;
  onChange: (min?: number, max?: number) => void;
}) => {
  const [localMin, setLocalMin] = useState(minFine ?? 0);
  const [localMax, setLocalMax] = useState(maxFine ?? 1000000);

  const updateValues = (values: number[]) => {
    const [min, max] = values;
    setLocalMin(min);
    setLocalMax(max);
    onChange(min, max);
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div className="bg-white border px-3! py-1.5! rounded-md text-xs text-gray-500 cursor-pointer">
          Select Fine Range
        </div>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={6}
        className="bg-white p-4! w-64 shadow-md rounded-lg"
      >
        {/* Slider */}
        <Slider
          min={0}
          max={1000000}
          value={[localMin, localMax]}
          onValueChange={updateValues}
          step={100}
          className="w-full my-4!"
          size="1"
        />

        {/* Inputs */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col w-1/3">
            {/* <label className="text-xs">Min Fine</label>
            <input
              type="number"
              min={0}
              className="border rounded px-2! py-1! text-sm"
              value={localMin}
              onChange={(e) => {
                const val =
                  e.target.value === "" ? undefined : Number(e.target.value);
                setLocalMin(val ?? 0);
                onChange(val, localMax);
              }}
            /> */}

            <CustomTextField
              label="Min Value"
              type="number"
              className="h-7! text-xs! p-1!"
              value={localMin}
              onChange={(e) => {
                const val =
                  e.target.value === "" ? undefined : Number(e.target.value);
                setLocalMin(val ?? 0);
                onChange(val, localMax);
              }}
            />
          </div>

          <div className="flex flex-col w-1/3">
            {/* <label className="text-xs">Max Fine</label>
            <input
              type="number"
              min={localMin}
              className="border rounded px-2 py-1 text-sm"
              value={localMax}
              onChange={(e) => {
                const val =
                  e.target.value === "" ? undefined : Number(e.target.value);
                setLocalMax(val ?? 1000000);
                onChange(localMin, val);
              }}
            /> */}
            <CustomTextField
              label="Max Value"
              type="number"
              className="h-7! text-xs! p-1!"
              value={localMax}
              onChange={(e) => {
                const val =
                  e.target.value === "" ? undefined : Number(e.target.value);
                setLocalMax(val ?? 1000000);
                onChange(localMin, val);
              }}
            />
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default FineFilter;
