import { Messages, NextIntlClientProvider } from 'next-intl';

interface ProviderProps {
    children: React.ReactNode;
    messages: Messages;
}

export default function Provider({ children, messages }: ProviderProps) {
    return (
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
    )
}