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

const StatSummary = ({ data }: { data: ComplainDashboardType }) => {
  // const { data: pendingData } = useGetAllComplains({ status: 0 });
  // const { data: proceedingData } = useGetAllComplains({ status: 1 });
  // const { data: escalationData } = useGetAllComplains({ status: 2 });
  // const { data: superEscalationData } = useGetAllComplains({ status: 3 });
  // const { data: decidedOnMeritData } = useGetAllComplains({ status: 4 });
  // const { data: exParteData } = useGetAllComplains({ status: 5 });
  // const { data: withDrawData } = useGetAllComplains({ status: 6 });
  // const { data: nonProsecutionData } = useGetAllComplains({ status: 7 });

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

      <PendingDialog pendingComplain={data?.inPendingComplaints ?? 0} />
      <ProceedingDialog
        proceedingComplain={data?.inProceedingComplaints ?? 0}
      />

      <EscalationDialog escalationComplaint={data?.escalatedComplaints ?? 0} />

      {/* <CustomStatCard
        title="Escalation"
        value={escalationData?.length ?? 0}
        icon={<TbAlertTriangle className="text-white text-lg" />}
        iconBg="bg-[#DC2626]"
        percentage={4.5}
      /> */}

      {/* <CustomStatCard
        title="Super Escalation"
        value={superEscalationData?.length ?? 0}
        icon={<TbSettingsExclamation className="text-white text-lg" />}
        iconBg="bg-[#af0404]"
        percentage={4.5}
      /> */}

      <SuperEscalationDialog
        superEscalationComplaint={data?.superEscalatedComplaints ?? 0}
      />

      {/* <CustomStatCard
        title="Decided on Merit"
        value={decidedOnMeritData?.length ?? 0}
        icon={<IoCheckmarkDone className="text-white text-lg" />}
        iconBg="bg-[#028b02]"
        percentage={4.5}
      /> */}

      <DecidedonMeritDialog
        onMeritComplaint={data?.decidedOnMeritComplaints ?? 0}
      />

      <ExParteDialog exPartyComplaint={data?.expartyComplaints ?? 0} />

      {/* <CustomStatCard
        title="Withdraw"
        value={withDrawData?.length ?? 0}
        icon={<IoCloseCircleOutline className="text-white text-lg" />}
        iconBg="bg-[#6B7280]"
        percentage={4.5}
      /> */}

      <WithdrawDialog withdrawComplaint={data?.withdrawnComplaints ?? 0} />

      <NonProsecutionDialog
        nonProsectionComplaint={data?.nonProsecutedComplaints ?? 0}
      />
    </div>
  );
};

export default StatSummary;
