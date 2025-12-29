"use client";

import { useState, useMemo } from "react";
import { TextField } from "@radix-ui/themes";
import { FiSearch } from "react-icons/fi";
import useGetAllComplains from "../../hooks/useGetAllComplains";
import ComplainsTable from "./ComplainsTable";
import CustomSelect from "../../components/CustomSelect";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import useGetAllDistricts from "../../hooks/useGetAllDistricts";
import CustomDateRangePicker from "../../components/CustomDateRangePicker";
import CustomComplaintDialog from "../../authority-reports/custom-complaint-report/components/CustomComplaintDialog";

const ComplainComponent = () => {
  const { divisionId, districtId, tehsilId, startDate, endDate } =
    useRegionFilters();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { data: complainData } = useGetAllComplains({
    refresh,
    startDate,
    endDate,
    divisionId: divisionId || "",
    districtId:
      selectedDistrict !== "all" ? selectedDistrict : districtId || "",
    tehsilId: tehsilId || "",
  });
  const { data: districtData } = useGetAllDistricts();
  // const years = Array.from({ length: 30 }, (_, i) => 2000 + i);

  const filteredData = useMemo(() => {
    if (!complainData) return [];
    const term = searchTerm.toLowerCase();

    return complainData?.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [complainData, searchTerm]);

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden max-h-[calc(100vh-0px)] bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4! py-2! border-b border-[#e2e8f0]">
        {/* Title */}
        <div className="flex items-center gap-1">
          <p className="text-(--primary) font-semibold">Complaints</p>
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {filteredData?.length?.toLocaleString()} Records
          </p>
        </div>

        {/* Search + Button */}
        <div className="flex items-center gap-2">
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
          {/* 
          <CustomSelect
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
          <TextField.Root
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-[220px] rounded-full!"
          >
            <TextField.Slot>
              <FiSearch className="text-gray-500 text-[16px]" />
            </TextField.Slot>
          </TextField.Root>

          {/* <Button className="rounded-full! cursor-pointer! bg-(--primary)">
            Manual Complaint
          </Button> */}
          <CustomComplaintDialog setRefresh={setRefresh} />
        </div>
      </div>

      {/* Table */}
      <ComplainsTable rowsData={filteredData ?? []} />
    </div>
  );
};

export default ComplainComponent;
