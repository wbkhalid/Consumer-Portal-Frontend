"use client";

import { Button, Dialog } from "@radix-ui/themes";
import CustomPasswordField from "../../components/CustomPasswordField";
import { LuPhone, LuUser } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { AUTH_API } from "../../APIs";
import { toast } from "react-toastify";
import apiClient from "../../services/api-client";
import CustomSearchDropdown from "../../components/CustomSearchDropdown";
import CustomTextField from "../../components/CustomTextField";
import useGetSelectedDivision from "../../hooks/useGetSelectedDivision";
import useGetSelectedDistrict from "../../hooks/useGetSelectedDistrict";
import useGetSelectedTehsil from "../../hooks/useGetSelectedTehsil";
import useGetAllRoles from "../../hooks/useGetAllRoles";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";

const schema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    roleName: z.string().min(1, "Role is required"),
    divisionId: z.number().optional(),
    districtId: z.number().optional(),
    tehsilId: z.number().optional(),
    email: z.string().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 special character",
      ),

    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })

  // Password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

  .refine(
    (data) => {
      const role = data.roleName;

      if (["Admin", "Secretary", "DG"].includes(role)) return true;

      if (role === "Commissioner") {
        return !!data.divisionId;
      }

      if (["DC", "AD"].includes(role)) {
        return !!data.divisionId && !!data.districtId;
      }

      if (role === "AC") {
        return !!data.divisionId && !!data.districtId && !!data.tehsilId;
      }

      return true;
    },
    {
      message: "Please fill required fields for this role",
      path: ["roleName"],
    },
  );

type Register = z.infer<typeof schema>;

type AddStaffDialog = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddStaff = ({ setIsOpen, setRefresh }: AddStaffDialog) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<Register>({ resolver: zodResolver(schema) });
  const selectedRole = watch("roleName");
  const selectedDivisionId = watch("divisionId");
  const selectedDistrictId = watch("districtId");

  useEffect(() => {
    if (selectedDivisionId) {
      resetField("districtId");
      resetField("tehsilId");
    }
  }, [selectedDivisionId]);
  useEffect(() => {
    if (selectedRole) {
      resetField("divisionId");
      resetField("districtId");
      resetField("tehsilId");
    }
  }, [selectedRole]);

  console.log(errors, "//////");

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

  const filteredRoles = rolesData?.filter(
    (role) => !["Admin", "User", "PTCL_MEETING_USER"].includes(role?.name),
  );

  const onSubmit = async (formData: Register) => {
    try {
      const { confirmPassword, ...payload } = formData;
      payload.email = "";

      const role = formData.roleName;

      if (["Admin", "Secretary", "DG"].includes(role)) {
        payload.divisionId = 0;
        payload.districtId = 0;
        payload.tehsilId = 0;
        console.log(payload, "payload1");
      } else if (role === "Commissioner") {
        payload.districtId = 0;
        payload.tehsilId = 0;
        console.log(payload, "payload2");
      } else if (["DC", "AD"].includes(role)) {
        payload.tehsilId = 0;
        console.log(payload, "payload3");
      }

      console.log(payload, "payload");

      const response = await apiClient.post(`${AUTH_API}/register`, payload);

      console.log(response?.data);

      if (response?.data?.responseCode === 200) {
        toast.success(
          response?.data?.responseMessage || "Register successful!",
        );
        setRefresh((prev) => !prev);
        setIsOpen(false);
      } else {
        toast.error(
          response?.data?.responseMessage ||
            "Register failed. Please try again.",
        );
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(err, "errror");

      toast.error(
        error.response?.data?.message || "Register failed. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
      <div>
        <div className="flex justify-between items-center mb-5!">
          <p className="text-(--primary) font-bold text-lg ">
            Staff Registeration
          </p>

          <div
            className="flex justify-center items-center text-sm bg-(--primary) text-white rounded-full w-5 h-5 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <RxCross2 />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 max-h-[40vh] overflow-y-auto">
          <CustomTextField
            label="Full Name"
            placeholder="Enter Full Name"
            endAdornment={<LuUser size={18} />}
            error={errors.fullName?.message}
            {...register("fullName")}
          />

          <CustomTextField
            label="Phone Number"
            placeholder="03XXXXXXXXX"
            endAdornment={<LuPhone size={18} />}
            error={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />

          <Controller
            name="roleName"
            control={control}
            render={({ field }) => (
              <CustomSearchDropdown
                label="Authority"
                name="roleName"
                placeholder="Select Authority"
                error={errors.roleName?.message}
                value={String(field.value)}
                onChange={(val) => field.onChange(val)}
                options={
                  filteredRoles?.map((role) => ({
                    label: ` ${role?.name}`,
                    value: String(role?.name),
                  })) ?? []
                }
              />
            )}
          />

          {["User", "Commissioner", "DC", "AD", "AC"].includes(
            selectedRole,
          ) && (
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
          )}

          {["User", "DC", "AD", "AC"].includes(selectedRole) && (
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
          )}

          {["AC", "User"].includes(selectedRole) && (
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
          )}

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
        </div>

        <div className="flex justify-between items-center mt-5!">
          <Dialog.Close>
            <Button
              type="button"
              size="3"
              variant="soft"
              className="rounded-lg!  cursor-pointer! "
            >
              Cancel
            </Button>
          </Dialog.Close>

          <Button
            size="3"
            type="submit"
            className="rounded-lg!  cursor-pointer! "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Register..." : "Register"}
          </Button>
        </div>

        {/* </div> */}
      </div>
    </form>
  );
};

export default AddStaff;
