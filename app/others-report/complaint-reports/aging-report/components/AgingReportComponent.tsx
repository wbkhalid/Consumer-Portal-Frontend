"use client";
import { AgingReportProp } from "../page";
import AgingReportTable from "./AgingReportTable";

interface AgingReportComponentProp {
  data: AgingReportProp[];
}

const AgingReportComponent = ({ data }: AgingReportComponentProp) => {
  return (
    <div>
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
        <div className="flex justify-between items-center px-4! py-2!">
          <div className="flex items-center gap-1">
            <p className="text-(--primary) font-semibold">Aging Report</p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {data?.length?.toLocaleString()} Records
            </p>
          </div>
        </div>
        <AgingReportTable rowsData={data ?? []} />
      </div>
    </div>
  );
};

export default AgingReportComponent;
