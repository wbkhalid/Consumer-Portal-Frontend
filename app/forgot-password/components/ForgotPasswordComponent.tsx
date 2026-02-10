"use client";

import { Button } from "@radix-ui/themes";
import Image from "next/image";
import CustomPasswordField from "../../components/CustomPasswordField";
import { LuPhone } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import apiClient from "../../services/api-client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import CustomTextField from "../../components/CustomTextField";
import { AUTH_API } from "../../APIs";

const schema = z.object({
  emailOrPhone: z.string().trim().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

type Login = z.infer<typeof schema>;

const ForgotPasswordComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Login>({ resolver: zodResolver(schema) });
  const router = useRouter();

  const onSubmit = async (formData: Login) => {
    try {
      const response = await apiClient.post(`${AUTH_API}/login`, formData);
      console.log(response, "response");

      const token = response?.data?.data?.token;
      const expiration = response?.data?.data?.expiration;
      const role = response?.data?.data?.roles?.[0];
      const userProfile = response?.data?.data?.userProfile;

      console.log(userProfile, "userProfile");

      // Save cookies client-side
      Cookies.set("token", token, { expires: new Date(expiration) });
      Cookies.set("role", role, { expires: new Date(expiration) });
      Cookies.set("divisionId", userProfile?.divisionId ?? 0, {
        expires: new Date(expiration),
      });
      Cookies.set("districtId", userProfile?.districtId ?? 0, {
        expires: new Date(expiration),
      });
      Cookies.set("tehsilId", userProfile?.tehsilId ?? 0, {
        expires: new Date(expiration),
      });
      Cookies.set("userId", userProfile?.userId ?? "", {
        expires: new Date(expiration),
      });
      Cookies.set("fullName", userProfile?.fullName ?? "", {
        expires: new Date(expiration),
      });
      Cookies.set("ptclUsername", userProfile?.ptclUsername ?? "", {
        expires: new Date(expiration),
      });
      Cookies.set("ptclPassword", userProfile?.ptclPassword ?? "", {
        expires: new Date(expiration),
      });

      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(
          err.response?.data?.responseMessage ||
            "Login failed. Please try again.",
        );
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
      <div
        className="h-screen w-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: 'url("/images/bg-login.png")' }}
      >
        <div className="w-[480px] flex flex-col items-center rounded-3xl bg-white/10 backdrop-blur-md border border-white/40 p-7!">
          <p className="text-white font-extrabold text-2xl text-center">
            Forgot Password?
          </p>

          <div className="w-full flex flex-col gap-3 mt-3!">
            <CustomTextField
              label="Email or Phone #"
              placeholder="Email or Phone #"
              isRegister
              endAdornment={<LuPhone size={18} />}
              error={errors.emailOrPhone?.message}
              {...register("emailOrPhone")}
            />
          </div>

          <Button
            size="3"
            className="rounded-full! w-full! mt-4! cursor-pointer!"
            disabled={isSubmitting}
          >
            Send OTP
          </Button>
          <p
            className="text-white mt-1! cursor-pointer hover:underline"
            onClick={() => router.push(`/login`)}
          >
            Back to Login
          </p>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordComponent;
