import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
import RegisterationForm from "./RegisterationForm";
import ComplaintForm from "./ComplaintForm";

interface CustomComplaintProp {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomComplaintDialog = ({ setRefresh }: CustomComplaintProp) => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [openCustomDilaog, setOpenCustomDialog] = useState(false);

  return (
    <Dialog.Root open={openCustomDilaog} onOpenChange={setOpenCustomDialog}>
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
        {step === 2 && (
          <ComplaintForm
            userId={userId}
            onSuccess={() => {
              setOpenCustomDialog(false);
              setStep(1);
              setUserId("");
              setRefresh(true);
            }}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomComplaintDialog;
