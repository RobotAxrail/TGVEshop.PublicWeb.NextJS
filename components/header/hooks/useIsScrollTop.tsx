import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function useIsScrollTop(
  defaultValue: boolean,
  disable?: boolean
) {
  const [isTop, setTop] = useState<boolean>();

  useEffect(() => {
    const eventFunction = (e: any) => {
      if (!disable) setTop(e?.target?.scrollTop <= 0);
    };
    document
      ?.getElementsByTagName("body")[0]
      .removeEventListener("scroll", eventFunction);
    if (typeof window !== "undefined") {
      setTop(defaultValue);
      document
        ?.getElementsByTagName("body")[0]
        ?.addEventListener("scroll", eventFunction);
      return () => {
        document
          ?.getElementsByTagName("body")[0]
          .removeEventListener("scroll", eventFunction);
      };
    }
  }, [disable, defaultValue]);

  return { isTop };
}
