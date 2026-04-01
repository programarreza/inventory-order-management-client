import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TUserStatus = {
  status: "ACTIVE" | "BLOCKED";
};

export type TUserRole = {
  role: "ADMIN" | "MANAGER" | "USER";
};

export type TUser = {
  email: string;
  status: TUserStatus;
  role: TUserRole;
  iat: number;
  exp: number;
};

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  status: string;
  image?: string;
  contactNo: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInput {
  variant?: "bordered" | "flat" | "faded" | "underlined";
  size?: "md" | "sm" | "lg";
  required?: boolean;
  requiredSign?: boolean;
  type?: "text" | "email" | "password" | "number" | "date" | "file";
  label?: ReactNode;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TSearchParams = {
  searchParams: Record<string, string>;
};
