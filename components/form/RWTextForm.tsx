"use client ";

import { IInput } from "@/types";
import { Textarea } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";

interface IProps extends IInput {}

const RWTextArea = ({ name, label, variant = "bordered" }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={3}
      variant={variant}
      value={currentValue || ""}
    />
  );
};

export default RWTextArea;
