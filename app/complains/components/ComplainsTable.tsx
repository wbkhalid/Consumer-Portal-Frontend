import Image from "next/image";
import TableBodyCell from "../../components/table/TableBodyCell";
import TableHeaderCell from "../../components/table/TableHeaderCell";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";

interface ComplainsTableProps {
  rowsData: ManageComplainsData[];
}
const ComplainsTable = ({ rowsData }: ComplainsTableProps) => {
  return (
    <>
      <div className="relative">
        <div className="h-[calc(100vh-130px)] overflow-y-auto scrollbar-hide relative">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="font-semibold bg-white">
                {[
                  "Sr #",
                  "Shop Name",
                  "Phone #",
                  "Complaint Type",
                  "Category",
                  "Section",
                  "Remarks",
                  "Audio Attach",
                  "Files",
                  "Entry Type",
                ]?.map((header) => (
                  <TableHeaderCell key={header} label={header} />
                ))}
              </tr>
            </thead>

            <tbody>
              {rowsData?.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell className="whitespace-nowrap">
                    {index + 1}
                  </TableBodyCell>

                  <TableBodyCell className="whitespace-nowrap">
                    {item?.shopName}
                  </TableBodyCell>

                  <TableBodyCell className="whitespace-nowrap">
                    {item?.phoneNumber}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.complaintType}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.productType}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.sector}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
                    {item?.remarks}
                  </TableBodyCell>
                  <TableBodyCell className="whitespace-nowrap">
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
                  <TableBodyCell className="whitespace-nowrap">
                    <div className="flex gap-1">
                      <Image
                        src="/images/dummy-image1.png"
                        alt=""
                        width={25}
                        height={25}
                      />
                      <Image
                        src="/images/dummy-image2.png"
                        alt=""
                        width={25}
                        height={25}
                      />
                    </div>
                  </TableBodyCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ComplainsTable;
