import axios from "axios";
import { format, parseISO } from "date-fns";
import { FILE_UPLOAD_API } from "../APIs";
import apiClient from "../services/api-client";

export const DecisionPhotos = "decisionphoto";
export const decionsVideos = "decisionvideo";

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
