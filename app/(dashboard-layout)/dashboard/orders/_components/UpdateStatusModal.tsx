import { Button } from "@heroui/button";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import RWForm from "@/components/form/RWForm";
import RWSelectSearch from "@/components/form/RWSelectSearch";
import CommonModal from "@/components/modals/CommonModal";
import { useUpdateOrderStatusMutation } from "@/lib/Redux/features/order/orderApi";

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  currentStatus: string;
}

const statusOptions = [
  { label: "Confirmed", value: "Confirmed" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

const UpdateStatusModal = ({
  isOpen,
  onClose,
  orderId,
  currentStatus,
}: UpdateStatusModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating status...");

    setIsLoading(true);

    try {
      const res = await updateOrderStatus({
        orderId,
        status: data.status,
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Status updated successfully", {
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
      title="Update Order Status"
      onClose={onClose}
    >
      <RWForm
        defaultValues={{ status: currentStatus }}
        onSubmit={onSubmit}
      >
        <div className="p-4">
          <div className="py-1">
            <RWSelectSearch
              requiredSign
              label="Select Status"
              name="status"
              options={statusOptions}
              placeholder="Select status"
            />
          </div>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200">
          <Button
            className="bg-primary text-white"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Updating..." : "Update Status"}
          </Button>
        </div>
      </RWForm>
    </CommonModal>
  );
};

export default UpdateStatusModal;
