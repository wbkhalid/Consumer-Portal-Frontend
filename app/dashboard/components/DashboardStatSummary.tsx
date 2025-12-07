"use client";
import {
  IoArrowUndoOutline,
  IoBanOutline,
  IoCheckmarkDone,
  IoDocumentTextOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { ComplainDashboardType } from "../../page";
import Link from "next/link";
import DashboardStatCard from "./DashboardStatCard";
import { TbArrowForward } from "react-icons/tb";
import { BsExclamationSquare, BsExclamationTriangle } from "react-icons/bs";

const DashboardStatSummary = ({ data }: { data: ComplainDashboardType }) => {
  return (
    <div className="flex flex-col gap-2">
      <Link href="/complains">
        <DashboardStatCard
          title="Total Complaints"
          value={data?.totalComplaints}
          icon={<IoDocumentTextOutline className="text-white text-lg" />}
          iconBg="bg-[#028B02]"
          percentage={8.5}
        />
      </Link>

      <DashboardStatCard
        title="Pending"
        value={data?.inPendingComplaints}
        icon={<IoTimeOutline className="text-white text-lg" />}
        iconBg="bg-[#002344]"
        percentage={8.5}
      />
      <DashboardStatCard
        title="Proceeding"
        value={data?.inProceedingComplaints}
        icon={<TbArrowForward className="text-white text-lg" />}
        iconBg="bg-[#E5C95F]"
        percentage={8.5}
      />
      <DashboardStatCard
        title="Escalation"
        value={data?.escalatedComplaints}
        icon={<BsExclamationTriangle className="text-white text-lg" />}
        iconBg="bg-[#E61313]"
        percentage={8.5}
      />
      <DashboardStatCard
        title="Super Escalation"
        value={data?.superEscalatedComplaints}
        icon={<BsExclamationSquare className="text-white text-lg" />}
        iconBg="bg-[#E61313]"
        percentage={8.5}
      />
      <DashboardStatCard
        title="Decided on Merit"
        value={data?.decidedOnMeritComplaints}
        icon={<IoCheckmarkDone className="text-white text-lg" />}
        iconBg="bg-[#028B02]"
        percentage={8.5}
      />
      <DashboardStatCard
        title="Ex-Parte"
        value={data?.exParteComplaints}
        icon={<IoCheckmarkDone className="text-white text-lg" />}
        iconBg="bg-[#3BA2F1]"
        percentage={8.5}
      />
      <DashboardStatCard
        title="Withdraw"
        value={data?.withdrawnComplaints}
        icon={<IoArrowUndoOutline className="text-white text-lg" />}
        iconBg="bg-[#686868]"
        percentage={8.5}
      />
      <DashboardStatCard
        title="Non-Prosecution"
        value={data?.nonProsecutedComplaints}
        icon={<IoBanOutline className="text-white text-lg" />}
        iconBg="bg-[#E5C95F]"
        percentage={8.5}
      />
    </div>
  );
};

export default DashboardStatSummary;
