"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";

export default function Update() {
  return (
    <Modal isOpen hideCloseButton>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Update is coming
        </ModalHeader>
        <ModalBody>
          Silly is getting updated, please stay tuned.
          <Spacer />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
