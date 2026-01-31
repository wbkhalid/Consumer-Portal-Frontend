"use client";

import { Button } from "@radix-ui/themes";
import { ManageComplainsData } from "../../hooks/useGetAllComplains";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Calendar03Icon,
  CopyLinkIcon,
} from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import {
  canEditable,
  copyToClipboard,
  formatDate,
  toLocal,
} from "../../utils/utils";
import cookies from "js-cookie";
import apiClient from "../../services/api-client";
import { ADMIN_DASHBOARD_API } from "../../APIs";
import Cookies from "js-cookie";

interface MeetingDetails {
  id: number;
  caseNo: number;
  meetingDate: string;
  meetingTime: string;
  meetingLink_Admin: string;
  meetingLink_Client: string;
  ptclMeetingStatus: number;
}

const HearingProcess = ({
  complaint,
}: {
  complaint: ManageComplainsData | null;
}) => {
  const loginUser = canEditable();
  const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>(
    null,
  );
  const [showScheduler, setShowScheduler] = useState(false);
  const [hearingDate, setHearingDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const ptclUserName = cookies.get("ptclUsername") || "";
  const ptclPassword = cookies.get("ptclPassword") || "";

  const reScheduleMeeting = async (meetingDetails: MeetingDetails) => {
    if (!hearingDate) {
      toast.warning("Please select hearing date");
      return;
    }
    try {
      const payload = {
        id: meetingDetails?.id,
        caseNo: meetingDetails?.caseNo,
        meetingDate: format(hearingDate, "yyyy-MM-dd'T'HH:mm"),
        meetingTime: format(hearingDate, "yyyy-MM-dd'T'HH:mm"),
        meetingLink_Admin: meetingDetails?.meetingLink_Admin,
        meetingLink_Client: meetingDetails?.meetingLink_Client,
        meeting_Remarks: "string123",
        ptclMeetingStatus: 3,
      };

      const response = await apiClient.post(
        `${ADMIN_DASHBOARD_API}/reschedule-meeting
  `,
        payload,
      );

      if (response?.data?.responseCode === 200) {
        toast?.success(response?.data?.responseMessage || "Meeting reschedule");
        await sendMeetingLinks(response?.data?.data);

        setHearingDate(null);
        setTimeout(() => {
          getMeetingDetails();
        }, 2000);
      }

      console.log(response?.data?.data, "response reschudle");
    } catch (error) {
      console.error("Error sending meeting links", error);
      toast.error("Failed to send meeting links");
    } finally {
      setShowScheduler(false);
    }
  };

  const sendMeetingLinks = async (meetingDetails: any) => {
    try {
      const meetingDateTime = meetingDetails?.meeting_start_date?.replace(
        " ",
        "T",
      );

      console.log(meetingDetails, "meetingDetails1");

      const meetingLink =
        meetingDetails?.meeting_link_client ??
        meetingDetails?.meetingLink_Client;

      console.log(meetingLink, "meetingLink");

      const payload = {
        complaintId: complaint?.id,
        meetingLink,
        meetingDate: meetingDateTime,
        meetingTime: meetingDateTime,
        sentBy: loginUser,
        isReSchedueled: showScheduler,
      };

      console.log(payload, "payload");

      const response = await apiClient.post(
        `${ADMIN_DASHBOARD_API}/send-meeting-links`,
        payload,
      );

      console.log(response, "response123");
      toast.success("Meeting links sent successfully");
    } catch (error) {
      console.error("Error sending meeting links", error);
      toast.error("Failed to send meeting links");
    }
  };

  const getMeetingDetails = async () => {
    if (!complaint?.id) return;

    try {
      const { data } = await apiClient.get(
        `${ADMIN_DASHBOARD_API}/complaint-meeting-details?complaintId=${complaint?.id}`,
      );

      console.log(data, "data2222444");

      if (data) {
        setMeetingDetails(data);
        setShowScheduler(false);
      } else {
        setMeetingDetails(null);
        setShowScheduler(true);
      }
    } catch (error) {
      setMeetingDetails(null);
      setShowScheduler(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getMeetingDetails();
  }, [complaint?.id]);

  const createMeeting = async (token: string) => {
    if (!hearingDate || !complaint?.id) {
      toast.warning("Hearing Date or complaint details Missing");
      return;
    }
    if (!complaint?.phoneNumber) {
      toast?.warning("Shop Phone Number Missing");
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        meeting_title: String(complaint?.id),
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

      const data = await response.json();

      console.log(data, "..///...///...data2");

      if (data?.status === true) {
        toast.success("Meeting scheduled successfully");
        await sendMeetingLinks(data?.meeting_details);
        setShowScheduler(false);
        setHearingDate(null);
        setTimeout(() => {
          getMeetingDetails();
          setLoading(false);
        }, 2000);
      }
    } catch {
      toast.error("Failed to create meeting");
    }
  };

  const scheduleHearing = async () => {
    if (!hearingDate) {
      toast.warning("Please select hearing date");
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams({
        username: ptclUserName,
        password: ptclPassword,
      });

      const response = await fetch(
        `https://oconnect.ptclgroup.pk/utalk/api/login?${params.toString()}`,
        { method: "POST" },
      );

      const data = await response.json();
      console.log(data, "..///data//...");

      if (data?.status === true && data?.token) {
        await createMeeting(data?.token);
      } else {
        toast.error(data?.message);
      }
    } catch {
      toast.error("Failed to schedule hearing");
      setLoading(false);
    }
  };

  return (
    <div className="px-5! py-2.5!">
      <p className="text-[#555555] text-sm">Schedule Meeting</p>
      <div className="bg-[#F9FAFB] border border-[#E5E7EB] p-4! rounded-[5px]! mt-2.5!">
        {meetingDetails && !showScheduler && (
          <div className="flex flex-col gap-2 text-sm text-[#4A5565]">
            <div className="flex justify-between items-center">
              <p className="font-medium">
                <b>Meeting ID:</b> {meetingDetails.id}
              </p>

              {meetingDetails.ptclMeetingStatus === 0 ? (
                <span className="px-3! py-1! rounded-full text-xs bg-[#FFF7D6] text-[#CBA611] border">
                  Scheduled
                </span>
              ) : meetingDetails.ptclMeetingStatus === 3 ? (
                <span className="px-3! py-1! rounded-full text-xs bg-[#FFF7D6] text-[#CBA611] border">
                  Re-Scheduled
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs bg-[#E6F7EF] text-green-600 border">
                  Completed
                </span>
              )}
            </div>

            <div className="flex justify-between">
              <p>
                <b>Date:</b> {formatDate(meetingDetails.meetingDate)}
              </p>
              <p>
                <b>Time:</b>
                {/* {format(toLocal(meetingDetails.meetingTime), "hh:mm a")}
                {meetingDetails.meetingTime.split("T")[1]} */}
                {new Date(meetingDetails.meetingTime).toLocaleTimeString(
                  "en-Pk",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  },
                )}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="break-all">
                <b>Admin Link:</b>{" "}
                {meetingDetails.meetingLink_Admin.length > 70
                  ? meetingDetails.meetingLink_Admin.slice(0, 70) + "..."
                  : meetingDetails.meetingLink_Admin}
              </p>

              <HugeiconsIcon
                icon={CopyLinkIcon}
                size={16}
                className="cursor-pointer hover:opacity-70"
                onClick={() =>
                  copyToClipboard(meetingDetails.meetingLink_Admin)
                }
              />
            </div>

            <div className="flex gap-1 items-center">
              <p className="break-all">
                <b>Client Link:</b>{" "}
                {meetingDetails.meetingLink_Client.length > 70
                  ? meetingDetails.meetingLink_Client.slice(0, 70) + "..."
                  : meetingDetails.meetingLink_Client}
              </p>

              <HugeiconsIcon
                icon={CopyLinkIcon}
                size={16}
                className="cursor-pointer hover:opacity-70"
                onClick={() =>
                  copyToClipboard(meetingDetails.meetingLink_Client)
                }
              />
            </div>
          </div>
        )}

        {showScheduler && (
          <div className="flex flex-col items-center gap-3 py-6!">
            <HugeiconsIcon icon={Calendar03Icon} />
            <p className="text-sm text-[#4A5565]">Select hearing date & time</p>

            <input
              type="datetime-local"
              className="border p-2! rounded-md text-xs"
              value={
                hearingDate ? format(hearingDate, "yyyy-MM-dd'T'HH:mm") : ""
              }
              min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setHearingDate(parseISO(e.target.value))}
            />

            {loginUser === complaint?.assignedTo && (
              <Button
                className="rounded-full! text-xs! cursor-pointer!"
                onClick={
                  meetingDetails && showScheduler
                    ? () => reScheduleMeeting(meetingDetails)
                    : scheduleHearing
                }
                disabled={loading}
              >
                <HugeiconsIcon icon={Add01Icon} size={18} />
                {loading ? "Scheduling..." : "Schedule Hearing"}
              </Button>
            )}
          </div>
        )}
      </div>
      {loginUser === complaint?.assignedTo &&
        meetingDetails &&
        !showScheduler && (
          <div className="flex gap-2.5! mt-3!">
            <Button
              className="text-xs! bg-[#028B02]! cursor-pointer! hover:opacity-80!"
              onClick={() => {
                window.open(
                  meetingDetails.meetingLink_Admin,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <HugeiconsIcon icon={Add01Icon} size={18} />
              Start Video Meeting
            </Button>

            <Button
              className="text-xs! text-[#606060]! border! border-[#606060]! bg-transparent! cursor-pointer! hover:opacity-80!"
              onClick={() => setShowScheduler(true)}
            >
              Reschedule
            </Button>
          </div>
        )}
    </div>
  );
};

export default HearingProcess;
