"use client";
import { Button } from "@heroui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useState } from "react";

import UpdateRestockModal from "./_components/UpdateRestockModal";

import SkeletonTable from "@/components/SkeletonTable";
import { useGetRestocksQuery } from "@/lib/Redux/features/restock/restockApi";

const rows = [
  { name: "SL", uid: "SL" },
  { name: "PRODUCT NAME", uid: "PRODUCT NAME" },
  { name: "STOCK", uid: "STOCK" },
  { name: "MIN STOCK", uid: "MIN STOCK" },
  { name: "PRIORITY", uid: "PRIORITY" },
  { name: "RESOLVED", uid: "RESOLVED" },
  { name: "ACTION", uid: "ACTION" },
];

const Restocks = () => {
  const { data, isLoading } = useGetRestocksQuery("");
  const [selectedRestock, setSelectedRestock] = useState<any>(null);

  const restocks = data?.data || [];

  const handleOpenModal = (restock: any) => {
    setSelectedRestock(restock);
  };

  if (isLoading) {
    return (
      <div className="m-4">
        <SkeletonTable columns={rows.length} headerRows={rows} rows={10} />
      </div>
    );
  }

  return (
    <div className="m-4">
      <div className="flex justify-between pb-4 items-center">
        <h1 className="text-2xl font-semibold text-[#272B35]">Restocks</h1>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            aria-label="all restocks from dashboard"
            className="bg-transparent"
            removeWrapper={true}
          >
            <TableHeader className="">
              {rows.map((row) => (
                <TableColumn key={row?.uid} className="text-[#272B35]">
                  {row?.name}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody className="" emptyContent={"No restocks found."}>
              {restocks?.map((restock: any, index: number) => (
                <TableRow
                  key={restock?._id}
                  className="bg-white border-b border-b-gray-200"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{restock?.productId?.name}</TableCell>
                  <TableCell>
                    <span className="text-red-500 font-semibold">
                      {restock?.currentStock}
                    </span>
                  </TableCell>
                  <TableCell>{restock?.minStock}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        restock?.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : restock?.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {restock?.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        restock?.isResolved
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {restock?.isResolved ? "Resolved" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-primary text-white"
                      isDisabled={restock?.isResolved}
                      size="sm"
                      onPress={() => handleOpenModal(restock)}
                    >
                      Update Stock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Update Restock Modal */}
      {selectedRestock && (
        <UpdateRestockModal
          isOpen={!!selectedRestock}
          productId={selectedRestock?.productId?._id}
          productName={selectedRestock?.productId?.name}
          onClose={() => setSelectedRestock(null)}
        />
      )}
    </div>
  );
};

export default Restocks;
