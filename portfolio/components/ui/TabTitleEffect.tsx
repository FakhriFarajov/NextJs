"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function TabTitleEffect() {
  const t = useTranslations();
  useEffect(() => {
    const defaultTitle = t("tab.default");
    document.title = defaultTitle;
    let timeoutId: NodeJS.Timeout | null = null;
    let lastVisibility = document.visibilityState;

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        document.title = t("tab.comeBack");
      } else if (
        lastVisibility === "hidden" && document.visibilityState === "visible"
      ) {
        document.title = t("tab.welcomeBack");
        timeoutId = setTimeout(() => {
          document.title = defaultTitle;
        }, 2000);
      }
      lastVisibility = document.visibilityState;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (timeoutId) clearTimeout(timeoutId);
      document.title = defaultTitle;
    };
  }, [t]);
  return null;
}
