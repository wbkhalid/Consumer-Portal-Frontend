"use client";

import React from "react";
import { FaSort } from "react-icons/fa";

interface TableHeaderCellProps {
  label: string;
  sortable?: string;
  onSort?: () => void;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  label,
  sortable,
  onSort,
  className,
  colSpan = 1,
  rowSpan = 1,
}) => {
  const alignmentClass = label.toLowerCase() === "actions" ? "justify-end" : "";
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={`px-4! py-2! whitespace-nowrap text-[#535862]  border-b border-b-[#E9EAEB] ${alignmentClass} ${className} ${
        sortable ? "cursor-pointer select-none" : ""
      }`}
      onClick={sortable ? onSort : undefined}
    >
      <div className={`flex items-center ${alignmentClass} gap-1`}>
        <span>{label}</span>
        {sortable && <FaSort className="text-xs text-[#535862]" />}
      </div>
    </th>
  );
};

export default TableHeaderCell;
