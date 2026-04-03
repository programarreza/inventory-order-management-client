import { Button } from "@heroui/button";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "@/components/form/RWForm";
import RWInput from "@/components/form/RWInput";
import CommonModal from "@/components/modals/CommonModal";
import { useUpdateRestockMutation } from "@/lib/Redux/features/restock/restockApi";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface UpdateRestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

const updateRestockValidationSchema = z.object({
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Quantity must be a valid non-negative number",
    }),
});


const UpdateRestockModal = ({
  isOpen,
  onClose,
  productId,
  productName,
}: UpdateRestockModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateRestock] = useUpdateRestockMutation();

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating restock...");

    setIsLoading(true);

    try {
      const payload = {
        productId,
        quantity: Number(data.quantity),
      };

      const res = await updateRestock(payload).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Restock updated successfully", {
          id: toastId,
          duration: 3000,
        });
        onClose();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong",
        {
          id: toastId,
          duration: 3000,
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonModal
      className="md:max-w-[400px]"
      title={`Restock: ${productName}`}
      onClose={onClose}
    >
      <RWForm resolver={zodResolver(updateRestockValidationSchema)} onSubmit={onSubmit}>
        <div className="p-4">
          <div className="py-1">
            <RWInput
              requiredSign
              label="Quantity to Add"
              name="quantity"
              placeholder="Enter restock quantity"
              type="text"
            />
          </div>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200">
          <Button
            className="bg-primary text-white"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Updating..." : "Update Stock"}
          </Button>
        </div>
      </RWForm>
    </CommonModal>
  );
};

export default UpdateRestockModal;
