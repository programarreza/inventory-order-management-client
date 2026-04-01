import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { ReactNode } from "react";

interface IProps {
  buttonText: string;
  btnSize?: "sm" | "md" | "lg";
  title?: string;
  children: ReactNode | ((props: { onClose: () => void }) => ReactNode);
  buttonVariant?:
    | "light"
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  buttonClassName?: string;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "5xl"
    | "xs"
    | "3xl"
    | "4xl"
    | "full"
    | undefined;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  isClosedBtn?: boolean;
  childrenClassName?: string;
}

export default function RWModal({
  buttonText,
  btnSize = "md",
  title,
  children,
  buttonVariant = "light",
  buttonClassName,
  size,
  isOpen: controlledIsOpen,
  onOpen: controlledOnOpen,
  onClose: controlledOnClose,
  isClosedBtn = true,
  childrenClassName,
}: IProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const modalIsOpen = controlledIsOpen ?? isOpen;
  const handleOpen = controlledOnOpen ?? onOpen;
  const handleClose = controlledOnClose ?? onClose;

  return (
    <>
      {isClosedBtn && (
        <Button
          size={btnSize}
          className={`${buttonClassName}`}
          variant={buttonVariant}
          onPress={handleOpen}
        >
          {buttonText}
        </Button>
      )}
      <Modal
        size={size}
        isOpen={modalIsOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row items-center justify-between">
                <div>{title}</div>
                <button
                  onClick={handleClose}
                  className="size-8 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer transition-colors text-primary hover:bg-[#F9F9FC] text-xl"
                  aria-label="Close"
                >
                  ×
                </button>
              </ModalHeader>
              <ModalBody className={`pb-12 ${childrenClassName}`}>
                {typeof children === "function"
                  ? children({ onClose: handleClose })
                  : children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
