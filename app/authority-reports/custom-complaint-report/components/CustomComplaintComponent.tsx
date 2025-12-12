"use client";

import CustomComplaintTable from "./CustomComplaintTable";
import Forms from "../list/Forms";
import { OptionType } from "../../../components/Form/CustomSelect";
import useGetCustomComplaints from "../../../hooks/useGetCustomComplaints";
import CustomDateRangePicker from "../../../components/CustomDateRangePicker";
import { useRegionFilters } from "../../../hooks/useRegionFilters";
import CustomSelect from "../../../components/CustomSelect";
import useGetSectionCategory from "../../../hooks/useGetSectionCategory";
import { useMemo, useState } from "react";
import useGetAllSections from "../../../hooks/useGetAllSections";
import useGetAllDistricts from "../../../hooks/useGetAllDistricts";
import useGetAllStaff from "../../../hooks/useGetAllStaff";

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
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const { divisionId, districtId, tehsilId, startDate, endDate } =
    useRegionFilters();
  const { data: customComplaintData } = useGetCustomComplaints({
    // startDate: startYear ? `${startYear}-01-01` : "",
    startDate,
    endDate,
    divisionId,
    districtId:
      selectedDistrict === "all" ? "" : selectedDistrict || districtId,
    tehsilId,
    section: selectedSection === "all" ? "" : selectedSection,
    sectionCategory: selectedCategory === "all" ? "" : selectedCategory,
    assignedTo: selectedAssignee === "all" ? "" : selectedAssignee,
  });
  const { data: sectionCategoryData } = useGetSectionCategory();
  const { data: sectionData } = useGetAllSections();
  const { data: districtData } = useGetAllDistricts();
  const { data: staffData } = useGetAllStaff({ divisionId, districtId });
  const years = Array.from({ length: 30 }, (_, i) => 2000 + i);

  const uniqueSectionOptions = useMemo(() => {
    if (!sectionData) return [];

    const seenNames = new Set<string>();
    const uniqueSections: { label: string; value: string }[] = [];

    sectionData.forEach((section) => {
      if (!seenNames.has(section.name)) {
        seenNames.add(section.name);
        uniqueSections.push({
          label: section?.name,
          value: section?.id,
        });
      }
    });

    return uniqueSections;
  }, [sectionData]);

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
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
            placeholder="Select Assignee"
            value={selectedAssignee}
            onChange={(val) => setSelectedAssignee(val as string)}
            options={[
              { label: "All", value: "all" },
              ...staffData?.map((staff) => ({
                label: `${staff?.fullName}`,
                value: staff?.userId,
              })),
            ]}
          />
          <CustomSelect
            placeholder="Select District"
            value={selectedDistrict}
            onChange={(val) => setSelectedDistrict(val as string)}
            options={[
              { label: "All", value: "all" },
              ...districtData?.map((district) => ({
                label: `${district?.name}`,
                value: district?.id.toString(),
              })),
            ]}
          />
          <CustomSelect
            placeholder="Select Section"
            value={selectedSection}
            onChange={(val) => setSelectedSection(val as string)}
            options={[{ label: "All", value: "all" }, ...uniqueSectionOptions]}
          />

          <CustomSelect
            placeholder="Select Category"
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val as string)}
            options={[
              { label: "All", value: "all" },
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
