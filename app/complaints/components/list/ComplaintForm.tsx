"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Heading, IconButton } from "@radix-ui/themes";
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

const complaintSchema = z.object({
  shopName: z.string().min(1, { message: "Please add Shop Name!" }),
  phoneNo: z.string().min(1, { message: "Please add Phone No.!" }),
  address: z.string().min(1, { message: "Please add Address!" }),
  latitude: z.number().optional().default(0),
  longitude: z.number().optional().default(0),
  locationName: z.string().optional().default(""),
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
  entryType: z.number().refine((val) => val === 0 || val === 1, {
    message: "Entry type must be 0 or 1",
  }),
  remarks: z.string().default("").optional(),
  userId: z
    .string()
    .min(1, { message: "Please add User Id!" })
    .default("24d47330-7604-4048-81cf-bfb3cd6772b5"),
});

// Input type (what the form needs)
type ComplaintInput = z.input<typeof complaintSchema>;

interface ComplainResponse {
  data: { createdAt: string; id: number; message: string; status: number };
}

interface Props {
  sectionCategoryOptions: OptionType[];
  sectionOptions: OptionType[];
  complaintCategoryOptions: OptionType[];
  openComplaintForm: boolean;
}

const entryTypeOptions: OptionType[] = [
  { label: "Online", value: "0" },
  { label: "Manual", value: "1" },
];

const ComplaintForm = ({
  sectionCategoryOptions,
  sectionOptions,
  complaintCategoryOptions,
  openComplaintForm,
}: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ComplaintInput>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      complaintCategoryId: 0,
      complaintSectionId: [],
      complaintTypeId: 0,
      entryType: 1,
      latitude: 11,
      longitude: 22,
    },
  });
  console.log("errors", errors);

  const handleClose = () => {
    setDialogOpen(false);
    console.log("close dialog");
  };

  useEffect(() => {
    if (openComplaintForm) {
      setDialogOpen(true);
    }
  }, [openComplaintForm]);

  const onSubmit = async (formData: ComplaintInput) => {
    console.log(errors);
    let complaintSectionParams: string = "";

    if (
      formData.complaintSectionId &&
      formData.complaintSectionId?.length > 0
    ) {
      // Build multiple ComplaintSectionId params
      complaintSectionParams = formData.complaintSectionId
        .map((id) => `ComplaintSectionId=${id}`)
        .join("&");
    }

    try {
      const response: ComplainResponse = await apiClient.post(
        `${COMPLAINT_API}/submit-complaint?ShopName=${formData.shopName}&PhoneNo=${formData.phoneNo}&Address=${formData.address}&Latitude=${formData.latitude}&Longitude=${formData.longitude}&LocationName=${formData.locationName}&ComplaintCategoryId=${formData.complaintCategoryId}&ProductTypeId=${formData.productTypeId}&${complaintSectionParams}&EntryType=${formData.entryType}&UserId=${formData.userId}`
      );
      console.log("Response:", response);
      router.refresh();
      toast.success(response.data.message || "Complain Submitted Successfully");
      handleClose();
      console.log("response", response);
    } catch (err) {
      console.log("err", err);
      const axiosError = err as AxiosError<{ error: string }>;
      console.error(
        "Submission error:",
        axiosError.response?.data?.error || axiosError.message
      );
      toast.error(axiosError.response?.data?.error || axiosError.message);
    }
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
      {/* <Dialog.Trigger onClick={() => reset()}>
        <Button className="bg-(--primary)! cursor-pointer! rounded-full!">
          Complaint
        </Button>
      </Dialog.Trigger> */}

      <Dialog.Content
        size="4"
        maxWidth="896px"
        className="py-[15px]! px-5"
        onInteractOutside={(e) => e.preventDefault()} // 👈 disables close on outside click
        onEscapeKeyDown={(e) => e.preventDefault()} // 👈 disables close on Esc
      >
        <Dialog.Title>
          <Flex justify="between" align="center" className="mb-5!">
            <p className="text-(--primary) py-2! font-bold text-xl">
              Complained Box
            </p>
            <Dialog.Close>
              <IconButton
                radius="full"
                className="w-6! h-6 bg-(--primary)! py-2!"
              >
                <IoClose className="text-white" />
              </IconButton>
            </Dialog.Close>
          </Flex>
        </Dialog.Title>
        <Dialog.Description size="2" mb="4" className="sr-only!">
          Make changes to your profile.
        </Dialog.Description>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 mb-2.5 items-center gap-5">
            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Shop Name"
                    {...register("shopName")}
                  />
                  <ErrorMessage>{errors.shopName?.message}</ErrorMessage>
                </>
              }
            >
              Shop Name
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Phone Number"
                    {...register("phoneNo")}
                  />
                  <ErrorMessage>{errors.phoneNo?.message}</ErrorMessage>
                </>
              }
            >
              Phone Number
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Address"
                    {...register("address")}
                  />
                  <ErrorMessage>{errors.address?.message}</ErrorMessage>
                </>
              }
            >
              Address
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="complaintCategoryId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={[
                          defaultNumberOption,
                          ...sectionCategoryOptions,
                        ]}
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          sectionCategoryOptions.find(
                            (option) => option.value === String(field.value)
                          )
                            ? [
                                sectionCategoryOptions.find(
                                  (option) =>
                                    option.value === String(field.value)
                                )!,
                              ]
                            : []
                        }
                        onChangeSingle={(selectedOption) => {
                          const singleOption =
                            selectedOption as SingleValue<OptionType>;
                          field.onChange(
                            singleOption ? Number(singleOption.value) : 0
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>
                    {errors.complaintCategoryId?.message}
                  </ErrorMessage>
                </>
              }
            >
              Section Category
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="complaintSectionId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={[defaultNumberOption, ...sectionOptions]}
                        // Convert between react-select and raw value
                        isMulti={true}
                        value={sectionOptions.filter((opt) =>
                          field.value?.includes(Number(opt.value))
                        )}
                        onChangeMulti={(selectedOptions) => {
                          const ids = selectedOptions.map((opt) =>
                            Number(opt.value)
                          );
                          field.onChange(ids);
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>
                    {errors.complaintSectionId?.message}
                  </ErrorMessage>
                </>
              }
            >
              Section
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="complaintTypeId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={[
                          defaultNumberOption,
                          ...complaintCategoryOptions,
                        ]}
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          complaintCategoryOptions.find(
                            (option) => option.value === String(field.value)
                          )
                            ? [
                                complaintCategoryOptions.find(
                                  (option) =>
                                    option.value === String(field.value)
                                )!,
                              ]
                            : []
                        }
                        onChangeSingle={(selectedOption) => {
                          const singleOption =
                            selectedOption as SingleValue<OptionType>;
                          field.onChange(
                            singleOption ? Number(singleOption.value) : 0
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>{errors.complaintTypeId?.message}</ErrorMessage>
                </>
              }
            >
              Category
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Remarks"
                    {...register("remarks")}
                  />
                </>
              }
            >
              Remarks
            </CustomLabel>
          </div>

          <Flex gap="3" mt="4" justify="between">
            <Dialog.Close>
              <Button
                onClick={() => reset()}
                className="w-[187px]! h-[41px]! text-gray-800! py-[0.688em]! px-[1em]! font-bold! bg-[#EFF0F2]! rounded-[5px]! border border-[rgba(239,240,242,0.4)]!"
              >
                Cancel
              </Button>
            </Dialog.Close>
            <SubmitButton>Save</SubmitButton>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ComplaintForm;
