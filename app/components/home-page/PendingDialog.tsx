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

interface pendingComplainType {
  pendingComplain: number;
}

const PendingDialog = ({ pendingComplain }: pendingComplainType) => {
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
      complaintType: "Extra Charge",
      productType: "Fruit",
      sector: "Ingredient Comdentiality",
      status: 0,
      remarks:
        "Hey! Hallo! Welcome! I would like to express my concern regarding the pricing of fruits at your shop. It seems that the prices are significantly higher than what is typically found in other local markets.",
      listAudio: [],
      listOfImage: [],
    },
    {
      shopName: "Al fatha Store",
      phoneNumber: "03174478587",
      complaintType: "Expire Date Not Mention",
      productType: "Vegetable",
      sector: "Mfg Date & Expiry",
      status: 1,
      remarks: "Extra Charges",
      listAudio: [],
      listOfImage: [],
    },
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
            title="Pending"
            value={pendingComplain}
            icon={<GoClock className="text-white text-lg" />}
            iconBg="bg-(--primary)"
            percentage={-4.5}
          />
        </div>
      </Dialog.Trigger>

      <Dialog.Content className={`px-0! ${getDialogWidth()}`}>
        {dialogStep === 1 && (
          <>
            <Dialog.Title>
              <div className="mb-2 flex gap-2 items-center px-3!">
                <p className="text-[#181D27] font-semibold">Pending</p>
                <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
                  {pendingComplain} Records
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
                      "Assign Complaint",
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
                        <FaRegPenToSquare
                          onClick={() => {
                            setSelectedComplaint(item);
                            setDialogStep(2);
                          }}
                          className="text-(--primary) w-4 h-4 cursor-pointer!"
                        />
                      </TableBodyCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ---------------- STEP 2 : Assign Form ---------------- */}
        {dialogStep === 2 && selectedComplaint && (
          <>
            <div className="px-2! flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src="/images/dummy-image1.png"
                  alt="Shop Banner"
                  width={32}
                  height={32}
                  className="rounded-xs"
                />
                <p className="font-bold text-lg">
                  {selectedComplaint?.shopName}
                </p>
              </div>

              <RxCross1
                onClick={() => {
                  setSelectedComplaint(null);
                  setDialogStep(1);
                }}
                className="cursor-pointer"
              />
            </div>
            <div className="border-b border-gray-200! my-2!" />

            <div className="px-4! flex flex-col gap-2 ">
              <p>{selectedComplaint.remarks}</p>

              <CustomTextArea label="Remarks" placeholder="Remarks" />
              <CustomSearchDropdown
                label="Select DG"
                placeholder="Select DG"
                options={directorOptions}
              />

              <div className="flex justify-between items-center mt-2!">
                <Button
                  variant="outline"
                  className="text-[#111]! outline! outline-[#111]! shadow-none! cursor-pointer! hover:text-white! hover:bg-[#111]! text-[12px]!"
                  style={{ outlineWidth: "1px" }}
                  onClick={() => {
                    setSelectedComplaint(null);
                    setDialogStep(1);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className="bg-(--primary)! cursor-pointer!"
                  onClick={() => {
                    setDialogStep(3);
                  }}
                >
                  Assign Complaint
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ---------------- STEP 3 : Success Message ---------------- */}
        {dialogStep === 3 && (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Image
              src="/images/successImage.png"
              alt="Success"
              width={120}
              height={120}
              className="mb-3"
            />
            <h3 className="font-bold ">Complain Assigned to DC Sialkot.</h3>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PendingDialog;
