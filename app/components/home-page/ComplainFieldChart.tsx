"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label, // ⬅️ add this
} from "recharts";

const ComplainFieldChart = () => {
  const data = [
    { name: "Shops", value: 45 },
    { name: "Rairi", value: 30 },
    { name: "Thala", value: 25 },
  ];

  const total = React.useMemo(
    () => data.reduce((s, d) => s + d.value, 0),
    [data]
  );
  const maxItem = React.useMemo(
    () => data.reduce((a, b) => (b.value > a.value ? b : a), data[0]),
    [data]
  );
  const maxPct = React.useMemo(
    () => Math.round((maxItem.value / total) * 100),
    [maxItem, total]
  );

  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2!">
      <div>
        <p className="text-sm text-[#202224] font-bold mb-4!">
          Complaint Field Distribution
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
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

              <Label
                position="center"
                fill="#414D55"
                fontSize={20}
                fontWeight={700}
              >
                {`${maxPct}% ${maxItem.name}`}
              </Label>
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
              cursor={{ fill: "rgba(1, 55, 105, 0.1)" }}
              formatter={(value, name) => [`${value} Complaints`, name]}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
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

export default ComplainFieldChart;
