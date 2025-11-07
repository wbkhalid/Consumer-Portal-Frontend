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
      className={`px-4! py-2! border-b border-b-[#E9EAEB] text-[#535862] text-left text-xs ${className}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export default TableBodyCell;
