import Drawer from "@/app/_components/Drawer";
import { ReactNode } from "react";

export default function Menu({
  Trigger,
  Content,
}: {
  Trigger: ReactNode;
  Content: ReactNode;
}) {
  return (
    <Drawer
      Trigger={Trigger}
      vaulContentClassName="h-max p-4 min-h-[250px] !bg-background/90 after:backdrop-blur backdrop-blur border-t border-divider"
      Content={Content}
    />
  );
}
