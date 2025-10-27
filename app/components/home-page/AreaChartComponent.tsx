"use client";

import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const AreachartComponent = () => {
  const data = [
    { date: "2025-10-21", complaints: 120, resolved: 90, lastMonth: 110 },
    { date: "2025-10-22", complaints: 98, resolved: 70, lastMonth: 105 },
    { date: "2025-10-23", complaints: 150, resolved: 100, lastMonth: 130 },
    { date: "2025-10-24", complaints: 80, resolved: 65, lastMonth: 75 },
    { date: "2025-10-25", complaints: 170, resolved: 120, lastMonth: 160 },
    { date: "2025-10-26", complaints: 140, resolved: 110, lastMonth: 130 },
    { date: "2025-10-27", complaints: 180, resolved: 150, lastMonth: 175 },
  ];

  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2!">
      <div className="mb-3! flex justify-between">
        <div>
          <p className="text-sm text-[#202224] font-bold mb-1!">
            Daily Average Complaints
          </p>
          <div className="flex gap-4 items-center">
            <p className="font-extrabold text-xl">Punjab</p>
            <p className="text-sm">
              <span className="text-green-600 font-bold">+1.3%</span> VS LAST
              YEAR
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#013769] rounded-xs" />
            <span className="text-xs text-[#202224] font-bold">
              Total Complaints
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#028B02] rounded-xs" />
            <span className="text-xs text-[#202224] font-bold">Resolved</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#AF0404] rounded-xs" />
            <span className="text-xs text-[#202224] font-bold">Last Month</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
        >
          <defs>
            {/* ✅ Correct gradient colors */}
            <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#013769" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#013769" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#028B02" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#028B02" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#AF0404" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#AF0404" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })
            }
            tick={{ fill: "#636466", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
            tick={{ fill: "#636466", fontSize: 12, fontWeight: 500 }}
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

          {/* ✅ Always visible dots + highlight on hover */}
          <Area
            type="monotone"
            dataKey="complaints"
            stroke="#013769"
            fill="url(#colorComplaints)"
            name="complaints"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "#013769",
              strokeWidth: 0,
            }}
            activeDot={{
              fill: "#013769",
              stroke: "#fff",
              strokeWidth: 1,
            }}
          />
          <Area
            type="monotone"
            dataKey="resolved"
            stroke="#028B02"
            fill="url(#colorResolved)"
            name="resolved"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "#028B02",
              strokeWidth: 0,
            }}
            activeDot={{
              fill: "#028B02",
              stroke: "#fff",
              strokeWidth: 1,
            }}
          />
          <Area
            type="monotone"
            dataKey="lastMonth"
            stroke="#AF0404"
            fill="url(#colorLastMonth)"
            name="lastMonth"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{
              r: 4,
              fill: "#AF0404",
              strokeWidth: 0,
            }}
            activeDot={{
              fill: "#AF0404",
              stroke: "#fff",
              strokeWidth: 1,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreachartComponent;
