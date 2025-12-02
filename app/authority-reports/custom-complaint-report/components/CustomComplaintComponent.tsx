"use client";

import { Button } from "@radix-ui/themes";
import CustomComplaintTable from "./CustomComplaintTable";
import Form from "../list/RegisterForm";
import Forms from "../list/Forms";
import { OptionType } from "../../../components/Form/CustomSelect";
import useGetCustomComplaints from "../../../hooks/useGetCustomComplaints";

interface Props {
  divisionOptions: OptionType[];
  sectionCategoryOptions: OptionType[];
  sectionOptions: OptionType[];
  complaintCategoryOptions: OptionType[];
}

const CustomComplaintComponent = ({
  divisionOptions,
  sectionCategoryOptions,
  sectionOptions,
  complaintCategoryOptions,
}: Props) => {
  const { data: customComplaintData } = useGetCustomComplaints();

  return (
    <div className="border border-[#e2e8f0] rounded-lg py-1! overflow-hidden max-h-[calc(100vh-10px)]">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">
            Custom Complaint Report
          </p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {customComplaintData?.length.toLocaleString()} Records
          </p>
        </div>
        <Forms
          sectionCategoryOptions={sectionCategoryOptions}
          sectionOptions={sectionOptions}
          complaintCategoryOptions={complaintCategoryOptions}
        />
      </div>
      <CustomComplaintTable rowsData={customComplaintData} />
    </div>
  );
};

export default CustomComplaintComponent;
