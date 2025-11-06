import { Dialog } from "@radix-ui/themes";
import CustomStatCard from "./CustomStatCard";
import TableHeaderCell from "../table/TableHeaderCell";
import TableBodyCell from "../table/TableBodyCell";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { SiGooglemeet } from "react-icons/si";
import { useRouter } from "next/navigation";
import useGetAllComplains from "../../hooks/useGetAllComplains";

interface InProgressComplainType {
  inProgressComplain: number;
}

const InProgressDialog = ({ inProgressComplain }: InProgressComplainType) => {
  const { data: inProgressData } = useGetAllComplains({ status: 1 });
  const router = useRouter();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="cursor-pointer!">
          <CustomStatCard
            title="In-Progress"
            value={inProgressComplain}
            icon={<BsArrowUpRightSquare className="text-white text-lg" />}
            iconBg="bg-(--warning)"
            percentage={4.5}
          />
        </div>
      </Dialog.Trigger>

      <Dialog.Content className={`px-0! max-w-[1000px]!`}>
        <Dialog.Title>
          <div className="mb-2 flex gap-2 items-center px-3!">
            <p className="text-[#181D27] font-semibold">In-Progress</p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {inProgressData?.length} Records
            </p>
          </div>
        </Dialog.Title>

        <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
          <table className="w-full border-collapse text-sm">
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
                  "Meet",
                  "Entry Type",
                ].map((header) => (
                  <TableHeaderCell key={header} label={header} />
                ))}
              </tr>
            </thead>
            <tbody>
              {inProgressData?.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell>{item?.shopName}</TableBodyCell>
                  <TableBodyCell>{item?.phoneNumber}</TableBodyCell>
                  <TableBodyCell>{item?.complaintType}</TableBodyCell>
                  <TableBodyCell>{item?.productType}</TableBodyCell>
                  <TableBodyCell>{item?.sector}</TableBodyCell>
                  <TableBodyCell>{item?.remarks}</TableBodyCell>
                  <TableBodyCell>
                    <SiGooglemeet
                      onClick={() => router.push("/meeting")}
                      className="text-(--primary) w-4 h-4 cursor-pointer!"
                    />
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

export default InProgressDialog;
