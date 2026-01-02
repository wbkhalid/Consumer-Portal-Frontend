"use client";

import { TextField } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const SearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = searchParams.get("search") ?? "";

  const handleChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (val.trim()) {
      params.set("search", val.trim());
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <TextField.Root
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Search"
      style={
        {
          "--text-field-focus-color": "transparent",
        } as React.CSSProperties
      }
      className="min-w-[220px] rounded-none! border-none shadow-none! focus:border-none!  focus:outline-none! focus:ring-0! data-focus:shadow-none! data-focus:border-none!"
    >
      <TextField.Slot>
        <FiSearch className="text-gray-500 text-[16px]" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SearchFilter;
