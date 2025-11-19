"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieLabelRenderProps,
} from "recharts";
import { ComplaintCategoryStatsType } from "../../page";

// Random color generator helper
const getColor = (index: number) => {
  const COLORS = [
    "#90bafd", // blue
    "#1C84BF", // light blue
    "#17B436", // green
    "#E8BD0F", // yellow
    "#DC2626", // red
    "#9333EA", // purple
    "#6B7280", // gray
    "#14B8A6", // teal
    "#F97316", // orange
  ];
  return COLORS[index % COLORS.length];
};

const DashboardFieldChart = ({
  data,
}: {
  data: ComplaintCategoryStatsType[];
}) => {
  // Total
  const total = React.useMemo(
    () => data.reduce((s, d) => s + d.count, 0),
    [data]
  );

  // Add color property dynamically to each item
  const chartData = React.useMemo(
    () =>
      data.map((item, i) => ({
        name: item.complaintCategory,
        value: item.count,
        color: getColor(i),
      })),
    [data]
  );

  // 🟢 Label function (shows percentage like your other chart)
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
        fontSize={8}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="px-3! py-2! bg-(--primary) border border-[#1BCEF5]">
      <p className="text-sm text-white font-bold">
        Complaint Field Distribution
      </p>

      <div className="h-[250px] w-full mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={70}
              stroke="none"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { name, value } = payload[0];
                  return (
                    <div
                      style={{
                        backgroundColor: "#014D54",
                        border: "1px solid #1BCEF5",
                        borderRadius: 0,
                        padding: "2px 6px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#E5E5EF",
                          fontSize: "10px",
                        }}
                      >
                        {value}
                      </div>
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "11px",
                        }}
                      >
                        {name}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              iconSize={9}
              formatter={(value) => (
                <span
                  style={{
                    color: "#fff",
                    fontSize: "8px",
                    fontWeight: 400,
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

export default DashboardFieldChart;
