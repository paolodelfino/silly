"use client";
import { Button, Text } from "@radix-ui/themes";
import { Drawer } from "vaul";

export default function () {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button>open</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 " />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="mx-auto mt-4 w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
          <Text>hallo</Text>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
