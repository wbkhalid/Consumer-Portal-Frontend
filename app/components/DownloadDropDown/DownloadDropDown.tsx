"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PiFilePdfThin, PiMicrosoftExcelLogoLight } from "react-icons/pi";
import styles from "./DropDown.module.css";

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
    <div className={styles.dropdown} ref={dropdownRef}>
      {/* <button
        className="btn btn-sm rounded-3 shadow-sm"
        onClick={() => setShow(!show)}
        style={{
          background: "rgba(255, 255, 255, 0.62)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
        }}
      >
        <p className="m-0 text-dark fw-normal">
          Downloads&nbsp;
          <Image src={downloadBlack2} alt="download" width={16} height={16} />
        </p>
      </button> */}
      {styleVarient === 1 ? (
        <button
          className="bg-color-evaluation-theme-blue text-white rounded-pill d-flex align-items-center fs15px fw-bold border-0"
          style={{ padding: "8px 13px", gap: "7px" }}
          onClick={() => setShow(!show)}
        >
          <Image
            src="/icons/cloud-download.svg"
            alt="cloud-download"
            width={22}
            height={22}
            style={{ width: "22px", height: "22px" }}
          />
          Download
        </button>
      ) : (
        <button
          className="bg-white rounded-pill d-flex align-items-center fs15px fw-bold"
          style={{
            padding: "8px 13px",
            gap: "7px",
            border: "1px solid #CBD5E1",
            color: "#475569",
          }}
          onClick={() => setShow(!show)}
        >
          <Image
            src="/icons/download-03.svg"
            alt="download-03"
            width={22}
            height={22}
            style={{ width: "22px", height: "22px" }}
          />
          Download
        </button>
      )}
      <div
        className={`fs12px ${styles.dropdownContent} ${show && styles.show}`}
      >
        {onClickPdf && (
          <Link
            href="#"
            className="btn w-100 fs12px fw-bold text-start shadow-none flex items-center gap-1"
            onClick={onClickPdf}
          >
            <PiFilePdfThin size={16} />
            <span>PDF</span>
          </Link>
        )}
        {onClickExcel && (
          <Link
            href="#"
            className="btn w-100 fs12px fw-bold text-start shadow-none flex items-center gap-1"
            onClick={onClickExcel}
          >
            <PiMicrosoftExcelLogoLight size={16} />
            <span>Excel</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DownloadDropDown;
