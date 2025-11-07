"use client";
import CustomStatCard from "./CustomStatCard";
import {
  IoCheckmarkDone,
  IoCloseCircleOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { TbAlertTriangle, TbSettingsExclamation } from "react-icons/tb";
import { ComplainDashboardType } from "../../page";
import Link from "next/link";
import ProceedingDialog from "./ProceedingDialog";
import InProgressDialog from "./PendingDialog";
import { BiError } from "react-icons/bi";
import { MdOutlineFlagCircle } from "react-icons/md";
import useGetAllComplains from "../../hooks/useGetAllComplains";

const StatSummary = ({ data }: { data: ComplainDashboardType }) => {
  const { data: pendingData } = useGetAllComplains({ status: 0 });
  const { data: proceedingData } = useGetAllComplains({ status: 1 });
  const { data: escalationData } = useGetAllComplains({ status: 2 });
  const { data: superEscalationData } = useGetAllComplains({ status: 3 });
  const { data: decidedOnMeritData } = useGetAllComplains({ status: 4 });
  const { data: exParteData } = useGetAllComplains({ status: 5 });
  const { data: withDrawData } = useGetAllComplains({ status: 6 });
  const { data: nonProsecutionData } = useGetAllComplains({ status: 7 });

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

      <InProgressDialog pendingComplain={proceedingData?.length ?? 0} />
      <ProceedingDialog proceedingComplain={proceedingData?.length ?? 0} />

      <CustomStatCard
        title="Escalation"
        value={escalationData?.length ?? 0}
        icon={<TbAlertTriangle className="text-white text-lg" />}
        iconBg="bg-[#DC2626]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Super Escalation"
        value={superEscalationData?.length ?? 0}
        icon={<TbSettingsExclamation className="text-white text-lg" />}
        iconBg="bg-[#af0404]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Decided on Merit"
        value={decidedOnMeritData?.length ?? 0}
        icon={<IoCheckmarkDone className="text-white text-lg" />}
        iconBg="bg-[#028b02]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Ex-Parte"
        value={exParteData?.length ?? 0}
        icon={<MdOutlineFlagCircle className="text-white text-lg" />}
        iconBg="bg-[#9333EA]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Withdraw"
        value={withDrawData?.length ?? 0}
        icon={<IoCloseCircleOutline className="text-white text-lg" />}
        iconBg="bg-[#6B7280]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Non Prosecution"
        value={nonProsecutionData.length ?? 0}
        icon={<BiError className="text-white text-lg" />}
        iconBg="bg-[#EAB308]"
        percentage={4.5}
      />

      {/* <InProgressDialog pendingComplain={data?.inPendingComplaints ?? 0} />
      <ProceedingDialog
        proceedingComplain={data?.inProceedingComplaints ?? 0}
      />

      <CustomStatCard
        title="Escalation"
        value={data?.escalatedComplaints}
        icon={<TbAlertTriangle className="text-white text-lg" />}
        iconBg="bg-[#DC2626]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Super Escalation"
        value={data?.superEscalatedComplaints}
        icon={<TbSettingsExclamation className="text-white text-lg" />}
        iconBg="bg-[#af0404]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Decided on Merit"
        value={data?.decidedOnMeritComplaints}
        icon={<IoCheckmarkDone className="text-white text-lg" />}
        iconBg="bg-[#028b02]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Ex-Parte"
        value={data?.exparteComplaints}
        icon={<MdOutlineFlagCircle className="text-white text-lg" />}
        iconBg="bg-[#9333EA]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Withdraw"
        value={data?.withdrawnComplaints}
        icon={<IoCloseCircleOutline className="text-white text-lg" />}
        iconBg="bg-[#6B7280]"
        percentage={4.5}
      />

      <CustomStatCard
        title="Non Prosecution"
        value={data?.nonProsecutedComplaints}
        icon={<BiError className="text-white text-lg" />}
        iconBg="bg-[#EAB308]"
        percentage={4.5}
      /> */}
    </div>
  );
};

export default StatSummary;
