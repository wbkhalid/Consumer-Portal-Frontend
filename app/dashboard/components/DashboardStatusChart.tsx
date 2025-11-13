"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import { StatusStatsType } from "../../page";

const DashboardStatusChart = ({ data }: { data: StatusStatsType[] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-1! bg-(--primary) border border-[#1BCEF5]">
        <p className="text-sm text-[#1E293B] font-bold">Complaint Resolved</p>
        <div className="h-[300px] flex justify-center items-center text-sm text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  // 🌈 Define color mapping for each status
  const STATUS_COLORS: Record<string, string> = {
    Pending: "#90bafd", // blue
    Proceeding: "#e8bd0f", // amber
    Escalation: "#DC2626", // red
    SuperEscalation: "#af0404", // dark rose/red
    DecidedOnMerit: "#028b02", // green
    Exparty: "#9333EA", // purple
    Withdraw: "#6B7280", // gray
    NonProsecution: "#EAB308", // yellow
  };

  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
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
        fontSize={8}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="px-3! py-2! bg-(--primary) border border-[#1BCEF5]">
      <p className="text-sm text-white font-bold ">Complaint Resolved</p>

      <div className="h-[250px] mt-1 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={
                data.map((d) => ({ ...d })) satisfies {
                  [key: string]: string | number;
                }[]
              }
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              stroke="none"
              fontSize={10}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.status] || "#9CA3AF"} // fallback gray
                />
              ))}
            </Pie>

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { name, value } = payload[0];
                  return (
                    <div
                      style={{
                        backgroundColor: "#002344",
                        border: "1px solid #1BCEF5",
                        borderRadius: 0,
                        padding: "2px 6px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#E5E5EF",
                          fontSize: "10px",
                        }}
                      >
                        {value}
                      </div>
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "11px",
                        }}
                      >
                        {name}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={9}
              formatter={(value) => (
                <span
                  style={{
                    color: "#fff",
                    fontSize: "8px",
                    fontWeight: 400,
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

export default DashboardStatusChart;
