"use client";

import Link from "next/link";
import { useGetProductsQuery } from "@/lib/Redux/features/product/productApi";
import Loading from "@/components/Loading";
import Container from "@/components/Container";

export default function HomePage() {
  const { data, isLoading } = useGetProductsQuery("");
  const products = data?.data || [];

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#F2F4F8] min-h-screen py-10">
      <Container>
        <div className="bg-white p-8 rounded-lg mb-8 shadow-sm text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#272B35]">Welcome to Our Store</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of premium products. Quality meets affordability.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No products available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <Link 
                href={`/products/${product._id}`} 
                key={product._id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
              >
                <div className="h-48 bg-gray-100 w-full overflow-hidden flex-shrink-0">
                  {product.image ? (
                    <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg line-clamp-1" title={product.name}>{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-auto line-clamp-1">{product.categoryId?.name || "Uncategorized"}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold text-primary">৳{product.price}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
