"use client";

import { usePathname, useRouter } from "next/navigation";

const ClearButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <button
      className="text-sm! cursor-pointer! font-bold! text-[#BD4E42] border border-[#D96F64] py-1! px-3! rounded-lg!"
      onClick={() => {
        router.push(pathname);
      }}
    >
      Clear
    </button>
  );
};

export default ClearButton;
