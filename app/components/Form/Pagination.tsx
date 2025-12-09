"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import PageSizeFilter from "./PageSizeFilter";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString(), { scroll: true });
  };

  // const changePageSize = (size: number) => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("pageSize", size.toString());
  //   params.set("page", "1"); // Reset to first page on size change
  //   router.push("?" + params.toString(), { scroll: false });
  // };

  // useEffect(() => {
  //   changePageSize(10);
  // }, [router]);

  const handlePageChange = (pageNumber: number) => {
    changePage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Maximum visible page numbers
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(pageCount, startPage + maxPageNumbers - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key="ellipsis-start"
          className={`px-4! py-1! rounded-md text-sm font-medium transition-colors duration-150`}
          disabled
        >
          <HiOutlineDotsHorizontal />
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-4! py-1! rounded-md text-sm font-medium duration-150 transition-colors ${
            i === currentPage
              ? "bg-(--primary) text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < pageCount) {
      pageNumbers.push(
        <button
          key="ellipsis-end"
          className={`px-4! py-1! rounded-md text-sm font-medium transition-colors duration-150`}
          disabled
        >
          <HiOutlineDotsHorizontal />
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="absolute bottom-0 w-full">
      <div className="flex gap-2! items-center! p-3! justify-between">
        <p className="text-sm">
          Page {currentPage} of {pageCount}
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            className={`px-4! py-1! rounded-md text-sm font-medium transition-colors duration-150 ${
              currentPage !== 1 && "hover:bg-zinc-400"
            } transition-colors`}
            disabled={currentPage === 1}
            onClick={() => changePage(1)}
          >
            <RxDoubleArrowLeft className="text-black" />
          </button>
          <button
            className={`px-4! py-1! rounded-md text-sm font-medium transition-colors duration-150 ${
              currentPage !== 1 && "hover:bg-zinc-400"
            } transition-colors`}
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            <BiChevronLeft className="text-black" />
          </button>
          {renderPageNumbers()}
          <button
            className={`px-4! py-1! rounded-md text-sm font-medium transition-colors duration-150 ${
              currentPage !== pageCount && "hover:bg-zinc-400"
            } transition-colors`}
            disabled={currentPage === pageCount}
            onClick={() => changePage(currentPage + 1)}
          >
            <BiChevronRight className="text-black" />
          </button>
          <button
            className={`px-4! py-1! rounded-md text-sm font-medium transition-colors duration-150 ${
              currentPage !== pageCount && "hover:bg-zinc-400"
            } transition-colors`}
            disabled={currentPage === pageCount}
            onClick={() => changePage(pageCount)}
          >
            <RxDoubleArrowRight className="text-black" />
          </button>
        </div>
        <div>
          <PageSizeFilter />
        </div>
        {/* <div>
        <select
          className="px-4! py-1! rounded-md text-sm font-medium transition-colors duration-150 hover:bg-zinc-400 transition-colors"
          style={{
            color: "#fff",
            border: "1px solid #445E84",
            outline: "none",
          }}
          aria-label="Rows per page"
          name="rowPerPage"
          value={pageSize}
          onChange={(e) => changePageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((num) => (
            <option key={num} value={num}>
              &nbsp;{num}
            </option>
          ))}
        </select>
      </div> */}
      </div>
    </div>
  );
};

export default Pagination;
