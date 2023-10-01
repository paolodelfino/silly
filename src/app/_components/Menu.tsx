"use client";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";

export default function Menu({
  Trigger,
  Content,
}: {
  Trigger: (modal: ReturnType<typeof useDisclosure>) => ReactNode;
  Content: (modal: ReturnType<typeof useDisclosure>) => ReactNode;
}) {
  const modal = useDisclosure();
  const [isDragging, setIsDragging] = useState(false);
  const [yOnPointerDown, setYOnPointerDown] = useState<number | undefined>();
  const [yOnMove, setYOnPointerMove] = useState<number | undefined>();

  const stopDragging = () => {
    setIsDragging(false);
    setYOnPointerMove(undefined);
    setYOnPointerDown(undefined);
  };

  useEffect(() => {
    if (
      yOnMove != undefined &&
      yOnPointerDown != undefined &&
      yOnMove < yOnPointerDown
    ) {
      stopDragging();
    }
  }, [yOnMove, yOnPointerDown]);

  return (
    <>
      {Trigger(modal)}
      <Modal
        isOpen={modal.isOpen}
        onOpenChange={modal.onOpenChange}
        classNames={{
          wrapper: "!items-end",
        }}
      >
        <ModalContent
          onPointerDown={(e) => {
            if (e.target != e.currentTarget) return;

            const shiftY =
              e.clientY - e.currentTarget.getBoundingClientRect().top;
            setYOnPointerDown(shiftY);

            setIsDragging(true);

            document.onpointerup = () => {
              stopDragging();
              document.onpointerup = null;
            };
          }}
          onPointerUp={(e) => {
            stopDragging();
          }}
          onPointerMove={(e) => {
            if (isDragging) {
              const shiftY =
                e.clientY - e.currentTarget.getBoundingClientRect().top;
              setYOnPointerMove(shiftY);

              if ((shiftY / e.currentTarget.clientHeight) * 100 > 25) {
                modal.onClose();
              }
            }
          }}
          className="relative !m-0 h-max max-h-[96%] min-h-[250px] !w-full !max-w-full rounded-b-none border-t border-divider !bg-background/90 p-4 backdrop-blur after:absolute after:left-0 after:right-0 after:top-full after:h-[calc(100vh+100%)] after:w-screen after:bg-inherit after:backdrop-blur"
        >
          {Content(modal)}
        </ModalContent>
      </Modal>
    </>
  );
}
