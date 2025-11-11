import { Button, Dialog } from "@radix-ui/themes";
import CustomStatCard from "./CustomStatCard";
import TableHeaderCell from "../table/TableHeaderCell";
import TableBodyCell from "../table/TableBodyCell";
import useGetAllComplains, {
  ManageComplainsData,
} from "../../hooks/useGetAllComplains";
import { TbSettingsExclamation } from "react-icons/tb";
import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../services/api-client";
import { COMPLAINT_API } from "../../APIs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DatePicker from "../DatePicker";
import { formatDate } from "../../utils/utils";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

interface SuperEscalationType {
  superEscalationComplaint: number;
}

const SuperEscalationDialog = ({
  superEscalationComplaint,
}: SuperEscalationType) => {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const { data: superEscalationComplaintData } = useGetAllComplains({
    status: 3,
    refresh,
  });
  const [selectedComplaint, setSelectedComplaint] =
    useState<ManageComplainsData | null>(null);
  const [dialogStep, setDialogStep] = useState<1 | 2 | 3>(1);
  const [hearingDate, setHearingDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleHearingComplaint = async () => {
    if (!selectedComplaint) return;
    if (!hearingDate) {
      toast.warning("Please select a hearing date before assigning.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        complaintId: selectedComplaint?.id,
        status: 3,
        updatedBy: "",
        assignedTo: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        hearingDate: hearingDate,
        verdict: 0,
        remarks: selectedComplaint?.remarks,
      };

      console.log("📤 Sending payload:", payload);

      const response = await apiClient.post(
        COMPLAINT_API + "/update-status",
        payload
      );

      if (response.status === 200) {
        toast.success("Assign Hearing Date successfully.");
        router.refresh();
        setRefresh((prev) => !prev);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error Hearing Date:", error);
      toast.error("Something went wrong while assign Date.");
    } finally {
      setLoading(false);
      setSelectedComplaint(null);
      setDialogStep(1);
    }
  };

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedComplaint(null);
          setDialogStep(1);
        }
      }}
    >
      <Dialog.Trigger onClick={() => setIsDialogOpen(true)}>
        <div className="cursor-pointer!">
          <CustomStatCard
            title="Super Escalation"
            value={superEscalationComplaint}
            icon={<TbSettingsExclamation className="text-white text-lg" />}
            iconBg="bg-[#af0404]"
            percentage={4.5}
          />
        </div>
      </Dialog.Trigger>

      <Dialog.Content
        className={`px-0! ${
          dialogStep === 1 ? "lg:max-w-[900px]!" : "lg:max-w-[700px]!"
        }`}
        onInteractOutside={(event) => {
          if (dialogStep === 2) {
            event.preventDefault();
          }
        }}
      >
        {dialogStep === 1 && (
          <>
            <Dialog.Title>
              <div className="flex justify-between items-center px-3!">
                <div className="mb-2 flex gap-2 items-center px-3!">
                  <p className="text-(--primary) font-bold text-sm">
                    Super Escalation
                  </p>
                  <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
                    {superEscalationComplaintData?.length} Records
                  </p>
                </div>
                <div
                  className="cursor-pointer border border-(--primary) rounded-full p-1! hover:bg-(--primary) text-(--primary) hover:text-white"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <RxCross1 className="text-xs" />
                </div>
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
                      "Section Category Name",
                      "Section Name",
                      "Section Description",
                      "Remarks",
                      "Hearing Date",
                      "Deatils",
                    ].map((header) => (
                      <TableHeaderCell key={header} label={header} />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {superEscalationComplaintData?.map((item, index) => (
                    <tr
                      key={index}
                      className={`transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <TableBodyCell>{index + 1}</TableBodyCell>
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
                      <TableBodyCell>
                        {item?.hearingDate && formatDate(item?.hearingDate)}
                      </TableBodyCell>
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

        {dialogStep === 2 && selectedComplaint && (
          <div className="px-4! max-h-[70vh]! overflow-hidden!">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src="/images/dummy-image1.png"
                  alt="Shop Banner"
                  width={36}
                  height={36}
                  className="rounded-xs"
                />
                <div className="flex flex-col gap-0">
                  <p className="font-bold text-lg">
                    {selectedComplaint?.shopName}
                  </p>
                  <p className="text-sm">
                    {formatDate(selectedComplaint?.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  onClick={() => router.push("/meeting")}
                  className="flex gap-1 border border-[#E2E8F0] p-2! rounded-md  text-[#606060] cursor-pointer!"
                >
                  <div className="bg-(--primary) w-4 h-4 rounded-md flex justify-center items-center">
                    <Image
                      src="/meet/video.png"
                      alt="video"
                      width={10}
                      height={5}
                    />
                  </div>
                  <p className="text-xs">Create Meeting</p>
                </div>
                <div className="w-fit">
                  <DatePicker
                    initialDate={
                      selectedComplaint?.hearingDate
                        ? new Date(selectedComplaint.hearingDate)
                        : null
                    }
                    onSelectDate={(date) => setHearingDate(date)}
                  />
                </div>
              </div>
            </div>

            <div className=" max-h-[55vh] overflow-scroll!">
              <div className="flex justify-between items-center mt-4!">
                <div className="flex flex-col ">
                  <p className="text-xs text-[#555555]">Phone No</p>
                  <p className="text-sm">{selectedComplaint?.phoneNumber}</p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-xs text-[#555555]">Section Category</p>
                  <p className="text-sm">
                    {selectedComplaint?.sectionCategoryName}
                  </p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-xs text-[#555555]">Section</p>
                  <p className="text-sm">
                    {selectedComplaint?.sectionsDetails
                      ?.map((section) => section?.name)
                      .join(", ")}
                  </p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-xs text-[#555555]">Category</p>
                  <p className="text-sm">{selectedComplaint?.categoryName}</p>
                </div>
              </div>
              <div className="border-b border-gray-200! my-2!" />
              <div className=" flex justify-between items-center gap-3">
                <div className="flex flex-col flex-1">
                  <p className="text-xs text-[#555555]">Address</p>
                  <p className="text-sm">
                    {"Shop # 21 university Road Rehman PLaza Sargondha"}
                  </p>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-xs text-[#555555]">Lat Long</p>
                  <p className="text-sm">{"23.3 54.3"}</p>
                </div>
              </div>
              <div className="border-b border-gray-200! my-2!" />

              <div className="flex flex-col gap-2">
                <p className="text-sm">{selectedComplaint?.remarks}</p>

                <div className="border-b border-gray-200! my-2!" />
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1! flex-1">
                    <p className="text-xs text-[#555555]">Audio Files</p>
                    {selectedComplaint?.listAudio &&
                      selectedComplaint?.listAudio?.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {selectedComplaint?.listAudio?.map(
                            (audioUrl, index) => (
                              <audio
                                key={index}
                                controls
                                className="w-full sm:w-60 rounded-md border border-(--primary)"
                              >
                                <source
                                  src={`http://103.4.95.24:151${audioUrl}`}
                                  type="audio/mpeg"
                                />
                                Your browser does not support the audio element.
                              </audio>
                            )
                          )}
                        </div>
                      )}
                  </div>

                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-xs text-[#555555]">Images</p>
                    {selectedComplaint?.listOfImage &&
                      selectedComplaint?.listOfImage?.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {selectedComplaint?.listOfImage?.map(
                            (imgUrl, index) => (
                              <div
                                key={index}
                                className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200"
                              >
                                <Image
                                  src={imgUrl}
                                  alt={`Complaint image ${index + 1}`}
                                  fill
                                  className="object-fit"
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2! mb-2!">
              <Button
                variant="outline"
                className="text-(--primary)! outline! outline-(--primary)! shadow-none! cursor-pointer! hover:text-white! hover:bg-(--primary)! text-[12px]!"
                style={{ outlineWidth: "1px" }}
                onClick={() => {
                  setSelectedComplaint(null);
                  setDialogStep(1);
                }}
              >
                Cancel
              </Button>

              <Button
                className="bg-(--primary)! cursor-pointer! hover:opacity-85! text-white"
                disabled={loading}
                onClick={handleHearingComplaint}
              >
                {loading ? "Hearing..." : "Set Hearing Date"}
              </Button>
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SuperEscalationDialog;
