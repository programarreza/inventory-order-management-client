"use client";

import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { Button } from "@heroui/button";
import { addToCart } from "@/lib/Redux/features/cart/cartSlice";
import { useGetSingleProductQuery } from "@/lib/Redux/features/product/productApi";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function SingleProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, isLoading } = useGetSingleProductQuery(id);
  const product = data?.data;

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
    toast.success("Added to cart successfully!", { duration: 2000 });
  };

  if (isLoading) return <Loading />;
  
  if (!product) return (
    <div className="bg-[#F2F4F8] min-h-screen pt-4 md:pt-20 flex justify-center mt-20">
      <h2 className="text-2xl text-gray-500">Product not found.</h2>
    </div>
  );

  return (
    <div className="bg-[#F2F4F8] min-h-screen pt-4 md:pt-20">
      <Container>
        <div className="flex gap-4 lg:gap-12 xl:gap-24 flex-col md:flex-row bg-white p-6 rounded-xl shadow-sm">
          {/* product image area */}
          <div className="flex-1">
            {product?.image ? (
              <img
                className="w-full h-auto object-cover rounded-lg"
                src={product?.image}
                alt={product?.name}
              />
            ) : (
                <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No Image Available</span>
                </div>
            )}
          </div>

          {/* product content area */}
          <div className="flex-1 space-y-4 py-4">
            <h2 className="text-3xl font-bold text-[#272B35]">{product?.name}</h2>
            <p className="text-medium text-gray-600">{product?.description || "No description provided."}</p>
            
            <h3 className="text-lg">
              <span className="text-gray-500 font-medium">Category: </span>
              {product?.categoryId?.name || "Uncategorized"}
            </h3>

            <h3 className="flex gap-2 text-lg items-center">
              <span className="text-gray-500 font-medium">Stock:</span>
              {product?.stock > 0 ? (
                <span className="text-green-600 font-semibold">{product?.stock} available</span>
              ) : (
                <span className="text-red-500 font-semibold">Out of stock</span>
              )}
            </h3>

            <div className="flex items-center text-4xl font-bold text-primary py-4">
              <p>৳ {product?.price}</p>
            </div>

            {product?.stock > 0 ? (
              <Button
                onPress={() => handleAddToCart(product)}
                className="bg-primary text-white font-semibold py-6 px-10 rounded-lg shadow-md w-full md:w-auto text-lg"
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                isDisabled
                className="bg-gray-300 text-gray-500 font-semibold py-6 px-10 rounded-lg w-full md:w-auto text-lg"
              >
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
