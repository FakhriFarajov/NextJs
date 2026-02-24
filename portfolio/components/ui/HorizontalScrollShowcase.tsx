"use client";
import { useRef, useState } from 'react';
import type { JSX } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiMui, SiMysql, SiMinio, SiAmazon, SiDotnet, SiPython, SiJavascript, SiTypescript, SiDocker, SiSharp, SiSqlite, SiNodedotjs } from 'react-icons/si';
import { MdDescription } from 'react-icons/md';
import { TbBrandReactNative } from 'react-icons/tb';
import { RiTranslate2 } from 'react-icons/ri';
import { sectionsData } from "@/data/sectionsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techIconsMap: Record<string, JSX.Element> = {
  React: <FaReact className="text-cyan-400" size={32} title="React" />,
  Nextjs: <SiNextdotjs className="text-white" size={32} title="Next.js" />,
  'Next.js': <SiNextdotjs className="text-white" size={32} title="Next.js" />,
  'React Native': <TbBrandReactNative className="text-cyan-300" size={32} title="React Native" />,
  'Material UI': <SiMui className="text-blue-400" size={32} title="Material UI" />,
  Thesis: <MdDescription className="text-white" size={32} title="Thesis" />,
  MySQL: <SiMysql className="text-blue-300" size={32} title="MySQL" />,
  MinIO: <SiMinio className="text-red-400" size={32} title="MinIO" />,
  'LibreTranslate': <RiTranslate2 className="text-green-300" size={32} title="LibreTranslate" />,
  AWS: <SiAmazon className="text-yellow-400" size={32} title="AWS" />,
  'ASP.NET': <SiDotnet className="text-blue-500" size={32} title="ASP.NET" />,
  Python: <SiPython className="text-yellow-300" size={32} title="Python" />,
  JavaScript: <SiJavascript className="text-yellow-400" size={32} title="JavaScript" />,
  TypeScript: <SiTypescript className="text-blue-400" size={32} title="TypeScript" />,
  Docker: <SiDocker className="text-blue-300" size={32} title="Docker" />,
  CSharp: <SiSharp className="text-blue-500" size={32} title="C#" />,
  SQL: <SiSqlite className="text-blue-400" size={32} title="SQL" />,
  NodeJS: <SiNodedotjs className="text-green-400" size={32} title="Node.js" />,
  // Disney: <FaDisney className="text-blue-300" size={32} title="Disney+" />,
};

export default function HorizontalScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [activeTabs, setActiveTabs] = useState<{ [key: number]: string }>(() => {
    const initialState: { [key: number]: string } = {};
    sectionsData.forEach(section => {
      initialState[section.id] = section.tabs[0].id;
    });
    return initialState;
  });

  const handleTabClick = (sectionId: number, tabId: string) => {
    setActiveTabs(prev => ({ ...prev, [sectionId]: tabId }));
  };

  useGSAP(() => {
    const slider = containerRef.current;
    if (!slider) return;

    // Calculate exactly how much to move: (Total Width - One Screen Width)
    const amountToScroll = slider.offsetWidth - window.innerWidth;

    gsap.to(slider, {
      x: -amountToScroll,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        // Calculate snap based on index: 0, 1, 2...
        snap: 1 / (sectionsData.length - 1),
        start: "top top", // Starts exactly when the top of the trigger hits the top of viewport
        end: () => `+=${amountToScroll}`, // Length of scroll equals distance moved
        invalidateOnRefresh: true, // Fixes math on resize
      },
    });
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="w-full bg-white/10 backdrop-blur-lg overflow-hidden">
      <div 
        ref={containerRef} 
        className="flex flex-nowrap h-screen will-change-transform"
        style={{ width: `${sectionsData.length * 100 + 100}vw` }}
      >
        {sectionsData.map((section, idx) => {
          const activeTab = section.tabs.find(tab => tab.id === activeTabs[section.id]) || section.tabs[0];
          return (
            <section 
              key={section.id} 
              className="w-screen h-screen flex flex-col justify-center px-8 md:px-[10vw] flex-shrink-0"
            >
              <div className="max-w-6xl mx-auto w-full">
                <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-6">
                  {section.category}
                </h4>
                <h2 className="text-2xl md:text-[2.5rem] font-medium text-white mb-8">
                  {section.mainTitle}
                </h2>
                {/* Tech Icons Row */}
                <div className="flex gap-6 mb-10 items-center">
                  {section.id === 1 ? (
                    <>
                      {techIconsMap.React}
                      {techIconsMap['Next.js']}
                      {techIconsMap['React Native']}
                      {techIconsMap['Material UI']}
                      {techIconsMap.Thesis}
                    </>
                  ) : (
                    <>
                      {techIconsMap.MySQL}
                      {techIconsMap.MinIO}
                      {techIconsMap['LibreTranslate']}
                      {techIconsMap.AWS}
                      {techIconsMap['ASP.NET']}
                    </>
                  )}
                </div>
                {/* Tabs & Code Window as per your original code */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {section.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(section.id, tab.id)}
                      className={`rounded-full px-5 py-2 text-sm border transition-all duration-300 ${
                        activeTabs[section.id] === tab.id ? 'bg-white text-black border-white font-medium' : 'text-white border-white/20 hover:border-white/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <p className="text-white text-base leading-relaxed max-w-5xl mb-12 min-h-[60px]">
                  {activeTab.description}
                </p>
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-6 overflow-hidden">
                  {activeTab.codeSnippet}
                </div>
              </div>
            </section>
          );
        })}
        {/* Education Section */}
        <section className="w-screen h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-[10vw] flex-shrink-0">
          {/* Left: Slideshow */}
          <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
            <div className="w-[320px] h-[320px] bg-white/20 rounded-xl flex items-center justify-center overflow-hidden relative">
              {/* Placeholder for slideshow - replace with your own carousel */}
              <span className="text-white text-lg">STEP Academy Slideshow<br/>[10 images]</span>
            </div>
          </div>
          {/* Right: Carousel Text & Tech Stack */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8 w-full max-w-lg">
              {/* Placeholder for carousel text */}
              <span className="text-white">Carousel Text: Replace with your own thoughts...</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {/* {techIconsMap.Disney} */}
              {techIconsMap.CSharp}
              {techIconsMap.Python}
              {techIconsMap.SQL}
              {techIconsMap.AWS}
              {techIconsMap.Docker}
              {techIconsMap.Nextjs}
              {techIconsMap.NodeJS}
              {techIconsMap.JavaScript}
              {techIconsMap.TypeScript}
              {techIconsMap.React}
              {techIconsMap['React Native']}
              {techIconsMap['ASP.NET']}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}