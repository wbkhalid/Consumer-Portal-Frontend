import React from "react";
import CustomStatCard from "./CustomStatCard";
import { IoCheckmarkDone, IoDocumentTextOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { TbSettingsExclamation, TbTimeDuration45 } from "react-icons/tb";
import { ComplainDashboardType } from "../../page";
import Link from "next/link";

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
      <Link href="/pending">
        <CustomStatCard
          title="Pending"
          value={data?.pendingComplaints}
          icon={<GoClock className="text-white text-lg" />}
          iconBg="bg-(--primary)"
          percentage={-4.5}
        />
      </Link>
      <CustomStatCard
        title="In Progress"
        value={data?.inProgressComplaints}
        icon={<BsArrowUpRightSquare className="text-white text-lg" />}
        iconBg="bg-(--warning)"
        percentage={4.5}
      />
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
