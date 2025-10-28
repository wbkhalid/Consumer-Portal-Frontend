"use client";

import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { DailyAvergeType } from "../../page";

const AreachartComponent = ({ data }: { data: DailyAvergeType[] }) => {
  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2!">
      {/* Header */}
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

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[var(--primary)] rounded-xs" />
            <span className="text-xs text-[#202224] font-bold">
              Total Complaints
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[var(--success)] rounded-xs" />
            <span className="text-xs text-[#202224] font-bold">Resolved</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[var(--warning)] rounded-xs" />
            <span className="text-xs text-[#202224] font-bold">Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[var(--error)] rounded-xs" />
            <span className="text-xs text-[#202224] font-bold">Rejected</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={290}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -30, bottom: 0 }}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#013769" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#013769" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#028B02" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#028B02" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E8BD0F" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#E8BD0F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#AF0404" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#AF0404" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Axes */}
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

          {/* Tooltip */}
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
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }
          />

          {/* Areas */}
          <Area
            type="monotone"
            dataKey="totalCount"
            stroke="#013769"
            fill="url(#colorTotal)"
            name="Total Complaints"
            strokeWidth={2}
            activeDot={{ r: 4, fill: "#013769", stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="resolvedCount"
            stroke="#028B02"
            fill="url(#colorResolved)"
            name="Resolved"
            strokeWidth={2}
            activeDot={{ r: 4, fill: "#028B02", stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="pendingCount"
            stroke="#E8BD0F"
            fill="url(#colorPending)"
            name="Pending"
            strokeWidth={2}
            activeDot={{ r: 4, fill: "#E8BD0F", stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="rejectedCount"
            stroke="#AF0404"
            fill="url(#colorRejected)"
            name="Rejected"
            strokeWidth={2}
            strokeDasharray="5 5"
            activeDot={{ r: 4, fill: "#AF0404", stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreachartComponent;
