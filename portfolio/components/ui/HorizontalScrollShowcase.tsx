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
import CircularGallery from '@/components/ui/CircularGallery';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const techIconsMap: Record<string, JSX.Element> = {
    React: <FaReact className="text-white" size={32} title="React" />,
    'Next.js': <SiNextdotjs className="text-white" size={32} title="Next.js" />,
    'React Native': <TbBrandReactNative className="text-white" size={32} title="React Native" />,
    'Material UI': <SiMui className="text-white" size={32} title="Material UI" />,
    Thesis: <MdDescription className="text-white" size={32} title="Thesis" />,
    MySQL: <SiMysql className="text-white" size={32} title="MySQL" />,
    MinIO: <SiMinio className="text-white" size={32} title="MinIO" />,
    LibreTranslate: <RiTranslate2 className="text-white" size={32} title="LibreTranslate" />,
    AWS: <SiAmazon className="text-white" size={32} title="AWS" />,
    'ASP.NET': <SiDotnet className="text-white" size={32} title="ASP.NET" />,
    Python: <SiPython className="text-white" size={32} title="Python" />,
    JavaScript: <SiJavascript className="text-white" size={32} title="JavaScript" />,
    TypeScript: <SiTypescript className="text-white" size={32} title="TypeScript" />,
    Docker: <SiDocker className="text-white" size={32} title="Docker" />,
    CSharp: <SiSharp className="text-white" size={32} title="C#" />,
    SQL: <SiSqlite className="text-white" size={32} title="SQL" />,
    NodeJS: <SiNodedotjs className="text-white" size={32} title="Node.js" />,
};

export default function HorizontalScrollShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const educationSectionRef = useRef<HTMLDivElement>(null);
    const projectSectionRef = useRef<HTMLDivElement>(null);

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

    // Education Text Refs
    const eduRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    useGSAP(() => {
        const slider = containerRef.current;
        if (!slider) return;

        const totalSections = sectionsData.length + 2; // Data sections + Education + Projects
        const amountToScroll = slider.offsetWidth - window.innerWidth;

        // 1. MAIN HORIZONTAL SCROLL
        const mainScroll = gsap.to(slider, {
            x: -amountToScroll,
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (totalSections - 1),
                start: "top top",
                end: () => `+=${amountToScroll}`,
                invalidateOnRefresh: true,
            },
        });

        // 2. EDUCATION TEXT STAGGER (Sync with horizontal move)
        eduRefs.forEach((ref, i) => {
            if (ref.current) {
                gsap.fromTo(ref.current,
                    { opacity: 0, x: 40 },
                    {
                        opacity: 1,
                        x: 0,
                        scrollTrigger: {
                            trigger: triggerRef.current,
                            containerAnimation: mainScroll, // Link to horizontal timeline
                            // Logic: Start animating when education slide is active
                            start: () => `${(sectionsData.length / totalSections) * 100}% center`, 
                            scrub: true,
                        }
                    }
                );
            }
        });

    }, { scope: triggerRef });

    const educationParagraphs = [
        "STEP IT Academy is where I developed my foundational and advanced competencies in programming and systems. My journey began in 2017, when I was nine years old.",
        "During my first year, I mastered Office apps and Scratch. I then moved into 3D modeling with Blender and Photoshop, alongside robotics and video editing.",
        "In 2023, I specialized in Python and Tkinter, building my first Restaurant Management System and earning Cisco/Python Institute certifications.",
        "By 2024, I reached Full-Stack mastery in the Professional Academy, utilizing C#, TypeScript, ASP.NET, and AWS for complex production-ready applications."
    ];

    return (
        <div ref={triggerRef} className="w-full  overflow-hidden">
            <div
                ref={containerRef}
                className="flex flex-nowrap h-screen will-change-transform"
                style={{ width: `${(sectionsData.length + 2) * 100}vw` }}
            >
                {/* --- 1. SECTIONS FROM DATA --- */}
                {sectionsData.map((section) => {
                    const activeTab = section.tabs.find(tab => tab.id === activeTabs[section.id]) || section.tabs[0];
                    return (
                        <section key={section.id} className="w-screen h-screen flex flex-col justify-center px-8 md:px-[10vw] flex-shrink-0">
                            <div className="max-w-6xl mx-auto w-full">
                                <h4 className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-6 text-white">{section.category}</h4>
                                <h2 className="text-2xl md:text-[2.5rem] font-medium text-white mb-8 leading-tight">{section.mainTitle}</h2>
                                <div className="flex gap-4 mb-10">
                                    {section.id === 1 ? (
                                        <>{techIconsMap.React}{techIconsMap['Next.js']}{techIconsMap['React Native']}</>
                                    ) : (
                                        <>{techIconsMap.MySQL}{techIconsMap.AWS}{techIconsMap.NodeJS}</>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {section.tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleTabClick(section.id, tab.id)}
                                            className={`rounded-full px-5 py-2 text-sm border transition-all ${
                                                activeTabs[section.id] === tab.id ? 'bg-white text-black border-white' : 'text-white/40 border-white/10'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                                    {activeTab.codeSnippet}
                                </div>
                            </div>
                        </section>
                    );
                })}

                {/* --- 2. EDUCATION SECTION (Split Layout) --- */}
                <section ref={educationSectionRef} className="w-screen h-screen flex flex-col md:flex-row items-center justify-center px-8 md:px-[10vw] flex-shrink-0 gap-16">
                    {/* Left: Carousel */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="w-[320px] md:w-[450px] h-[320px] md:h-[450px] bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
                             <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} scrollSpeed={2} scrollEase={0.05} />
                        </div>
                    </div>

                    {/* Right: Text Column */}
                    <div className="w-full md:w-1/2 flex flex-col items-start gap-4 max-w-lg">
                        <h3 className="text-white text-3xl font-bold mb-4">Academic Journey</h3>
                        {educationParagraphs.map((text, idx) => (
                            <div 
                                key={idx} 
                                ref={eduRefs[idx]} 
                                className="bg-white/5 backdrop-blur-sm border border-white/5 p-4 rounded-xl"
                            >
                                <p className="text-white/80 text-sm leading-relaxed">{text}</p>
                            </div>
                        ))}
                        {/* Home placeholder */}
                        <div className="w-full mt-4 p-4 border border-dashed border-white/20 rounded-xl flex items-center justify-center italic text-white/30 text-xs">
                            [Ready to Integrate: Home Component]
                        </div>
                    </div>
                </section>

                {/* --- 3. NEW FINAL SECTION --- */}
                <section ref={projectSectionRef} className="w-screen h-screen flex flex-col items-center justify-center px-8 flex-shrink-0">
                    <div className="text-center max-w-4xl">
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 italic">
                            BUILDING THE <span className="text-cyan-400 underline decoration-white/20">FUTURE</span>
                        </h2>
                        <p className="text-white/50 text-xl md:text-2xl font-light mb-12">
                            Transforming complex logic into seamless digital experiences.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button className="px-10 py-4 bg-cyan-400 text-black font-bold rounded-full text-lg hover:scale-105 transition-transform">
                                VIEW PROJECTS
                            </button>
                            <button className="px-10 py-4 border border-white/20 text-white font-bold rounded-full text-lg hover:bg-white/5 transition-colors">
                                CONTACT ME
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}