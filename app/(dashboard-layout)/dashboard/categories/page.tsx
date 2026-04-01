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

import CreateCategoryModal from "./_components/CreateCategoryModal";

import SkeletonTable from "@/components/SkeletonTable";
import { useGetCategoriesQuery } from "@/lib/Redux/features/catgeory/categoryApi";

const rows = [
  { name: "SL", uid: "SL" },
  { name: "CATEGORY NAME", uid: "CATEGORY NAME" },
  { name: "DESCRIPTION", uid: "DESCRIPTION" },
];

const Categories = () => {
  const [openCreateCategory, setOpenCreateCategory] = useState(false);

  const { data, isLoading } = useGetCategoriesQuery("");

  const categories = data?.data || [];

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
          onPress={() => setOpenCreateCategory(true)}
        >
          Create Category
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            aria-label="all categories from dashboard"
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
              {categories?.map((category: any, index: number) => (
                <TableRow
                  key={category?._id}
                  className="bg-white border-b border-b-gray-200"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category?.name}</TableCell>
                  <TableCell>{category?.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {openCreateCategory && (
          <CreateCategoryModal
            isOpen={openCreateCategory}
            onClose={() => setOpenCreateCategory(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Categories;
