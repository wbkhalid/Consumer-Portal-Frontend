"use client";

import { ArrowDataTransferVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

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
      className={`p-3! bg-[#F9F9F9] whitespace-nowrap uppercase text-[#535353]  border border-[#E9EAEB] ${alignmentClass} ${className} ${
        sortable ? "cursor-pointer select-none" : ""
      }`}
      onClick={sortable ? onSort : undefined}
    >
      <div className={`flex items-center gap-0.5 ${alignmentClass}`}>
        <span className="text-xs">{label}</span>
        {sortable && (
          <HugeiconsIcon icon={ArrowDataTransferVerticalIcon} size={16} />
        )}
      </div>
    </th>
  );
};

export default TableHeaderCell;
