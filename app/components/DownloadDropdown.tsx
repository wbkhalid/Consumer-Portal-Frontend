"use client";

import { Download03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DropdownMenu } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import { PiFilePdf, PiFileXlsDuotone } from "react-icons/pi";
import { RxDownload } from "react-icons/rx";

interface DownloadDropdownProps {
  onExportPDF: () => void;
  onExportExcel: () => void;
  disabled?: boolean;
}

const DownloadDropdown = ({
  onExportPDF,
  onExportExcel,
  disabled,
}: DownloadDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="h-full! flex gap-1 items-center bg-white border border-[#D5D7DA] rounded-lg px-3! py-2! text-[#414651] font-bold text-sm ">
          Download
          <HugeiconsIcon icon={Download03Icon} size={16} color="#414651" />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="p-0!">
        <DropdownMenu.Item
          disabled={disabled}
          className="flex items-center gap-1 px-2! cursor-pointer!"
          onClick={onExportPDF}
        >
          <PiFilePdf size={18} />
          Export PDF
        </DropdownMenu.Item>

        <DropdownMenu.Item
          disabled={disabled}
          className="flex items-center gap-1 px-2! cursor-pointer!"
          onClick={onExportExcel}
        >
          <PiFileXlsDuotone size={18} />
          Export Excel
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DownloadDropdown;
