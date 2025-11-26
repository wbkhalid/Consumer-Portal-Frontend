"use client";

import { useState, useMemo } from "react";
import { TextField } from "@radix-ui/themes";
import { FiSearch } from "react-icons/fi";
import useGetAllComplains from "../../hooks/useGetAllComplains";
import ComplainsTable from "./ComplainsTable";
import Forms from "./list/Forms";
import { OptionType } from "../../components/Form/CustomSelect";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

interface Props {
  divisionOptions: OptionType[];
  sectionCategoryOptions: OptionType[];
  sectionOptions: OptionType[];
  complaintCategoryOptions: OptionType[];
}

const ComplainComponent = ({
  divisionOptions,
  sectionCategoryOptions,
  sectionOptions,
  complaintCategoryOptions,
}: Props) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams();

  const isValid = (v: string | undefined | null): v is string =>
    v !== null && v !== undefined && v !== "" && v !== "0";

  const divisionId = isValid(Cookies.get("divisionId"))
    ? Cookies.get("divisionId")
    : searchParams.get("divisionId");

  const districtId = isValid(Cookies.get("districtId"))
    ? Cookies.get("districtId")
    : searchParams.get("districtId");

  const tehsilId = isValid(Cookies.get("tehsilId"))
    ? Cookies.get("tehsilId")
    : searchParams.get("tehsilId");
  const { data: complainData } = useGetAllComplains({
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!complainData) return [];
    const term = searchTerm.toLowerCase();

    return complainData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [complainData, searchTerm]);

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden max-h-[calc(100vh-0px)] bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4! py-2! border-b border-[#e2e8f0]">
        {/* Title */}
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">Complains</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {filteredData?.length?.toLocaleString()} Records
          </p>
        </div>

        {/* Search + Button */}
        <div className="flex items-center gap-2">
          {/* ✅ Radix TextField with search icon */}
          <TextField.Root
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-[220px] rounded-full!"
          >
            <TextField.Slot>
              <FiSearch className="text-gray-500 text-[16px]" />
            </TextField.Slot>
          </TextField.Root>

          {/* <Button className="rounded-full! cursor-pointer! bg-(--primary)">
            Manual Complaint
          </Button> */}
          <Forms
            divisionOptions={divisionOptions}
            sectionCategoryOptions={sectionCategoryOptions}
            sectionOptions={sectionOptions}
            complaintCategoryOptions={complaintCategoryOptions}
          />
        </div>
      </div>

      {/* Table */}
      <ComplainsTable rowsData={filteredData ?? []} />
    </div>
  );
};

export default ComplainComponent;
