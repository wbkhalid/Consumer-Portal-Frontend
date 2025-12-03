"use client";

import CustomComplaintTable from "./CustomComplaintTable";
import Forms from "../list/Forms";
import { OptionType } from "../../../components/Form/CustomSelect";
import useGetCustomComplaints from "../../../hooks/useGetCustomComplaints";
import CustomDateRangePicker from "../../../components/CustomDateRangePicker";
import { useRegionFilters } from "../../../hooks/useRegionFilters";
import CustomSelect from "../../../components/CustomSelect";
import useGetSectionCategory from "../../../hooks/useGetSectionCategory";
import { useState } from "react";
import useGetAllSections from "../../../hooks/useGetAllSections";

interface Props {
  sectionCategoryOptions: OptionType[];
  sectionOptions: OptionType[];
  complaintCategoryOptions: OptionType[];
}

const CustomComplaintComponent = ({
  sectionCategoryOptions,
  sectionOptions,
  complaintCategoryOptions,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const { divisionId, districtId, tehsilId, startDate, endDate } =
    useRegionFilters();
  const { data: customComplaintData } = useGetCustomComplaints({
    startDate,
    endDate,
    divisionId,
    districtId,
    tehsilId,
    section: selectedSection === "all" ? "" : selectedSection,
    sectionCategory: selectedCategory === "all" ? "" : selectedCategory,
  });
  const { data: sectionCategoryData } = useGetSectionCategory();
  const { data: sectionData } = useGetAllSections();

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
        <div className="flex items-center gap-1">
          <CustomSelect
            placeholder="Select Section"
            value={selectedSection}
            onChange={(val) => setSelectedSection(val as string)}
            options={[
              { label: "All", value: "all" }, // <-- FIXED
              ...sectionData?.map((section) => ({
                label: `${section?.name}-${section.description}`,
                value: section?.id.toString(),
              })),
            ]}
          />

          <CustomSelect
            placeholder="Select Category"
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val as string)}
            options={[
              { label: "All", value: "all" }, // <-- FIXED
              ...sectionCategoryData?.map((category) => ({
                label: category?.name,
                value: category?.id.toString(),
              })),
            ]}
          />

          <CustomDateRangePicker />

          <Forms
            sectionCategoryOptions={sectionCategoryOptions}
            sectionOptions={sectionOptions}
            complaintCategoryOptions={complaintCategoryOptions}
          />
        </div>
      </div>
      <CustomComplaintTable rowsData={customComplaintData} />
    </div>
  );
};

export default CustomComplaintComponent;
