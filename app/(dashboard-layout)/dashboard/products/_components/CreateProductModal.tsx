import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "@/components/form/RWForm";
import RWInput from "@/components/form/RWInput";
import RWSelectSearch from "@/components/form/RWSelectSearch";
import CommonModal from "@/components/modals/CommonModal";
import { useGetCategoriesQuery } from "@/lib/Redux/features/catgeory/categoryApi";
import { useCreateProductMutation } from "@/lib/Redux/features/product/productApi";
import { createProductSchema } from "@/schemas/inventory.schema";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const CreateProductModal = ({ isOpen, onClose }: CreateProductModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery("");

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating product...");

    setIsLoading(true);

    try {
      const jsonData = {
        name: data.name,
        categoryId: data.categoryId,
        price: Number(data.price),
        stock: Number(data.stock),
        minStock: Number(data.minStock),
      };

      const formData = new FormData();

      formData.append("data", JSON.stringify(jsonData));

      if (data.image) {
        formData.append("image", data.image);
      }

      const res = await createProduct(formData).unwrap();

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
      title="Create Product"
      onClose={onClose}
    >
      <RWForm resolver={zodResolver(createProductSchema)} onSubmit={onSubmit}>
        <div className="grid md:grid-cols-2 gap-3 p-4">
          <div className="py-1">
            <RWInput
              requiredSign
              label="Product Name"
              name="name"
              placeholder="Enter product name"
              type="text"
            />
          </div>
          <div className="py-1">
            <RWSelectSearch
              requiredSign
              disabled={categoryLoading}
              label="Select Category"
              name="categoryId"
              options={categoryData?.data?.map((option: any) => ({
                value: option._id,
                label: option.name,
              }))}
              placeholder="Select category"
            />
          </div>
          <div className="py-1">
            <RWInput
              requiredSign
              label="Price"
              name="price"
              placeholder="Enter price"
              type="number"
            />
          </div>
          <div className="py-1">
            <RWInput
              requiredSign
              label="Stock"
              name="stock"
              placeholder="Enter stock quantity"
              type="number"
            />
          </div>
          <div className="py-1">
            <RWInput
              requiredSign
              label="Minimum Stock"
              name="minStock"
              placeholder="Enter minimum stock"
              type="number"
            />
          </div>
          <div className="py-1 cursor-pointer">
            <Controller
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  type="file"
                  value={value?.fileName}
                  {...field}
                  className=" bg-none bg-transparent cursor-pointer w-full border border-dashed "
                  label="Select product image (optional)"
                  radius="none"
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              )}
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

export default CreateProductModal;
