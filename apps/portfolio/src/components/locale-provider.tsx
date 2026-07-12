"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

import {
  getMessages,
  type LocaleCode,
  type Messages,
} from "@/lib/i18n";
import { writeLocaleCookie } from "@/lib/locale-cookie";
import { localeFromPath } from "@/lib/locale-path";

type LocaleContextValue = {
  locale: LocaleCode;
  messages: Messages;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "pt",
  messages: getMessages("pt"),
});

export function LocaleProvider({
  locale: localeProp,
  children,
}: {
  /** Optional override; defaults to path-based locale (path wins). */
  locale?: LocaleCode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const locale = localeProp ?? localeFromPath(pathname);
  const messages = useMemo(() => getMessages(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "pt-BR";
    writeLocaleCookie(locale);
  }, [locale]);

  const value = useMemo(() => ({ locale, messages }), [locale, messages]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleCode {
  return useContext(LocaleContext).locale;
}

export function useMessages(): Messages {
  return useContext(LocaleContext).messages;
}
