"use client";
import { Button } from "@radix-ui/themes";
import OnlineBusinessTable from "./OnlineBusinessTable";

const OnlineBusinessComponent = () => {
  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">
            E-Commerce and Online Business Report
          </p>
          {/* <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {15} Records
          </p> */}
        </div>
        <div>
          <Button
            className="bg-(--primary)! cursor-pointer! rounded-full!"
            onClick={() => {
              //   setIsOpen(true);
              //   setIsEdit(false);
              //   setEditData(null);
            }}
          >
            E-Commerce and Online Business Report
          </Button>
        </div>
      </div>
      <OnlineBusinessTable />
    </div>
  );
};

export default OnlineBusinessComponent;
