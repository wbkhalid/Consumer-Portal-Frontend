"use client";
import CustomStatCard from "./CustomStatCard";
import {
  IoCheckmarkDone,
  IoCloseCircleOutline,
  IoDocumentTextOutline,
  IoTimeOutline,
} from "react-icons/io5";
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
import { BsArrowUpRightSquare, BsCashStack } from "react-icons/bs";
import {
  TbAlertTriangle,
  TbCloudDownload,
  TbSettingsExclamation,
} from "react-icons/tb";
import { MdOutlineFlagCircle, MdOutlineRecordVoiceOver } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import { BiError } from "react-icons/bi";

const StatSummary = ({ data }: { data: ComplainDashboardType }) => {
  // const isValid = (v: string | undefined | null): v is string =>
  //   v !== null && v !== undefined && v !== "" && v !== "0";

  // const divisionId = isValid(Cookies.get("divisionId"))
  //   ? Cookies.get("divisionId")
  //   : searchParams.get("divisionId");

  // const districtId = isValid(Cookies.get("districtId"))
  //   ? Cookies.get("districtId")
  //   : searchParams.get("districtId");

  // const tehsilId = isValid(Cookies.get("tehsilId"))
  //   ? Cookies.get("tehsilId")
  //   : searchParams.get("tehsilId");

  const { divisionId, districtId, tehsilId } = useRegionFilters();

  const [refresh, setRefresh] = useState(false);

  const params = new URLSearchParams();
  if (divisionId) params.set("divisionId", divisionId);
  if (districtId) params.set("districtId", districtId);
  if (tehsilId) params.set("tehsilId", tehsilId);

  // const { data: pendingData } = useGetAllComplains({
  //   status: 0,
  //   refresh,
  //   divisionId: divisionId || "",
  //   districtId: districtId || "",
  //   tehsilId: tehsilId || "",
  // });

  const { data: proceedingData } = useGetAllComplains({
    status: 1,
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });

  const { data: escalationData } = useGetAllComplains({
    status: 2,
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });

  const { data: superEscalationData } = useGetAllComplains({
    status: 3,
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });

  const { data: decidedOnMeritData } = useGetAllComplains({
    status: 4,
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });

  const { data: exParteData } = useGetAllComplains({
    status: 5,
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });

  const { data: withDrawData } = useGetAllComplains({
    status: 6,
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });

  const { data: nonProsecutionData } = useGetAllComplains({
    status: 7,
    refresh,
    divisionId: divisionId || "",
    districtId: districtId || "",
    tehsilId: tehsilId || "",
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <Link
        href={`/complains${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Total Complaints"
          value={data?.totalComplaints}
          icon={<IoDocumentTextOutline className="text-white text-lg" />}
          iconBg="bg-[#013769]"
          percentage={8.5}
        />
      </Link>

      <Link
        href={`/pending${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Pending"
          value={data?.inPendingComplaints ?? 0}
          icon={<GoClock className="text-white text-lg" />}
          iconBg="bg-(--primary)"
          percentage={-4.5}
        />
      </Link>

      <Link
        href={`/proceeding${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Proceeding"
          value={data?.inProceedingComplaints ?? 0}
          icon={<BsArrowUpRightSquare className="text-white text-lg" />}
          iconBg="bg-(--warning)"
          percentage={-4.5}
        />
      </Link>

      {/* All dialogs receiving filtered data */}
      {/* <PendingDialog
        pendingComplain={data?.inPendingComplaints ?? 0}
        setRefresh={setRefresh}
        pendingData={pendingData ?? []}
      /> */}

      {/* <ProceedingDialog
        proceedingComplain={data?.inProceedingComplaints ?? 0}
        setRefresh={setRefresh}
        proceedingData={proceedingData ?? []}
      /> */}

      {/* <EscalationDialog
        escalationComplaint={data?.escalatedComplaints ?? 0}
        setRefresh={setRefresh}
        escalationData={escalationData ?? []}
      /> */}

      <Link
        href={`/escalation${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Escalation"
          value={data?.escalatedComplaints ?? 0}
          icon={<TbAlertTriangle className="text-white text-lg" />}
          iconBg="bg-[#DC2626]"
          percentage={4.5}
        />
      </Link>
      <Link
        href={`/super-escalation${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      >
        <CustomStatCard
          title="Super Escalation"
          value={data?.superEscalatedComplaints ?? 0}
          icon={<TbSettingsExclamation className="text-white text-lg" />}
          iconBg="bg-[#af0404]"
          percentage={4.5}
        />
      </Link>

      {/* <SuperEscalationDialog
        superEscalationComplaint={data?.superEscalatedComplaints ?? 0}
        setRefresh={setRefresh}
        superEscalationData={superEscalationData ?? []}
      /> */}

      {/* <DecidedonMeritDialog
        onMeritComplaint={data?.decidedOnMeritComplaints ?? 0}
        decidedOnMeritData={decidedOnMeritData ?? []}
      /> */}

      <Link
        href={`/decided-on-merit${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      >
        <CustomStatCard
          title="Decided on Merit"
          value={data?.decidedOnMeritComplaints ?? 0}
          icon={<IoCheckmarkDone className="text-white text-lg" />}
          iconBg="bg-[#028b02]"
          percentage={4.5}
        />
      </Link>
      <Link
        href={`/ex-parte${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Ex-Parte"
          value={data?.exParteComplaints ?? 0}
          icon={<MdOutlineFlagCircle className="text-white text-lg" />}
          iconBg="bg-[#9333EA]"
          percentage={4.5}
        />
      </Link>
      {/* <ExParteDialog
        exParteComplaint={data?.exparteComplaints ?? 0}
        exParteData={exParteData ?? []}
      /> */}

      <Link
        href={`/withdraw${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Withdraw"
          value={data?.withdrawnComplaints ?? 0}
          icon={<IoCloseCircleOutline className="text-white text-lg" />}
          iconBg="bg-[#6B7280]"
          percentage={4.5}
        />
      </Link>
      {/* <WithdrawDialog
        withdrawComplaint={data?.withdrawnComplaints ?? 0}
        withDrawData={withDrawData ?? []}
      /> */}

      <Link
        href={`/non-prosecution${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      >
        <CustomStatCard
          title="Non Prosecution"
          value={data?.nonProsecutedComplaints ?? 0}
          icon={<BiError className="text-white text-lg" />}
          iconBg="bg-[#EAB308]"
          percentage={4.5}
        />
      </Link>

      {/* <NonProsecutionDialog
        nonProsectionComplaint={data?.nonProsecutedComplaints ?? 0}
        nonProsecutionData={nonProsecutionData ?? []}
      /> */}

      {/* Static bottom cards */}
      <CustomStatCard
        title="Avg Resolution Time"
        value={`${data?.avgResolutionTime.toFixed(2)}h`}
        icon={<IoTimeOutline className="text-white text-lg" />}
        iconBg="bg-[#EAB308]"
        percentage={4.5}
      />

      <Link
        href={`/fined-complaints${
          params.toString() ? `?${params.toString()}` : ""
        }`}
      >
        <CustomStatCard
          title="Total Fine"
          value={data?.totalFinesCollected.toLocaleString()}
          icon={<BsCashStack className="text-white text-lg" />}
          iconBg="bg-[#EAB308]"
          percentage={4.5}
        />
      </Link>
      <Link href={`/users`}>
        <CustomStatCard
          title="Downloads"
          value={data?.appDownloadsCount}
          icon={<TbCloudDownload className="text-white text-lg" />}
          iconBg="bg-[#028b02]"
          percentage={4.5}
        />
      </Link>

      <Link
        href={`/appeals${params.toString() ? `?${params.toString()}` : ""}`}
      >
        <CustomStatCard
          title="Appeals"
          value={data?.appealsCount}
          icon={<MdOutlineRecordVoiceOver className="text-white text-lg" />}
          iconBg="bg-[#028b02]"
          percentage={4.5}
        />
      </Link>
    </div>
  );
};

export default StatSummary;
