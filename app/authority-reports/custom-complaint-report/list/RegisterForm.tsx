"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { z } from "zod";
import { ADMIN_DASHBOARD_API, AUTH_API } from "../../../APIs";
import SubmitButton from "../../../components/Form/SubmitButton";
import apiClient, { AxiosError } from "../../../services/api-client";
import CustomTextField from "../../../components/CustomTextField";
import CustomSearchDropdown from "../../../components/CustomSearchDropdown";
import useGetSelectedDivision from "../../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../../hooks/useGetSelectedTehsil";
import { isAxiosError } from "axios";

const schema = z.object({
  fullName: z.string().min(1, { message: "Please add Full Name!" }),
  phoneNumber: z.string().min(1, { message: "Please add Phone Number!" }),
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

type RegisterInput = z.input<typeof schema>;

interface Props {
  setUserId: Dispatch<SetStateAction<string>>;
  setOpenComplaintForm: Dispatch<SetStateAction<boolean>>;
}

const RegisterForm = ({ setUserId, setOpenComplaintForm }: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [registerUser, setRegisterUser] = useState<any>(null);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

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
  const selectedDivisionId = watch("divisionId");
  const selectedDistrictId = watch("districtId");

  const handleSearchRegisterUser = async (phone: string) => {
    try {
      const res = await apiClient.get(
        `${ADMIN_DASHBOARD_API}/search-member?phoneNumber=${phone}`
      );

      if (res?.data?.responseCode === 200 && res?.data?.data) {
        setRegisterUser(res?.data?.data);
        setShowUserPopup(true);
        toast.info(res?.data?.responseMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    const payload = {
      emailOrPhone: registerUser.phoneNumber,
      password: "",
    };
    try {
      const response = await apiClient.post(`${AUTH_API}/login`, payload);
      if (response?.data?.responseCode === 200) {
        setUserId(response?.data?.userProfile?.userId);
        router.refresh();
        setShowUserPopup(false);
        setOpenComplaintForm(true);
        handleClose();
      }

      console.log(response, "response");
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.data?.responseMessage ||
            "Login failed. Please try again."
        );
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    console.log("close dialog");
  };

  const onSubmit = async (formData: RegisterInput) => {
    console.log(errors);

    try {
      const response = await apiClient.post(AUTH_API + "/register", formData);

      console.log("response", response);
      if (response?.data?.responseCode === 200) {
        setOpenComplaintForm(true);
        setUserId(response?.data?.data?.id);
        console.log("Response:", response?.data?.data?.id);
        router.refresh();
        toast.success("Registered Successfully");
        handleClose();
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

  const { data: selectedDivisionData } = useGetSelectedDivision({
    id: 1,
  });

  const { data: selectedDistrictData } = useGetSelectedDistrict({
    id: selectedDivisionId,
  });
  const { data: selectedTehsilData } = useGetSelectedTehsil({
    id: selectedDistrictId,
  });

  return (
    <>
      <Dialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger onClick={() => reset()}>
          <Button className="bg-(--primary)! cursor-pointer! rounded-full!">
            Add Custom Complaint
          </Button>
        </Dialog.Trigger>

        <Dialog.Content
          maxWidth="896px"
          className="p-3!"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <Dialog.Title>
            <Flex justify="between" align="center" className="mb-5!">
              <p className="text-(--primary) py-2! font-bold text-xl">
                Hello! Register to get Started
              </p>
              <Dialog.Close>
                <IconButton
                  radius="full"
                  className="w-5! h-5! bg-(--primary)! py-2! cursor-pointer!"
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
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
              <CustomTextField
                label="Full Name"
                placeholder="Enter Full Name"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <CustomTextField
                label="Phone Number"
                placeholder="03XXXXXXXXX"
                error={errors.phoneNumber?.message}
                {...register("phoneNumber")}
                onBlur={(e) => {
                  const value = e.target.value;

                  // ✅ Pakistan phone validation
                  if (/^03\d{9}$/.test(value)) {
                    handleSearchRegisterUser(value);
                  }
                }}
              />

              <Controller
                name="divisionId"
                control={control}
                render={({ field }) => (
                  <CustomSearchDropdown
                    label="Division"
                    name="divisionId"
                    placeholder="Select Division"
                    error={errors.divisionId?.message}
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
                name="districtId"
                control={control}
                render={({ field }) => (
                  <CustomSearchDropdown
                    label="District"
                    name="districtId"
                    placeholder="Select District"
                    disabled={!selectedDivisionId}
                    error={errors.districtId?.message}
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
                name="tehsilId"
                control={control}
                render={({ field }) => (
                  <CustomSearchDropdown
                    label="Tehsil"
                    name="tehsilId"
                    placeholder="Select Tehsil"
                    disabled={!selectedDistrictId}
                    error={errors.tehsilId?.message}
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

              <CustomTextField
                label="House No."
                placeholder="Enter House No."
                error={errors.houseNo?.message}
                {...register("houseNo")}
              />

              <CustomTextField
                label="Street #"
                placeholder="Enter Street No"
                error={errors.streetNo?.message}
                {...register("streetNo")}
              />

              <CustomTextField
                label="Land Mark"
                placeholder="Enter Land Mark"
                error={errors.landMark?.message}
                {...register("landMark")}
              />
            </div>

            <Flex gap="3" mt="4" justify="between">
              <Dialog.Close>
                <Button
                  onClick={() => reset()}
                  className="w-[187px]! h-[41px]! text-gray-800! py-[0.688em]! px-[1em]! font-bold! bg-[#EFF0F2]! rounded-[5px]! border border-[rgba(239,240,242,0.4)]! cursor-pointer!"
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <SubmitButton>Register & Next</SubmitButton>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>

      <Dialog.Root open={showUserPopup} onOpenChange={setShowUserPopup}>
        <Dialog.Content maxWidth="420px" className="p-4!">
          <Dialog.Title className="text-lg font-bold text-(--primary)">
            User Already Registered
          </Dialog.Title>

          <div>
            <p className="text-sm">
              <span className="font-bold">Name:</span> {registerUser?.fullName}
            </p>
            <p className="text-sm">
              <span className="font-bold">Phone #:</span>{" "}
              {registerUser?.phoneNumber}
            </p>
          </div>

          <Flex justify="end" gap="3" mt="4">
            <Button
              variant="soft"
              color="gray"
              onClick={() => setShowUserPopup(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-(--primary)! cursor-pointer!"
              onClick={handleLogin}
              disabled={loginLoading}
            >
              {loginLoading ? "Logging in..." : "Continue"}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default RegisterForm;
