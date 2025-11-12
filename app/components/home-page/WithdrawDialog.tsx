import { Dialog } from "@radix-ui/themes";
import CustomStatCard from "./CustomStatCard";
import TableHeaderCell from "../table/TableHeaderCell";
import TableBodyCell from "../table/TableBodyCell";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { IoCloseCircleOutline } from "react-icons/io5";

interface WithDrawType {
  withdrawComplaint: number;
  withDrawData: ManageComplainsData[];
}

const WithdrawDialog = ({ withdrawComplaint, withDrawData }: WithDrawType) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="cursor-pointer!">
          <CustomStatCard
            title="Withdraw"
            value={withdrawComplaint}
            icon={<IoCloseCircleOutline className="text-white text-lg" />}
            iconBg="bg-[#6B7280]"
            percentage={4.5}
          />
        </div>
      </Dialog.Trigger>

      <Dialog.Content className={`px-0! max-w-[1000px]!`}>
        <Dialog.Title>
          <div className="mb-2 flex gap-2 items-center px-3!">
            <p className="text-(--primary) font-bold text-sm">Withdraw</p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {withDrawData?.length} Records
            </p>
          </div>
        </Dialog.Title>

        <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="font-semibold bg-white">
                {[
                  "ID",
                  "Shop Name",
                  "Phone #",
                  "Complaint Type",
                  "Category",
                  "Section Category Name",
                  "Section Name",
                  "Section Description",
                  "Remarks",
                ].map((header) => (
                  <TableHeaderCell key={header} label={header} />
                ))}
              </tr>
            </thead>
            <tbody>
              {withDrawData?.map((item, index) => (
                <tr
                  key={item?.id}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{item?.id}</TableBodyCell>
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
                      ? `${item.remarks.slice(0, 50)}${
                          item.remarks.length > 50 ? "..." : ""
                        }`
                      : "—"}
                  </TableBodyCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default WithdrawDialog;
