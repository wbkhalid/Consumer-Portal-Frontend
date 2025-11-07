"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import { ComplaintCategoryStatsType } from "../../page";

// Random color generator helper
const getColor = (index: number) => {
  const COLORS = [
    "#013769", // blue
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

const ComplainFieldChart = ({
  data,
}: {
  data: ComplaintCategoryStatsType[];
}) => {
  // Total
  const total = React.useMemo(
    () => data.reduce((s, d) => s + d.count, 0),
    [data]
  );

  // Max value item
  const maxItem = React.useMemo(
    () => data.reduce((a, b) => (b.count > a.count ? b : a), data[0]),
    [data]
  );

  // Max percentage
  const maxPct = React.useMemo(
    () => (total > 0 ? Math.round((maxItem.count / total) * 100) : 0),
    [maxItem, total]
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

  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2!">
      <p className="text-sm text-[#202224] font-bold mb-4!">
        Complaint Field Distribution
      </p>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}

              {/* Center Label */}
              <Label
                position="center"
                fill="#414D55"
                fontSize={8}
                fontWeight={700}
              >
                {`${maxPct}% ${maxItem.complaintCategory}`}
              </Label>
            </Pie>

            {/* Tooltip */}
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
              cursor={{ fill: "rgba(1, 55, 105, 0.1)" }}
              formatter={(value, name) => [`${value} Complaints`, name]}
            />

            {/* Legend */}
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span
                  style={{
                    color: "#636466",
                    fontSize: "11px",
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

export default ComplainFieldChart;
