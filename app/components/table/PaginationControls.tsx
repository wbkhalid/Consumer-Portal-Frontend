import { Button } from "@radix-ui/themes";
import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import CustomSelect from "../CustomSelect";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  setPageSize,
}) => {
  if (totalPages === 0) return null;

  const pageSizeOptions = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex justify-between items-center gap-1 px-1!">
      <CustomSelect
        placeholder="Select"
        options={pageSizeOptions}
        value={String(pageSize)}
        onChange={(val) => {
          if (!val) return;
          setPageSize(Number(val));
          onPageChange(1);
        }}
      />
      {/* Previous */}

      {/* Numbered Buttons */}
      <div>
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2! text-gray-400 text-sm">...</span>
            ) : (
              <button
                onClick={() => onPageChange(Number(page))}
                className={`px-3! py-1! rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer! ${
                  currentPage === page
                    ? "bg-(--primary) text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next */}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`text-[#414651]! outline! outline-[#D5D7DA]! shadow-none! ${
            currentPage === 1 ? "cursor-not-allowed!" : "cursor-pointer!"
          }  !text-[12px]! px-3! py-1! hover:bg-[#F5F7FA]`}
          style={{ outlineWidth: "1px" }}
        >
          <FaArrowLeft size={12} />
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`text-[#414651]! outline! outline-[#D5D7DA]! shadow-none! ${
            currentPage === totalPages
              ? "cursor-not-allowed!"
              : "cursor-pointer!"
          } text-[12px]! px-3! py-1! hover:bg-[#F5F7FA]`}
          style={{ outlineWidth: "1px" }}
        >
          Next
          <FaArrowRight size={12} />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
