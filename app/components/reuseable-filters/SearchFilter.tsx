"use client";

import { TextField } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";

const SearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 🔹 Local state (IMPORTANT)
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") ?? "",
  );

  // 🔹 Sync URL → input (back/forward support)
  useEffect(() => {
    setInputValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const normalizedValue = value.toLowerCase().replace(/\s+/g, " ");

    if (normalizedValue) {
      params.set("search", normalizedValue);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <TextField.Root
      value={inputValue}
      onChange={(e) => {
        const val = e.target.value;
        setInputValue(val); // ✅ space allowed
        updateQuery(val); // ✅ sanitized for URL
      }}
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
