"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, Heading, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { SingleValue } from "react-select";
import { toast } from "react-toastify";
import { z } from "zod";
import { AUTH_API, LOOKUP_API } from "../../../APIs";
import CustomLabel from "../../../components/Form/CustomLabel";
import CustomRadixInput from "../../../components/Form/CustomRadixInput";
import CustomSelect, {
  defaultNumberOption,
  OptionType,
} from "../../../components/Form/CustomSelect";
import ErrorMessage from "../../../components/Form/ErrorMessage";
import SubmitButton from "../../../components/Form/SubmitButton";
import apiClient, { AxiosError } from "../../../services/api-client";

const schema = z.object({
  fullName: z.string().min(1, { message: "Please add Full Name!" }),
  phoneNumber: z.string().min(1, { message: "Please add Phone Number!" }),
  cnic: z.string().min(13, { message: "CNIC must be of 13 digits!" }),
  divisionId: z
    .number()
    .refine((val) => val !== 0, { message: "Please add Division!" })
    .default(0),
  districtId: z
    .number()
    .refine((val) => val !== 0, { message: "Please add District!" })
    .default(0),
  tehsilId: z
    .number()
    .refine((val) => val !== 0, { message: "Please add Tehsil!" })
    .default(0),
  houseNo: z.string().min(1, { message: "Please add House No.!" }),
  streetNo: z.string().min(1, { message: "Please add Street No.!" }),
  landMark: z.string().min(1, { message: "Please add LandMark!" }),
  roleName: z.string().default("User"),
});

// Input type (what the form needs)
type RegisterInput = z.input<typeof schema>;

interface DistrictLookup {
  id: number;
  provinceId: number;
  name: string;
  shortName: string;
}

interface TehsilLookup {
  id: number;
  districtId: number;
  name: string;
  shortName: string;
}

interface Props {
  divisionOptions: OptionType[];
  setOpenComplaintForm: Dispatch<SetStateAction<boolean>>;
}

const RegisterForm = ({ divisionOptions, setOpenComplaintForm }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      divisionId: 0,
      districtId: 0,
      tehsilId: 0,
    },
  });
  console.log("errors", errors);

  const handleClose = () => {
    setDialogOpen(false);
    console.log("close dialog");
  };

  const selectedDivisionId = watch("divisionId");
  const selectedDistrictId = watch("districtId");

  const onSubmit = async (formData: RegisterInput) => {
    console.log(errors);

    try {
      const response = await apiClient.post(AUTH_API + "/register", formData);
      console.log("Response:", response);
      router.refresh();
      toast.success("Registered Successfully");
      handleClose();
      console.log("response", response);
      if (response.status === 200) {
        setOpenComplaintForm(true);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      console.error(
        "Submission error:",
        axiosError.response?.data?.error || axiosError.message
      );
      toast.error(axiosError.response?.data?.error || axiosError.message);
    }
  };

  const [lookUpDistricts, setLookUpDistricts] = useState<DistrictLookup[]>();
  const [districtOptions, setDistrictOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const getDistricts = async (selectedDivisionId: number) => {
      try {
        const response = await apiClient.get(
          `${LOOKUP_API}/districts/${selectedDivisionId}`
        );
        setLookUpDistricts(response.data.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    if (selectedDivisionId) {
      getDistricts(selectedDivisionId);
    }
  }, [selectedDivisionId]);

  useEffect(() => {
    if (lookUpDistricts) {
      const districtOptions: OptionType[] = lookUpDistricts?.map((district) => {
        return {
          value: String(district.id),
          label: district.name,
        };
      });

      console.log("lookUpDistricts", lookUpDistricts);

      if (districtOptions) {
        setDistrictOptions(districtOptions);
      }
    }
  }, [lookUpDistricts]);

  const [lookUpTehsils, setLookUpTehsils] = useState<TehsilLookup[]>();
  const [thesilOptions, setTehsilOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const getTehsils = async (selectedDistrictId: number) => {
      try {
        const response = await apiClient.get(
          `${LOOKUP_API}/tehsils/${selectedDistrictId}`
        );
        setLookUpTehsils(response.data.data);
        console.log("lookUpTehsils", lookUpTehsils);
      } catch (err) {
        console.log("err", err);
      }
    };
    if (selectedDistrictId) {
      getTehsils(selectedDistrictId);
    }
  }, [selectedDistrictId]);

  useEffect(() => {
    if (lookUpTehsils) {
      const thesilOptions: OptionType[] = lookUpTehsils?.map((thesil) => {
        return {
          value: String(thesil.id),
          label: thesil.name,
        };
      });

      console.log("lookUpTehsils", lookUpTehsils);

      if (thesilOptions) {
        setTehsilOptions(thesilOptions);
      }
    }
  }, [lookUpTehsils]);

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger onClick={() => reset()}>
        <Button className="bg-(--primary)! cursor-pointer! rounded-full!">
          Add Manual Complaint
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="896px"
        className="py-[15px]! px-5"
        onInteractOutside={(e) => e.preventDefault()} // 👈 disables close on outside click
        onEscapeKeyDown={(e) => e.preventDefault()} // 👈 disables close on Esc
      >
        <Dialog.Title>
          <Flex justify="between" align="center" className="mb-5!">
            <Heading as="h6" className="text-primary! py-2!">
              Hello! Register to get Started
            </Heading>
            <Dialog.Close>
              <IconButton
                radius="full"
                className="w-8! h-8! bg-primary/10! py-2!"
              >
                <IoClose className="text-primary" />
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
                    placeholder="Enter Name"
                    {...register("fullName")}
                  />
                  <ErrorMessage>{errors.fullName?.message}</ErrorMessage>
                </>
              }
            >
              Full Name
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Phone Number"
                    {...register("phoneNumber")}
                  />
                  <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>
                </>
              }
            >
              Phone Number
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter CNIC"
                    {...register("cnic")}
                  />
                  <ErrorMessage>{errors.cnic?.message}</ErrorMessage>
                </>
              }
            >
              CNIC
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="divisionId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={[defaultNumberOption, ...divisionOptions]}
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          divisionOptions.find(
                            (option) => option.value === String(field.value)
                          )
                            ? [
                                divisionOptions.find(
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
                  <ErrorMessage>{errors.divisionId?.message}</ErrorMessage>
                </>
              }
            >
              Division
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="districtId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={[defaultNumberOption, ...districtOptions]}
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          districtOptions.find(
                            (option) => option.value === String(field.value)
                          )
                            ? [
                                districtOptions.find(
                                  (option) =>
                                    option.value === String(field.value)
                                )!,
                              ]
                            : []
                        }
                        onChangeSingle={(selectedOption) => {
                          field.onChange(
                            selectedOption ? Number(selectedOption.value) : null
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>{errors.districtId?.message}</ErrorMessage>
                </>
              }
            >
              District
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <Controller
                    name="tehsilId"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={[defaultNumberOption, ...thesilOptions]}
                        closeMenuOnSelect={true}
                        // Convert between react-select and raw value
                        value={
                          thesilOptions.find(
                            (option) => option.value === String(field.value)
                          )
                            ? [
                                thesilOptions.find(
                                  (option) =>
                                    option.value === String(field.value)
                                )!,
                              ]
                            : []
                        }
                        onChangeSingle={(selectedOption) => {
                          field.onChange(
                            selectedOption ? Number(selectedOption.value) : null
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage>{errors.tehsilId?.message}</ErrorMessage>
                </>
              }
            >
              Tehsil
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter House No."
                    {...register("houseNo")}
                  />
                  <ErrorMessage>{errors.houseNo?.message}</ErrorMessage>
                </>
              }
            >
              House No.
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Street No."
                    {...register("streetNo")}
                  />
                  <ErrorMessage>{errors.streetNo?.message}</ErrorMessage>
                </>
              }
            >
              Street No.
            </CustomLabel>

            <CustomLabel
              inputNode={
                <>
                  <CustomRadixInput
                    placeholder="Enter Land Mark"
                    {...register("landMark")}
                  />
                  <ErrorMessage>{errors.landMark?.message}</ErrorMessage>
                </>
              }
            >
              Land Mark
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
            <SubmitButton>Register & Next</SubmitButton>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default RegisterForm;
