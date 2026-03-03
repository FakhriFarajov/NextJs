import Provider from "@/providers/IntlProvider";
import Navbar from "@/components/Navbar";
import { getMessages } from "next-intl/server";
import SilkBg from "@/components/ui/silk";

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
      <Navbar />
      {children}
    </Provider>
  )
}