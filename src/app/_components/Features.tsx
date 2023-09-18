"use client";
import { RainbowSvg } from "@/app/_components/RainbowSvg";
import { Save } from "@/app/_components/illustrations/Save";
import { Button, Spacer, Tooltip, cn } from "@nextui-org/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Drawer } from "vaul";

export default function Features() {
  const [snap, setSnap] = useState<number | string | null>(0.8);

  return (
    <Drawer.Root
      experimentalSafariThemeAnimation
      shouldScaleBackground
      snapPoints={[0.8, 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Tooltip showArrow defaultOpen content="See features" placement="bottom">
        <Drawer.Trigger asChild>
          <Button variant="light" size="sm" isIconOnly radius="full">
            <RainbowSvg>
              <path
                d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"
                fill="white"
              ></path>
            </RainbowSvg>
          </Button>
        </Drawer.Trigger>
      </Tooltip>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mx-[-1px] flex h-full max-h-[97%] flex-col rounded-t-large bg-content1 text-content1-foreground outline-none">
          <div
            className={cn("relative mx-auto w-full max-w-md pb-4", {
              "overflow-y-auto": snap === 1,
              "overflow-hidden": snap !== 1,
            })}
          >
            <Drawer.Close asChild>
              <Button
                className="absolute right-1 top-1 z-10 bg-default/10"
                isIconOnly
                radius="full"
                size="sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>
              </Button>
            </Drawer.Close>

            <Swiper
              grabCursor
              pagination={{
                dynamicBullets: true,
              }}
              keyboard={{
                enabled: true,
              }}
              mousewheel={true}
              modules={[Pagination, Keyboard, Mousewheel]}
              className="[&_.swiper-pagination-bullet-active-next-next]:bg-slate-400 [&_.swiper-pagination-bullet-active-next]:bg-slate-400 [&_.swiper-pagination-bullet-active-prev-prev]:bg-slate-400 [&_.swiper-pagination-bullet-active-prev]:bg-slate-400 [&_.swiper-pagination]:static [&_.swiper-pagination]:mx-auto [&_.swiper-pagination]:!translate-x-0 [&_.swiper-pagination]:pt-8"
            >
              <SwiperSlide className="w-full">
                <div className="flex flex-col">
                  <Save />
                  <h1 className="-mt-4 text-center text-large font-semibold">
                    Track Movies and TV Shows
                  </h1>

                  <Spacer y={8} />

                  <div className="flex gap-2 px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="shrink-0"
                    >
                      <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path>
                    </svg>

                    <div>
                      <h2 className="text-medium font-semibold">Mylist</h2>
                      <p className="text-small text-slate-400">
                        Save movies and tv shows in a list.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
