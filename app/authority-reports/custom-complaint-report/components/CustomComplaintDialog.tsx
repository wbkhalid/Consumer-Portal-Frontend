import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
import RegisterationForm from "./RegisterationForm";
import ComplaintForm from "./ComplaintForm";

const CustomComplaintDialog = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");

  console.log(userId, "usertqiqiq");

  return (
    <Dialog.Root>
      <Dialog.Trigger>
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
        {step === 1 && (
          <RegisterationForm setUserId={setUserId} setStep={setStep} />
        )}
        {step === 2 && <ComplaintForm userId={userId} />}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomComplaintDialog;
