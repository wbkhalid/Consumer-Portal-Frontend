import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { formatDate } from "../../utils/utils";
import { useMemo, useState } from "react";
import PaginationControls from "../../components/table/PaginationControls";
import PendingDialog from "./PendingDialog";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import { Dialog } from "@radix-ui/themes";

interface PendingTableProps {
  rowsData: ManageComplainsData[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const PendingTable = ({ rowsData, setRefresh }: PendingTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const { data: staffData } = useGetAllStaff({
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });

  console.log(staffData, "staffData");

  const headers = [
    { label: "Id", sortable: "id" },
    { label: "Date" },
    { label: "Shop Name" },
    { label: "Phone #" },
    { label: "Complaint Type", sortable: "complaintType" },
    { label: "Category", sortable: "categoryName" },
    { label: "Section Category Name", sortable: "sectionCategoryName" },
    { label: "Section Name", sortable: "sectionName" },
    { label: "Section Description", sortable: "sectionDescription" },
    { label: "Remarks" },
    { label: "Audio Attach" },
    { label: "Files" },
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

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <>
      <div className="relative">
        <div className="h-[calc(100vh-120px)] overflow-auto">
          <div className="overflow-scroll mb-5!">
            <table className="min-w-full text-sm">
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
                {paginatedData?.map((item, index) => {
                  const images = item?.listOfImage?.filter((url) =>
                    url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
                  );

                  console.log("images", images);

                  const videos = item?.listOfImage?.filter((url) =>
                    url.match(/\.(mp4|mov|avi|mkv)$/i)
                  );

                  return (
                    <tr
                      key={index}
                      className={`transition-colors cursor-pointer duration-150 ${
                        index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                      } hover:bg-gray-100`}
                      onClick={() => {
                        setSelectedComplaint(item);
                        setOpenDialog(true);
                      }}
                    >
                      <TableBodyCell>{item?.id}</TableBodyCell>
                      <TableBodyCell className="whitespace-nowrap">
                        {formatDate(item?.createdAt)}
                      </TableBodyCell>

                      <TableBodyCell>{item?.shopName}</TableBodyCell>
                      <TableBodyCell>{item?.phoneNumber}</TableBodyCell>
                      <TableBodyCell>{item?.complaintType}</TableBodyCell>
                      <TableBodyCell>{item?.categoryName}</TableBodyCell>
                      <TableBodyCell>{item?.sectionCategoryName}</TableBodyCell>
                      <TableBodyCell>
                        {item?.sectionsDetails?.map((s) => s?.name).join(", ")}
                      </TableBodyCell>
                      <TableBodyCell>
                        {item?.sectionsDetails
                          ?.map((s) => s?.description)
                          .join(", ")}
                      </TableBodyCell>

                      <TableBodyCell className="min-w-[200px]">
                        {item?.remarks
                          ? item?.remarks?.slice(0, 50) +
                            (item?.remarks?.length > 50 ? "..." : "")
                          : ""}
                      </TableBodyCell>

                      <TableBodyCell>
                        {!item?.listAudio || item?.listAudio?.length === 0 ? (
                          <div className="bg-[#efcdcd] rounded-full px-2! py-0.5! w-fit text-(--error)">
                            No
                          </div>
                        ) : (
                          <div className="bg-[#c8d3dd] rounded-full px-2! py-0.5! w-fit text-(--primary)">
                            Yes
                          </div>
                        )}
                      </TableBodyCell>
                      <TableBodyCell>
                        {!item?.listOfImage ||
                        item?.listOfImage.length === 0 ? (
                          <div className="bg-[#efcdcd] rounded-full px-2! py-0.5! w-fit text-(--error)">
                            No
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            {images.map((imgUrl, i) => (
                              <>
                                <div
                                  key={i}
                                  className=" w-6 h-6 rounded-sm overflow-hidden border border-[#e2e8f0]"
                                >
                                  <img
                                    src={imgUrl}
                                    alt={imgUrl}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              </>
                            ))}

                            {videos.map((videoUrl, i) => (
                              <div
                                key={i}
                                className="relative w-6 h-6 rounded-sm overflow-hidden border border-[#e2e8f0]"
                              >
                                <video
                                  key={`vid-${i}`}
                                  src={videoUrl}
                                  className="w-6 h-6 rounded-sm border border-[#e2e8f0] object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </TableBodyCell>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="absolute bottom-0 py-1! w-full bg-white border-t border-[#e2e8f0]">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>

      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Content className="p-0! lg:max-w-[700px]! max-h-[80vh]! overflow-hidden!">
          <PendingDialog
            selectedComplaint={selectedComplaint}
            onClose={() => {
              setSelectedComplaint(null);
            }}
            onSuccess={() => {
              setRefresh((prev) => !prev);
            }}
          />
        </Dialog.Content>
      </Dialog.Root>

      {/* <PendingDialog
        selectedComplaint={selectedComplaint}
        setSelectedComplaint={setSelectedComplaint}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        remarks={remarks}
        setRemarks={setRemarks}
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
        loading={loading}
        setLoading={setLoading}
        handleAssignComplaint={handleAssignComplaint}
        staffData={staffData}
      /> */}
    </>
  );
};

export default PendingTable;
