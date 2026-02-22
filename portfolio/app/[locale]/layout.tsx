import ProviderIntl from '@/components/providers/IntlProvider';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { Locale } from '../../i18n/locales';

interface LocaleLayoutProps {
    children: ReactNode;
    params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) 
{
    const {locale} = params;
    const messages = await getMessages({locale});

    return (
      <ProviderIntl messages={messages}>
        {children}
      </ProviderIntl>
    );
}
