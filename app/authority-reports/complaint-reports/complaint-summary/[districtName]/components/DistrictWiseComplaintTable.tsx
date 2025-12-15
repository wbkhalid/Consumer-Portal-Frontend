"use client";

import TableBodyCell from "../../../../../components/table/TableBodyCell";
import TableHeaderCell from "../../../../../components/table/TableHeaderCell";
import { ManageComplainsData } from "../../../../../hooks/useGetAllComplains";
import { formatDate } from "../../../../../utils/utils";

interface Props {
  complaints: ManageComplainsData[];
  districtName: string;
}

const DistrictWiseComplaintTable = ({ complaints, districtName }: Props) => {
  const headers = [
    { label: "Id", sortable: "id" },
    { label: "Date" },
    { label: "Shop Name" },
    { label: "Phone #" },
    { label: "Complaint Type", sortable: "complaintType" },
    { label: "Category", sortable: "categoryName" },
    { label: "Section Category Name", sortable: "sectionCategoryName" },
    { label: "Section Name" },
    { label: "Section Description" },
    { label: "Remarks" },
    { label: "Audio Attach" },
    { label: "Files" },
  ];

  return (
    <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
      <h2 className="text-lg font-semibold mb-4">
        Complaints – {districtName}
      </h2>

      <div className="h-[calc(100vh-120px)] overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="font-semibold">
              {headers.map((h) => (
                <TableHeaderCell
                  key={h.label}
                  label={h.label}
                  sortable={h.sortable}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {complaints.map((item, index) => {
              const images =
                item?.listOfImage?.filter((url) =>
                  url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
                ) || [];

              const videos =
                item?.listOfImage?.filter((url) =>
                  url.match(/\.(mp4|mov|avi|mkv)$/i)
                ) || [];

              return (
                <tr
                  key={item.id}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{item.id}</TableBodyCell>

                  <TableBodyCell className="whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </TableBodyCell>

                  <TableBodyCell>{item.shopName}</TableBodyCell>
                  <TableBodyCell>{item.phoneNumber}</TableBodyCell>
                  <TableBodyCell>{item.complaintType}</TableBodyCell>
                  <TableBodyCell>{item.categoryName}</TableBodyCell>
                  <TableBodyCell>{item.sectionCategoryName}</TableBodyCell>

                  <TableBodyCell>
                    {item.sectionsDetails?.map((s) => s.name).join(", ")}
                  </TableBodyCell>

                  <TableBodyCell>
                    {item.sectionsDetails?.map((s) => s.description).join(", ")}
                  </TableBodyCell>

                  <TableBodyCell className="min-w-[200px]">
                    {item.remarks
                      ? item.remarks.slice(0, 50) +
                        (item.remarks.length > 50 ? "..." : "")
                      : ""}
                  </TableBodyCell>

                  <TableBodyCell>
                    {item.listAudio?.length ? (
                      <span className="badge-primary">Yes</span>
                    ) : (
                      <span className="badge-error">No</span>
                    )}
                  </TableBodyCell>

                  <TableBodyCell>
                    {images.length || videos.length ? (
                      <div className="flex gap-1">
                        {images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            className="w-6 h-6 rounded-sm object-cover border"
                          />
                        ))}

                        {videos.map((vid, i) => (
                          <video
                            key={i}
                            src={vid}
                            className="w-6 h-6 rounded-sm border"
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="badge-error">No</span>
                    )}
                  </TableBodyCell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictWiseComplaintTable;
