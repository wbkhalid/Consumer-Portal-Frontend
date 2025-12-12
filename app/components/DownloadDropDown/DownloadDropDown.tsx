"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PiFilePdfThin, PiMicrosoftExcelLogoLight } from "react-icons/pi";
import styles from "./DropDown.module.css";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { CloudDownloadIcon } from "@hugeicons/core-free-icons";

interface Props {
  onClickPdf?: () => void;
  onClickExcel?: () => void;
  styleVarient?: 1 | 2;
}

const DownloadDropDown = ({
  onClickPdf,
  onClickExcel,
  styleVarient = 1,
}: Props) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents SSR crash
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button className="h-full! rounded-[0.438rem]! py-[9.5px]! outline-0!">
          <HugeiconsIcon icon={CloudDownloadIcon} /> Download
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {onClickPdf && (
          <DropdownMenu.Item onClick={onClickPdf}>
            <PiFilePdfThin /> PDF
          </DropdownMenu.Item>
        )}
        {onClickExcel && (
          <DropdownMenu.Item onClick={onClickExcel}>
            <PiMicrosoftExcelLogoLight /> EXCEL
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DownloadDropDown;
