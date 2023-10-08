"use client";
import { useWindowScroll } from "@mantine/hooks";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollToTop() {
  const [{ y }, scrollTo] = useWindowScroll();

  return (
    <center className="fixed top-[13px] z-30 w-full">
      <AnimatePresence>
        {y > 300 && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.2 },
              y: -60,
            }}
          >
            <Button
              onPress={() => scrollTo({ y: 0 })}
              radius="full"
              className="bg-default-100 shadow-sm"
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M480-529 324-373q-11 11-28 11t-28-11q-11-11-11-28t11-28l184-184q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l184 184q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-529Z" />
                </svg>
              }
            >
              Back to top
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </center>
  );
}
