"use client";
import Menu from "@/app/_components/Menu";
import { useBrowserInfo } from "@/app/_stores/browser-info";
import { useHotkeys, useScrollIntoView, useWindowScroll } from "@mantine/hooks";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  ListboxSection,
  Skeleton,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function TopNav() {
  const { data, status } = useSession();
  const { userAgent } = useBrowserInfo();

  const [{ y }] = useWindowScroll();
  const { scrollIntoView } = useScrollIntoView({
    easing(t) {
      return 1 - Math.pow(1 - t, 4);
    },
  });

  const [actionsOpen, setActionsOpen] = useState(false);
  const menuActions: Record<string, VoidFunction> = {
    "scroll-to-top": scrollIntoView,
  };
  useHotkeys([["ctrl+i", () => setActionsOpen(!actionsOpen)]]);

  return (
    <div className="sticky top-0 z-20 flex justify-between border-b border-divider bg-background/90 px-4 py-3 backdrop-blur">
      {status == "loading" && (
        <Skeleton className="h-10 w-10 rounded-full !bg-default-200"></Skeleton>
      )}

      {status == "unauthenticated" && (
        <Button variant="faded" onPress={() => signIn()}>
          Log in
        </Button>
      )}

      {status == "authenticated" && (
        <Dropdown placement="top-end">
          <DropdownTrigger>
            <Avatar
              as={"button"}
              isBordered
              src={data.user?.image ?? undefined}
              showFallback
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">{data.user?.name}</p>
              <p className="text-tiny text-slate-400">{data.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}

      <div className="flex">
        {userAgent?.device.type == "mobile" ? (
          <Menu
            Trigger={({ onOpen }) => (
              <Button onPress={onOpen} isIconOnly radius="full" variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
                </svg>
              </Button>
            )}
            Content={({ onClose }) => (
              <Listbox
                aria-label="Actions"
                variant="flat"
                disabledKeys={[
                  "settings",
                  "shortcuts",
                  y == 0 ? "scroll-to-top" : "",
                ]}
                onAction={(key) => {
                  menuActions[key.toString()]();
                  onClose();
                }}
              >
                <ListboxSection showDivider>
                  <ListboxItem
                    key="settings"
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                      >
                        <path d="M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v160q0 33-23.5 56.5T360-520H200Zm0 400q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h160q33 0 56.5 23.5T440-360v160q0 33-23.5 56.5T360-120H200Zm400-400q-33 0-56.5-23.5T520-600v-160q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H600Zm0 400q-33 0-56.5-23.5T520-200v-160q0-33 23.5-56.5T600-440h160q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H600Z" />
                      </svg>
                    }
                  >
                    Settings
                  </ListboxItem>
                </ListboxSection>
                <ListboxSection title={"Miscellaneous"}>
                  <ListboxItem
                    key="scroll-to-top"
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                      >
                        <path d="M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v160q0 33-23.5 56.5T360-520H200Zm0 400q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h160q33 0 56.5 23.5T440-360v160q0 33-23.5 56.5T360-120H200Zm400-400q-33 0-56.5-23.5T520-600v-160q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H600Zm0 400q-33 0-56.5-23.5T520-200v-160q0-33 23.5-56.5T600-440h160q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H600Z" />
                      </svg>
                    }
                  >
                    Scroll To Top
                  </ListboxItem>
                </ListboxSection>
              </Listbox>
            )}
          />
        ) : (
          <Dropdown
            placement="top-end"
            isOpen={actionsOpen}
            onOpenChange={setActionsOpen}
          >
            <DropdownTrigger>
              <Button isIconOnly radius="full" variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
                </svg>
              </Button>
            </DropdownTrigger>
            <div className="[&>div]:-mt-[47px]">
              <DropdownMenu
                aria-label="Actions"
                variant="flat"
                disabledKeys={[
                  "settings",
                  "shortcuts",
                  y == 0 ? "scroll-to-top" : "",
                ]}
                onAction={(key) => menuActions[key.toString()]()}
              >
                <DropdownSection showDivider>
                  <DropdownItem
                    key={"shortcuts"}
                    shortcut="^H"
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                      >
                        <path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                      </svg>
                    }
                  >
                    Shortcuts Help
                  </DropdownItem>
                  <DropdownItem
                    key="settings"
                    shortcut="^S"
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                      >
                        <path d="M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v160q0 33-23.5 56.5T360-520H200Zm0 400q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h160q33 0 56.5 23.5T440-360v160q0 33-23.5 56.5T360-120H200Zm400-400q-33 0-56.5-23.5T520-600v-160q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H600Zm0 400q-33 0-56.5-23.5T520-200v-160q0-33 23.5-56.5T600-440h160q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H600Z" />
                      </svg>
                    }
                  >
                    Settings
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title={"Miscellaneous"}>
                  <DropdownItem
                    key="scroll-to-top"
                    startContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="currentColor"
                      >
                        <path d="M200-520q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v160q0 33-23.5 56.5T360-520H200Zm0 400q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h160q33 0 56.5 23.5T440-360v160q0 33-23.5 56.5T360-120H200Zm400-400q-33 0-56.5-23.5T520-600v-160q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H600Zm0 400q-33 0-56.5-23.5T520-200v-160q0-33 23.5-56.5T600-440h160q33 0 56.5 23.5T840-360v160q0 33-23.5 56.5T760-120H600Z" />
                      </svg>
                    }
                  >
                    Scroll To Top
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
