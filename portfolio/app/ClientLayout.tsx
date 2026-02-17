"use client";
import  AuthProvider  from "@/components/providers/auth-provider";
import Navbar from "@/components/ui/navbar";

export default function ClientLayout({ session, children }: { session: any; children: React.ReactNode }) {
  return (
    <AuthProvider session={session}>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
