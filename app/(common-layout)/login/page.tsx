"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
    <div className="flex justify-center items-center h-screen">
      <div className="lg:w-[600px] bg-white rounded-xl p-12 mx-auto">
        <div className="text-center py-8 text-2xl font-semibold">
          <h3>Welcome Back</h3>
          <p className="text-medium">Please login now</p>
        </div>
        <RWForm
          resolver={zodResolver(loginValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="space-y-4">
            <div className="py-1">
              <RWInput
                label="Email"
                name="email"
                placeholder="Email"
                size="lg"
                type="email"
              />
            </div>
            <div className="py-1">
              <div className="relative">
                <RWInput
                  defaultValue="12345678"
                  label="Password"
                  name="password"
                  placeholder="Password"
                  size="lg"
                  type={isShow ? "password" : "text"}
                />
                <button
                  className="text-xl absolute cursor-pointer -mt-10  right-4"
                  type="button"
                  onClick={() => setIsShow(!isShow)}
                >
                  {isShow ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
                </button>
              </div>
            </div>
          </div>

          <button
            className="w-full py-3 my-4 px-6 border rounded-lg border-gray-400 hover:bg-gray-200 font-semibold font-barlow text-gray-900 cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </RWForm>
        <div className="flex justify-end">
          <Link
            className="text-blue-500 w-fit text-sm font-medium underline"
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
