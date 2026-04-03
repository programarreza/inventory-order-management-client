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

import UpdateStatusModal from "./_components/UpdateStatusModal";

import SkeletonTable from "@/components/SkeletonTable";
import { useGetOrdersQuery } from "@/lib/Redux/features/order/orderApi";
const rows = [
  { name: "SL", uid: "SL" },
  { name: "CUSTOMER NAME", uid: "CUSTOMER NAME" },
  { name: "ITEMS", uid: "ITEMS" },
  { name: "TOTAL PRICE", uid: "TOTAL PRICE" },
  { name: "STATUS", uid: "STATUS" },
  { name: "ORDER DATE", uid: "ORDER DATE" },
  { name: "ACTION", uid: "ACTION" },
];

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = data?.data || [];

  const handleOpenModal = (order: any) => {
    setSelectedOrder(order);
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
        <h1 className="text-2xl font-semibold text-[#272B35]">Orders</h1>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            aria-label="all orders from dashboard"
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
            <TableBody className="">
              {orders?.map((order: any, index: number) => (
                <TableRow
                  key={order?._id}
                  className="bg-white border-b border-b-gray-200"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order?.customerName}</TableCell>
                  <TableCell>
                    {order?.items?.map((item: any, i: number) => (
                      <div key={i} className="text-sm py-1">
                        {item?.productId?.name} (x{item?.quantity})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>৳{order?.totalPrice}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order?.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : order?.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order?.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(order?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-primary text-white"
                      size="sm"
                      onPress={() => handleOpenModal(order)}
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {selectedOrder && (
        <UpdateStatusModal
          currentStatus={selectedOrder?.status}
          isOpen={!!selectedOrder}
          orderId={selectedOrder?._id}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;
