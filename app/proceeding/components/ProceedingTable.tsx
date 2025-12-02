import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { formatDate, getDaysOld, toLocal } from "../../utils/utils";
import { useMemo, useState } from "react";
import PaginationControls from "../../components/table/PaginationControls";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import apiClient from "../../services/api-client";
import { COMPLAINT_API } from "../../APIs";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { format, parseISO } from "date-fns";
import { generateComplaintPDF } from "../../utils/generateComplainPdf";
import ProceedingDialog from "./ProceedingDialog";

interface ProceedingTableProps {
  rowsData: ManageComplainsData[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const PAGE_SIZE = 10;

const ProceedingTable = ({ rowsData, setRefresh }: ProceedingTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userId = Cookies.get("userId");
  const [dialogStep, setDialogStep] = useState<1 | 2>(1);
  const [hearingDate, setHearingDate] = useState<Date | null>(null);
  const [isResolved, setIsResolved] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [submittionRemarks, setSubmittionRemarks] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fineAmount, setFineAmount] = useState(0);

  const headers = [
    { label: "Id", sortable: "id" },
    { label: "Date" },
    { label: "Days Old" },
    { label: "Shop Name" },
    { label: "Phone #" },
    { label: "Complaint Type", sortable: "complaintType" },
    { label: "Category", sortable: "categoryName" },
    { label: "Nature of Complaint", sortable: "sectionCategoryName" },
    { label: "Section Name", sortable: "sectionName" },
    { label: "Section Description", sortable: "sectionDescription" },
    { label: "Remarks" },
    { label: "Assignee Remarks" },
    { label: "Hearing Date" },
    { label: "Hearing Time" },
    { label: "Generate Report" },
    { label: "Deatils" },
    { label: "Proceeding" },
  ];

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return rowsData;

    const { key, direction } = sortConfig;
    return [...rowsData].sort((a, b) => {
      let aValue = "";
      let bValue = "";

      if (key === "sectionName") {
        aValue = a.sectionsDetails?.map((s) => s.name).join(", ") ?? "";
        bValue = b.sectionsDetails?.map((s) => s.name).join(", ") ?? "";
      } else if (key === "sectionDescription") {
        aValue = a.sectionsDetails?.map((s) => s.description).join(", ") ?? "";
        bValue = b.sectionsDetails?.map((s) => s.description).join(", ") ?? "";
      } else {
        aValue = String(a[key as keyof ManageComplainsData] ?? "");
        bValue = String(b[key as keyof ManageComplainsData] ?? "");
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rowsData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return sortedData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedData, currentPage]);

  const handleHearingComplaint = async () => {
    if (!selectedComplaint) return;
    // --- Validation ---
    if (isResolved) {
      if (!selectedStatus) {
        toast.warning("Please select a status before submitting.");
        return;
      }
      if (!submittionRemarks.trim()) {
        toast.warning("Please enter remarks for the resolved complaint.");
        return;
      }
      if (!imageUrl) {
        toast.warning("Please Uplaod document");
        return;
      }
    } else {
      if (!hearingDate) {
        toast.warning("Please select a hearing date before assigning.");
        return;
      }
    }

    try {
      setLoading(true);

      const payload = {
        complaintId: selectedComplaint?.id,
        status: isResolved ? selectedStatus : 1,
        updatedBy: userId,
        assignedTo: selectedComplaint?.assignedTo,
        hearingDate: isResolved ? selectedComplaint?.hearingDate : hearingDate,
        verdict: 0,
        fineAmount: fineAmount,
        assigneeRemarks: selectedComplaint?.assigneeRemarks,
        closingRemarks: isResolved ? submittionRemarks : "",
        isClosed: isResolved ? true : false,
        complaintDecisionFiles: isResolved
          ? [
              {
                filePath: imageUrl,
                fileType: 0,
              },
              {
                filePath: videoUrl,
                fileType: 1,
              },
            ]
          : null,
      };

      console.log("📤 Sending payload:", payload);

      const response = await apiClient.post(
        COMPLAINT_API + "/update-status",
        payload
      );

      if (response.status === 200) {
        if (isResolved) {
          toast.success("Complaint Status successfully.");
        } else {
          toast.success("Assign Hearing Date successfully.");
        }
        // router.refresh();
        setRefresh((prev) => !prev);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error Hearing Date:", error);
      toast.error("Something went wrong while assign Date.");
    } finally {
      setLoading(false);
      setSelectedComplaint(null);
      setHearingDate(null);
      setIsDialogOpen(false);
      setImageUrl("");
      setVideoUrl("");
      setSelectedStatus(null);
      setSubmittionRemarks("");
      setFineAmount(0);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide relative">
          <table className="min-w-full text-sm mb-10!">
            <thead className="sticky top-0 z-10">
              <tr className="font-semibold bg-white">
                {headers?.map((header) => (
                  <TableHeaderCell
                    key={header?.label}
                    label={header?.label}
                    sortable={header?.sortable}
                    onSort={
                      header.sortable
                        ? () => handleSort(header.sortable!)
                        : undefined
                    }
                  />
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData?.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{item?.id}</TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {formatDate(item?.createdAt)}
                  </TableBodyCell>
                  <TableBodyCell>{getDaysOld(item?.createdAt)}</TableBodyCell>
                  <TableBodyCell>{item?.shopName}</TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.phoneNumber}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.complaintType}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.categoryName}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.sectionCategoryName}
                  </TableBodyCell>
                  <TableBodyCell>
                    {item?.sectionsDetails
                      ?.map((section) => section?.name)
                      .join(", ")}
                  </TableBodyCell>
                  <TableBodyCell>
                    {item?.sectionsDetails
                      ?.map((section) => section?.description)
                      .join(", ")}
                  </TableBodyCell>
                  <TableBodyCell>
                    {item?.remarks
                      ? item?.remarks?.slice(0, 50) +
                        (item?.remarks?.length > 50 ? "..." : "")
                      : ""}
                  </TableBodyCell>
                  <TableBodyCell>
                    {item?.assigneeRemarks
                      ? item?.assigneeRemarks?.slice(0, 50) +
                        (item?.assigneeRemarks?.length > 50 ? "..." : "")
                      : ""}
                  </TableBodyCell>
                  <TableBodyCell>
                    {item?.hearingDate
                      ? format(toLocal(item.hearingDate), "dd-MM-yyyy")
                      : "--"}
                  </TableBodyCell>

                  <TableBodyCell>
                    {item?.hearingDate
                      ? format(toLocal(item.hearingDate), "hh:mm a")
                      : "--"}
                  </TableBodyCell>
                  <TableBodyCell>
                    <MdOutlineFileDownload
                      onClick={() => generateComplaintPDF(item)}
                      className="text-(--primary) w-5 h-5 cursor-pointer!"
                    />
                  </TableBodyCell>
                  <TableBodyCell>
                    <FaRegPenToSquare
                      onClick={() => {
                        setSelectedComplaint(item);
                        if (item?.hearingDate) {
                          const d = parseISO(item.hearingDate);
                          const localDate = new Date(
                            d.getTime() - d.getTimezoneOffset() * 60000
                          );
                          setHearingDate(localDate);
                        } else {
                          setHearingDate(null);
                        }
                        setIsDialogOpen(true);
                        setDialogStep(1);
                        setIsResolved(false);
                      }}
                      className="text-(--primary) w-4 h-4 cursor-pointer!"
                    />
                  </TableBodyCell>
                  <TableBodyCell>
                    <div
                      className="bg-(--primary) rounded-full py-1! px-2! text-[10px] text-white! whitespace-nowrap cursor-pointer"
                      onClick={() => {
                        setSelectedComplaint(item);
                        setDialogStep(2);
                        setIsResolved(true);
                        setIsDialogOpen(true);
                      }}
                    >
                      Update Status
                    </div>
                  </TableBodyCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-0 py-1! w-full bg-white border-t border-[#e2e8f0]">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <ProceedingDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        selectedComplaint={selectedComplaint}
        setSelectedComplaint={setSelectedComplaint}
        dialogStep={dialogStep}
        setDialogStep={setDialogStep}
        hearingDate={hearingDate}
        setHearingDate={setHearingDate}
        isResolved={isResolved}
        setIsResolved={setIsResolved}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        submittionRemarks={submittionRemarks}
        setSubmittionRemarks={setSubmittionRemarks}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        loading={loading}
        setLoading={setLoading}
        handleHearingComplaint={handleHearingComplaint}
        fineAmount={fineAmount}
        setFineAmount={setFineAmount}
      />
    </>
  );
};

export default ProceedingTable;
