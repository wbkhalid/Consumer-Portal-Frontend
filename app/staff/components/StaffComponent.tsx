"use client";
import { Button, Dialog } from "@radix-ui/themes";
import StaffTable from "./StaffTable";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import AddStaff from "./AddStaff";
import { useMemo, useState } from "react";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import SearchFilter from "../../components/reuseable-filters/SearchFilter";
import { useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddSquareIcon } from "@hugeicons/core-free-icons";

const StaffComponent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { divisionId, districtId, tehsilId } = useRegionFilters();
  const { data: staffData } = useGetAllStaff({
    refresh,
    divisionId,
    districtId,
    tehsilId,
  });

  const filteredData = useMemo(() => {
    if (!staffData) return [];
    const term = search.toLowerCase();

    return staffData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [staffData, search]);

  return (
    <>
      <div className="flex justify-between items-center mb-2.5!">
        <div className="flex items-center gap-1">
          <p className="text-[#111827] font-semibold">Staff Management</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {filteredData?.length?.toLocaleString()} Records
          </p>
        </div>
        <Button
          className="border! border-(--primary)! cursor-pointer! rounded-lg! bg-[linear-gradient(180deg,#036CCF_-46.25%,#013769_100%)]! shadow-[0px_1px_2px_rgba(10,13,18,0.05)]! hover:opacity-95! transition-all!"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <HugeiconsIcon icon={AddSquareIcon} />
          Add Staff
        </Button>
      </div>
      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
        </div>
        <StaffTable rowsData={filteredData ?? []} setRefresh={setRefresh} />
      </div>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content className="max-w-[300px]! md:max-w-[700px]! lg:max-w-[800px]! w-full overflow-y-auto rounded-2xl! p-4!">
          <AddStaff setIsOpen={setIsOpen} setRefresh={setRefresh} />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default StaffComponent;
