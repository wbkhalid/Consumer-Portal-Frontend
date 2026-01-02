"use client";
import React from "react";

interface TableBodyCellProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
}

const TableBodyCell: React.FC<TableBodyCellProps> = ({
  children,
  className,
  colSpan,
}) => {
  return (
    <td
      className={`p-3! border-b border-b-[#E9EAEB] text-[#535862]  text-xs whitespace-nowrap ${className}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export default TableBodyCell;
