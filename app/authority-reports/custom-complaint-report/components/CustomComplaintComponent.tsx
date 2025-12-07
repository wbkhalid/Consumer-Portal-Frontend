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
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const { divisionId, districtId, tehsilId, startDate, endDate } =
    useRegionFilters();
  const { data: customComplaintData } = useGetCustomComplaints({
    // startDate: startYear ? `${startYear}-01-01` : "",
    startDate,
    endDate,
    divisionId,
    districtId: selectedDistrict ? selectedDistrict : districtId,
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
            options={[
              { label: "All", value: "all" },
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
              { label: "All", value: "all" },
              ...sectionCategoryData?.map((category) => ({
                label: category?.name,
                value: category?.id.toString(),
              })),
            ]}
          />

          {/* <CustomSelect
            placeholder="Start Year"
            value={startYear}
            onChange={(val) => setStartYear(val as string)}
            options={years.map((y) => ({
              label: y.toString(),
              value: y.toString(),
            }))}
          />

          <CustomSelect
            placeholder="End Year"
            value={endYear}
            onChange={(val) => setEndYear(val as string)}
            disabled={!startYear}
            options={years
              .filter((y) => !startYear || y >= Number(startYear))
              .map((y) => ({
                label: y.toString(),
                value: y.toString(),
              }))}
          /> */}
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
