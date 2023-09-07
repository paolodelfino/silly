"use client";
import { useMobileDetector } from "@/app/_stores/mobile-detector";
import { useEffect } from "react";

export default function MobileDetector() {
  const setIsMobile = useMobileDetector((state) => state.setIsMobile);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(matchMedia("not all and (min-width: 768px)").matches);
      window.addEventListener("resize", () =>
        setIsMobile(matchMedia("not all and (min-width: 768px)").matches)
      );
    }
  }, []);

  return null;
}
