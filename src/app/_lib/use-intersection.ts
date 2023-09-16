import { MutableRefObject, useCallback, useRef, useState } from "react";

// https://mantine.dev/hooks/use-intersection/

export function useIntersection<T extends HTMLElement = any>(
  options?: ConstructorParameters<typeof IntersectionObserver>[1]
): {
  ref: (element: T | null) => void;
  entry: IntersectionObserverEntry | null;
  observer: MutableRefObject<IntersectionObserver | null>;
} {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (element: T | null) => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }

      if (element === null) {
        setEntry(null);
        return;
      }

      observer.current = new IntersectionObserver(([_entry]) => {
        setEntry(_entry);
      }, options);

      observer.current.observe(element);
    },
    [options]
  );
  return { ref, entry, observer };
}
