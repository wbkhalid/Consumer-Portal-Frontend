"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ComplainTypeChart = () => {
  const data = [
    { type: "Hidden Charges", complaints: 120 },
    { type: "Additional Charges", complaints: 90 },
    { type: "Unexpected Costs", complaints: 75 },
    { type: "Extra Fees", complaints: 110 },
  ];

  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2!">
      <div>
        <p className="text-sm text-[#202224]">Types of Complaints</p>
      </div>

      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 25 }}
        style={{ width: "100%", height: "300px" }}
      >
        <XAxis
          dataKey="type"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          angle={-25}
          textAnchor="end"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          formatter={(value) => [`${value} Complaints`, "Count"]}
          cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
        />
        <Bar
          dataKey="complaints"
          fill="#013769"
          radius={[5, 5, 5, 5]}
          barSize={35}
        />
      </BarChart>
    </div>
  );
};

export default ComplainTypeChart;
