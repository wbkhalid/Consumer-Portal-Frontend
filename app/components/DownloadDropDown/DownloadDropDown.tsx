"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PiFilePdfThin, PiMicrosoftExcelLogoLight } from "react-icons/pi";
import styles from "./DropDown.module.css";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { CloudDownloadIcon, Download03Icon } from "@hugeicons/core-free-icons";

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
        {styleVarient === 1 ? (
          <div className="h-full! flex gap-1 items-center bg-white border border-[#D5D7DA] rounded-lg px-3! py-2! text-[#414651] font-bold text-sm ">
            Download
            <HugeiconsIcon icon={Download03Icon} size={16} color="#414651" />
          </div>
        ) : (
          <Button size="2" className="rounded-[0.438rem]! outline-0!">
            <HugeiconsIcon icon={CloudDownloadIcon} /> Download
            <DropdownMenu.TriggerIcon />
          </Button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content size={styleVarient === 1 ? "2" : "1"}>
        {onClickPdf && (
          <DropdownMenu.Item onClick={onClickPdf} className="cursor-pointer!">
            <PiFilePdfThin /> PDF
          </DropdownMenu.Item>
        )}
        {onClickExcel && (
          <DropdownMenu.Item onClick={onClickExcel} className="cursor-pointer!">
            <PiMicrosoftExcelLogoLight /> EXCEL
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default DownloadDropDown;
