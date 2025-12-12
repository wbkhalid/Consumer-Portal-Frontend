"use client";
import { Button } from "@radix-ui/themes";
import CityWiseDefectiveProductTable from "./CityWiseDefectiveProductTable";

const CityWiseDefectiveProductComponent = () => {
  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">
            City Wise Defective Product Report
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
            Defective Product Report
          </Button>
        </div>
      </div>
      <CityWiseDefectiveProductTable />
    </div>
  );
};

export default CityWiseDefectiveProductComponent;
