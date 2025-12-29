"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { z } from "zod";
import { COMPLAINT_API } from "../../../APIs";
import apiClient, { AxiosError } from "../../../services/api-client";
import CustomTextField from "../../../components/CustomTextField";
import CustomSearchDropdown from "../../../components/CustomSearchDropdown";
import useGetSelectedDivision from "../../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../../hooks/useGetSelectedTehsil";
import useGetSectionCategory from "../../../hooks/useGetSectionCategory";
import useGetAllComplaintCategory from "../../../hooks/useGetAllComplaintCategory";
import CustomTextArea from "../../../components/CustomTextArea";
import useGetAllSections from "../../../hooks/useGetAllSections";
import AddressPickerModal from "../../../components/AddressPickerModal";

interface Props {
  userId: string;
  onSuccess: () => void;
}

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

const complaintSchema = z.object({
  shopName: z.string().min(1, { message: "Please add Shop Name!" }),
  phoneNo: z.string(),
  address: z.string().min(1, { message: "Please select an address!" }),
  latitude: z.number().default(0),
  longitude: z.number().default(0),
  locationName: z.string().optional().default(""),
  DivisionId: z
    .number()
    .refine((val) => val !== 0, { message: "Please add Division!" })
    .default(0),
  DistrictId: z
    .number()
    .refine((val) => val !== 0, { message: "Please add District!" })
    .default(0),
  TehsilId: z
    .number()
    .refine((val) => val !== 0, { message: "Please add Tehsil!" })
    .default(0),
  complaintCategoryId: z
    .number()
    .refine((val) => val !== 0, { message: "Please add Section Category!" })
    .default(0),
  complaintSectionId: z
    .array(z.number().min(1))
    .min(1, { message: "Please add at least one Section!" })
    .default([]),
  productTypeId: z.number().default(1).optional(),
  complaintTypeId: z
    .number()
    .refine((val) => val !== 0, { message: "Please add Category!" })
    .default(0),
  entryType: z.number().default(1),
  remarks: z.string().default("").optional(),
  userId: z.string(),
});

type ComplaintInput = z.input<typeof complaintSchema>;

const ComplaintForm = ({ userId, onSuccess }: Props) => {
  const router = useRouter();

  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ComplaintInput>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      shopName: "",
      phoneNo: "",
      address: "",
      latitude: 0,
      longitude: 0,
      locationName: "",
      DivisionId: 0,
      DistrictId: 0,
      TehsilId: 0,
      complaintCategoryId: 0,
      complaintSectionId: [],
      productTypeId: 1,
      complaintTypeId: 0,
      entryType: 1,
      remarks: "",
      userId: "",
    },
  });

  const selectedDivisionId = watch("DivisionId");
  const selectedDistrictId = watch("DistrictId");

  const { data: selectedDivisionData } = useGetSelectedDivision({ id: 1 });
  const { data: selectedDistrictData } = useGetSelectedDistrict({
    id: selectedDivisionId,
  });
  const { data: selectedTehsilData } = useGetSelectedTehsil({
    id: selectedDistrictId,
  });
  const { data: sectionCategoryData } = useGetSectionCategory();
  const { data: complaintCategoryData } = useGetAllComplaintCategory();
  const { data: sectionData } = useGetAllSections();

  const handleLocationSelect = (location: LocationData) => {
    console.log(location, "location");

    setValue("address", location.address);
    setValue("latitude", location.lat);
    setValue("longitude", location.lng);
    setValue("locationName", location.address);
    setSelectedAddress(location.address);
  };

  const onSubmit = async (formData: ComplaintInput) => {
    try {
      const fd = new FormData();

      fd.append("shopName", formData.shopName);
      fd.append("phoneNo", formData.phoneNo);
      fd.append("address", formData.address);
      fd.append("latitude", String(formData.latitude ?? 0));
      fd.append("longitude", String(formData.longitude ?? 0));
      fd.append("locationName", formData.locationName ?? "");
      fd.append("DivisionId", String(formData.DivisionId));
      fd.append("DistrictId", String(formData.DistrictId));
      fd.append("TehsilId", String(formData.TehsilId));
      fd.append("complaintCategoryId", String(formData.complaintCategoryId));
      fd.append("complaintTypeId", String(formData.complaintTypeId));
      fd.append("productTypeId", String(formData.productTypeId ?? 1));
      fd.append("entryType", String(formData.entryType));
      fd.append("remarks", formData.remarks ?? "");
      fd.append("userId", userId);
      formData?.complaintSectionId?.forEach((id) => {
        fd.append("complaintSectionId", String(id));
      });

      const response = await apiClient.post(
        `${COMPLAINT_API}/submit-complaint`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);
      toast.success("Complaint submitted successfully!");
      reset();
      onSuccess();
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
          <CustomTextField
            label="Shop Name"
            placeholder="Enter Shop Name"
            error={errors.shopName?.message}
            {...register("shopName")}
          />
          <CustomTextField
            label="Shop Phone #"
            placeholder="03XXXXXXXXX"
            error={errors.phoneNo?.message}
            {...register("phoneNo")}
          />

          <Dialog.Root open={mapModalOpen} onOpenChange={setMapModalOpen}>
            <Dialog.Trigger>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Location</label>
                <div
                  className="h-10 flex items-center gap-2 border rounded-lg px-2! cursor-pointer"
                  onClick={() => setMapModalOpen(true)}
                >
                  {/* <IoLocationSharp className="w-10 h-10" /> */}
                  <span className="truncate text-sm">
                    {selectedAddress || "Select Address"}
                  </span>
                </div>
              </div>
            </Dialog.Trigger>

            <Dialog.Content
              className="max-w-[500px] p-0! rounded-lg!"
              onInteractOutside={(event) => {
                event.preventDefault();
              }}
            >
              <AddressPickerModal
                onSelect={handleLocationSelect}
                onClose={() => setMapModalOpen(false)}
              />
            </Dialog.Content>
          </Dialog.Root>

          <Controller
            name="DivisionId"
            control={control}
            render={({ field }) => (
              <CustomSearchDropdown
                label="Division"
                name="DivisionId"
                placeholder="Select Division"
                error={errors.DivisionId?.message}
                value={String(field.value)}
                onChange={(val) => field.onChange(Number(val))}
                options={
                  selectedDivisionData?.map((division) => ({
                    label: division?.name,
                    value: String(division?.id),
                  })) ?? []
                }
              />
            )}
          />

          <Controller
            name="DistrictId"
            control={control}
            render={({ field }) => (
              <CustomSearchDropdown
                label="District"
                name="DistrictId"
                placeholder="Select District"
                disabled={!selectedDivisionId}
                error={errors.DistrictId?.message}
                value={String(field.value)}
                onChange={(val) => field.onChange(Number(val))}
                options={
                  selectedDistrictData?.map((district) => ({
                    label: district?.name,
                    value: String(district?.id),
                  })) ?? []
                }
              />
            )}
          />

          <Controller
            name="TehsilId"
            control={control}
            render={({ field }) => (
              <CustomSearchDropdown
                label="Tehsil"
                name="TehsilId"
                placeholder="Select Tehsil"
                disabled={!selectedDistrictId}
                error={errors.TehsilId?.message}
                value={String(field.value)}
                onChange={(val) => field.onChange(Number(val))}
                options={
                  selectedTehsilData?.map((tehsil) => ({
                    label: tehsil?.name,
                    value: String(tehsil?.id),
                  })) ?? []
                }
              />
            )}
          />

          <Controller
            name="complaintTypeId"
            control={control}
            render={({ field }) => (
              <CustomSearchDropdown
                label="Nature of Complaint"
                name="complaintTypeId"
                placeholder="Select Nature of Complaint"
                error={errors.complaintTypeId?.message}
                value={String(field.value)}
                onChange={(val) => field.onChange(Number(val))}
                options={
                  sectionCategoryData?.map((category) => ({
                    label: category?.name,
                    value: category?.id.toString(),
                  })) ?? []
                }
              />
            )}
          />

          <Controller
            name="complaintSectionId"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <CustomSearchDropdown
                label="Complaint Sections"
                isMultiple
                value={field?.value?.map(String)}
                onChange={(val) =>
                  field.onChange((val as string[]).map(Number))
                }
                options={sectionData.map((sec) => ({
                  label: sec.description,
                  value: String(sec.id),
                }))}
                error={errors.complaintSectionId?.message}
              />
            )}
          />

          <Controller
            name="complaintCategoryId"
            control={control}
            render={({ field }) => (
              <CustomSearchDropdown
                label="Complaint Category"
                name="complaintCategoryId"
                placeholder="Select Complaint Category"
                error={errors.complaintCategoryId?.message}
                value={String(field.value)}
                onChange={(val) => field.onChange(Number(val))}
                options={
                  complaintCategoryData?.map((category) => ({
                    label: category?.name,
                    value: category?.id.toString(),
                  })) ?? []
                }
              />
            )}
          />

          <div className="col-span-full">
            <CustomTextArea
              label="Remarks"
              placeholder="Remarks"
              {...register("remarks")}
            />
          </div>
        </div>

        <Flex gap="3" mt="4" justify="between">
          <Dialog.Close>
            <Button
              type="button"
              onClick={() => reset()}
              className="w-[187px]! h-[41px]! text-gray-800! py-[0.688em]! px-[1em]! font-bold! bg-[#EFF0F2]! rounded-[5px]! border border-[rgba(239,240,242,0.4)]! cursor-pointer!"
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default ComplaintForm;
