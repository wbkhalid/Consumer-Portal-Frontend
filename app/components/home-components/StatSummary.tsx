"use client";
import Link from "next/link";
import CustomStatCard from "./CustomStatCard";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ComplainDashboardType } from "../../page";

const StatSummary = ({ data }: { data: ComplainDashboardType }) => {
  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const params = new URLSearchParams();
  if (divisionId) params.set("divisionId", divisionId);
  if (districtId) params.set("districtId", districtId);
  if (tehsilId) params.set("tehsilId", tehsilId);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-2.5 py-2.5! ">
      {/* <Link
        href={`/complains${params.toString() ? `?${params.toString()}` : ""}`}
      > */}
      <CustomStatCard
        title="In Progress Complaints"
        value={data?.totalInProgress}
        icon={"totalComplaints.png"}
        iconBg="bg-[linear-gradient(135deg,#397FF5_0%,#2867ED_100%)]"
        // percentage={data?.complaintsGrowthPercentages?.totalComplaints}
        // percentageBg="bg-[rgba(22,167,118,0.15)]"
        // percentageText="text-[#16A34A]"
      />
      {/* </Link> */}
      <Link
        href={`/pending${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Not Assign"
          value={data?.inPendingComplaints}
          icon={"pending.png"}
          iconBg="bg-[linear-gradient(135deg,#F87015_0%,#EB5B0D_100%)]"
          percentage={"24 hr"}
          percentageBg="bg-[rgba(235,91,13,0.15)]"
          percentageText="text-[#EB5B0D]"
        />
      </Link>

      <Link href={`/adr${params.toString() ? `?${params.toString()}` : ""}`}>
        <CustomStatCard
          title="ADR"
          value={data?.adrComplaints}
          icon={"proceeding.png"}
          iconBg="bg-[linear-gradient(135deg,#A651F6_0%,#9537EB_100%)]"
          percentage={"1 -7 Days"}
          percentageBg="bg-[rgba(149,55,235,0.15)]"
          percentageText="text-[#9537EB]"
        />
      </Link>
      <Link
        href={`/proceeding${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Proceeding"
          value={data?.inProceedingComplaints}
          icon={"proceeding.png"}
          iconBg="bg-[linear-gradient(135deg,#A651F6_0%,#9537EB_100%)]"
          percentage={"8-21 Days"}
          percentageBg="bg-[rgba(149,55,235,0.15)]"
          percentageText="text-[#9537EB]"
        />
      </Link>
      <Link
        href={`/escalation${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="ESCALATION"
          value={data?.escalatedComplaints}
          icon={"escalation.png"}
          iconBg="bg-[linear-gradient(135deg,#E6AE07_0%,#CD8E05_100%)]"
          percentage={"22-30 Days"}
          percentageBg="bg-[rgba(205,142,5,0.15)]"
          percentageText="text-[#CD8E05]"
        />
      </Link>
      <Link
        href={`/super-escalation${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      >
        <CustomStatCard
          title="SUPER ESCALATION"
          value={data?.superEscalatedComplaints}
          icon={"superEscalation.png"}
          iconBg="bg-[linear-gradient(135deg,#ED4141_0%,#DE2929_100%)]"
          percentage={"Above 30 Days"}
          percentageBg="bg-[rgba(222,41,41,0.15)]"
          percentageText="text-[#DE2929]"
        />
      </Link>
      {/* <Link
        href={`/decided-on-merit${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      > */}
      <CustomStatCard
        title="Total Cases Decided"
        value={data?.totalDecided}
        icon={"decidedOnMerit.png"}
        iconBg="bg-[linear-gradient(135deg,#21C35D_0%,#17A74C_100%)]"
        // percentage={
        //   data?.complaintsGrowthPercentages?.decidedOnMeritComplaints
        // }
        // percentageBg="bg-[rgba(22,167,118,0.15)]"
        // percentageText="text-[#17A74C]"
      />
      {/* </Link> */}
      <Link
        href={`/decided-on-merit${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      >
        <CustomStatCard
          title="Decided (on merit)"
          value={data?.decidedOnMeritComplaints}
          icon={"decidedOnMerit.png"}
          iconBg="bg-[linear-gradient(135deg,#21C35D_0%,#17A74C_100%)]"
          // percentage={
          //   data?.complaintsGrowthPercentages?.decidedOnMeritComplaints
          // }
          // percentageBg="bg-[rgba(22,167,118,0.15)]"
          // percentageText="text-[#17A74C]"
        />
      </Link>
      <Link
        href={`/ex-parte${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Ex parte"
          value={data?.exParteComplaints}
          icon={"exParte.png"}
          iconBg="bg-[linear-gradient(135deg,#6061EF_0%,#5148E6_100%)]"
          // percentage={data?.complaintsGrowthPercentages?.exParteComplaints}
          // percentageBg="bg-[rgba(81,72,230,0.15)]"
          // percentageText="text-[#5148E6]"
        />
      </Link>
      <Link
        href={`/withdraw${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="WITHDRAWN"
          value={data?.withdrawnComplaints}
          icon={"withdraw.png"}
          iconBg="bg-[linear-gradient(135deg,#06B1CF_0%,#0795B6_100%)]"
          // percentage={data?.complaintsGrowthPercentages?.withdrawnComplaints}
          // percentageBg="bg-[rgba(7,149,182,0.15)]"
          // percentageText="text-[#0795B6]"
        />
      </Link>

      <Link
        href={`/non-prosecution${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      >
        <CustomStatCard
          title="NON PROSECUTION"
          value={data?.nonProsecutedComplaints}
          icon={"nonProsecution.png"}
          iconBg="bg-[linear-gradient(135deg,#686F7D_0%,#4F5866_100%)]"
          // percentage={
          //   data?.complaintsGrowthPercentages?.nonProsecutedComplaints
          // }
          // percentageBg="bg-[rgba(79,88,102,0.15)]"
          // percentageText="text-[#4F5866]"
        />
      </Link>

      <Link
        href={`/appeals${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Appeals"
          value={data?.appealsCount}
          icon={"appeals.png"}
          iconBg="bg-[linear-gradient(135deg,#EA4495_0%,#DC2A7A_100%)]"
          percentage={"15 Days"}
          percentageBg="bg-[rgba(220,42,122,0.15)]"
          percentageText="text-[#DC2A7A]"
        />
      </Link>
      {/* <Link
        href={`/red-hot-complaints${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      >
        <CustomStatCard
          title="Exceeded 21 days"
          value={data?.redHotComplaintsCount}
          icon={"exceeded.png"}
          iconBg="bg-[linear-gradient(135deg,#ED4141_0%,#DD2828_100%)]"
          percentage={data?.complaintsGrowthPercentages?.redHotComplaints}
          percentageBg="bg-[rgba(221,40,40,0.15)]"
          percentageText="text-[#DD2828]"
        />
      </Link> */}

      {/* <Link
        href={`/complains${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Total Complaints"
          value={data?.totalComplaints}
          icon={"totalComplaints.png"}
          iconBg="bg-[linear-gradient(135deg,#397FF5_0%,#2867ED_100%)]"
          percentage={data?.complaintsGrowthPercentages?.totalComplaints}
          percentageBg="bg-[rgba(22,167,118,0.15)]"
          percentageText="text-[#16A34A]"
        />
      </Link> */}

      {/* <CustomStatCard
        title="Avg Resolution (Days)"
        value={data?.avgResolutionTime.toFixed(2)}
        icon={"avgResolve.png"}
        iconBg="bg-[linear-gradient(135deg,#14B4A3_0%,#0D978A_100%)]"
        percentage={data?.complaintsGrowthPercentages?.avgResolutionTime}
        percentageBg="bg-[rgba(13,151,138,0.15)]"
        percentageText="text-[#0D978A]"
      /> */}
    </div>
  );
};

export default StatSummary;
