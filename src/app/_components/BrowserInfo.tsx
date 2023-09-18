"use client";
import { useBrowserInfo } from "@/app/_stores/browser-info";
import { useEffect } from "react";
import UAParser from "ua-parser-js";

export default function BrowserInfo() {
  const { setIsSmallDevice, setUserAgent } = useBrowserInfo();

  useEffect(() => {
    if (typeof window != "undefined") {
      setIsSmallDevice(matchMedia("not all and (min-width: 768px)").matches);
      window.addEventListener("resize", () =>
        setIsSmallDevice(matchMedia("not all and (min-width: 768px)").matches),
      );

      setUserAgent(new UAParser().getResult());
    }
  }, [setUserAgent, setIsSmallDevice]);

  return null;
}
