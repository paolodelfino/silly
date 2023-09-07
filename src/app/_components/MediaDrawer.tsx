"use client";
import MediaDisplay from "@/app/_components/MediaDisplay";
import SimpleLoading from "@/app/_components/SimpleLoading";
import { useMediaDrawer } from "@/app/_stores/media-drawer";
import { MovieDetailsOutput, TvShowDetailsOutput } from "@/app/_trpc/types";
import { getMovieDetails } from "@/server/actions";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

export default function MediaDrawer() {
  const { id, type, show, setShow } = useMediaDrawer();

  const [data, setData] = useState<
    MovieDetailsOutput | TvShowDetailsOutput | undefined
  >();

  useEffect(() => {
    if (id && type) {
      getMovieDetails(type, id).then((data) => setData(data));
    }
  }, [id, type]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(matchMedia("not all and (min-width: 768px)").matches);
      window.addEventListener("resize", () =>
        setIsMobile(matchMedia("not all and (min-width: 768px)").matches)
      );
    }
  }, []);

  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);

  if (!show) return null;

  if (isMobile) {
    return (
      <Drawer.Root shouldScaleBackground defaultOpen>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Portal className="bg-[var(--color-page-background)]">
          <Drawer.Content
            className="flex bg-[var(--color-page-background)] flex-col outline-none overflow-hidden max-h-[98%] rounded-xl h-full fixed bottom-1 left-0 right-0"
            onAnimationEnd={(open) => !open && setShow(false)}
          >
            {!data && <SimpleLoading />}
            {data && <MediaDisplay data={data} />}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return null;
}
