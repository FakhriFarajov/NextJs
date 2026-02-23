import Hero from "@/components/ui/hero";
import SilkBg from "@/components/ui/silk";
import Skills from "@/components/ui/skills";
import LogoLoop from "@/components/ui/LogoLoop";
import HorizontalScrollShowcase from "@/components/ui/HorizontalScrollShowcase";
import { techLogos as baseTechLogos } from "@/data/techLogos";
import { iconMap } from "@/data/iconMap";

const techLogos = baseTechLogos.map(item => ({
  ...item,
  node: iconMap[item.key as keyof typeof iconMap] || null,
}));

export default function Home() {
  return (
    <>

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
        <div>
          <HorizontalScrollShowcase />

        </div>
      </main>
    </>
  );
}
