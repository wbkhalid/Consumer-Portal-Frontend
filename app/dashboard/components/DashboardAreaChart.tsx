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
  Pending: "#3BA2F1", // blue
  Proceeding: "#e8bd0f", // amber
  Escalation: "#DC2626", // red
  SuperEscalation: "#af0404", // dark red
  DecidedOnMerit: "#028b02", // green
  Exparty: "#9333EA", // purple
  Withdraw: "#6B7280", // gray
  NonProsecution: "#EAB308", // yellow
};

const DashboardAreaChart = ({ data }: { data: DailyAvergeType[] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-1! bg-(--dashboard-primary) border border-(--dashboard-border)">
        <p className="text-sm text-white font-bold">Daily Average Complaints</p>
        <div className="h-[300px] flex justify-center items-center text-sm text-white">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="px-3! py-2! bg-(--dashboard-primary) border border-(--dashboard-border)">
      {/* Header */}
      <div className="mb-3! flex justify-between gap-6">
        <div>
          <p className="text-sm text-white font-bold mb-1! whitespace-nowrap">
            Daily Average Complaints
          </p>
          <div className="flex gap-4 items-center">
            <p className="font-extrabold text-xl text-white">Punjab</p>
            <p className="text-sm text-white">
              <span className="text-green-600 font-bold">+1.3%</span> VS LAST
              YEAR
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-x-4 gap-y-2 mt-2 flex-wrap justify-end">
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Pending }}
            />
            <span className="text-xs text-white font-semibold">Pending</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Proceeding }}
            />
            <span className="text-xs text-white font-semibold">Proceeding</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Escalation }}
            />
            <span className="text-xs text-white font-semibold">Escalation</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.SuperEscalation }}
            />
            <span className="text-xs text-white font-semibold">
              Super Escalation
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.DecidedOnMerit }}
            />
            <span className="text-xs text-white font-semibold">
              Decided on Merit
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Exparty }}
            />
            <span className="text-xs text-white font-semibold">Ex-Party</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.Withdraw }}
            />
            <span className="text-xs text-white font-semibold">Withdraw</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-xs"
              style={{ backgroundColor: STATUS_COLORS.NonProsecution }}
            />
            <span className="text-xs text-white font-semibold">
              Non Prosecution
            </span>
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

            <linearGradient id="colorExparty" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={STATUS_COLORS.Exparty}
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor={STATUS_COLORS.Exparty}
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
            tick={{ fill: "#fff", fontSize: 12, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
            tick={{ fill: "#fff", fontSize: 12, fontWeight: 500 }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--dashboard-primary)",
              border: "1px solid var(--dashboard-border)",
              borderRadius: "0",
            }}
            labelStyle={{ color: "#E5E5EF", fontWeight: 600, fontSize: 10 }}
            itemStyle={{ color: "#ffffff", fontSize: 10 }}
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
            dataKey="pendingCount"
            stroke={STATUS_COLORS.Pending}
            fill="url(#colorPending)"
            name="Pending"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Pending, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="proceedingCount"
            stroke={STATUS_COLORS.Proceeding}
            fill="url(#colorProceeding)"
            name="Proceeding"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Proceeding, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="escalationCount"
            stroke={STATUS_COLORS.Escalation}
            fill="url(#colorEscalation)"
            name="Escalation"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Escalation, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="superEscalationCount"
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
            stroke={STATUS_COLORS.Exparty}
            fill="url(#colorExparty)"
            name="Ex-Party"
            strokeWidth={2}
            activeDot={{ r: 4, fill: STATUS_COLORS.Exparte, stroke: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="withdrawCount"
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

export default DashboardAreaChart;
