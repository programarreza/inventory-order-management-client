"use client ";

import { Input } from "@heroui/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/types";

interface IProps extends IInput {
  defaultValue?: string;
}

const RWInput = ({
  variant = "bordered",
  disabled = false,
  size = "lg",
  required = false,
  requiredSign = false,
  type = "text",
  label,
  placeholder,
  name,
  defaultValue = "",
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="relative">
      <label
        className="text-xs absolute -top-2 left-2 z-10 bg-white px-1"
        htmlFor={name}
      >
        {label} {requiredSign && <span className="text-red-500">*</span>}
      </label>
      <Input
        {...register(name)}
        defaultValue={defaultValue}
        disabled={disabled}
        errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
        placeholder={placeholder}
        radius="sm"
        required={required}
        size={size}
        type={type}
        variant={variant}
        isInvalid={!!errors[name]}
        // label={label}
        name={name}
      />
    </div>
  );
};

export default RWInput;
