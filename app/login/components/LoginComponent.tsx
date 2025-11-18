import { Box, Button, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import CustomPasswordField from "../../components/CustomPasswordField";
import { LuMailQuestion } from "react-icons/lu";

const LoginComponent = () => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden flex justify-center items-center"
      style={{ backgroundImage: 'url("/images/bg-login.png")' }}
    >
      <div
        className="max-w-[300px] lg:max-w-[450px] flex flex-col items-center rounded-3xl 
             bg-white/10 backdrop-blur-md border border-white/40 
             p-7!"
      >
        <Image
          src="/images/logo-white.png"
          alt="login-logo"
          width={90}
          height={90}
        />
        <p className="text-white font-extrabold text-3xl text-center">
          Welcome Back!
        </p>
        <p className="text-white text-center">
          Please enter your email and password to log in and continue.
        </p>

        <div className="w-full flex flex-col gap-3">
          <Box>
            <Text as="label" className="block mb-1! text-white text-sm">
              Email Address
            </Text>

            <TextField.Root
              placeholder="Email"
              size="3"
              className="w-full! rounded-full! border border-transparent bg-white focus:outline-none"
            >
              <TextField.Slot>
                <LuMailQuestion height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <CustomPasswordField label="Password" placeholder="Password" />
        </div>
        <Button
          size="3"
          className="rounded-full! w-full! cursor-pointer! mt-4!"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginComponent;
