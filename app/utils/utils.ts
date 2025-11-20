import { format, parseISO } from "date-fns";

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

export const toLocal = (dateString: string) => {
  const d = parseISO(dateString);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
};

export const getDaysOld = (dateString: string) => {
  const createdDate = new Date(dateString);
  const today = new Date();

  const diffTime = today.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
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
