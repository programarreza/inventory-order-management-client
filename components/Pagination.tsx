"use client";

import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      onPageChange(page);

      // Update URL with new page
      const params = new URLSearchParams(searchParams.toString());

      params.set("page", page.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [onPageChange, router, searchParams, totalPages],
  );

  const pages = useMemo(() => {
    const visiblePages: (number | "...")[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    visiblePages.push(1);

    // Calculate start and end of the middle section
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're near the start or end
    if (currentPage <= 3) {
      endPage = 4;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      visiblePages.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      visiblePages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }

    return visiblePages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Button
        isIconOnly
        aria-label="Previous page"
        isDisabled={currentPage === 1}
        size="sm"
        variant="light"
        onPress={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </span>
          ) : (
            <Button
              key={page}
              isIconOnly
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={`Page ${page}`}
              color={currentPage === page ? "primary" : "default"}
              size="sm"
              variant={currentPage === page ? "solid" : "flat"}
              onPress={() => handlePageChange(page as number)}
            >
              {page}
            </Button>
          ),
        )}
      </div>

      <Button
        isIconOnly
        aria-label="Next page"
        isDisabled={currentPage === totalPages}
        size="sm"
        variant="light"
        onPress={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
