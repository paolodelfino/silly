import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { ReactNode } from "react";

export default function Menu({
  Trigger,
  Content,
}: {
  Trigger: (modal: ReturnType<typeof useDisclosure>) => ReactNode;
  Content: (modal: ReturnType<typeof useDisclosure>) => ReactNode;
}) {
  const modal = useDisclosure();

  return (
    <>
      {Trigger(modal)}
      <Modal
        isOpen={modal.isOpen}
        onOpenChange={modal.onOpenChange}
        classNames={{
          wrapper: "!items-end",
        }}
        scrollBehavior="outside"
      >
        <ModalContent className="!m-0 h-max max-h-[96%] min-h-[250px] !w-full !max-w-full rounded-b-none border-t border-divider !bg-background/90 p-4 backdrop-blur after:backdrop-blur">
          {Content(modal)}
        </ModalContent>
      </Modal>
    </>
  );
}
