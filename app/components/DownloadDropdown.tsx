"use client";

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
        <Button className="rounded-full! cursor-pointer! flex items-center gap-2">
          Download
          <RxDownload size={18} />
        </Button>
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
