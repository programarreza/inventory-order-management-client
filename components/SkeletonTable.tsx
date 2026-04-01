import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  headerRows?: { name: string; uid: string }[];
}

const SkeletonTable = ({
  rows = 10,
  columns = 5,
  showHeader = true,
  headerRows = [],
}: SkeletonTableProps) => {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table
          removeWrapper
          aria-label="loading skeleton table"
          className="bg-transparent"
        >
          <TableHeader>
            {showHeader && headerRows.length > 0
              ? headerRows.map((row) => (
                  <TableColumn key={row?.uid} className="text-[#272B35]">
                    {row?.name}
                  </TableColumn>
                ))
              : // Default header if no custom header provided
                Array.from({ length: columns }).map((_, index) => (
                  <TableColumn
                    key={`header-${index}`}
                    className="text-[#272B35]"
                  >
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                  </TableColumn>
                ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, index) => {
              const cells = [];

              // Serial number cell
              cells.push(
                <TableCell key={`skeleton-sl-${index}`}>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-8" />
                </TableCell>,
              );

              // Data cells
              for (let colIndex = 0; colIndex < columns - 1; colIndex++) {
                cells.push(
                  <TableCell key={`skeleton-cell-${index}-${colIndex}`}>
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </TableCell>,
                );
              }

              return (
                <TableRow
                  key={`skeleton-row-${index}`}
                  className="bg-white border-b border-b-gray-200"
                >
                  {cells}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SkeletonTable;
