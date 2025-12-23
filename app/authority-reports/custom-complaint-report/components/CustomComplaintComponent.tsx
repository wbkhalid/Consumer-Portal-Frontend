"use client";

import CustomComplaintTable from "./CustomComplaintTable";
import Forms from "../list/Forms";
import { OptionType } from "../../../components/Form/CustomSelect";
import useGetCustomComplaints from "../../../hooks/useGetCustomComplaints";
import { useRegionFilters } from "../../../hooks/useRegionFilters";
import CustomSelect from "../../../components/CustomSelect";
import useGetSectionCategory from "../../../hooks/useGetSectionCategory";
import { useMemo, useState } from "react";
import useGetAllSections from "../../../hooks/useGetAllSections";
import useGetAllDistricts from "../../../hooks/useGetAllDistricts";
import useGetAllStaff from "../../../hooks/useGetAllStaff";
import DatePicker from "../../../components/DatePicker";
import FineFilter from "./FineFilter";
import { Button } from "@radix-ui/themes";
import DownloadWrapper from "./DownloadWrapper";
import useSearchRegisterUser from "../../../hooks/useSearchRegisterUser";
import CustomComplaintDialog from "./CustomComplaintDialog";
import DateFilter from "../../../components/DateFilter";

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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [minFine, setMinFine] = useState<number | undefined>(undefined);
  const [maxFine, setMaxFine] = useState<number | undefined>(undefined);

  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const { data: customComplaintData } = useGetCustomComplaints({
    // startDate: startYear ? `${startYear}-01-01` : "",
    startDate: startDate ? startDate.toISOString() : undefined,
    endDate: endDate ? endDate.toISOString() : undefined,
    minFineAmount: minFine,
    maxFineAmount: maxFine,
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

  const fileName = "Custom Complaint Report";
  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2! py-2!">
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">{fileName}</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {customComplaintData?.length.toLocaleString()} Records
          </p>
        </div>
        {/* <Forms
          sectionCategoryOptions={sectionCategoryOptions}
          sectionOptions={sectionOptions}
          complaintCategoryOptions={complaintCategoryOptions}
        /> */}

        <CustomComplaintDialog />
      </div>
      <div className="flex justify-end items-center gap-2 mb-2!">
        <CustomSelect
          placeholder="Select Authority"
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

        {/* <CustomDateRangePicker /> */}
        {/* <DatePicker
          placeholder="Start Date"
          initialDate={startDate}
          onSelectDate={(d) => {
            setStartDate(d);
          }}
        />

        <DatePicker
          placeholder="End Date"
          initialDate={endDate}
          onSelectDate={(d) => {
            setEndDate(d);
          }}
        /> */}
        <DateFilter />
        <FineFilter
          minFine={minFine}
          maxFine={maxFine}
          onChange={(min: number | undefined, max: number | undefined) => {
            setMinFine(min);
            setMaxFine(max);
          }}
        />
        <Button
          size="2"
          variant="soft"
          className="text-sm! cursor-pointer! font-bold!"
          onClick={() => {
            setSelectedDistrict("");
            setSelectedCategory("");
            setSelectedSection("");
            setSelectedAssignee("");
            setStartDate(null);
            setEndDate(null);
            setMinFine(undefined);
            setMaxFine(undefined);
          }}
        >
          Clear Filters
        </Button>
        <DownloadWrapper fileName={fileName} data={customComplaintData} />
      </div>
      <CustomComplaintTable rowsData={customComplaintData} />
    </div>
  );
};

export default CustomComplaintComponent;
