"use client";

import Link from "next/link";
import { TbMathGreater } from "react-icons/tb";

interface BreadcrumbItem {
  label: string;
  href?: string; // last item me href nahi hoga
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="flex items-center text-sm text-gray-600 py-1!">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center">
            {isLast ? (
              <span className="font-semibold text-gray-900">{item.label}</span>
            ) : (
              <Link href={item.href!} className="hover:text-(--primary)">
                {item.label}
              </Link>
            )}

            {!isLast && <p className="px-1!">|</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
