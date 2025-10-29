import { Button, Dialog } from "@radix-ui/themes";
import CustomStatCard from "./CustomStatCard";
import { GoClock } from "react-icons/go";
import TableHeaderCell from "../table/TableHeaderCell";
import TableBodyCell from "../table/TableBodyCell";
import { FaRegPenToSquare } from "react-icons/fa6";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import CustomTextArea from "../CustomTextArea";
import CustomSearchDropdown, { Option } from "../CustomSearchDropdown";
import { useState } from "react";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { SiGooglemeet } from "react-icons/si";
import { useRouter } from "next/navigation";

interface InProgressComplainType {
  inProgressComplain: number;
}

const InProgressDialog = ({ inProgressComplain }: InProgressComplainType) => {
  const router = useRouter();
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [dialogStep, setDialogStep] = useState<1 | 2 | 3>(1);
  const directorOptions: Option[] = [
    { label: "Director General", value: "director_general" },
    { label: "Additional Director", value: "additional_director" },
    { label: "Deputy Director", value: "deputy_director" },
    { label: "Assistant Director", value: "assistant_director" },
    { label: "Section Officer", value: "section_officer" },
    { label: "Inspector", value: "inspector" },
  ];

  const rowsData = [
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Grans",
      sector: "Quality of Product",
      status: 2,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Fruit",
      sector: "Keeping Component Parts Confidential",
      status: 3,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Vegetable",
      sector: "Ingredient Comdentiality",
      status: 0,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Grans",
      sector: "Mfg Date & Expiry",
      status: 2,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Fruit",
      sector: "Quality of Product",
      status: 2,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Vegetable",
      sector: "Keeping Component Parts Confidential",
      status: 2,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Vegetable",
      sector: "Ingredient Comdentiality",
      status: 3,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
  ];

  const getDialogWidth = () => {
    if (dialogStep === 1) return "lg:max-w-[900px]!";
    return "lg:max-w-[450px]!";
  };
  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) {
          setSelectedComplaint(null);
          setDialogStep(1);
        }
      }}
    >
      <Dialog.Trigger>
        <div className="cursor-pointer!">
          <CustomStatCard
            title="In Progress"
            value={inProgressComplain}
            icon={<BsArrowUpRightSquare className="text-white text-lg" />}
            iconBg="bg-(--warning)"
            percentage={4.5}
          />
        </div>
      </Dialog.Trigger>

      <Dialog.Content className={`px-0! ${getDialogWidth()}`}>
        <Dialog.Title>
          <div className="mb-2 flex gap-2 items-center px-3!">
            <p className="text-[#181D27] font-semibold">InProgress</p>
            <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
              {inProgressComplain} Records
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
                  "Product Type",
                  "Sector",
                  "Remarks",
                  "Meet",
                ].map((header) => (
                  <TableHeaderCell key={header} label={header} />
                ))}
              </tr>
            </thead>
            <tbody>
              {rowsData.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <TableBodyCell>{index + 1}</TableBodyCell>
                  <TableBodyCell>{item.shopName}</TableBodyCell>
                  <TableBodyCell>{item.phoneNumber}</TableBodyCell>
                  <TableBodyCell>{item.complaintType}</TableBodyCell>
                  <TableBodyCell>{item.productType}</TableBodyCell>
                  <TableBodyCell>{item.sector}</TableBodyCell>
                  <TableBodyCell>{item.remarks}</TableBodyCell>
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
