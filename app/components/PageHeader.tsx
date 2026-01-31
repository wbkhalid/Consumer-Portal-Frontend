"use client";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";

interface PageHeaderProps {
  title: string;
  count?: number;
  showBack?: boolean;
}

const PageHeader = ({ title, count, showBack = true }: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-2.5 mb-2.5! items-center">
      {showBack && (
        <div
          onClick={() => router.back()}
          className="bg-white rounded-full p-1! shadow-xs cursor-pointer hover:opacity-80"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
        </div>
      )}

      <div className="flex items-center gap-1">
        <p className="text-[#111827] font-semibold">{title}</p>

        {typeof count === "number" && (
          <p className="border border-(--primary) text-(--primary) font-semibold rounded-full px-1! py-0.5! text-xs">
            {count.toLocaleString()} Records
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
