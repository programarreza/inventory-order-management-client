"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUserAlt, FaUserEdit, FaUserShield } from "react-icons/fa";
import { toast } from "sonner";

import RWForm from "@/components/form/RWForm";
import RWInput from "@/components/form/RWInput";
import { useLoginMutation } from "@/lib/Redux/features/auth/authApi";
import { setUser } from "@/lib/Redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/Redux/hooks";
import { loginValidationSchema } from "@/schemas/login.schema";
import { TUser } from "@/types/index";
import { setCookie } from "@/utils/cookiesUtils";
import { verifyToken } from "@/utils/verifyToken";

const LoginPage = () => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(true);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Logging in");

    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userData).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser;

      if (res.success) {
        setCookie("accessToken", res?.data?.accessToken, { maxAge: 3600 });
        dispatch(setUser({ user: user, token: res?.data?.accessToken }));

        router.push(from);
        toast.success("Logged in", { id: toastId, duration: 1000 });
      }
    } catch (error: any) {
      console.error({ error });
      toast.error(
        error?.data?.errorSources?.[0]?.message || "Something went wrong",
        {
          id: toastId,
          duration: 1000,
        },
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50/50">
      <div className="lg:w-[600px] bg-white rounded-2xl shadow-2xl p-12 mx-4 sm:mx-auto border border-gray-100">
        <div className="text-center pb-8">
          <h3 className="text-3xl font-black tracking-tight bg-gradient-to-br from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
            Welcome Back
          </h3>
          <p className="text-gray-500 mt-2 font-medium uppercase tracking-widest text-xs">
            Quick fill for testing:
          </p>
        </div>

        <RWForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
          <QuickLoginButtons />

          <div className="space-y-6">
            <div className="py-1">
              <RWInput
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                size="lg"
                type="email"
              />
            </div>
            <div className="py-1">
              <div className="relative">
                <RWInput
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
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
          </div>

          <button
            className="w-full py-4 mt-8 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-gray-200"
            type="submit"
          >
            Sign In
          </button>
        </RWForm>

        <div className="mt-8 flex justify-between items-center text-sm">
          <Link
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
            href="/register"
          >
            Create account
          </Link>
          <Link
            className="text-gray-400 hover:text-gray-600 font-medium hover:underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const QuickLoginButtons = () => {
  const { setValue } = useFormContext();

  const handleQuickLogin = (email: string) => {
    setValue("email", email, { shouldValidate: true, shouldDirty: true });
    setValue("password", "12345678", { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6 justify-center">
      <button
        type="button"
        onClick={() => handleQuickLogin("admin@gmail.com")}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all shadow-md hover:shadow-lg"
      >
        <FaUserShield /> Admin
      </button>
      <button
        type="button"
        onClick={() => handleQuickLogin("manager@gmail.com")}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-all shadow-md hover:shadow-lg"
      >
        <FaUserEdit /> Manager
      </button>
      <button
        type="button"
        onClick={() => handleQuickLogin("user@gmail.com")}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md hover:shadow-lg"
      >
        <FaUserAlt /> User
      </button>
    </div>
  );
};
