"use client";
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sections = [
  { id: 1, title: "STEP IT Academy", detail: "Professional education focused on Software Development and Design (2022-2024)." },
  { id: 2, title: "Front End Skills", detail: "Expertise in Next.js, React, Tailwind CSS, GSAP, and Framer Motion." },
  { id: 3, title: "Back End Skills", detail: "Proficient in Node.js, Express, PostgreSQL, and Clerk Authentication." },
  { id: 4, title: "Coding Experience", detail: "Built Shah Marketplace and various production-level freelance applications." },
  { id: 5, title: "Future Goals", detail: "Expanding into AI integration and scalable system architecture." }
];

export default function HorizontalScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      // This calculates the total distance to move (Total width minus the screen width)
      const getScrollAmount = () => {
        return -(slider.scrollWidth - window.innerWidth);
      };

      gsap.to(slider, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // The larger this number, the "smoother" and slower the scroll feels
          end: () => `+=${slider.scrollWidth}`, 
          pin: true,
          scrub: 1, // High scrub value (e.g. 1.5) makes it feel "heavier" and smoother
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative border-t border-white/10">
      <section 
        ref={containerRef} 
        className="h-screen w-full bg-[#0a0a0a] overflow-hidden"
      >
        {/* The Track: This moves as one single long unit */}
        <div 
          ref={sliderRef} 
          className="flex flex-nowrap h-full items-center will-change-transform"
          style={{ width: "fit-content" }}
        >
          {sections.map((item) => (
            <div 
              key={item.id} 
              className="w-screen px-[10vw] flex flex-col items-start justify-center flex-shrink-0"
            >
              {/* Massive Title */}
              <h2 className="text-[12vw] font-black uppercase leading-none text-white tracking-tighter">
                {item.title}
              </h2>
              
              {/* Detail Text - Moving together with the title */}
              <div className="mt-8 max-w-2xl border-l-4 border-blue-600 pl-8">
                <p className="text-blue-500 font-mono text-sm mb-2 tracking-widest uppercase">
                  Details
                </p>
                <p className="text-2xl md:text-4xl font-light text-gray-400 leading-tight italic">
                  "{item.detail}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}