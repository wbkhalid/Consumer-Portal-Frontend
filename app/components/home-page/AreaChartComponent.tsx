"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const AreachartComponent = () => {
  // 🗓 Example: complaints data for 7 days
  const data = [
    {
      date: "2025-10-21",
      complaints: 120,
      resolved: 90,
      lastMonth: 110,
    },
    {
      date: "2025-10-22",
      complaints: 98,
      resolved: 70,
      lastMonth: 105,
    },
    {
      date: "2025-10-23",
      complaints: 150,
      resolved: 100,
      lastMonth: 130,
    },
    {
      date: "2025-10-24",
      complaints: 80,
      resolved: 65,
      lastMonth: 75,
    },
    {
      date: "2025-10-25",
      complaints: 170,
      resolved: 120,
      lastMonth: 160,
    },
    {
      date: "2025-10-26",
      complaints: 140,
      resolved: 110,
      lastMonth: 130,
    },
    {
      date: "2025-10-27",
      complaints: 180,
      resolved: 150,
      lastMonth: 175,
    },
  ];

  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2!">
      {/* Header Section */}
      <div className="mb-3!">
        <p className="text-sm text-[#202224]">Daily Average Complaints</p>
        <div className="flex gap-4 items-center">
          <p className="font-extrabold text-2xl">Punjab</p>
          <p className="text-sm">
            <span className="text-green-600 font-bold">+1.3%</span> VS LAST YEAR
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
        style={{ width: "100%", height: "290px" }}
      >
        {/* Gradients for lines */}
        <defs>
          <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="date"
          axisLine={false}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            })
          }
          tick={{
            fill: "#636466",
            fontSize: 12,
            fontWeight: 500,
          }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `${value}`}
          tick={{
            fill: "#636466",
            fontSize: 12,
            fontWeight: 500,
          }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "var(--primary)",
            border: "none",
            borderRadius: "8px",
            color: "#ffffff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
          labelStyle={{
            color: "#ffffff",
            fontWeight: 600,
            fontSize: 13,
          }}
          itemStyle={{
            color: "#ffffff",
            fontSize: 12,
          }}
          cursor={{ fill: "rgba(1, 55, 105, 0.1)" }}
          labelFormatter={(value) =>
            new Date(value).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          }
          formatter={(value, name) => [
            `${value} Complaints`,
            name === "complaints"
              ? "Total Complaints"
              : name === "resolved"
              ? "Resolved"
              : "Last Month",
          ]}
        />

        {/* 3 Lines */}
        <Area
          type="monotone"
          dataKey="complaints"
          stroke="#013769"
          fill="#ced8e1"
          name="complaints"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="resolved"
          stroke="#16a34a"
          fill="url(#colorResolved)"
          name="resolved"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="lastMonth"
          stroke="#013769"
          fill="none"
          name="lastMonth"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      </AreaChart>
    </div>
  );
};

export default AreachartComponent;
