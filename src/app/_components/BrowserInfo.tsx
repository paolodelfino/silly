"use client";
import { useBrowserInfo } from "@/app/_stores/browser-info";
import { useEffect } from "react";
import UAParser from "ua-parser-js";

export default function BrowserInfo() {
  const { setIsMobile, setIsSmallDevice } = useBrowserInfo();

  useEffect(() => {
    if (typeof window != "undefined") {
      setIsSmallDevice(matchMedia("not all and (min-width: 768px)").matches);
      window.addEventListener("resize", () =>
        setIsSmallDevice(matchMedia("not all and (min-width: 768px)").matches)
      );

      setIsMobile(new UAParser().getResult().device.type == "mobile");
    }
  }, [setIsMobile]);

  return null;
}
