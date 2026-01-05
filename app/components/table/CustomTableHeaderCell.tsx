"use client";

import Link from "next/link";
import { HiArrowNarrowUp } from "react-icons/hi";

interface Props {
  label: string;
  columnValue?: string;
  searchParams?: Record<string, any>;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}

const CustomTableHeaderCell = ({
  label,
  columnValue,
  searchParams,
  colSpan,
  rowSpan,
  className,
}: Props) => {
  const alignmentClass = label.toLowerCase() === "actions" ? "justify-end" : "";

  if (!searchParams || !columnValue) {
    return (
      <th
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={`p-3! bg-[#F9F9F9] whitespace-nowrap uppercase text-[#535353]  border border-[#E9EAEB] ${className} `}
      >
        <div className={`flex  items-center gap-1 text-xs ${alignmentClass}`}>
          {label}
        </div>
      </th>
    );
  }

  const isActive = searchParams.orderBy === columnValue;
  const currentOrder = searchParams.order === "asc" ? "asc" : "desc";
  const nextOrder = isActive && currentOrder === "asc" ? "desc" : "asc";

  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`p-3! bg-[#F9F9F9] whitespace-nowrap uppercase text-[#535353]  border border-[#E9EAEB] ${className}`}
    >
      <Link
        href={{
          query: {
            ...searchParams,
            orderBy: columnValue,
            order: nextOrder,
          },
        }}
        className={`flex items-center gap-1 text-xs ${alignmentClass}`}
      >
        {label}
        {isActive && (
          <HiArrowNarrowUp
            className={`transition-transform ${
              currentOrder === "desc" ? "rotate-180" : ""
            }`}
          />
        )}
      </Link>
    </th>
  );
};

export default CustomTableHeaderCell;
