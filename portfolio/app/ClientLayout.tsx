"use client";
import AuthProvider from "@/components/providers/auth-provider";
import ProviderIntl from "@/components/providers/IntlProvider";
import Navbar from "@/components/ui/navbar";
import enMessages from "@/messages/en.json";

export default function ClientLayout({ session, children }: { session: any; children: React.ReactNode }) {
  // In production, detect locale and load messages dynamically
  const locale = "en";
  const messages = enMessages;
  return (
    <AuthProvider session={session}>
      <ProviderIntl locale={locale} messages={messages}>
        <Navbar />
        {children}
      </ProviderIntl>
    </AuthProvider>
  );
}
