"use client";

import { Popover, Slider } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomTextField from "../../../components/CustomTextField";

const FineFilterDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialMin = Number(searchParams.get("minFineAmount") ?? 0);
  const initialMax = Number(searchParams.get("maxFineAmount") ?? 1000000);

  const [localMin, setLocalMin] = useState(initialMin);
  const [localMax, setLocalMax] = useState(initialMax);

  useEffect(() => {
    setLocalMin(Number(searchParams.get("minFineAmount") ?? 0));
    setLocalMax(Number(searchParams.get("maxFineAmount") ?? 1000000));
  }, [searchParams]);

  const updateValues = (values: number[]) => {
    const [min, max] = values;
    setLocalMin(min);
    setLocalMax(max);

    const params = new URLSearchParams(searchParams.toString());
    params.set("minFineAmount", min.toString());
    params.set("maxFineAmount", max.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (key: "min" | "max", value: number | undefined) => {
    const newMin = key === "min" ? value ?? 0 : localMin;
    const newMax = key === "max" ? value ?? 1000000 : localMax;

    setLocalMin(newMin);
    setLocalMax(newMax);

    const params = new URLSearchParams(searchParams.toString());
    params.set("minFineAmount", newMin.toString());
    params.set("maxFineAmount", newMax.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div className="w-full text-xs min-w-[100px]! max-w-[150px]! rounded-lg border border-[#d8d8d8] text-[#a89f9f] px-3! py-2! cursor-pointer flex justify-between items-center hover:border-(--primary)  bg-white whitespace-nowrap">
          <span>
            {localMin === 0 && localMax === 1000000
              ? "Select Fine Range"
              : `${localMin.toLocaleString()} - ${localMax.toLocaleString()}`}
          </span>
        </div>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={6}
        className="bg-white p-4! w-64! shadow-md rounded-lg"
      >
        <Slider
          min={0}
          max={1000000}
          value={[localMin, localMax]}
          onValueChange={updateValues}
          step={100}
          className="w-full my-4!"
          size="1"
        />

        <div className="flex items-center justify-between gap-2">
          <CustomTextField
            label="Min Value"
            type="number"
            className="h-7! text-xs p-1!"
            value={localMin}
            onChange={(e) =>
              handleInputChange(
                "min",
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
          <CustomTextField
            label="Max Value"
            type="number"
            className="h-7! text-xs p-1!"
            value={localMax}
            onChange={(e) =>
              handleInputChange(
                "max",
                e.target.value === "" ? undefined : Number(e.target.value)
              )
            }
          />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default FineFilterDropdown;
