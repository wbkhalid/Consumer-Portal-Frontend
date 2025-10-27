"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ComplainFieldChart = () => {
  const data = [
    { name: "Shops", value: 45 },
    { name: "Rairi", value: 30 },
    { name: "Thala", value: 25 },
  ];

  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2! h-[374px]">
      <div>
        <p className="text-sm text-[#1E293B] font-bold">
          Complaint Field Distribution
        </p>
      </div>

      <div className="h-[300px] mt-2 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* 🔹 Gradients */}
            <defs>
              <linearGradient id="gradientShops" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#013769" />
                <stop offset="100%" stopColor="#1C84BF" />
              </linearGradient>

              <linearGradient id="gradientRairi" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1C84BF" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              <linearGradient id="gradientThala" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#17B436" />
                <stop offset="100%" stopColor="#10F23D" />
              </linearGradient>
            </defs>

            {/* 🟢 Pie */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              stroke="none"
            >
              <Cell fill="url(#gradientShops)" />
              <Cell fill="url(#gradientRairi)" />
              <Cell fill="url(#gradientThala)" />
            </Pie>

            {/* ✨ Tooltip - styled */}
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

            {/* 🔸 Legend - styled */}
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              iconSize={12}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComplainFieldChart;
