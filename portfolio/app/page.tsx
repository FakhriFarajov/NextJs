import Hero from "@/components/ui/hero";
import SilkBg from "@/components/ui/silk";
import Skills from "@/components/ui/skills";
import LogoLoop from "@/components/ui/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSharp, SiCplusplus, SiAmazon, SiDocker, SiPython, SiMysql, SiPostgresql, SiMongodb } from "react-icons/si";

export default function Home() {
  const techLogos = [
    { node: <SiReact color="#fff" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs color="#fff" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript color="#fff" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss color="#fff" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiSharp color="#fff" />, title: "C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    { node: <SiCplusplus color="#fff" />, title: "C++", href: "https://isocpp.org/" },
    { node: <SiAmazon color="#fff" />, title: "AWS", href: "https://aws.amazon.com/" },
    { node: <SiDocker color="#fff" />, title: "Docker", href: "https://www.docker.com/" },
    { node: <SiReact color="#fff" />, title: "React Native", href: "https://reactnative.dev/" },
    { node: <SiPython color="#fff" />, title: "Python", href: "https://www.python.org/" },
    { node: <SiMysql color="#fff" />, title: "MySQL", href: "https://www.mysql.com/" },
    { node: <SiPostgresql color="#fff" />, title: "PostgreSQL", href: "https://www.postgresql.org/" },
    { node: <SiMongodb color="#fff" />, title: "MongoDB", href: "https://www.mongodb.com/" },
  ];

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
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </main>
    </>
  );
}
