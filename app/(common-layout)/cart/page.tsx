"use client";

import Container from "@/components/Container";
import { removeFromCart, updateQuantity } from "@/lib/Redux/features/cart/cartSlice";
import { RootState } from "@/lib/Redux/store/store";
import { Button } from "@heroui/button";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
 
export default function CartPage() {
  const dispatch = useDispatch();
  const products = useSelector((store: RootState) => (store as any).cart.products);
  const { grandTotal, totalPrice, selectedItems } = useSelector((store: RootState) => (store as any).cart);

  if (!products?.length) {
    return (
      <div className="bg-[#F2F4F8] min-h-screen pt-20">
        <Container>
          <div className="bg-white rounded-xl p-10 flex flex-col justify-center items-center gap-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-600">There are no items in your cart</h2>
            <Link href="/products">
              <Button className="bg-primary text-white font-semibold py-2 px-6 rounded-lg text-lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F4F8] min-h-screen pt-10">
      <Container>
        <div className="flex gap-6 lg:gap-8 flex-col lg:flex-row justify-between">
          
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-[#272B35]">Shopping Cart</h2>
            {products.map((product: any) => (
              <div key={product._id} className="bg-white p-4 flex flex-col md:flex-row items-center justify-between shadow-sm rounded-lg border border-gray-100">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full text-xs text-gray-400 flex justify-center items-center">No Img</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#272B35] line-clamp-1">{product.name}</h3>
                    <p className="text-primary font-bold">৳ {product.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-3">
                    <Button 
                      size="sm" 
                      variant="bordered"
                      onPress={() => dispatch(updateQuantity({ id: product._id, type: "decrement" }))}
                    >
                      -
                    </Button>
                    <span className="font-semibold w-6 text-center">{product.quantity}</span>
                    <Button 
                      size="sm" 
                      variant="bordered"
                      isDisabled={product.quantity >= product.stock}
                      onPress={() => dispatch(updateQuantity({ id: product._id, type: "increment" }))}
                    >
                      +
                    </Button>
                  </div>
                  <div className="font-bold w-20 text-right">
                    ৳ {product.price * product.quantity}
                  </div>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    color="danger" 
                    variant="flat"
                    onPress={() => dispatch(removeFromCart({ id: product._id }))}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b text-[#272B35]">Order Summary</h2>
              
              <div className="space-y-3 text-gray-600 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span>Selected Items</span>
                  <span className="font-semibold">{selectedItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Price</span>
                  <span className="font-semibold">৳ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-bold text-[#272B35] mb-8">
                <span>Grand Total</span>
                <span className="text-primary">৳ {grandTotal.toFixed(2)}</span>
              </div>
              
              <Link href="/checkout" className="w-full">
                <Button className="w-full bg-primary text-white py-6 text-lg font-semibold rounded-lg shadow-md">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
