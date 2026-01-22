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
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FineInsightType } from "../../page";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { ADMIN_DASHBOARD_API } from "../../APIs";

const FineBarChart = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<FineInsightType[]>([]);
  const [loading, setLoading] = useState(false);
  const activePeriod = Number(searchParams.get("period") ?? 2);

  useEffect(() => {
    const fetchFineData = async () => {
      setLoading(true);

      const params = new URLSearchParams(searchParams.toString());
      params.set("period", activePeriod.toString());

      const res = await apiClient.get(
        `${ADMIN_DASHBOARD_API}/financial-insight?${params.toString()}`,
      );

      console.log(res?.data?.data, "...//...///");

      setData(res?.data?.data || []);

      setLoading(false);
    };

    fetchFineData();
  }, [activePeriod]);

  const handleClick = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", index.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const getWeekDayPK = (label: string) => {
    const [day, month] = label.split("-");

    const year = new Date().getFullYear();

    const date = new Date(`${year} ${month} ${day} 12:00:00`);

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "Asia/Karachi",
    });
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl col-span-12 md:col-span-7">
      <div className="flex justify-between items-center px-5! py-3.5!">
        <div className="flex gap-1.5 items-center ">
          <div className="w-12 h-12 bg-[linear-gradient(135deg,#21C35D_0%,#17A74C_100%)] rounded-[10px] flex items-center justify-center">
            <Image
              src={`/icons/fine-chart.png`}
              alt={`fine-chart icon`}
              width={24}
              height={24}
            />
          </div>
          <div>
            <p className="text-[#111827] font-bold">Financial Insight</p>
            <p className="text-[10px] text-[#6B7280] font-semibold">
              Fine Collection
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="bg-[#F3F4F6] py-1.5! px-2.5! rounded-[10px] flex gap-2">
            {["D", "W", "M", "Y"]?.map((label, index) => (
              <p
                key={label}
                onClick={() => handleClick(index)}
                className={`text-xs font-bold cursor-pointer px-2! py-1! rounded-md
                ${
                  activePeriod === index
                    ? "bg-[linear-gradient(180deg,#036CCF_0%,#013769_100%)] text-white"
                    : "text-[#6B7280] bg-transparent"
                }`}
              >
                {label}
              </p>
            ))}
          </div>
          <div
            className="bg-[#F3F4F6] text-[#6B7280] text-xs font-bold  p-2.5! rounded-[10px] cursor-pointer hover:opacity-80 flex items-center gap-1"
            onClick={() => router.push("/fined-complaints")}
          >
            <Image
              src="/icons/arrow-up.png"
              alt="arrow-up.png"
              width={18}
              height={18}
            />
            Visit
          </div>
        </div>
      </div>

      <div className="h-[350px] w-full">
        {data?.length === 0 ? (
          <div className=" w-full h-full flex justify-center items-center text-[#6B7280] text-sm font-bold">
            No record found
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient
                  id="fineBarGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#036CCF" />
                  <stop offset="100%" stopColor="#013769" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeWidth={1}
                stroke="#CBD5E1"
                strokeDasharray={3}
              />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                angle={0}
                textAnchor="middle"
                tickFormatter={(value) =>
                  activePeriod === 1 ? getWeekDayPK(value) : value
                }
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
                }}
                formatter={(value) => [`${value}`, "Total Fine"]}
                cursor={{ fill: "transparent" }}
              />

              <Bar
                dataKey="totalFine"
                fill="url(#fineBarGradient)"
                radius={20}
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default FineBarChart;
