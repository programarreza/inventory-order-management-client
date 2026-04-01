"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Key } from "react";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/types";

interface IProps extends IInput {
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RWSelectSearch = ({
  name,
  label,
  required = false,
  options,
  size = "md",
  variant = "bordered",
  onChange,
  disabled = false,
}: IProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selected = watch(name);

  const handleSelectionChange = (key: Key | null) => {
    if (key === null) {
      setValue(name, "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue(name, key.toString(), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    onChange?.(key?.toString() || "");
  };

  return (
    <Autocomplete
      errorMessage={errors[name]?.message as string}
      isDisabled={disabled}
      isInvalid={!!errors[name]}
      label={label}
      placeholder="Type to search..."
      required={required}
      selectedKey={selected || null} // single select
      size={size}
      variant={variant}
      onSelectionChange={handleSelectionChange}
    >
      {options?.map((opt) => (
        <AutocompleteItem key={opt.value}>
          {opt.label.toString()}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default RWSelectSearch;
