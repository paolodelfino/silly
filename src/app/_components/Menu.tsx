import Drawer from "@/app/_components/Drawer";
import { ReactNode } from "react";
import { Drawer as VaulDrawer } from "vaul";

export default function Menu({
  Trigger,
  Content,
}: {
  Trigger: (Vaul: typeof VaulDrawer) => ReactNode;
  Content: (Vaul: typeof VaulDrawer) => ReactNode;
}) {
  return (
    <Drawer
      Trigger={({ Vaul }) => Trigger(Vaul)}
      Content={({ Vaul }) => Content(Vaul)}
      vaulContentClassName="h-max max-h-[96%] min-h-[250px] border-t border-divider !bg-background/90 p-4 backdrop-blur"
    />
  );
}
