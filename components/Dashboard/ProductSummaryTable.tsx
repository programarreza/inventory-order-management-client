import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React from "react";

interface ProductSummary {
  name: string;
  stock: number;
  status: "Low Stock" | "OK";
}

interface ProductSummaryTableProps {
  products: ProductSummary[];
}

const ProductSummaryTable: React.FC<ProductSummaryTableProps> = ({ products }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="text-lg font-bold text-[#272B35]">Product Summary</h3>
        <button className="text-xs font-semibold text-primary hover:underline transition-all">
          View All Products
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <Table 
          aria-label="Product Summary Table"
          className="bg-transparent"
          removeWrapper={true}
        >
          <TableHeader className="">
            <TableColumn className="text-[#272B35] font-bold uppercase tracking-wider text-[11px] py-4 bg-gray-50/80">Product Name</TableColumn>
            <TableColumn className="text-[#272B35] font-bold uppercase tracking-wider text-[11px] py-4 bg-gray-50/80 text-center">Stock</TableColumn>
            <TableColumn className="text-[#272B35] font-bold uppercase tracking-wider text-[11px] py-4 bg-gray-50/80 text-right">Status</TableColumn>
          </TableHeader>
          <TableBody className="">
            {products.map((product, index) => (
              <TableRow 
                key={index} 
                className="bg-white border-b border-b-gray-200 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="py-4">
                  <span className="font-medium text-[#272B35]">{product.name}</span>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <span className={`px-2.5 py-1 rounded text-sm font-medium ${
                    product.stock <= 10 
                      ? "bg-red-100 text-red-700" 
                      : "bg-green-100 text-green-700"
                  }`}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span className={`px-2.5 py-1 rounded text-sm font-medium ${
                    product.status === "Low Stock" 
                      ? "bg-red-100 text-red-700" 
                      : "bg-green-100 text-green-700"
                  }`}>
                    {product.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductSummaryTable;
