import Provider from "@/providers/IntlProvider";
import NavbarVisibility from "@/components/NavbarVisibility";
import { getMessages } from "next-intl/server";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  const messages = await getMessages({ locale });

  return (
    <Provider messages={messages}>
      <NavbarVisibility />
      {children}
    </Provider>
  )
}