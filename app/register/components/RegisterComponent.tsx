"use client";

import { Box, Button, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import CustomPasswordField from "../../components/CustomPasswordField";
import { LuMail, LuMailQuestion, LuPhone, LuUser } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { AUTH_API } from "../../APIs";
import { toast } from "react-toastify";
import apiClient from "../../services/api-client";
import { useRouter } from "next/navigation";
import CustomSearchDropdown from "../../components/CustomSearchDropdown";
import useGetSelectedDivision from "../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../hooks/useGetSelectedTehsil";
import useGetAllRoles from "../../hooks/useGetAllRoles";
import CustomTextField from "../../components/CustomTextField";

const schema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    phoneNumber: z.string().min(1, "phone Number is required"),
    cnic: z.string().min(15, "CNIC must be 15 characters (XXXXX-XXXXXXX-X)"),
    roleName: z.string().min(1, "Role is required"),
    divisionId: z.number(),
    districtId: z.number(),
    tehsilId: z.number(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 special character"
      ),

    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Register = z.infer<typeof schema>;

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Register>({ resolver: zodResolver(schema) });
  const router = useRouter();
  const selectedDivisionId = watch("divisionId");
  const selectedDistrictId = watch("districtId");
  // const selectedRole = watch("roleName");
  const { data: selectedDivisionData } = useGetSelectedDivision({
    id: 1,
  });
  const { data: selectedDistrictData } = useGetSelectedDistrict({
    id: selectedDivisionId,
  });
  const { data: selectedTehsilData } = useGetSelectedTehsil({
    id: selectedDistrictId,
  });
  const { data: rolesData } = useGetAllRoles();

  const onSubmit = async (formData: Register) => {
    try {
      const { confirmPassword, ...paylaod } = formData;
      const response = await apiClient.post(`${AUTH_API}/register`, paylaod);

      console.log(response?.data);

      if (response?.data?.responseCode === 200) {
        toast.success(
          response?.data?.responseMessage || "Register successful!"
        );
        router.push("/login");
      } else {
        toast.error(
          response?.data?.responseMessage ||
            "Register failed. Please try again."
        );
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(err, "errror");

      toast.error(
        error.response?.data?.message || "Register failed. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
      <div
        className="h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden flex justify-center items-center"
        style={{ backgroundImage: 'url("/images/bg-login.png")' }}
      >
        <div
          className=" lg:w-[900px] h-[85vh] overflow-hidden flex flex-col items-center rounded-3xl 
             bg-white/10 backdrop-blur-md border border-white/40 
             p-7!"
        >
          <Image
            src="/images/logo-white.png"
            alt="login-logo"
            width={70}
            height={70}
          />

          <p className="text-white font-extrabold text-3xl text-center">
            Sign up
          </p>
          <p className="text-white text-center mb-2!">
            Enter your Credential to register and get started.
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 max-h-[40vh] overflow-y-auto">
            {/* Full Name */}
            <CustomTextField
              label="Full Name"
              placeholder="Enter Full Name"
              endAdornment={<LuUser size={18} />}
              error={errors.fullName?.message}
              {...register("fullName")}
            />

            {/* Phone */}
            <CustomTextField
              label="Phone Number"
              placeholder="03XXXXXXXXX"
              endAdornment={<LuPhone size={18} />}
              error={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />

            <CustomTextField
              label="CNIC"
              placeholder="12345-1234567-1"
              endAdornment={<LuUser size={18} />}
              error={errors.cnic?.message}
              {...register("cnic")}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");

                if (value.length > 13) value = value.slice(0, 13);

                let formatted = value;
                if (value.length > 5) {
                  formatted = value.slice(0, 5) + "-" + value.slice(5);
                }
                if (value.length > 12) {
                  formatted =
                    value.slice(0, 5) +
                    "-" +
                    value.slice(5, 12) +
                    "-" +
                    value.slice(12);
                }

                e.target.value = formatted;
              }}
            />

            <Controller
              name="roleName"
              control={control}
              render={({ field }) => (
                <CustomSearchDropdown
                  label="Role"
                  name="roleName"
                  isRegister={true}
                  placeholder="Select Role"
                  error={errors.roleName?.message}
                  value={String(field.value)}
                  onChange={(val) => field.onChange(val)}
                  options={
                    rolesData?.map((role) => ({
                      label: ` ${role?.name}`,
                      value: String(role?.name),
                    })) ?? []
                  }
                />
              )}
            />
            <Controller
              name="divisionId"
              control={control}
              render={({ field }) => (
                <CustomSearchDropdown
                  label="Division"
                  name="divisionId"
                  isRegister={true}
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
                  isRegister={true}
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
                  isRegister={true}
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

            {/* {selectedRole === "Admin" && (
              <> */}
            <CustomPasswordField
              label="Password"
              placeholder="Password"
              {...register("password")}
              error={errors?.password?.message}
            />

            <CustomPasswordField
              label="Confirm Password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              error={errors?.confirmPassword?.message}
            />
            {/* </>
            )} */}
          </div>

          <Button
            size="3"
            className="rounded-full! w-full! cursor-pointer! mt-4!"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sign Up..." : "Sign Up"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterComponent;
