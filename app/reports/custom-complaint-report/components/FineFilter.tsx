"use client";

import { Popover, Slider } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomTextField from "../../../components/CustomTextField";

const MAX_FINE = 100_000;

const FineFilterDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialMin = Number(searchParams.get("minFineAmount") ?? 0);
  const initialMax = Number(searchParams.get("maxFineAmount") ?? MAX_FINE);

  // 🔑 allow empty input
  const [localMin, setLocalMin] = useState<number | "">(initialMin);
  const [localMax, setLocalMax] = useState<number | "">(initialMax);

  // sync from URL
  useEffect(() => {
    setLocalMin(Number(searchParams.get("minFineAmount") ?? 0));
    setLocalMax(Number(searchParams.get("maxFineAmount") ?? MAX_FINE));
  }, [searchParams]);

  // helper to update URL
  const syncToURL = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minFineAmount", min.toString());
    params.set("maxFineAmount", max.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // slider change
  const updateValues = (values: number[]) => {
    const [min, max] = values;
    setLocalMin(min);
    setLocalMax(max);
    syncToURL(min, max);
  };

  // input change (allow empty)
  const handleInputChange = (key: "min" | "max", value: string) => {
    const numericValue = value === "" ? "" : Number(value);

    if (key === "min") setLocalMin(numericValue);
    else setLocalMax(numericValue);
  };

  // apply on blur
  const handleBlur = () => {
    if (localMin === "" || localMax === "") return;

    const min = Math.max(0, Math.min(localMin, localMax));
    const max = Math.min(MAX_FINE, Math.max(localMax, min));

    setLocalMin(min);
    setLocalMax(max);
    syncToURL(min, max);
  };

  const labelText =
    localMin === 0 && localMax === MAX_FINE
      ? "Select Fine Range"
      : localMin !== "" && localMax !== ""
        ? `${localMin.toLocaleString()} - ${localMax.toLocaleString()}`
        : "Select Fine Range";

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div className="w-full text-xs min-w-[100px]! max-w-[150px]! rounded-lg border border-[#d8d8d8] text-[#a89f9f] px-3! py-2! cursor-pointer flex justify-between items-center hover:border-(--primary) bg-white whitespace-nowrap">
          <span>{labelText}</span>
        </div>
      </Popover.Trigger>

      <Popover.Content
        sideOffset={6}
        className="bg-white p-4! w-64! shadow-md rounded-lg"
      >
        <Slider
          min={0}
          max={MAX_FINE}
          step={100}
          value={[
            typeof localMin === "number" ? localMin : 0,
            typeof localMax === "number" ? localMax : MAX_FINE,
          ]}
          onValueChange={updateValues}
          className="w-full my-4!"
          size="1"
        />

        <div className="flex items-center justify-between gap-2">
          <CustomTextField
            label="Min Value"
            type="number"
            className="h-7! text-xs p-1!"
            value={localMin}
            onChange={(e) => handleInputChange("min", e.target.value)}
            onBlur={handleBlur}
          />

          <CustomTextField
            label="Max Value"
            type="number"
            className="h-7! text-xs p-1!"
            value={localMax}
            onChange={(e) => handleInputChange("max", e.target.value)}
            onBlur={handleBlur}
          />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default FineFilterDropdown;
