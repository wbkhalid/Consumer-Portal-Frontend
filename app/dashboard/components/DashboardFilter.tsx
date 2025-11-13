"use client";

import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Dialog } from "@radix-ui/themes";
import DashboardTextField from "../../components/DashboardTextField";
import DashboardSearchDropdown from "../../components/DashboardSearchDropdown";
import useGetAllDistricts from "../../hooks/useGetAllDistricts";
import CustomDashboardButton from "./CustomDashboardButton";

const DashboardFilter = () => {
  const { data: districtData } = useGetAllDistricts();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Complaint ID Field */}
      <DashboardTextField
        name="complaint"
        placeholder="Complaint ID"
        endAdornment={<IoSearchOutline />}
      />

      {/* Apply Filter Button */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <div className="bg-(--primary) text-white h-10 flex justify-between items-center px-3! py-2! border border-[#1BCEF5] cursor-pointer">
            <p>Apply Filter</p>
            <HiOutlineAdjustmentsHorizontal className="text-lg text-white" />
          </div>
        </Dialog.Trigger>

        {/* Dialog Content */}
        <Dialog.Content className="bg-(--primary)! rounded-none! text-white px-0! pt-2! pb-4! max-w-[800px]! border border-[#1BCEF5] animate-slideInRight">
          <div className="flex flex-col gap-3">
            <p className="text-lg font-bold text-white bg-[#002344] p-2! text-center">
              Apply Filters
            </p>

            {/* Example Dropdowns inside Dialog */}
            <div className="flex  gap-4 px-4! my-4!">
              <DashboardSearchDropdown
                label="District"
                placeholder="Select District"
                fontSize="16px"
                options={
                  districtData?.map((district) => ({
                    label: district?.name,
                    value: String(district?.id),
                  })) ?? []
                }
              />
              <DashboardSearchDropdown
                label="District"
                placeholder="Select District"
                fontSize="16px"
                options={
                  districtData?.map((district) => ({
                    label: district?.name,
                    value: String(district?.id),
                  })) ?? []
                }
              />
              <DashboardSearchDropdown
                label="District"
                placeholder="Select District"
                fontSize="16px"
                options={
                  districtData?.map((district) => ({
                    label: district?.name,
                    value: String(district?.id),
                  })) ?? []
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center px-4!">
              <Dialog.Close>
                <CustomDashboardButton text="Cancel" />
              </Dialog.Close>
              <CustomDashboardButton text="Apply" />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      <DashboardSearchDropdown
        placeholder="Select District"
        fontSize="16px"
        options={
          districtData?.map((district) => ({
            label: district?.name,
            value: String(district?.id),
          })) ?? []
        }
      />
    </div>
  );
};

export default DashboardFilter;
