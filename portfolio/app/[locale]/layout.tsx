import Provider from "@/providers/IntlProvider";
import Navbar from "@/components/ui/navbar";
import TabTitleEffect from "@/components/ui/TabTitleEffect";
import { getMessages } from "next-intl/server";
import SilkBg from "@/components/ui/silk";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  const messages = await getMessages({ locale });

  return (
    <Provider messages={messages}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <SilkBg
          speed={5}
          scale={1}
          color="#707070ff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <TabTitleEffect />
      <Navbar />
      {children}
    </Provider>
  )
}