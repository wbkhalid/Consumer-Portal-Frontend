"use client";
import Image from "next/image";
import { ComplaintBreakdownChart, SectionTypeStatsType } from "../page";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GRADIENTS = [
  { from: "#036CCF", to: "#013769" },
  { from: "#F87015", to: "#EB5B0D" },
  { from: "#21C35D", to: "#17A74C" },
];

const ComplaintPieChart = ({ data }: { data: ComplaintBreakdownChart }) => {
  const chartData = [
    { name: "Total Complaints", value: data?.totalComplaints },
    { name: "Appeals", value: data?.appealedComplaints },
    { name: "Resolved", value: data?.resolvedComlaints },
  ];

  const maxSection = chartData.reduce((prev, curr) =>
    curr.value > prev.value ? curr : prev
  );

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl col-span-12 md:col-span-5">
      <div className="flex gap-1.5 items-center px-5! py-3.5!">
        <div className="w-12 h-12 bg-[linear-gradient(135deg,#6061EF_0%,#5148E6_100%)] rounded-[10px] flex items-center justify-center">
          <Image
            src={`/icons/complaint-chart.png`}
            alt={` complaint chart icon`}
            width={24}
            height={24}
          />
        </div>
        <div>
          <p className="text-[#111827] font-bold">Complaint Breakdown</p>
          <p className="text-[10px] text-[#6B7280] font-semibold">
            Current distribution of complaint statuses
          </p>
        </div>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {GRADIENTS.map((g, index) => (
                <linearGradient
                  key={index}
                  id={`pieGradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={g.from} />
                  <stop offset="100%" stopColor={g.to} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              stroke="none"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={`url(#pieGradient-${index})`} />
              ))}
            </Pie>

            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[#111827] font-extrabold text-xl"
            >
              {maxSection.value}
            </text>

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--primary)",
                border: "none",
                borderRadius: "6px",
                color: "#ffffff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                padding: "5px 12px",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 4,
              }}
              itemStyle={{
                color: "#ffffff",
                fontSize: 12,
              }}
              formatter={(value, name) => [`${value} Complaints`, name]}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={6}
              formatter={(value) => (
                <span
                  style={{
                    color: "#636466",
                    fontSize: "10px",
                    fontWeight: 500,
                  }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplaintPieChart;
