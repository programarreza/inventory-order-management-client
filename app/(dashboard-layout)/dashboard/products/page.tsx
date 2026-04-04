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
import Image from "next/image";
import { useState } from "react";

import CreateProductModal from "./_components/CreateProductModal";

import SkeletonTable from "@/components/SkeletonTable";
import { useGetProductsQuery } from "@/lib/Redux/features/product/productApi";

const rows = [
  { name: "SL", uid: "SL" },
  { name: "IMAGE", uid: "IMAGE" },
  { name: "PRODUCT NAME", uid: "PRODUCT NAME" },
  { name: "CATEGORY", uid: "CATEGORY" },
  { name: "PRICE", uid: "PRICE" },
  { name: "STOCK", uid: "STOCK" },
  { name: "MIN STOCK", uid: "MIN STOCK" },
  { name: "STATUS", uid: "STATUS" },
];

const ProductsPage = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);

  const { data, isLoading } = useGetProductsQuery("");

  const products = data?.data || [];

  if (isLoading) {
    return (
      <div className="m-4">
        <SkeletonTable columns={rows.length} headerRows={rows} rows={10} />
      </div>
    );
  }

  return (
    <div className="m-4">
      <div className="flex justify-end pb-4 items-center gap-3">
        <Button
          className="bg-primary text-white"
          onPress={() => setOpenCreateProduct(true)}
        >
          Create Product
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            aria-label="all products from dashboard"
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
              {products?.map((product: any, index: number) => (
                <TableRow
                  key={product?._id}
                  className="bg-white border-b border-b-gray-200"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {product?.image ? (
                      <Image
                        alt={product?.name}
                        className="w-12 h-12 object-cover rounded"
                        height={1200}
                        src={product?.image}
                        width={1200}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs text-center">
                          No Image
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{product?.categoryId?.name}</TableCell>
                  <TableCell>৳{product?.price}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        product?.stock <= product?.minStock
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product?.stock}
                    </span>
                  </TableCell>
                  <TableCell>{product?.minStock}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        product?.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product?.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {openCreateProduct && (
          <CreateProductModal
            isOpen={openCreateProduct}
            onClose={() => setOpenCreateProduct(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
