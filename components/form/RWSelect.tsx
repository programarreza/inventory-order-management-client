"use client ";

import { Select, SelectItem } from "@heroui/select";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/types";

interface IProps extends IInput {
  options: { value: string; label: string }[];
  defaultValue?: string;
  selectionMode?: string | undefined;
}

const RWSelect = ({
  variant = "bordered",
  size = "md",
  required = false,
  label,
  name,
  options,
  defaultValue = "",
  selectionMode = "single",
}: IProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValue = watch(name) || defaultValue;

  const handleSelectionChange = (keys: any) => {
    if (selectionMode === "multiple") {
      // For multiple selection, convert Set to comma-separated string
      const selectedKeys = Array.from(keys);

      setValue(name, selectedKeys.join(","));
    } else {
      // For single selection, get the first (and only) value
      const selectedKey = Array.from(keys)[0];

      setValue(name, selectedKey);
    }
  };

  return (
    <Select
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      selectedKeys={
        selectionMode === "multiple"
          ? new Set(selectedValue.split(",").filter(Boolean))
          : new Set([selectedValue])
      }
      selectionMode={selectionMode as any}
      size={size}
      variant={variant}
      onSelectionChange={handleSelectionChange}
    >
      {options?.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default RWSelect;
