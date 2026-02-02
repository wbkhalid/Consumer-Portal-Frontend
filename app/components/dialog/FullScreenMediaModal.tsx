"use client";

import { Dialog } from "@radix-ui/themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

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
      <Dialog.Content className="p-0! rounded-none!  max-w-[70%]! h-[80vh] ">
        <div
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 z-50 text-red-500 hover:opacity-70 cursor-pointer"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={22} />
        </div>

        {/* Media Container */}
        <div className="w-full h-full flex items-center justify-center">
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
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FullScreenMediaModal;
