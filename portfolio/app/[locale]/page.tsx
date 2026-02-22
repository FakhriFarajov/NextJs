import Hero from "@/components/ui/hero";
import SilkBg from "@/components/ui/silk";
import Skills from "@/components/ui/skills";
import LogoLoop from "@/components/ui/LogoLoop";
import { techLogos as baseTechLogos } from "@/data/techLogos";
import { iconMap } from "@/data/iconMap";

const techLogos = baseTechLogos.map(item => ({
  ...item,
  node: iconMap[item.key as keyof typeof iconMap] || null,
}));

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
          scale={1}
          color="#707070ff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Hero />
        <Skills />
        <div style={{ height: '100px', width: '100%', margin: '0 auto', position: 'relative', overflow: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={60}
          />
        </div>
      </main>
    </>
  );
}
