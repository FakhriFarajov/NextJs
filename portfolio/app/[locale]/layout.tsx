import ProviderIntl from '@/components/providers/IntlProvider';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

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
    <ProviderIntl locale={locale}
      {children}
    </ProviderIntl>
  );
}
