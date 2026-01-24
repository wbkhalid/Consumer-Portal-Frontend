"use client";

import Breadcrumbs from "../../../../components/Breadcrumbs";
import ClearButton from "../../../../components/ClearButton";
import DateFilter from "../../../../components/DateFilter";
import SearchFilter from "../../../../components/reuseable-filters/SearchFilter";
import ResolvedTable from "../../../../components/table/ResolvedTable";
import { AppealReport } from "../../list/page";

interface DistrictAppealComponentProp {
  data: AppealReport;
}

const DistrictAppealComponent = ({ data }: DistrictAppealComponentProp) => {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },

          {
            label: "Appeal Report",
            href: "/reports/appeals-report/list",
          },
          {
            label: `${data?.districtName}`,
          },
        ]}
      />

      <div className="flex items-center gap-1 mb-2.5!">
        <p className="text-[#111827] font-semibold">District Wise Complaints</p>
        <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
          {data?.complaints?.length?.toLocaleString()} Records
        </p>
      </div>

      <div className="border border-[#E9EAEB]  rounded-lg overflow-hidden  bg-white">
        <div className="flex justify-between items-center py-3! px-5!">
          <SearchFilter />
          <div className="flex justify-end items-center gap-2">
            <DateFilter />
            <ClearButton />
          </div>
        </div>
        <ResolvedTable rowsData={data?.complaints ?? []} isBreadCrumbs={true} />
      </div>
    </>
  );
};

export default DistrictAppealComponent;
