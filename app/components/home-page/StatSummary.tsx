"use client";
import CustomStatCard from "./CustomStatCard";
import { IoDocumentTextOutline } from "react-icons/io5";
import { ComplainDashboardType } from "../../page";
import Link from "next/link";
import ProceedingDialog from "./ProceedingDialog";
import PendingDialog from "./PendingDialog";
import NonProsecutionDialog from "./NonProsecutionDialog";
import WithdrawDialog from "./WithdrawDialog";
import ExParteDialog from "./ExParteDialog";
import DecidedonMeritDialog from "./DecidedonMeritDialog";
import SuperEscalationDialog from "./SuperEscalationDialog";
import EscalationDialog from "./EscalationDialog";
import useGetAllComplains from "../../hooks/useGetAllComplains";
import { useState } from "react";

const StatSummary = ({ data }: { data: ComplainDashboardType }) => {
  const [refresh, setRefresh] = useState(false);
  const { data: pendingData } = useGetAllComplains({ status: 0, refresh });
  const { data: proceedingData } = useGetAllComplains({ status: 1, refresh });
  const { data: escalationData } = useGetAllComplains({ status: 2, refresh });
  const { data: superEscalationData } = useGetAllComplains({
    status: 3,
    refresh,
  });
  const { data: decidedOnMeritData } = useGetAllComplains({
    status: 4,
    refresh,
  });
  const { data: exParteData } = useGetAllComplains({ status: 5, refresh });
  const { data: withDrawData } = useGetAllComplains({ status: 6, refresh });
  const { data: nonProsecutionData } = useGetAllComplains({
    status: 7,
    refresh,
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <Link href="/complains">
        <CustomStatCard
          title="Total Complaints"
          value={data?.totalComplaints}
          icon={<IoDocumentTextOutline className="text-white text-lg" />}
          iconBg="bg-[#013769]"
          percentage={8.5}
        />
      </Link>

      <PendingDialog
        pendingComplain={data?.inPendingComplaints ?? 0}
        setRefresh={setRefresh}
        pendingData={pendingData ?? []}
      />
      <ProceedingDialog
        proceedingComplain={data?.inProceedingComplaints ?? 0}
        setRefresh={setRefresh}
        proceedingData={proceedingData ?? []}
      />

      <EscalationDialog
        escalationComplaint={data?.escalatedComplaints ?? 0}
        setRefresh={setRefresh}
        escalationData={escalationData ?? []}
      />

      <SuperEscalationDialog
        superEscalationComplaint={data?.superEscalatedComplaints ?? 0}
        setRefresh={setRefresh}
        superEscalationData={superEscalationData ?? []}
      />

      <DecidedonMeritDialog
        onMeritComplaint={data?.decidedOnMeritComplaints ?? 0}
        decidedOnMeritData={decidedOnMeritData ?? []}
      />

      <ExParteDialog
        exPartyComplaint={data?.expartyComplaints ?? 0}
        exParteData={exParteData ?? []}
      />

      <WithdrawDialog
        withdrawComplaint={data?.withdrawnComplaints ?? 0}
        withDrawData={withDrawData ?? []}
      />

      <NonProsecutionDialog
        nonProsectionComplaint={data?.nonProsecutedComplaints ?? 0}
        nonProsecutionData={nonProsecutionData ?? []}
      />
    </div>
  );
};

export default StatSummary;
