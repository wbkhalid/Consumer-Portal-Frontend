"use client";
import { TextField } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CustomRadixInput from "../Form/CustomRadixInput";

const SearchFilter = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();

  const updateSearch = (value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (value.trim()) {
      newParams.set("search", value.trim());
    } else {
      newParams.delete("search");
    }

    router.push(`?${newParams.toString()}`);
  };

  return (
    <CustomRadixInput
      value={search}
      onChange={(e) => {
        const value = e.target.value;
        setSearch(value);
        updateSearch(value);
      }}
      placeholder="Search"
    >
      <TextField.Slot className="pe-0!">
        <AiOutlineSearch size={16} />
      </TextField.Slot>
    </CustomRadixInput>
  );
};

export default SearchFilter;
