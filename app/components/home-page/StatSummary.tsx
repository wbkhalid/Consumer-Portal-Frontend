import React from "react";
import CustomStatCard from "./CustomStatCard";
import { IoCheckmarkDone, IoDocumentTextOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { TbSettingsExclamation, TbTimeDuration45 } from "react-icons/tb";

const StatSummary = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <CustomStatCard
        title="Total Complaints"
        value={150}
        icon={<IoDocumentTextOutline className="text-white text-lg" />}
        iconBg="bg-(--primary)"
        percentage={8.5}
      />
      <CustomStatCard
        title="Pending"
        value={33}
        icon={<GoClock className="text-white text-lg" />}
        iconBg="bg-(--primary)"
        percentage={-4.5}
      />
      <CustomStatCard
        title="In Progress"
        value={38}
        icon={<BsArrowUpRightSquare className="text-white text-lg" />}
        iconBg="bg-(--warning)"
        percentage={4.5}
      />
      <CustomStatCard
        title="Resolved"
        value={33}
        icon={<IoCheckmarkDone className="text-white text-lg" />}
        iconBg="bg-(--success)"
        percentage={4.5}
      />
      <CustomStatCard
        title="Escalated"
        value={41}
        icon={<TbSettingsExclamation className="text-white text-lg" />}
        iconBg="bg-(--error)"
        percentage={4.5}
      />
      <CustomStatCard
        title="Avg Resolution"
        value={"90h"}
        icon={<TbTimeDuration45 className="text-white text-lg" />}
        iconBg="bg-(--primary)"
        percentage={4.5}
      />
    </div>
  );
};

export default StatSummary;
