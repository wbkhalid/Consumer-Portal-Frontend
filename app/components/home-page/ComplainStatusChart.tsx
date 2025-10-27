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

const ComplainStatusChart: React.FC = () => {
  // 📊 Example data for complaint status
  const data = [
    { name: "Resolved", value: 45 },
    { name: "Pending", value: 25 },
    { name: "Escalated", value: 15 },
    { name: "In Progress", value: 20 },
  ];

  // 🎨 Status colors
  const COLORS: string[] = ["#028B02", "#013769", "#AF0404", "#E8BD0F"];

  // 🧩 Type-safe custom label renderer
  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    // Ensure all required values exist and are numbers
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
    <div className="rounded-xl px-4! py-2! bg-white mt-2! h-[374px]">
      {/* Header */}
      <div>
        <p className="text-sm text-[#202224] font-medium">
          Complaint Resolution Status
        </p>
      </div>

      {/* Chart */}
      <div className="h-[300px] mt-2 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} Complaints`,
                name,
              ]}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplainStatusChart;
