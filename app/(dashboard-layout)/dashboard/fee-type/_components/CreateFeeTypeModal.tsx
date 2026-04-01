import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "@/components/form/RWForm";
import RWInput from "@/components/form/RWInput";
import RWSelectSearch from "@/components/form/RWSelectSearch";
import CommonModal from "@/components/modals/CommonModal";
import { useCreateFeeTypMutation } from "@/lib/Redux/features/finance/feeType/feeTypeApi";
import { createFeeTypeSchema } from "@/schemas/finance.schema";
import { feeTypeOptions } from "@/utils/constant";

interface CreateFeeTypeModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const CreateFeeTypeModal = ({ isOpen, onClose }: CreateFeeTypeModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createFeeType] = useCreateFeeTypMutation();

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating fee type...");

    setIsLoading(true);

    try {
      const jsonData = {
        feeName: data.feeName,
        feeType: data.feeType,
      };

      const res = await createFeeType(jsonData).unwrap();

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
      title="Create Fee Type"
      onClose={onClose}
    >
      <RWForm resolver={zodResolver(createFeeTypeSchema)} onSubmit={onSubmit}>
        <div className="grid md:grid-cols-2 gap-3 p-4">
          <div className="py-1">
            <RWInput
              requiredSign
              label="Fee Name"
              name="feeName"
              placeholder="Enter fee name"
              type="text"
            />
          </div>
          <div className="">
            <RWSelectSearch
              requiredSign
              label="Select Fee Type"
              name="feeType"
              options={feeTypeOptions.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
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

export default CreateFeeTypeModal;
