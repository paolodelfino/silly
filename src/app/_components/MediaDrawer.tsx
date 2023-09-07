"use client";
import MediaDisplay from "@/app/_components/MediaDisplay";
import SimpleLoading from "@/app/_components/SimpleLoading";
import { useMediaDrawer } from "@/app/_stores/media-drawer";
import { useMobileDetector } from "@/app/_stores/mobile-detector";
import { MovieDetailsOutput, TvShowDetailsOutput } from "@/app/_trpc/types";
import { getMovieDetails } from "@/server/actions";
import { Dialog, Flex, IconButton } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

export default function MediaDrawer() {
  const isMobile = useMobileDetector((state) => state.isMobile);
  const { id, type, show, setShow } = useMediaDrawer();

  const [data, setData] = useState<
    MovieDetailsOutput | TvShowDetailsOutput | undefined
  >();

  useEffect(() => {
    if (id && type) {
      getMovieDetails(type, id).then((data) => setData(data));
    }
  }, [id, type]);

  if (!show) return null;

  if (isMobile) {
    return (
      <Drawer.Root shouldScaleBackground defaultOpen>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal className="bg-[var(--color-page-background)]">
          <Drawer.Content
            className="flex bg-[var(--color-page-background)] flex-col outline-none overflow-hidden h-[98%] rounded-xl fixed bottom-1 left-0 right-0"
            onAnimationEnd={(open) => !open && setShow(false)}
          >
            {!data && <SimpleLoading />}
            {data && <MediaDisplay data={data} />}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog.Root defaultOpen onOpenChange={(open) => !open && setShow(false)}>
      <Dialog.Content className="!p-0 w-full h-full max-w-full max-h-full !rounded-none relative">
        {!data && <SimpleLoading />}
        {data && <MediaDisplay data={data} />}

        <Flex position={"absolute"} right={"0"} top={"0"} p={"2"}>
          <Dialog.Close>
            <IconButton radius="full" variant="soft" color="indigo">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.2017 23.401C10.462 23.6613 10.8841 23.6613 11.1445 23.401L15.9057 18.6398C15.9577 18.5877 16.0422 18.5877 16.0942 18.6398L20.8555 23.401C21.1158 23.6613 21.5379 23.6613 21.7983 23.401L23.401 21.7982C23.6614 21.5378 23.6614 21.1157 23.401 20.8554L18.6398 16.0942C18.5878 16.0421 18.5878 15.9577 18.6398 15.9056L23.401 11.1444C23.6613 10.8841 23.6613 10.462 23.401 10.2016L21.7982 8.59886C21.5379 8.33851 21.1158 8.33851 20.8554 8.59886L16.0942 13.36C16.0422 13.4121 15.9577 13.4121 15.9057 13.36L11.1445 8.59887C10.8842 8.33852 10.4621 8.33852 10.2017 8.59887L8.59894 10.2016C8.33859 10.462 8.33859 10.8841 8.59894 11.1445L13.3601 15.9056C13.4122 15.9577 13.4122 16.0421 13.3601 16.0942L8.59889 20.8554C8.33854 21.1157 8.33854 21.5378 8.59889 21.7982L10.2017 23.401Z"
                  fill="currentColor"
                />
              </svg>
            </IconButton>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
