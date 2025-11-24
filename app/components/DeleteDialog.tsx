import { Button, Dialog, Text } from "@radix-ui/themes";
import Image from "next/image";

type ConfirmDeleteDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
  onConfirm: () => void;
  title?: string;
};

const DeleteDialog = ({
  open,
  setOpen,
  message,
  onConfirm,
  title = "",
}: ConfirmDeleteDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content
        className="max-w-md! px-6! py-2! rounded-xl"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <div>
          <div className="flex justify-center mb-1!">
            <Image
              src="/images/delete-img.png"
              alt="Delete confirmation"
              width={100}
              height={100}
            />
          </div>
          <p className="text-sm text-[#475569] font-semibold text-center">
            Are you sure you want to
            <span className="text-(--error) font-bold"> Delete</span>?
          </p>
          <p className="text-center text-xs font-semibold text-[#94A3B8]">
            {message}
          </p>

          <div className="flex gap-4 mt-8!">
            <div className="flex-1">
              <Button
                size="3"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full! cursor-pointer!  text-(--primary)! outline outline-(--primary)!"
              >
                No
              </Button>
            </div>
            <div className="flex-1">
              <Button
                size="3"
                onClick={handleConfirm}
                className="w-full! cursor-pointer! bg-(--error)! hover:opacity-90!"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteDialog;
