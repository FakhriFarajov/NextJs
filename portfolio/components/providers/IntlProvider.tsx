import { Messages, NextIntlClientProvider } from "next-intl";

interface IntlProviderProps {
    children: React.ReactNode;
    messages: Messages;
}

export default function ProviderIntl({ children, messages }: IntlProviderProps) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
