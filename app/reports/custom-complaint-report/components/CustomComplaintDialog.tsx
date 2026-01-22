import { Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";
import RegisterationForm from "./RegisterationForm";
import ComplaintForm from "./ComplaintForm";
import { HugeiconsIcon } from "@hugeicons/react";
import { AddSquareIcon } from "@hugeicons/core-free-icons";

interface CustomComplaintProp {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomComplaintDialog = ({ setRefresh }: CustomComplaintProp) => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState("");
  const [openCustomDilaog, setOpenCustomDialog] = useState(false);

  return (
    <Dialog.Root
      open={openCustomDilaog}
      onOpenChange={(open) => {
        setOpenCustomDialog(open);
        if (!open) {
          setStep(1);
          setUserId("");
        }
      }}
    >
      <Dialog.Trigger>
        <Button className="border! border-(--primary)! cursor-pointer! rounded-lg! bg-[linear-gradient(180deg,#036CCF_-46.25%,#013769_100%)]! shadow-[0px_1px_2px_rgba(10,13,18,0.05)]! hover:opacity-95! transition-all!">
          Add Custom Complaint
          <HugeiconsIcon icon={AddSquareIcon} />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        maxWidth="896px"
        className="p-3!"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <p className="font-semibold text-lg mb-2!">
          {step === 1 ? "Registeration Form" : "Complaint Form"}
        </p>
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
