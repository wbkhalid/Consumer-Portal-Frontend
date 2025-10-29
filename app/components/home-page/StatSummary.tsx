"use client";
import CustomStatCard from "./CustomStatCard";
import { IoCheckmarkDone, IoDocumentTextOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { TbSettingsExclamation, TbTimeDuration45 } from "react-icons/tb";
import { ComplainDashboardType } from "../../page";
import Link from "next/link";
import { Button, Dialog } from "@radix-ui/themes";
import TableHeaderCell from "../table/TableHeaderCell";
import TableBodyCell from "../table/TableBodyCell";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import CustomTextArea from "../CustomTextArea";
import CustomSearchDropdown, { Option } from "../CustomSearchDropdown";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";

const StatSummary = ({ data }: { data: ComplainDashboardType }) => {
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [dialogStep, setDialogStep] = useState<1 | 2 | 3>(1);
  const districtOptions: Option[] = [
    { label: "Lahore", value: "lahore" },
    { label: "Karachi", value: "karachi" },
    { label: "Islamabad", value: "islamabad" },
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
        "👋 Hey! Hallo! Welcome! I would like to express my concern regarding the pricing of fruits at your shop. It seems that the prices are significantly higher than what is typically found in other local markets. This discrepancy is quite disappointing, especially for regular customers who expect fair pricing. I hope you can review your pricing strategy to ensure it aligns with the community's standards.",
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
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <Link href="/complains">
        <CustomStatCard
          title="Total Complaints"
          value={data?.totalComplaints}
          icon={<IoDocumentTextOutline className="text-white text-lg" />}
          iconBg="bg-(--primary)"
          percentage={8.5}
        />
      </Link>

      <Dialog.Root
        onOpenChange={(open) => {
          if (!open) {
            setSelectedComplaint(null);
            setDialogStep(1);
          }
        }}
      >
        <Dialog.Trigger>
          <div>
            <CustomStatCard
              title="Pending"
              value={data?.pendingComplaints}
              icon={<GoClock className="text-white text-lg" />}
              iconBg="bg-(--primary)"
              percentage={-4.5}
            />
          </div>
        </Dialog.Trigger>

        <Dialog.Content className={`px-0! ${getDialogWidth()}`}>
          {/* ---------------- STEP 1 : Complaint List ---------------- */}
          {dialogStep === 1 && (
            <>
              <Dialog.Title>
                <div className="mb-2 flex gap-2 items-center px-3!">
                  <p className="text-[#181D27] font-semibold">Pending</p>
                  <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
                    {rowsData.length} Records
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
                          <button
                            onClick={() => {
                              setSelectedComplaint(item);
                              setDialogStep(2);
                            }}
                            className="text-(--primary) hover:text-blue-700"
                          >
                            <FaRegPenToSquare />
                          </button>
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

              <div className="p-4! space-y-3">
                <p>{selectedComplaint.remarks}</p>

                <div className="flex flex-col gap-1 mb-2!">
                  <CustomTextArea label="Remarks" placeholder="Remarks" />
                  <CustomSearchDropdown
                    label="Select DG"
                    placeholder="Select DG"
                    options={districtOptions}
                  />
                </div>

                <div className="flex justify-between items-center">
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
                    className="bg-(--primary)!"
                    onClick={() => {
                      // 🔹 simulate API call success
                      setTimeout(() => {
                        setDialogStep(3);
                      }, 600);
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

      {/* <Link href="/pending">
        <CustomStatCard
          title="Pending"
          value={data?.pendingComplaints}
          icon={<GoClock className="text-white text-lg" />}
          iconBg="bg-(--primary)"
          percentage={-4.5}
        />
      </Link> */}
      <Link href="/in-progress">
        <CustomStatCard
          title="In Progress"
          value={data?.inProgressComplaints}
          icon={<BsArrowUpRightSquare className="text-white text-lg" />}
          iconBg="bg-(--warning)"
          percentage={4.5}
        />
      </Link>
      <CustomStatCard
        title="Resolved"
        value={data?.resolvedComplaints}
        icon={<IoCheckmarkDone className="text-white text-lg" />}
        iconBg="bg-(--success)"
        percentage={4.5}
      />
      <CustomStatCard
        title="Escalated"
        value={data?.rejectedComplaints}
        icon={<TbSettingsExclamation className="text-white text-lg" />}
        iconBg="bg-(--error)"
        percentage={4.5}
      />
      <CustomStatCard
        title="Avg Resolution"
        value={`${data?.avgResolutionHours.toFixed(2)}h`}
        icon={<TbTimeDuration45 className="text-white text-lg" />}
        iconBg="bg-(--primary)"
        percentage={4.5}
      />
    </div>
  );
};

export default StatSummary;
