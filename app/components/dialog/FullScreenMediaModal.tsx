"use client";

import { Dialog } from "@radix-ui/themes";

const FullScreenMediaModal = ({
  open,
  onOpenChange,
  type,
  url,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  type: "image" | "video" | null;
  url: string | null;
}) => {
  if (!url || !type) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="p-0! rounded-sm! overflow-hidden bg-black">
        <div className="w-[500px] h-[300px]">
          {type === "image" ? (
            <img
              src={url}
              alt="Media"
              className="object-contain w-full h-full"
            />
          ) : (
            <video
              src={url}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-contain"
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FullScreenMediaModal;
