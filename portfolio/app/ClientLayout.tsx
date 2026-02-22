"use client";
import AuthProvider from "@/components/providers/auth-provider";
import Navbar from "@/components/ui/navbar";
import SilkBg from "@/components/ui/silk";

export default function ClientLayout({ session, children }: { session: any; children: React.ReactNode }) {
  // In production, detect locale and load messages dynamically
  return (
    <AuthProvider session={session}>
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
      <Navbar />
      {children}
    </AuthProvider>
  );
}
