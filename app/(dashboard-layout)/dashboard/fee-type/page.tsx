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

import CreateFeeTypeModal from "./_components/CreateFeeTypeModal";

import SkeletonTable from "@/components/SkeletonTable";
import { useGetFeeTypesQuery } from "@/lib/Redux/features/finance/feeType/feeTypeApi";

const rows = [
  { name: "SL", uid: "SL" },
  { name: "FEE NAME", uid: "FEE NAME" },
  { name: "FEE TYPE", uid: "FEE TYPE" },
];

const FeeType = () => {
  const [openCreateFeeType, setOpenCreateFeeType] = useState(false);

  const { data, isLoading } = useGetFeeTypesQuery("");

  const feeTypes = data?.data || [];

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
          onPress={() => setOpenCreateFeeType(true)}
        >
          Create Fee Type
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            aria-label="all product from dashboard"
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
              {feeTypes?.map((feeType: any, index: number) => (
                <TableRow
                  key={feeType?._id}
                  className="bg-white border-b border-b-gray-200"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{feeType?.feeName}</TableCell>
                  <TableCell>{feeType?.feeType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {openCreateFeeType && (
          <CreateFeeTypeModal
            isOpen={openCreateFeeType}
            onClose={() => setOpenCreateFeeType(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FeeType;
