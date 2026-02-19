"use client";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

interface IntlProviderProps {
    children: ReactNode;
    locale: string;
    messages: Record<string, any>;
}

export default function ProviderIntl({ children, locale, messages }: IntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
