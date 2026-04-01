import { Button } from "@heroui/button";

import { cn } from "@/utils/utils";

const CommonModal = ({
  title,
  onClose,
  children,
  className,
}: {
  title: string;
  onClose?: () => void;
  children: any;
  className?: string;
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={cn(
          "bg-white rounded-lg w-full max-w-[400px] md:max-w-[800px] flex flex-col",
          className,
        )}
      >
        <div className="p-4 border-gray-200 border-b flex justify-between items-center">
          <h2 className=" xl:text-xl font-semibold">{title}</h2>
          <Button
            isIconOnly
            className="border border-gray-200"
            variant="light"
            onPress={onClose}
          >
            ✕
          </Button>
        </div>
        <div className=" overflow-auto">
          <div className="">
            <div className="flex flex-col md:flex-row rounded-xl justify-between ">
              <div className="w-full bg-white rounded-xl mx-auto ">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
