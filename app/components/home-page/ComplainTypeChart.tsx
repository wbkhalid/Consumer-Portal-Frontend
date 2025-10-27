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
    <div className="rounded-xl px-4! py-2! bg-white mt-2! w-full">
      <div>
        <p className="text-sm text-[#1E293B] font-bold mb-2!">
          Types of Complaints
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
          >
            <CartesianGrid vertical={false} strokeWidth={1} stroke="#CBD5E1" />
            <XAxis
              dataKey="type"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}`}
            />
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
              cursor={{ fill: "transparent" }}
              formatter={(value, name) => [`${value} Complaints`, name]}
            />
            <Bar
              dataKey="complaints"
              fill="#013769"
              radius={[5, 5, 5, 5]}
              barSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplainTypeChart;
