"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import { StatusStatsType } from "../../page";

const ComplainStatusChart = ({ data }: { data: StatusStatsType[] }) => {
  if (!data || data?.length === 0) {
    return (
      <div className="rounded-xl px-4! py-2! bg-white mt-2!">
        <p className="text-sm text-[#1E293B] font-bold">
          Complaint Resolution Status
        </p>
        <div className="h-[300px] flex justify-center items-center text-sm text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  // 🌈 Define color mapping for each status
  const STATUS_COLORS: Record<string, string> = {
    Pending: "#013769", // blue
    Proceeding: "#e8bd0f", // amber
    Escalation: "#DC2626", // red
    SuperEscalation: "#af0404", // dark rose/red
    DecidedOnMerit: "#028b02", // green
    Exparte: "#9333EA", // purple
    Withdraw: "#6B7280", // gray
    NonProsecution: "#EAB308", // yellow
  };

  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    if (
      typeof cx !== "number" ||
      typeof cy !== "number" ||
      typeof midAngle !== "number" ||
      typeof innerRadius !== "number" ||
      typeof outerRadius !== "number" ||
      typeof percent !== "number"
    ) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2!">
      <p className="text-sm text-[#1E293B] font-bold">
        Complaint Resolution Status
      </p>

      <div className="h-[300px] mt-2 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={
                data?.map((d) => ({ ...d })) satisfies {
                  [key: string]: string | number;
                }[]
              }
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              stroke="none"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry?.status] || "#9CA3AF"} // fallback gray
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--primary)",
                border: "none",
                borderRadius: "10px",
                color: "#ffffff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                padding: "10px 12px",
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
              iconSize={10}
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

export default ComplainStatusChart;
