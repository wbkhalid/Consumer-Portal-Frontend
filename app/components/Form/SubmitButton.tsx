import { Button } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const SubmitButton = ({ children }: PropsWithChildren) => {
  return (
    <Button
      className="w-[187px]! h-[41px]! bg-(--primary)! py-[0.688em]! px-[1em]! font-bold! rounded-[5px]! cursor-pointer!"
      type="submit"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
