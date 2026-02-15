import Hero from "@/components/ui/hero";
import DecryptText from "../components/ui/decode-text";
import SilkBg from "@/components/ui/silk";

export default function Home() {
  return (
    <>
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
          scale={0.1}
          color="#696969ff"
          noiseIntensity={1.5}
          rotation={2.45}
        />
      </div>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "20px",
        }}
      >
        <Hero />
      </main>
    </>
  );
}
