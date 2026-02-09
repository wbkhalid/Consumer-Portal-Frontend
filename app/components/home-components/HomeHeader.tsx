"use client";
import {
  ArrowExpandIcon,
  ArrowShrinkIcon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { ComplainDashboardType } from "../../page";
import { useRegionFilters } from "../../hooks/useRegionFilters";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeFilters from "./HomeFilters";
import { getRole } from "../../utils/utils";
import { useState } from "react";

const HomeHeader = ({ data }: { data: ComplainDashboardType }) => {
  const role = getRole();
  const { divisionId, districtId, tehsilId } = useRegionFilters();
  const [showFilters, setShowFilters] = useState(false);

  const params = new URLSearchParams();
  const router = useRouter();
  if (divisionId) params.set("divisionId", divisionId);
  if (districtId) params.set("districtId", districtId);
  if (tehsilId) params.set("tehsilId", tehsilId);
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl py-2! px-3! ">
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Link
            href={`/complains${params.toString() ? `?${params.toString()}` : ""}`}
          >
            <div className="bg-[rgba(238,242,255,0.3)] border border-[#E5E7EB] rounded-3xl py-2! px-4! flex gap-4 min-w-[200px]">
              <div
                className={`bg-(--primary) w-12 h-12 rounded-2xl flex items-center justify-center text-white`}
              >
                <Image
                  src={`/icons/total-complaints.png`}
                  alt={`total-complaints`}
                  width={24}
                  height={24}
                />
              </div>

              <div>
                <p className="text-[#6B7280] font-bold text-[10px] uppercase">
                  Total Complaints
                </p>

                <p className="text-[#182236] font-bold text-2xl">
                  {data?.totalComplaints}
                  {/* <span className="text-[#6B7280] font-bold text-[10px] uppercase ml-2!">
                    Complaints
                  </span>{" "} */}
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={`/appeals${params.toString() ? `?${params.toString()}` : ""}`}
          >
            <div className="bg-[rgba(238,242,255,0.3)] border border-[#E5E7EB] rounded-3xl py-2! px-4! flex gap-4  min-w-[200px]">
              <div
                className={`bg-[linear-gradient(135deg,#615FFF_0%,#3A3999_100%)] w-11 h-11 rounded-[14px] flex items-center justify-center text-white`}
              >
                <Image
                  src={`/icons/appeals.png`}
                  alt={`total-complaints.png`}
                  width={24}
                  height={24}
                />
              </div>

              <div>
                <p className="text-[#6B7280] font-bold text-[10px] uppercase">
                  Appeals
                </p>
                <p className="text-[#182236] font-bold text-2xl">
                  {data?.appealsCount}
                  {/* <span className="text-[#6B7280] font-bold text-[10px] uppercase ml-2!">
                    total
                  </span> */}
                </p>
              </div>
            </div>
          </Link>

          <div className="bg-white border border-[#E5E7EB] rounded-3xl py-2! px-4! flex gap-3 items-center  min-w-[200px]">
            <div>
              <p className="text-[#6B7280] font-bold text-[10px] uppercase">
                AVG Resolution Days
              </p>
              <p className="text-[#182236] font-bold text-2xl text-right">
                {data?.avgResolutionTime.toFixed(0)}
                {/* <span className="text-[#6B7280] font-bold text-[10px] uppercase ml-2!">
                  Days
                </span> */}
              </p>
            </div>
            <div className="w-px h-8 bg-[rgba(190,219,255,0.5)]" />
            <div
              className={`bg-[rgba(43,127,255,0.1)] w-10 h-10 rounded-[10px] flex items-center justify-center text-white border border-[rgba(190,219,255,0.3)]`}
            >
              <Image
                src={`/icons/days.png`}
                alt={`total-complaints.png`}
                width={24}
                height={24}
              />
            </div>
          </div>

          {["Admin", "DG", "Secretary"].includes(role ?? "") && (
            <div
              className="bg-[rgba(238,242,255,0.3)] border border-[#E5E7EB] rounded-3xl py-2! px-4! flex gap-4  justify-between cursor-pointer min-w-[200px]"
              onClick={() => router.push("/users")}
            >
              <div>
                <p className="text-[#6B7280] font-bold text-[10px] uppercase">
                  Total Users
                </p>

                <p className="text-[#182236] font-bold text-2xl">
                  {data?.appDownloadsCount}{" "}
                </p>
              </div>
              <div
                className={`bg-(--primary) w-12 h-12 rounded-2xl flex items-center justify-center text-white`}
              >
                <HugeiconsIcon icon={ArrowUpRight01Icon} />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-5 items-center">
          <div
            className="bg-(--primary) rounded-[14px] px-4! py-1! text-white flex items-center gap-2 cursor-pointer"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <HugeiconsIcon
              icon={showFilters ? ArrowShrinkIcon : ArrowExpandIcon}
              size={16}
            />
            <p className="text-[10px] uppercase tracking-widest font-bold">
              Filter
            </p>
          </div>
        </div>
      </div>
      <div
        className={`flex justify-center overflow-hidden transition-all duration-300 ease-linear ${
          showFilters
            ? "max-h-[200px] opacity-100 translate-y-0 mt-2!"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <HomeFilters />
      </div>
    </div>
  );
};

export default HomeHeader;
