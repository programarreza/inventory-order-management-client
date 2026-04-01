import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "@/components/form/RWForm";
import RWInput from "@/components/form/RWInput";
import CommonModal from "@/components/modals/CommonModal";
import { useCreateCategoryMutation } from "@/lib/Redux/features/catgeory/categoryApi";
import { createCategorySchema } from "@/schemas/inventory.schema";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const CreateCategoryModal = ({ isOpen, onClose }: CreateCategoryModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createCategory] = useCreateCategoryMutation();

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating category...");

    setIsLoading(true);

    try {
      const res = await createCategory(data).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        onClose?.();
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources?.[0]?.message || "Something went wrong",
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
      className="md:max-w-[600px]"
      title="Create Category"
      onClose={onClose}
    >
      <RWForm resolver={zodResolver(createCategorySchema)} onSubmit={onSubmit}>
        <div className="grid md:grid-cols-1 gap-3 p-4">
          <div className="py-1">
            <RWInput
              requiredSign
              label="Category Name"
              name="name"
              placeholder="Enter category name"
              type="text"
            />
          </div>
          <div className="py-1">
            <RWInput
              label="Description"
              name="description"
              placeholder="Enter category description"
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
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </RWForm>
    </CommonModal>
  );
};

export default CreateCategoryModal;
