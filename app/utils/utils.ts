import { format, parseISO, isValid } from "date-fns";
import { FILE_UPLOAD_API } from "../APIs";
import apiClient from "../services/api-client";
import { subDays } from "date-fns";
import Cookies from "js-cookie";

export const DecisionPhotos = "decisionphoto";
export const decionsVideos = "decisionvideo";

export const getRole = () => {
  const role = Cookies.get("role");
  return role;
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  try {
    const localDate = new Date(dateString);
    return format(localDate, "MMM dd, yyyy");
  } catch {
    return "-";
  }
};

export const LongFormatDate = (dateStr: string | null): string => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const formatTimeOnly = (dateString?: string | null): string => {
  if (!dateString) return "-";

  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "-";

    return format(date, "hh:mm a"); // ✅ 12:09 PM
  } catch {
    return "-";
  }
};

export const toLocal = (dateString: string) => {
  const d = parseISO(dateString);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
};

export const formatComplaintId = (
  id: number | undefined,
  entryType: number | undefined,
  date?: string
) => {
  if (!id) return "-";

  const typeChar = entryType === 0 ? "O" : "M";
  const year = date ? new Date(date).getFullYear() : new Date().getFullYear();

  return `CP${typeChar}-${year}-${id}`;
};

export const getUniqueSectionNumbers = (sections?: { name?: string }[]) => {
  if (!sections || sections.length === 0) return "-";

  const numbers = sections
    ?.map((s) => s?.name?.replace(/SECTION\s*/i, "")?.trim())
    ?.filter(Boolean);

  const uniqueNumbers = Array.from(new Set(numbers));

  return uniqueNumbers.join(",");
};

export const getDaysOld = (dateString: string) => {
  const createdDate = new Date(dateString);
  const today = new Date();

  const diffTime = today.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const uploadFile = async (
  e: React.ChangeEvent<HTMLInputElement>,
  category: string
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  try {
    const response = await apiClient.post(
      `${FILE_UPLOAD_API}/upload-files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("API Response:", response);
    return response.data;
  } catch (err) {
    console.error("Upload failed:", err);
  }
};

export const statusData = [
  { id: 0, label: "Pending" },
  { id: 1, label: "Proceeding" },
  { id: 2, label: "Escalation" },
  { id: 3, label: "Super Escalation" },
  { id: 4, label: "Decided on Merit" },
  { id: 5, label: "Ex-Parte" },
  { id: 6, label: "Withdraw" },
  { id: 7, label: "Non-Prosecution" },
];

export const statusColors: Record<string, { text: string; bg: string }> = {
  Pending: { text: "#eb5b0d", bg: "rgba(235,91,13,0.2)" },
  Proceeding: { text: "#9537eb", bg: "rgba(149,55,235,0.2)" },
  Escalation: { text: "#cd8e05", bg: "rgba(205,142,5,0.2)" },
  "Super Escalation": { text: "#de2929", bg: "rgba(222,41,41,0.2)" },
  "Decided on Merit": { text: "#16a34a", bg: "rgba(22,163,74,0.2)" },
  "Non-Prosecution": { text: "#4f5866", bg: "rgba(79,88,102,0.2)" },
  Withdraw: { text: "#0795b6", bg: "rgba(7,149,182,0.2)" },
  "Ex-Parte": { text: "#5148e6", bg: "rgba(81,72,230,0.2)" },
};

export const getDateRange = (rangeLabel: string) => {
  const today = new Date();

  switch (rangeLabel) {
    case "1-30":
      return {
        minDate: subDays(today, 30),
        maxDate: today,
      };

    case "31-60":
      return {
        minDate: subDays(today, 60),
        maxDate: subDays(today, 31),
      };

    case "61-120":
      return {
        minDate: subDays(today, 120),
        maxDate: subDays(today, 61),
      };

    case "121-180":
      return {
        minDate: subDays(today, 180),
        maxDate: subDays(today, 121),
      };

    case "181+":
      return {
        minDate: subDays(today, 10000), // bohot pehle
        maxDate: subDays(today, 181),
      };

    default:
      return {
        minDate: undefined,
        maxDate: undefined,
      };
  }
};

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_YEAR = new Date().getFullYear();

export const getFormattedDate = (
  dateInput: string | Date,
  formatType: "short" | "numeric" = "short"
): string => {
  let date: Date | null = null;

  if (typeof dateInput === "string") {
    if (dateInput.includes("-")) {
      const parts = dateInput.split("-");
      if (parts.length === 3) {
        const [first, second, third] = parts.map((part) => parseInt(part, 10));

        if (dateInput.match(/^\d{4}-\d{2}-\d{2}$/)) {
          // yyyy-mm-dd
          date = new Date(first, second - 1, third);
        } else if (third > 31) {
          // dd-mm-yyyy (year at the end)
          date = new Date(third, second - 1, first);
        } else {
          // mm-dd-yyyy (month at the start)
          date = new Date(third, first - 1, second);
        }
      }
    }
  } else if (dateInput instanceof Date) {
    // Use Date instance directly
    date = dateInput;
  }

  if (!date || isNaN(date.getTime())) {
    return "Invalid Date"; // Handle invalid dates
  }

  // Format the date as dd-MMM-yyyy
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

/**
 * Enhanced date validation
 */
export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return false;

  // Check format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Creates a Date object from YYYY-MM-DD string at local midnight
 * Prevents timezone conversion issues
 */
export const fromLocalDateString = (dateString: string): Date | null => {
  if (!dateString || !isValidDate(dateString)) return null;

  const [year, month, day] = dateString.split("-").map(Number);

  // Create date at local midnight (not UTC midnight)
  return new Date(year, month - 1, day, 0, 0, 0, 0);
};

export const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

/**
 * Converts a date to local date string (YYYY-MM-DD) without timezone offset
 * This prevents the "day behind" issue when copying dates
 */
export const toLocalDateString = (date: Date | string | null): string => {
  if (!date) return "";

  const d = date instanceof Date ? date : new Date(date);

  // Check if date is valid
  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export interface BaseQuery<T> {
  year?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
  search?: string;
  orderBy?: keyof T; // 👈 Dynamic based on type you pass
  order?: "asc" | "desc";
}

import * as XLSX from "xlsx";

export const exportDataToExcel = (
  data: Record<string, any>[],
  headers: string[],
  filename: string
) => {
  // Create a worksheet
  const worksheetData = [
    headers, // Add renamed headers as the first row
    ...data.map((row) => headers.map((header) => row[header])), // Populate data using renamed headers
  ];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a file
  XLSX.writeFile(workbook, filename);
};

export type Column<T> = {
  label: string;
  value?: keyof T;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Generic PDF export method
export const exportDataToPDF = (
  headers: string[],
  rows: any[],
  filename: string,
  orientation: "portrait" | "landscape" = "portrait"
) => {
  const doc = new jsPDF({ orientation });

  // Title (optional)
  doc.setFontSize(14);
  doc.text(filename.replace(".pdf", ""), 14, 15);

  // Table
  autoTable(doc, {
    startY: 25,
    head: [headers],
    body: rows.map((row) => headers.map((h) => row[h])),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [19, 66, 115] }, // nice dark-blue header
  });

  doc.save(filename);
};
