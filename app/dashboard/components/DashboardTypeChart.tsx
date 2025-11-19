"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SectionTypeStatsType } from "../../page";

const DashboardTypeChart = ({ data }: { data: SectionTypeStatsType[] }) => {
  return (
    <div className="px-3! py-2! bg-(--primary) border border-[#1BCEF5]">
      <div>
        <p className="text-sm text-white font-bold mb-2!">
          Types of Complaints
        </p>
      </div>

      <div className="h-[337px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 0, left: 20, bottom: 70 }}
          >
            <CartesianGrid
              vertical={false}
              strokeWidth={0.2}
              stroke="#CBD5E1"
            />
            <XAxis
              dataKey="sectionName"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#fff" }}
              angle={-35}
              textAnchor="end"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#fff" }}
              tickFormatter={(value) => `${value}`}
            />
            {/* <Tooltip
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
            /> */}

            <Tooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                console.log(payload, "payload");

                if (active && payload && payload.length) {
                  const { sectionName, count } = payload[0].payload;
                  return (
                    <div
                      style={{
                        backgroundColor: "#014D54",
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
                        {count}
                      </div>
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: "11px",
                        }}
                      >
                        {sectionName}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="count"
              fill="#3BA2F1"
              radius={[5, 5, 5, 5]}
              barSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardTypeChart;
