"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

import RWForm from "@/components/form/RWForm";
import RWInput from "@/components/form/RWInput";
import { useCreateUserMutation } from "@/lib/Redux/features/auth/authApi";
import { registerValidationSchema } from "@/schemas/register.schema";

const RegisterPage = () => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(true);
  const [createUser] = useCreateUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating account...");

    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        contactNo: data.contactNo,
      };

      const res = await createUser(userData).unwrap();

      if (res.success) {
        toast.success("Registration successful! Please login.", { id: toastId, duration: 2000 });
        router.push("/login");
      }
    } catch (error: any) {
      console.error({ error });
      toast.error(
        error?.data?.message || error?.data?.errorSources?.[0]?.message || "Registration failed",
        {
          id: toastId,
          duration: 2000,
        },
      );
    }
  };

  return (
    <div className="flex justify-center items-center py-10 min-h-screen bg-gray-50/50">
      <div className="lg:w-[600px] bg-white rounded-3xl shadow-2xl p-8 sm:p-12 mx-4 sm:mx-auto border border-gray-100">
        <div className="text-center pb-8">
          <h3 className="text-3xl font-black tracking-tight bg-gradient-to-br from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
            Join the Shop
          </h3>
          <p className="text-gray-500 mt-2 font-medium uppercase tracking-widest text-[10px]">
            Fastest Inventory Management
          </p>
        </div>

        <RWForm
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="space-y-5">
            <div className="py-0.5">
              <RWInput
                label="Full Name"
                name="name"
                placeholder="Enter your name"
                size="lg"
                type="text"
              />
            </div>

              <div className="py-0.5">
              <RWInput
                label="Email Address"
                name="email"
                placeholder="Ex. yourname@gmail.com"
                size="lg"
                type="email"
              />
            </div>

              <div className="py-0.5">
              <div className="relative">
                <RWInput
                  label="Password"
                  name="password"
                  placeholder="Min 6 characters"
                  size="lg"
                  type={isShow ? "password" : "text"}
                />
                <button
                  className="text-xl absolute cursor-pointer top-[18px] right-4 text-gray-400 hover:text-indigo-600 transition-colors"
                  type="button"
                  onClick={() => setIsShow(!isShow)}
                >
                  {isShow ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="py-0.5">
              <RWInput
                label="Contact Number"
                name="contactNo"
                placeholder="11-digit mobile number"
                size="lg"
                type="text"
              />
            </div>
          
          </div>

          <button
            className="w-full py-4 mt-10 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-bold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-gray-200 uppercase tracking-widest text-sm cursor-pointer"
            type="submit"
          >
            Create Account
          </button>
        </RWForm>

        <div className="mt-10 flex justify-center items-center gap-2 text-sm">
          <span className="text-gray-500">Already have an account?</span>
          <Link
            className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline"
            href="/login"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
