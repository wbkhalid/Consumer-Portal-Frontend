"use client";
import { Button, Dialog } from "@radix-ui/themes";
import StaffTable from "./StaffTable";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import AddStaff from "./AddStaff";
import { useState } from "react";
import { useRegionFilters } from "../../hooks/useRegionFilters";

const StaffComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { divisionId, districtId, tehsilId } = useRegionFilters();
  const { data: staffData } = useGetAllStaff({
    refresh,
    divisionId,
    districtId,
    tehsilId,
  });

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden max-h-[calc(100vh-0px)] bg-white">
      <div className="flex justify-between items-center px-4! py-2! border-b border-[#e2e8f0]">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">Staff Management</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {staffData?.length} Records
          </p>
        </div>

        <Button
          className="rounded-full! cursor-pointer! bg-(--primary)"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Staff
        </Button>
      </div>

      <StaffTable rowsData={staffData ?? []} setRefresh={setRefresh} />

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content className="max-w-[300px]! md:max-w-[700px]! lg:max-w-[800px]! w-full overflow-y-auto rounded-2xl! p-4!">
          <AddStaff setIsOpen={setIsOpen} setRefresh={setRefresh} />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default StaffComponent;
