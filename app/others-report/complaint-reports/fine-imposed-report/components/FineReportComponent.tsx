"use client";

import { FineImposedProp } from "../page";
import FineReportTable from "./FineReportTable";

interface FineReportComponentProp {
  data: FineImposedProp[];
}

const FineReportComponent = ({ data }: FineReportComponentProp) => {
  return (
    <div>
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
        <div className="flex justify-between items-center px-4! py-2!">
          <div className="flex items-center gap-1">
            <p className="text-(--primary) font-semibold">
              Fine Imposed Report
            </p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {data?.length?.toLocaleString()} Records
            </p>
          </div>
        </div>
        <FineReportTable rowsData={data ?? []} />
      </div>
    </div>
  );
};

export default FineReportComponent;
