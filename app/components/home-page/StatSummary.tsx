"use client";
import CustomStatCard from "./CustomStatCard";
import { IoCheckmarkDone, IoDocumentTextOutline } from "react-icons/io5";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { TbSettingsExclamation, TbTimeDuration45 } from "react-icons/tb";
import { ComplainDashboardType } from "../../page";
import Link from "next/link";
import PendingDialog from "./PendingDialog";
import InProgressDialog from "./InProgressDialog";

const StatSummary = ({ data }: { data: ComplainDashboardType }) => {
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

      <InProgressDialog inProgressComplain={data?.inProgressComplaints ?? 0} />
      <PendingDialog pendingComplain={data?.inProcessComplaints ?? 0} />

      <CustomStatCard
        title="Escalation"
        value={data?.escalatedComplaints}
        icon={<IoCheckmarkDone className="text-white text-lg" />}
        iconBg="bg-(--success)"
        percentage={4.5}
      />
      <CustomStatCard
        title="Super Escalation"
        value={data?.superEscalatedComplaints}
        icon={<TbSettingsExclamation className="text-white text-lg" />}
        iconBg="bg-(--error)"
        percentage={4.5}
      />
      <CustomStatCard
        title="Resolved"
        value={`${data?.resolvedComplaints}`}
        icon={<TbTimeDuration45 className="text-white text-lg" />}
        iconBg="bg-(--primary)"
        percentage={4.5}
      />
    </div>
  );
};

export default StatSummary;
