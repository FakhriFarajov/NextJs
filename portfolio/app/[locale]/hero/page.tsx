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
    <main className="w-full bg-[#111111]">
      <Hero />
      
      {/* Use standard spacing instead of Flex gap */}
      <div className="py-20"> 
        <Skills />
      </div>

      <div className="h-[100px] w-full relative overflow-hidden my-10">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={60}
        />
      </div>

      {/* This component needs a "clean" parent to pin correctly */}
      <HorizontalScrollShowcase />
      
      {/* Add a footer or extra space to see the end of the scroll */}
      <div className="h-screen" />
    </main>
  );
}