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

const STATUS_COLORS: Record<string, string> = {
  Pending: "#013769", // blue
  Proceeding: "#e8bd0f", // amber
  Escalation: "#DC2626", // red
  SuperEscalation: "#af0404", // dark red
  DecidedOnMerit: "#028b02", // green
  Exparte: "#9333EA", // purple
  Withdraw: "#6B7280", // gray
  NonProsecution: "#EAB308", // yellow
};

const AreachartComponent = ({ data }: { data: DailyAvergeType[] }) => {
  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2!">
      {/* Header */}
      <div className="mb-3! flex justify-between gap-6">
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
        <div className="flex gap-x-4 gap-y-2 mt-2 flex-wrap">
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Pending }}
            />
            <span className="text-xs text-[#202224] font-bold">Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Proceeding }}
            />
            <span className="text-xs text-[#202224] font-bold">Proceeding</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Escalation }}
            />
            <span className="text-xs text-[#202224] font-bold">Escalation</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.SuperEscalation }}
            />
            <span className="text-xs text-[#202224] font-bold">
              Super Escalation
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.DecidedOnMerit }}
            />
            <span className="text-xs text-[#202224] font-bold">
              Decided on Merit
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Exparte }}
            />
            <span className="text-xs text-[#202224] font-bold">Ex-Parte</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Withdraw }}
            />
            <span className="text-xs text-[#202224] font-bold">Withdraw</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.NonProsecution }}
            />
            <span className="text-xs text-[#202224] font-bold">
              Non Prosecution
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={290}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.Pending}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.Pending}
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient id="colorProceeding" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.Proceeding}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.Proceeding}
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient id="colorEscalation" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.Escalation}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.Escalation}
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient
              id="colorSuperEscalation"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.SuperEscalation}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.SuperEscalation}
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient
              id="colorDecidedOnMerit"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.DecidedOnMerit}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.DecidedOnMerit}
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient id="colorExparte" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.Exparte}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.Exparte}
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient id="colorWithdraw" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.Withdraw}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.Withdraw}
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient
              id="colorNonProsecution"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.NonProsecution}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.NonProsecution}
                stopOpacity={0}
              />
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
            labelStyle={{ color: "#ffffff", fontWeight: 600, fontSize: 13 }}
            itemStyle={{ color: "#ffffff", fontSize: 12 }}
            labelFormatter={(value) =>
              new Date(value).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }
          />

          <Area
            type="monotone"
            dataKey="pendingCount"
            stroke={STATUS_COLORS.Pending}
            fill="url(#colorPending)"
            name="Pending"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Pending, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="inProceedingCount"
            stroke={STATUS_COLORS.Proceeding}
            fill="url(#colorProceeding)"
            name="Proceeding"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Proceeding, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="escalatedCount"
            stroke={STATUS_COLORS.Escalation}
            fill="url(#colorEscalation)"
            name="Escalation"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Escalation, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="superEscalatedCount"
            stroke={STATUS_COLORS.SuperEscalation}
            fill="url(#colorSuperEscalation)"
            name="Super Escalation"
            strokeWidth={2}
            activeDot={{
              r: 4,
              fill: STATUS_COLORS.SuperEscalation,
              stroke: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="decidedOnMerit"
            stroke={STATUS_COLORS.DecidedOnMerit}
            fill="url(#colorDecidedOnMerit)"
            name="Decided on Merit"
            strokeWidth={2}
            activeDot={{
              r: 4,
              fill: STATUS_COLORS.DecidedOnMerit,
              stroke: "#fff",
            }}
          />
          <Area
            type="monotone"
            dataKey="expartyCount"
            stroke={STATUS_COLORS.Exparte}
            fill="url(#colorExparte)"
            name="Ex-Parte"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Exparte, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="withdrawnCount"
            stroke={STATUS_COLORS.Withdraw}
            fill="url(#colorWithdraw)"
            name="Withdraw"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Withdraw, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="nonProsecutionCount"
            stroke={STATUS_COLORS.NonProsecution}
            fill="url(#colorNonProsecution)"
            name="Non Prosecution"
            strokeWidth={2}
            activeDot={{
              r: 4,
              fill: STATUS_COLORS.NonProsecution,
              stroke: "#fff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreachartComponent;
