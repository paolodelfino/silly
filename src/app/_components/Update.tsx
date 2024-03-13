"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";

export default function Update() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Update is coming
        </ModalHeader>
        <ModalBody>
          Silly is getting updated, please stay tuned. Press 'X' to use the older version.
          <Spacer />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
