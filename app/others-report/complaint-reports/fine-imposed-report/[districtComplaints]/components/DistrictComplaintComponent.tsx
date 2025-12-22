"use client";

import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { FineImposedProp } from "../../page";
import DistrictComplaintTable from "./DistrictComplaintTable";

interface DistrictComplaintComponentProp {
  data: FineImposedProp;
}

const DistrictComplaintComponent = ({
  data,
}: DistrictComplaintComponentProp) => {
  return (
    <div>
      <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },

            {
              label: "Fine Imposed Report",
              href: "/others-report/complaint-reports/fine-imposed-report",
            },
            {
              label: `${data?.districtName}`,
            },
          ]}
        />

        <div className="flex justify-between items-center px-4! py-2!">
          <div className="flex items-center gap-1">
            <p className="text-(--primary) font-semibold">
              District Wise Complaints
            </p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {data?.complaintDetails?.length?.toLocaleString()} Records
            </p>
          </div>
        </div>
        <DistrictComplaintTable rowsData={data?.complaintDetails ?? []} />
      </div>
    </div>
  );
};

export default DistrictComplaintComponent;
