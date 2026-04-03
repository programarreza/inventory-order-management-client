"use client";

import Container from "@/components/Container";
import RWForm from "@/components/form/RWForm";
import RWInput from "@/components/form/RWInput";
import useLoggedUser from "@/hooks/auth.hook";
import { clearCart } from "@/lib/Redux/features/cart/cartSlice";
import { useAddOrderMutation } from "@/lib/Redux/features/order/orderApi";
import { RootState } from "@/lib/Redux/store/store";
import { checkoutSchema } from "@/schemas/inventory.schema";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { ImSpinner6 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [createOrder, { isSuccess, isLoading }] = useAddOrderMutation();

  const user = useLoggedUser();
  console.log({user})

  const { grandTotal, totalPrice, selectedItems, products } = useSelector(
    (store: RootState) => (store as any).cart
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (products.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      customerName: data.name,
      items: products.map((p: any) => ({
        productId: p._id,
        quantity: p.quantity,
      })),
    };

    try {
      const res = await createOrder(orderData).unwrap();
      if (res?.success) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        if(user?.role === "user"){
          router.push("/dashboard/user-orders");
        }else{
          router.push("/");
        }
      }
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to place order.");
    }
  };

  if (!products?.length) {
    return (
      <div className="bg-[#F2F4F8] min-h-screen pt-20">
        <Container>
          <div className="bg-white rounded-xl p-10 flex flex-col justify-center text-center items-center gap-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty. Please add items to checkout.</h2>
            <Button onPress={() => router.push("/products")} className="bg-primary text-white font-semibold py-2 px-6 rounded-lg text-lg">
              Go to Products
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F4F8] min-h-screen pt-24 pb-20">
      <Container>
        <RWForm resolver={zodResolver(checkoutSchema)} onSubmit={onSubmit}>
        <div className="flex gap-6 lg:gap-8 flex-col-reverse lg:flex-row justify-between">
          
          {/* Customer Info Form */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-[#272B35]">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <RWInput
                    requiredSign
                    label="Full Name"
                    name="name"
                    placeholder="name"
                    type="text"
                  />
                </div>
                <div>
                  <RWInput
                    label="Email Address (Optional)"
                    name="email"
                    placeholder="john@example.com"
                    type="email"
                  />
                </div>
                <div>
                  <RWInput
                    requiredSign
                    label="Phone Number"
                    name="number"
                    placeholder="+8801XXXXXXX"
                    type="text"
                  />
                </div>
                <div>
                  <RWInput
                    requiredSign
                    label="Shipping Address"
                    name="address"
                    placeholder="House, Street, City"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
               <h2 className="text-2xl font-bold mb-6 text-[#272B35]">Payment Method</h2>
               <div className="p-4 border rounded-lg bg-gray-50 flex items-center gap-3 w-fit pr-10">
                 <input type="radio" checked readOnly id="cod" className="w-4 h-4 text-primary" />
                 <label htmlFor="cod" className="font-semibold text-gray-700">Cash on delivery (COD)</label>
               </div>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b text-[#272B35]">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {products.map((item: any) => (
                   <div key={item._id} className="flex justify-between items-center text-sm gap-4">
                     <span className="truncate text-gray-600">{item.name} <span className="font-bold text-gray-800">x{item.quantity}</span></span>
                     <span className="font-semibold flex-shrink-0">৳ {item.price * item.quantity}</span>
                   </div>
                ))}
              </div>

              <div className="space-y-3 text-gray-600 mb-6 border-y py-6">
                <div className="flex justify-between">
                  <span>Selected Items</span>
                  <span className="font-semibold">{selectedItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">৳ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-bold text-[#272B35] mb-8">
                <span>Total</span>
                <span className="text-primary">৳ {grandTotal.toFixed(2)}</span>
              </div>
              
              <Button type="submit" isDisabled={isLoading} className="w-full bg-primary text-white py-6 text-lg font-semibold rounded-lg shadow-md">
                {isLoading ? <ImSpinner6 className="animate-spin" size={24} /> : "Place Order"}
              </Button>
            </div>
          </div>

        </div>
        </RWForm>
      </Container>
    </div>
  );
}
