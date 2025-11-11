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

const ComplainTypeChart = ({ data }: { data: SectionTypeStatsType[] }) => {
  // const data = [
  //   { type: "Hidden Charges", complaints: 120 },
  //   { type: "Additional Charges", complaints: 90 },
  //   { type: "Unexpected Costs", complaints: 75 },
  //   { type: "Extra Fees", complaints: 110 },
  // ];

  console.log(data);

  return (
    <div className="rounded-xl px-4! py-2! bg-white mt-2! w-full">
      <div>
        <p className="text-sm text-[#202224] font-bold mb-4!">
          Types of Complaints
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 0, left: 20, bottom: 60 }}
          >
            <CartesianGrid vertical={false} strokeWidth={1} stroke="#CBD5E1" />
            <XAxis
              dataKey="sectionName"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
              angle={-30}
              textAnchor="end"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
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
              dataKey="count"
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
