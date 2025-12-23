import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { SingleValue } from "react-select";
import { toast } from "react-toastify";
import { z } from "zod";
import { COMPLAINT_API } from "../../../APIs";
import CustomLabel from "../../../components/Form/CustomLabel";
import CustomRadixInput from "../../../components/Form/CustomRadixInput";
import CustomSelect, {
  defaultNumberOption,
  OptionType,
} from "../../../components/Form/CustomSelect";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import SubmitButton from "../../../components/Form/SubmitButton";
import apiClient, { AxiosError } from "../../../services/api-client";
import CustomTextField from "../../../components/CustomTextField";
import CustomSearchDropdown from "../../../components/CustomSearchDropdown";
import useGetSelectedDivision from "../../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../../hooks/useGetSelectedTehsil";

const complaintSchema = z.object({
  shopName: z.string().min(1, { message: "Please add Shop Name!" }),
  phoneNo: z.string().min(1, { message: "Please add Phone No.!" }),
  address: z.string().min(1, { message: "Please add Address!" }),
  latitude: z.number().optional().default(0),
  longitude: z.number().optional().default(0),
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
  userId: z.string().min(1, { message: "Please add User Id!" }),
});

type ComplaintInput = z.input<typeof complaintSchema>;

const ComplaintForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
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

  const { data: selectedDivisionData } = useGetSelectedDivision({
    id: 1,
  });

  const { data: selectedDistrictData } = useGetSelectedDistrict({
    id: selectedDivisionId,
  });
  const { data: selectedTehsilData } = useGetSelectedTehsil({
    id: selectedDistrictId,
  });

  const onSubmit = async (formData: ComplaintInput) => {
    // console.log(errors);
    // let complaintSectionParams: string = "";
    // if (
    //   formData.complaintSectionId &&
    //   formData.complaintSectionId?.length > 0
    // ) {
    //   // Build multiple ComplaintSectionId params
    //   complaintSectionParams = formData.complaintSectionId
    //     .map((id) => `ComplaintSectionId=${id}`)
    //     .join("&");
    // }
    // try {
    //   const response: ComplainResponse = await apiClient.post(
    //     `${COMPLAINT_API}/submit-complaint?ShopName=${formData.shopName}&PhoneNo=${formData.phoneNo}&Address=${formData.address}&Latitude=${formData.latitude}&Longitude=${formData.longitude}&LocationName=${formData.locationName}&ComplaintCategoryId=${formData.complaintCategoryId}&ProductTypeId=${formData.productTypeId}&${complaintSectionParams}&EntryType=${formData.entryType}&UserId=${formData.userId}`
    //   );
    //   console.log("Response:", response);
    //   router.refresh();
    //   toast.success(response.data.message || "Complain Submitted Successfully");
    //   handleClose();
    //   console.log("response", response);
    // } catch (err) {
    //   console.log("err", err);
    //   const axiosError = err as AxiosError<{ error: string }>;
    //   console.error(
    //     "Submission error:",
    //     axiosError.response?.data?.error || axiosError.message
    //   );
    //   toast.error(axiosError.response?.data?.error || axiosError.message);
    // }
  };

  return (
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
      </div>
    </form>
  );
};

export default ComplaintForm;
