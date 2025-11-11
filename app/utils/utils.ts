import { format } from "date-fns";

export const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  try {
    const localDate = new Date(dateString);
    return format(localDate, "dd-MM-yyyy");
  } catch {
    return "-";
  }
};

export const LongFormatDate = (dateStr: string | null): string => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const statusData = [
  { id: 0, label: "Pending" },
  { id: 1, label: "Proceeding" },
  { id: 2, label: "Escalation" },
  { id: 3, label: "Super Escalation" },
  { id: 4, label: "Decided on Merit" },
  { id: 5, label: "Ex-Party" },
  { id: 6, label: "Withdraw" },
  { id: 7, label: "Non-Prosecution" },
];
