import { cn } from "@nextui-org/react";
import { ReactNode } from "react";
import { Drawer as VaulDrawer } from "vaul";

export default function Drawer({
  Trigger,
  Content,
  vaulContentClassName,
}: {
  Trigger: (params: { Vaul: typeof VaulDrawer }) => ReactNode;
  Content: (params: { Vaul: typeof VaulDrawer }) => ReactNode;
  vaulContentClassName?: string;
}) {
  return (
    <VaulDrawer.Root>
      {Trigger({ Vaul: VaulDrawer })}
      <VaulDrawer.Overlay className="fixed inset-0 bg-background/40" />
      <VaulDrawer.Portal>
        <VaulDrawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-[100] mx-[-1px] flex max-h-[97%] flex-col rounded-t-large bg-content1 text-content1-foreground outline-none",
            vaulContentClassName,
          )}
        >
          {Content({ Vaul: VaulDrawer })}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
