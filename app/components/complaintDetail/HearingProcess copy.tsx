import { Button, Dialog } from "@radix-ui/themes";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Calendar03Icon,
  Copy01Icon,
  Location05Icon,
  Video01Icon,
  VideoCameraAiIcon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import CustomTextField from "../CustomTextField";
import useGetAllStaff from "../../hooks/useGetAllStaff";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import CustomSearchDropdown from "../CustomSearchDropdown";
import { RxCross2 } from "react-icons/rx";
import apiClient from "../../services/api-client";
import { toast } from "react-toastify";
import useGetMeetingDetails from "../../hooks/useGetMeetingDetails";

const HearingProcess = ({
  complaint,
}: {
  complaint: ManageComplainsData | null;
}) => {
  const [hearingStep, setHearingStep] = useState(0);
  const { data: meetingDetails } = useGetMeetingDetails({ id: complaint?.id });
  // const { divisionId, districtId, tehsilId } = useRegionFilters();
  // const [meetingToken, setMeetingToken] = useState("");
  const [hearingDate, setHearingDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  // const { data: staffData } = useGetAllStaff({
  //   divisionId: divisionId || "",
  //   districtId: districtId || "",
  //   tehsilId: tehsilId || "",
  // });

  const createMeeting = async (token: string) => {
    if (!hearingDate || !complaint?.id) return;

    try {
      const params = new URLSearchParams({
        meeting_title: String(complaint.id),
        meeting_date: format(hearingDate, "yyyy-MM-dd HH:mm"),
      });

      const response = await fetch(
        `https://oconnect.ptclgroup.pk/utalk/api/meetings/create?${params.toString()}`,
        {
          method: "POST",
          headers: {
            "OCONNECT-API-TOKEN": token,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Create meeting failed: ${response.status}`);
      }

      const data = await response.json();
      if (data?.status === true) {
        toast.success(data?.message || "Meeting created");
        setLoading(false);
      }
      console.log("Meeting Created:", data);
    } catch (error) {
      console.error("Create Meeting API Error:", error);
      toast.error("Failed to create meeting");
      setLoading(false);
    }
  };

  const scheduleHearing = async () => {
    if (!hearingDate) {
      toast.warning("Please select a hearing date");
      return;
    }

    try {
      setLoading(true);
      const params = new URLSearchParams({
        username: "cpcadminlhr",
        password: "PaSSword_Jm5Dks2P!@",
      });

      const response = await fetch(
        `https://oconnect.ptclgroup.pk/utalk/api/login?${params.toString()}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Login Response:", data);

      if (data?.status === true && data?.token) {
        await createMeeting(data?.token);
      }
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
      toast.error("Failed to schedule hearing");
    }
  };

  return (
    <>
      {hearingStep === 0 ? (
        <div className="px-5! py-2.5!">
          <div className="flex justify-between items-center mb-2.5!">
            <p className="text-[#555555] text-sm">Schedule New Hearing</p>
            {/* <Button
              className="rounded-full! text-xs! font-medium! cursor-pointer!"
              onClick={scheduleHearing}
              // onClick={() => setHearingStep(1)}
            >
              <HugeiconsIcon icon={Add01Icon} size={18} /> Schedule New Hearing
            </Button> */}
          </div>

          {/* <>
            <div className="w-fit">
              <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-md p-2! cursor-pointer! hover:border-(--primary) transition">
                <input
                  type="datetime-local"
                  aria-label="Hearing date"
                  className="outline-none bg-transparent text-[#606060] w-full cursor-pointer text-xs"
                  value={
                    hearingDate ? format(hearingDate, "yyyy-MM-dd'T'HH:mm") : ""
                  }
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setHearingDate(parseISO(e.target.value))}
                />
              </div>
            </div>{" "}
            <Button
              className="rounded-full! text-xs! font-medium! cursor-pointer!"
              onClick={scheduleHearing}
              disabled={loading}
              // onClick={() => setHearingStep(1)}
            >
              <HugeiconsIcon icon={Add01Icon} size={18} />
              {loading ? "Scheduling..." : "Schedule New Hearing"}
            </Button>
          </> */}

          {false ? (
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-10! rounded-[5px]! flex flex-col items-center gap-1 mt-2.5!">
              <HugeiconsIcon icon={Calendar03Icon} />
              <p className="text-[#4A5565] text-sm">
                No hearings scheduled yet
              </p>

              <>
                <div className="w-fit">
                  <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-md p-2! cursor-pointer! hover:border-(--primary) transition">
                    <input
                      type="datetime-local"
                      aria-label="Hearing date"
                      className="outline-none bg-transparent text-[#606060] w-full cursor-pointer text-xs"
                      value={
                        hearingDate
                          ? format(hearingDate, "yyyy-MM-dd'T'HH:mm")
                          : ""
                      }
                      min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                      onChange={(e) => setHearingDate(parseISO(e.target.value))}
                    />
                  </div>
                </div>{" "}
                <Button
                  className="rounded-full! text-xs! font-medium! cursor-pointer!"
                  onClick={scheduleHearing}
                  disabled={loading}
                  // onClick={() => setHearingStep(1)}
                >
                  <HugeiconsIcon icon={Add01Icon} size={18} />
                  {loading ? "Scheduling..." : "Schedule New Hearing"}
                </Button>
              </>
              {/* <Button
                className="text-xs! font-medium! cursor-pointer! leading-0! max-h-4!"
                onClick={() => setHearingStep(1)}
              >
                <HugeiconsIcon icon={Add01Icon} size={18} /> Schedule First
                Hearing
              </Button> */}
            </div>
          ) : (
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-2.5! rounded-[5px]!">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <div>
                    <HugeiconsIcon
                      icon={VideoCameraAiIcon}
                      className="text-(--primary)"
                    />
                  </div>
                  <div className="flex flex-col gap-0! text-[#606060] text-sm font-medium">
                    <p>HRG-176467592735</p>
                    <p>Thursday, December 31, 2009</p>
                  </div>
                </div>
                <div className="border border-[#CBA611] bg-[#f0e9cc]! rounded-xl py-2! px-4!">
                  <p className="text-[#CBA611] text-sm font-medium">
                    Scheduled
                  </p>
                </div>
              </div>

              <div className="flex gap-4 my-4!">
                <div>
                  <p className="text-[#555555] text-sm">Time</p>
                  <p className="text-[15px]">12:12 PM - 12:51 PM</p>
                </div>
                <div>
                  <p className="text-[#555555] text-sm">Type</p>
                  <p className="text-[15px]">Virtual</p>
                </div>
                <div>
                  <p className="text-[#555555] text-sm">Location</p>
                  <p className="text-[15px]">
                    123 Main Bazaar Road, Shop No. 45 Commercial Area, Near City
                    Hospital
                  </p>
                </div>
              </div>
              <p className="text-[#555555] text-sm">Attendees</p>
              <div className="flex gap-4! text-sm font-medium">
                <p>Complainant: Ali</p>
                <p>Shop Rep: ALi ahmed Raza</p>
                <p>Staff: Jabir, Saleem</p>
              </div>

              <div className="bg-[rgba(29,28,29,0.13)] h-0.5! w-full my-2!" />

              <div className="flex gap-2.5!">
                <Button className="text-xs! font-medium! cursor-pointer! bg-[#028B02]!">
                  <HugeiconsIcon icon={Add01Icon} size={18} /> Start Hearing
                </Button>
                <Button className="text-xs! font-medium! cursor-pointer! text-[#606060]! border! border-[#606060]! bg-transparent!">
                  Reschedule
                </Button>
                <Button className="text-xs! font-medium! cursor-pointer!  text-[#BD0000]! border! border-[#BD0000]! bg-transparent!">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="px-5! py-2.5!">
          <div className="flex justify-between items-center my-2!">
            <p className="text-[#555555] text-sm">Schedule New Hearing</p>
            <div
              className="rounded-full! text-xs! font-medium! cursor-pointer! border border-[#E2E8F0] px-2! py-0.5!"
              onClick={() => setHearingStep(0)}
            >
              Cancel
            </div>
          </div>

          {/* <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-[#2A2A2B] text-xs font-semibold mb-1!">
                Hearing Date
              </p>
              <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-md p-2! cursor-pointer! hover:border-(--primary) transition">
                <input
                  type="datetime-local"
                  aria-label="Hearing date"
                  className="outline-none bg-transparent text-[#606060] w-full cursor-pointer text-xs"
                  value={
                    hearingDate ? format(hearingDate, "yyyy-MM-dd'T'HH:mm") : ""
                  }
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setHearingDate(parseISO(e.target.value))}
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[#2A2A2B] text-xs font-semibold mb-1!">
                Start Time
              </p>
              <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-md p-2! cursor-pointer! hover:border-(--primary) transition">
                <input
                  type="datetime-local"
                  aria-label="Hearing date"
                  className="outline-none bg-transparent text-[#606060] w-full cursor-pointer text-xs"
                  value={
                    hearingDate ? format(hearingDate, "yyyy-MM-dd'T'HH:mm") : ""
                  }
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setHearingDate(parseISO(e.target.value))}
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[#2A2A2B] text-xs font-semibold mb-1!">
                End Time
              </p>
              <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-md p-2! cursor-pointer! hover:border-(--primary) transition">
                <input
                  type="datetime-local"
                  aria-label="Hearing date"
                  className="outline-none bg-transparent text-[#606060] w-full cursor-pointer text-xs"
                  value={
                    hearingDate ? format(hearingDate, "yyyy-MM-dd'T'HH:mm") : ""
                  }
                  min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setHearingDate(parseISO(e.target.value))}
                />
              </div>
            </div>
          </div> */}

          {/* <div className="mt-2!">
            <p className="text-[#2A2A2B] text-xs font-semibold mb-1!">
              Meeting Type
            </p>
            <div className="flex gap-3">
              <div className="flex flex-col items-center flex-1 rounded-[5px] gap-1 bg-[#F9FAFB] border border-[#E5E7EB] p-6! cursor-pointer!">
                <HugeiconsIcon icon={Video01Icon} />
                <p className="text-[#4A5565] font-semibold text-sm">Virtual</p>
              </div>
              <div className="flex flex-col items-center flex-1 rounded-[5px] gap-1 bg-[#F9FAFB] border border-[#E5E7EB] p-6! cursor-pointer!">
                <HugeiconsIcon icon={Location05Icon} />
                <p className="text-[#4A5565] font-semibold text-sm">Physical</p>
              </div>
            </div>
          </div> */}
          {/* 
          <div className="flex gap-3 items-end w-full mt-2!">
            <CustomTextField
              placeholder="https://meet.google.com/pth-oeuf-gbr?ijlm=1764675526962&hs=187&adhoc=1"
              label="Meeting Link"
              className="grow!"
            />

            <Button className="text-sm! font-medium! rounded-xl! h-10! shrink-0">
              <HugeiconsIcon icon={Copy01Icon} /> Copy
            </Button>
          </div> */}

          {/* <p className="text-[#555555] text-sm my-2!">Attendees</p>
          <div className="flex gap-3">
            <CustomSearchDropdown
              label="Complainant"
              placeholder="Select Complainant"
              value={selectedStaff}
              onChange={(val) => setSelectedStaff(val)}
              options={
                staffData?.map((status) => ({
                  label: status?.fullName,
                  value: status?.userId,
                })) ?? []
              }
            />
            <CustomTextField label="Shop Representative" placeholder="name" />
            <CustomSearchDropdown
              label="Internal Staff"
              placeholder="Select Staff"
              value={selectedStaff}
              onChange={(val) => setSelectedStaff(val)}
              options={
                staffData?.map((status) => ({
                  label: status?.fullName,
                  value: status?.userId,
                })) ?? []
              }
            />
          </div> */}
          <div className="flex justify-between items-center mt-5! mb-3!">
            <Dialog.Close>
              <div className="text-center border! border-[#E2E8F0]! text-[#606060] rounded-[13px] py-1.5! px-3.5! cursor-pointer min-w-[150px]! text-[15px]!">
                <p> Close</p>
              </div>
            </Dialog.Close>

            {/* <Button
              className="cursor-pointer! hover:opacity-85! text-white! rounded-xl! text-[15px]! py-2.5! px-3.5! min-w-[150px]!"
              disabled={loading}
              onClick={handleAssignComplaint}
            >
              {loading ? "Assigning..." : "Assign"}
            </Button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default HearingProcess;
